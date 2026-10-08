import { products } from "@/data/products";
import { getCartLines, getCartTotals } from "@/lib/commerce";
import type { CartItem } from "@/types/product";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface OrderItemSnapshot {
  product_id: string;
  product_name: string;
  product_image: string;
  quantity: number;
  unit_price: number;
  original_price: number;
  line_total: number;
}

const ORDER_ADMIN_EMAIL = "surajsatav1994@gmial.com";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isCreatedOrder(value: unknown): value is { id: string; order_number: string } {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.order_number === "string"
  );
}

function requiredString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;
}

function parseOrderItems(value: unknown): CartItem[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > products.length) return null;

  const quantities = new Map<string, number>();
  for (const entry of value) {
    if (!isRecord(entry)) return null;
    const productId = typeof entry.productId === "string" ? entry.productId : entry.id;
    if (
      typeof productId !== "string" ||
      typeof entry.quantity !== "number" ||
      !Number.isInteger(entry.quantity) ||
      entry.quantity < 1
    ) {
      return null;
    }

    const product = products.find((item) => item.id === productId);
    if (!product || product.stock === 0) return null;
    quantities.set(productId, (quantities.get(productId) ?? 0) + entry.quantity);
  }

  const items = [...quantities].map(([productId, quantity]) => ({ productId, quantity }));
  return items.every(
    (item) =>
      item.quantity <= (products.find((product) => product.id === item.productId)?.stock ?? 0),
  )
    ? items
    : null;
}

function jsonError(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { response: jsonError("Sign-in is not configured yet.", 503) };

  const { data, error } = await supabase.auth.getUser();
  if (error && error.status !== 400 && error.status !== 401) {
    console.error("[orders] Could not validate the customer session.", {
      code: error.code,
      status: error.status,
    });
    return { response: jsonError("We could not verify your sign-in. Please try again.", 503) };
  }

  if (!data.user) {
    return { response: jsonError("Please sign in to view or place orders.", 401) };
  }

  return { supabase, user: data.user };
}

export async function GET() {
  const auth = await getAuthenticatedUser();
  if ("response" in auth) return auth.response;

  const { data, error } = await auth.supabase
    .from("customer_orders")
    .select(
      "id, order_number, created_at, status, tracking_number, tracking_url, total, items:customer_order_items(id, product_id, product_name, product_image, quantity, unit_price, line_total)",
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("[orders] Could not load customer order history.", {
      code: error.code,
      status: error.code === "42P01" || error.code === "PGRST205" ? "migration_missing" : "query_failed",
    });
    if (error.code === "42P01" || error.code === "PGRST205") {
      return jsonError(
        "Order storage is not set up yet. Apply the Supabase order migrations and refresh the API schema.",
        503,
      );
    }
    return jsonError("We could not load your order history. Please try again later.", 503);
  }

  return Response.json({
    success: true,
    isAdmin: auth.user.email?.trim().toLowerCase() === ORDER_ADMIN_EMAIL,
    orders: data,
  });
}

