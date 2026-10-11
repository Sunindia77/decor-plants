import { createHmac, timingSafeEqual } from "node:crypto";
import { captureRazorpayPayment, fetchRazorpayPayment } from "@/lib/razorpay";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface VerifiedOrder {
  id: string;
  order_number: string;
  total: number | string;
  payment_status: "pending" | "paid" | "failed";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function jsonError(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

function safeHexEqual(expected: string, received: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(received)) return false;
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");
  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonError("Invalid request origin.", 403);
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return jsonError("Sign-in is not configured yet.", 503);
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError && authError.status !== 400 && authError.status !== 401) {
    console.error("[payments/verify] Session validation failed.", { code: authError.code });
    return jsonError("We could not verify your sign-in. Please try again.", 503);
  }
  if (!authData.user) return jsonError("Please sign in to verify your payment.", 401);

  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keySecret) {
    console.error("[payments/verify] Razorpay server secret is not configured.");
    return jsonError("Payment verification is not configured yet.", 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must contain valid JSON.", 400);
  }
  if (
    !isRecord(body) ||
    typeof body.customerOrderId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.customerOrderId) ||
    typeof body.razorpay_order_id !== "string" ||
    !/^order_[A-Za-z0-9]+$/.test(body.razorpay_order_id) ||
    typeof body.razorpay_payment_id !== "string" ||
    !/^pay_[A-Za-z0-9]+$/.test(body.razorpay_payment_id) ||
    typeof body.razorpay_signature !== "string"
  ) {
    return jsonError("Payment verification details are invalid.", 400);
  }

  const expectedSignature = createHmac("sha256", keySecret)
    .update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`)
    .digest("hex");
  if (!safeHexEqual(expectedSignature, body.razorpay_signature)) {
    return jsonError("We could not verify this payment. Please contact support before retrying.", 400);
  }

  const admin = createSupabaseAdminClient();
  if (!admin) return jsonError("Payment storage is not configured yet.", 503);

  const { data: order, error: orderError } = await admin
    .from("customer_orders")
    .select("id, order_number, total, payment_status, razorpay_order_id")
    .eq("id", body.customerOrderId)
    .eq("user_id", authData.user.id)
    .maybeSingle();
  if (orderError || !order) {
    console.error("[payments/verify] Order lookup failed.", { code: orderError?.code });
    return jsonError("We could not find this order for your account.", 404);
  }
  if (order.razorpay_order_id !== body.razorpay_order_id) {
    return jsonError("The payment does not match this order.", 409);
  }

  let gatewayPayment;
  try {
    gatewayPayment = await fetchRazorpayPayment(body.razorpay_payment_id);
  } catch (gatewayError) {
    console.error("[payments/verify] Razorpay payment lookup failed.", {
      name: gatewayError instanceof Error ? gatewayError.name : "UnknownError",
    });
    return jsonError("Payment status is still being confirmed. Please retry shortly.", 503);
  }
  if (!gatewayPayment) {
    return jsonError("Payment status is still being confirmed. Please retry shortly.", 503);
  }
  if (
    gatewayPayment.order_id !== body.razorpay_order_id ||
    gatewayPayment.amount !== Math.round(Number(order.total) * 100) ||
    gatewayPayment.currency !== "INR"
  ) {
    return jsonError("The payment details do not match this order.", 409);
  }
  if (gatewayPayment.status === "authorized") {
    try {
      await captureRazorpayPayment(
        body.razorpay_payment_id,
        Math.round(Number(order.total) * 100),
      );
      gatewayPayment = await fetchRazorpayPayment(body.razorpay_payment_id);
    } catch (captureError) {
      console.error("[payments/verify] Razorpay payment capture failed.", {
        name: captureError instanceof Error ? captureError.name : "UnknownError",
      });
      return jsonError("Payment is authorized and capture is being retried. Check your order history shortly.", 503);
    }
  }
  if (!gatewayPayment) {
    return jsonError("Payment capture is being confirmed. Please check your order history shortly.", 503);
  }
  if (gatewayPayment.order_id !== body.razorpay_order_id ||
    gatewayPayment.amount !== Math.round(Number(order.total) * 100) ||
    gatewayPayment.currency !== "INR") {
    return jsonError("The payment details do not match this order.", 409);
  }
  if (gatewayPayment.status !== "captured") {
    return jsonError("Payment is not captured yet. Your order will update after capture.", 409);
  }

  const { data, error } = await admin.rpc("complete_razorpay_payment", {
    p_order_id: order.id,
    p_user_id: authData.user.id,
    p_razorpay_order_id: body.razorpay_order_id,
    p_razorpay_payment_id: body.razorpay_payment_id,
  });
  if (error || !Array.isArray(data) || data.length !== 1) {
    console.error("[payments/verify] Could not update the verified payment.", {
      code: error?.code ?? "invalid_rpc_response",
    });
    return jsonError("Payment was received but order confirmation is delayed. Please check your order history.", 503);
  }

  const verified = data[0] as VerifiedOrder;
  if (
    verified.id !== order.id ||
    verified.payment_status !== "paid" ||
    typeof verified.order_number !== "string"
  ) {
    console.error("[payments/verify] Payment completion returned an invalid result.");
    return jsonError("Payment was received but order confirmation is delayed. Please check your order history.", 503);
  }

  return Response.json({
    success: true,
    order: {
      id: verified.order_number,
      total: Number(verified.total),
      paymentStatus: verified.payment_status,
    },
  });
}
