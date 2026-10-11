import { createSupabaseServerClient } from "@/lib/supabase/server";

const ORDER_ADMIN_EMAIL = "surajsatav1994@gmial.com";

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
      "id, order_number, created_at, status, payment_status, payment_paid_at, tracking_number, tracking_url, total, items:customer_order_items(id, product_id, product_name, product_image, quantity, unit_price, line_total)",
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

export async function POST() {
  return jsonError("Start checkout through Razorpay to place your order.", 405);
}