export async function POST(request: Request) {
  const auth = await getAuthenticatedUser();
  if ("response" in auth) return auth.response;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonError("Request body must contain valid JSON.", 400);
  }

  if (!isRecord(body) || !isRecord(body.customer) || !isRecord(body.address)) {
    return jsonError("Customer and delivery address details are required.", 400);
  }

  const customer = body.customer;
  const address = body.address;
  if (
    !requiredString(customer.name, 100) ||
    !requiredString(customer.phone, 20) ||
    !/^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(customer.phone.trim()) ||
    !auth.user.email
  ) {
    return jsonError("Please provide a valid name and Indian mobile number.", 400);
  }

  if (
    !requiredString(address.address, 300) ||
    !requiredString(address.city, 80) ||
    !requiredString(address.state, 80) ||
    typeof address.pincode !== "string" ||
    !/^\d{6}$/.test(address.pincode)
  ) {
    return jsonError("Please provide a complete delivery address and valid 6-digit pincode.", 400);
  }

  const items = parseOrderItems(body.items);
  if (!items) {
    return jsonError("Your cart contains an invalid product or unavailable quantity.", 400);
  }

  const lines = getCartLines(items);
  const totals = getCartTotals(lines);
  const orderItems: OrderItemSnapshot[] = lines.map(({ product, quantity }) => ({
    product_id: product.id,
    product_name: product.name,
    product_image: product.image,
    quantity,
    unit_price: product.price,
    original_price: product.originalPrice ?? product.price,
    line_total: product.price * quantity,
  }));

  const admin = createSupabaseAdminClient();
  if (!admin) {
    console.error("[orders] Server-only Supabase secret key is not configured.");
    return jsonError("Order storage is not configured yet. Please contact the shop.", 503);
  }

  const { data, error } = await admin.rpc("create_customer_order", {
    p_user_id: auth.user.id,
    p_customer_name: customer.name.trim(),
    p_customer_email: auth.user.email,
    p_customer_phone: customer.phone.trim(),
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

  let createdOrder: { id: string; order_number: string } | null = null;
  if (!error && Array.isArray(data) && data.length === 1 && isCreatedOrder(data[0])) {
    createdOrder = data[0];
  } else if (error?.code === "PGRST202") {
    const orderId = crypto.randomUUID();
    const orderNumber = `DP-${orderId.replaceAll("-", "").slice(0, 10).toUpperCase()}`;
    const { data: insertedOrder, error: insertOrderError } = await admin
      .from("customer_orders")
      .insert({
        id: orderId,
        order_number: orderNumber,
        user_id: auth.user.id,
        customer_name: customer.name.trim(),
        customer_email: auth.user.email,
        customer_phone: customer.phone.trim(),
        delivery_address: address.address.trim(),
        delivery_city: address.city.trim(),
        delivery_state: address.state.trim(),
        delivery_pincode: address.pincode,
        subtotal: totals.subtotal,
        discount: totals.discount,
        delivery: totals.delivery,
        total: totals.total,
      })
      .select("id, order_number")
      .single();

    if (insertOrderError?.code === "PGRST205") {
      return jsonError(
        "Order storage is not set up yet. Apply the Supabase order migrations and refresh the API schema.",
        503,
      );
    }
    if (insertOrderError || !insertedOrder) {
      console.error("[orders] Could not create the order record.", {
        code: insertOrderError?.code ?? "missing_inserted_order",
      });
      return jsonError("We could not save your order. Please try again later.", 503);
    }

    const { error: insertItemsError } = await admin.from("customer_order_items").insert(
      orderItems.map((item) => ({ ...item, order_id: insertedOrder.id })),
    );

    if (insertItemsError) {
      const { error: cleanupError } = await admin
        .from("customer_orders")
        .delete()
        .eq("id", insertedOrder.id);
      console.error("[orders] Could not save the order items.", {
        code: insertItemsError.code,
        orderCleanupFailed: Boolean(cleanupError),
        cleanupCode: cleanupError?.code,
      });
      if (insertItemsError.code === "PGRST205" || insertItemsError.code === "42P01") {
        return jsonError(
          "Order storage is not set up yet. Apply the Supabase order migrations and refresh the API schema.",
          503,
        );
      }
      return jsonError("We could not save your order. Please try again later.", 503);
    }

    createdOrder = insertedOrder;
  } else {
    console.error("[orders] Could not persist the verified customer's order.", {
      code: error?.code ?? "invalid_rpc_response",
    });
    return jsonError("We could not save your order. Please try again later.", 503);
  }

  return Response.json(
    {
      success: true,
      message: "Your order has been received.",
      order: {
        id: createdOrder.order_number,
        orderId: createdOrder.id,
        total: totals.total,
        currency: "INR",
        payment: { status: "pending", provider: null },
      },
    },
    { status: 201 },
  );
}
