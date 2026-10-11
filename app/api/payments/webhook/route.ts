import { createHmac, timingSafeEqual } from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function safeHexEqual(expected: string, received: string): boolean {
  if (!/^[a-f0-9]{64}$/i.test(received)) return false;
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(received, "hex");
  return expectedBuffer.length === receivedBuffer.length && timingSafeEqual(expectedBuffer, receivedBuffer);
}

function getPaymentEntity(body: unknown): Record<string, unknown> | null {
  if (!isRecord(body) || !isRecord(body.payload) || !isRecord(body.payload.payment)) return null;
  const payment = body.payload.payment;
  return isRecord(payment.entity) ? payment.entity : null;
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 128_000) {
    return Response.json({ success: false }, { status: 413 });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = request.headers.get("x-razorpay-signature");
  if (!webhookSecret || !signature) {
    return Response.json({ success: false }, { status: 400 });
  }

  const rawBody = await request.text();
  if (rawBody.length > 128_000) {
    return Response.json({ success: false }, { status: 413 });
  }
  const expectedSignature = createHmac("sha256", webhookSecret).update(rawBody).digest("hex");
  if (!safeHexEqual(expectedSignature, signature)) {
    return Response.json({ success: false }, { status: 400 });
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return Response.json({ success: false }, { status: 400 });
  }
  if (!isRecord(body) || typeof body.event !== "string") {
    return Response.json({ success: false }, { status: 400 });
  }
  if (body.event !== "payment.captured" && body.event !== "payment.failed") {
    return Response.json({ success: true, ignored: true });
  }

  const payment = getPaymentEntity(body);
  if (
    !payment ||
    typeof payment.order_id !== "string" ||
    !/^order_[A-Za-z0-9]+$/.test(payment.order_id) ||
    typeof payment.id !== "string" ||
    !/^pay_[A-Za-z0-9]+$/.test(payment.id)
  ) {
    return Response.json({ success: false }, { status: 400 });
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    console.error("[payments/webhook] Supabase server key is not configured.");
    return Response.json({ success: false }, { status: 503 });
  }

  const { data: order, error: orderError } = await admin
    .from("customer_orders")
    .select("id, user_id, total, razorpay_order_id")
    .eq("razorpay_order_id", payment.order_id)
    .maybeSingle();
  if (orderError || !order || order.razorpay_order_id !== payment.order_id) {
    console.error("[payments/webhook] Payment order lookup failed.", { code: orderError?.code });
    return Response.json({ success: false }, { status: 503 });
  }

  const notes = isRecord(payment.notes) ? payment.notes : null;
  if (notes && typeof notes.customer_order_id === "string" && notes.customer_order_id !== order.id) {
    return Response.json({ success: false }, { status: 400 });
  }
  if (
    typeof payment.amount !== "number" ||
    payment.amount !== Math.round(Number(order.total) * 100) ||
    payment.currency !== "INR"
  ) {
    return Response.json({ success: false }, { status: 400 });
  }

  if (body.event === "payment.captured") {
    if (payment.status !== "captured") return Response.json({ success: false }, { status: 400 });
    const { error } = await admin.rpc("complete_razorpay_payment", {
      p_order_id: order.id,
      p_user_id: null,
      p_razorpay_order_id: payment.order_id,
      p_razorpay_payment_id: payment.id,
    });
    if (error) {
      console.error("[payments/webhook] Could not record captured payment.", { code: error.code });
      return Response.json({ success: false }, { status: 503 });
    }
  } else {
    if (payment.status !== "failed") return Response.json({ success: false }, { status: 400 });
    const { error } = await admin.rpc("fail_razorpay_payment", {
      p_order_id: order.id,
      p_razorpay_order_id: payment.order_id,
    });
    if (error) {
      console.error("[payments/webhook] Could not record failed payment.", { code: error.code });
      return Response.json({ success: false }, { status: 503 });
    }
  }

  return Response.json({ success: true });
}
