import { products } from "@/data/products";
import { getCartLines, getCartTotals } from "@/lib/commerce";
import { createRazorpayOrder, getRazorpayMode, getRazorpayPublicKey } from "@/lib/razorpay";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CartItem } from "@/types/product";

interface StoredOrder {
  id: string;
  order_number: string;
  total: number | string;
  payment_status: "pending" | "paid" | "failed";
  razorpay_order_id: string | null;
  razorpay_mode: "test" | "live" | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseItems(value: unknown): CartItem[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > products.length) return null;

  const quantities = new Map<string, number>();
  for (const entry of value) {
    if (!isRecord(entry) || typeof entry.productId !== "string") return null;
    if (!Number.isInteger(entry.quantity) || typeof entry.quantity !== "number" || entry.quantity < 1) {
      return null;
    }
    const product = products.find((item) => item.id === entry.productId);
    if (!product || product.stock < 1) return null;
    quantities.set(entry.productId, (quantities.get(entry.productId) ?? 0) + entry.quantity);
  }

  const items = [...quantities].map(([productId, quantity]) => ({ productId, quantity }));
  return items.every((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product !== undefined && item.quantity <= product.stock;
  }) ? items : null;
}

function jsonError(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

async function authenticatedUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { response: jsonError("Sign-in is not configured yet.", 503) };
  const { data, error } = await supabase.auth.getUser();
  if (error && error.status !== 400 && error.status !== 401) {
    console.error("[payments/create-order] Session validation failed.", { code: error.code });
    return { response: jsonError("We could not verify your sign-in. Please try again.", 503) };
  }
  if (!data.user?.email) return { response: jsonError("Please sign in before checkout.", 401) };
  return { user: data.user };
}

function parseStoredOrder(value: unknown): StoredOrder | null {
  if (
    !isRecord(value) ||
    typeof value.id !== "string" ||
    typeof value.order_number !== "string" ||
    (typeof value.total !== "number" && typeof value.total !== "string") ||
    (value.payment_status !== "pending" &&
      value.payment_status !== "paid" &&
      value.payment_status !== "failed") ||
    (value.razorpay_order_id !== null && typeof value.razorpay_order_id !== "string") ||
    (value.razorpay_mode !== null &&
      value.razorpay_mode !== "test" &&
      value.razorpay_mode !== "live")
  ) {
    return null;
  }
  return {
    id: value.id,
    order_number: value.order_number,
    total: value.total,
    payment_status: value.payment_status,
    razorpay_order_id: value.razorpay_order_id,
    razorpay_mode: value.razorpay_mode,
  };
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 32_000) return jsonError("Request is too large.", 413);

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return jsonError("Invalid request origin.", 403);
  }

  const auth = await authenticatedUser();
  if ("response" in auth) return auth.response;

  const keyId = getRazorpayPublicKey();
  const mode = getRazorpayMode();
  if (!keyId || !mode) {
    console.error("[payments/create-order] Razorpay server configuration is missing or invalid.");
    return jsonError("Online payment is not configured yet. Please contact the shop.", 503);
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must contain valid JSON.", 400);
  }

  if (
    !isRecord(body) ||
    !isRecord(body.customer) ||
    !isRecord(body.address) ||
    typeof body.checkoutRequestId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(body.checkoutRequestId)
  ) {
    return jsonError("Customer, address, and checkout details are required.", 400);
  }

  const { customer, address } = body;
  const phone = customer.phone;
  if (
    typeof customer.name !== "string" ||
    customer.name.trim().length < 1 ||
    customer.name.trim().length > 100 ||
    typeof phone !== "string" ||
    phone.trim().length > 20 ||
    !/^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(phone.trim())
  ) {
    return jsonError("Please provide a valid name and Indian mobile number.", 400);
  }
  if (
    typeof address.address !== "string" ||
    address.address.trim().length < 1 ||
    address.address.trim().length > 300 ||
    typeof address.city !== "string" ||
    address.city.trim().length < 1 ||
    address.city.trim().length > 80 ||
    typeof address.state !== "string" ||
    address.state.trim().length < 1 ||
    address.state.trim().length > 80 ||
    typeof address.pincode !== "string" ||
    !/^\d{6}$/.test(address.pincode)
  ) {
    return jsonError("Please provide a complete delivery address and valid 6-digit pincode.", 400);
  }

  const items = parseItems(body.items);
  if (!items) return jsonError("Your cart has an invalid product or unavailable quantity.", 400);

  const lines = getCartLines(items);
  const totals = getCartTotals(lines);
  const amount = Math.round(totals.total * 100);
  if (!Number.isSafeInteger(amount) || amount < 100) {
    return jsonError("The order total is not a valid payment amount.", 400);
  }

  const admin = createSupabaseAdminClient();
  if (!admin) {
    console.error("[payments/create-order] Supabase server key is not configured.");
    return jsonError("Order storage is not configured yet. Please contact the shop.", 503);
  }

  const orderItems = lines.map(({ product, quantity }) => ({
    product_id: product.id,
    product_name: product.name,
    product_image: product.image,
    quantity,
    unit_price: product.price,
    original_price: product.originalPrice ?? product.price,
    line_total: product.price * quantity,
  }));

  const { data, error } = await admin.rpc("create_checkout_order", {
    p_user_id: auth.user.id,
    p_checkout_request_id: body.checkoutRequestId,
    p_customer_name: customer.name.trim(),
    p_customer_email: auth.user.email,
    p_customer_phone: phone.trim(),
    p_delivery_address: address.address.trim(),
    p_delivery_city: address.city.trim(),
    p_delivery_state: address.state.trim(),
    p_delivery_pincode: address.pincode,
    p_subtotal: totals.subtotal,
    p_discount: totals.discount,
    p_delivery: totals.delivery,
    p_total: totals.total,
    p_items: orderItems,
  });

  if (error || !Array.isArray(data) || data.length !== 1) {
    console.error("[payments/create-order] Could not create the pending order.", {
      code: error?.code ?? "invalid_rpc_response",
    });
    return jsonError(
      error?.code === "PGRST202" || error?.code === "PGRST205"
        ? "Payment setup is incomplete. Apply the latest Supabase migrations and try again."
        : "We could not prepare your order for payment. Please try again.",
      503,
    );
  }

  const order = parseStoredOrder(data[0]);
  if (!order) {
    console.error("[payments/create-order] Supabase returned an invalid order record.");
    return jsonError("We could not prepare your order for payment. Please try again.", 503);
  }

  if (Number(order.total) * 100 !== amount) {
    return jsonError("Your cart changed during checkout. Refresh the page and try again.", 409);
  }

  if (order.payment_status === "paid") {
    return Response.json({
      success: true,
      alreadyPaid: true,
      order: { id: order.id, orderNumber: order.order_number, total: Number(order.total) },
    });
  }

  if (
    order.razorpay_order_id &&
    order.payment_status === "pending" &&
    order.razorpay_mode === mode
  ) {
    return Response.json({
      success: true,
      alreadyPaid: false,
      order: { id: order.id, orderNumber: order.order_number, total: Number(order.total) },
      razorpay: {
        keyId,
        orderId: order.razorpay_order_id,
        amount,
        currency: "INR",
        mode,
      },
    });
  }

  let gatewayOrder;
  try {
    gatewayOrder = await createRazorpayOrder({
      amount,
      receipt: order.order_number,
      customerOrderId: order.id,
      userId: auth.user.id,
    });
  } catch (gatewayError) {
    console.error("[payments/create-order] Razorpay order request failed.", {
      name: gatewayError instanceof Error ? gatewayError.name : "UnknownError",
    });
    return jsonError("The payment service is temporarily unavailable. Please try again.", 502);
  }

  if (!gatewayOrder) {
    return jsonError("The payment service could not prepare your payment. Please try again.", 502);
  }

  let update = admin
    .from("customer_orders")
    .update({ razorpay_order_id: gatewayOrder.id, razorpay_mode: mode, payment_status: "pending" })
    .eq("id", order.id)
    .eq("payment_status", order.payment_status);
  if (order.payment_status === "pending") {
    update = order.razorpay_order_id
      ? update.eq("razorpay_order_id", order.razorpay_order_id)
      : update.is("razorpay_order_id", null);
  }
  const { data: savedOrder, error: saveError } = await update
    .select("razorpay_order_id, razorpay_mode, payment_status")
    .maybeSingle();

  if (saveError) {
    console.error("[payments/create-order] Could not associate the payment with its order.", {
      code: saveError.code,
    });
    return jsonError("We could not prepare your payment. Please try again.", 503);
  }

  let selectedRazorpayOrderId = savedOrder?.razorpay_order_id;
  let selectedPaymentStatus = savedOrder?.payment_status;
  if (!selectedRazorpayOrderId) {
    const { data: latestOrder, error: reloadError } = await admin
      .from("customer_orders")
      .select("razorpay_order_id, razorpay_mode, payment_status")
      .eq("id", order.id)
      .single();
    if (reloadError || !latestOrder) {
      console.error("[payments/create-order] Could not reload payment state.", {
        code: reloadError?.code,
      });
      return jsonError("We could not prepare your payment. Please try again.", 503);
    }
    selectedRazorpayOrderId = latestOrder.razorpay_order_id;
    selectedPaymentStatus = latestOrder.payment_status;
  }

  if (selectedPaymentStatus === "paid") {
    return Response.json({
      success: true,
      alreadyPaid: true,
      order: { id: order.id, orderNumber: order.order_number, total: Number(order.total) },
    });
  }
  if (typeof selectedRazorpayOrderId !== "string") {
    return jsonError("We could not prepare your payment. Please try again.", 503);
  }

  return Response.json({
    success: true,
    alreadyPaid: false,
    order: { id: order.id, orderNumber: order.order_number, total: Number(order.total) },
    razorpay: {
      keyId,
      orderId: selectedRazorpayOrderId,
      amount,
      currency: "INR",
      mode,
    },
  });
}
