import { products } from "@/data/products";
import { getCartLines, getCartTotals } from "@/lib/commerce";
import type { CartItem } from "@/types/product";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.trim().length <= maxLength;
}

function isValidEmail(value: string): boolean {
  const email = value.trim();
  const atIndex = email.indexOf("@");
  const domainDotIndex = email.lastIndexOf(".");

  if (
    atIndex <= 0 ||
    atIndex !== email.lastIndexOf("@") ||
    domainDotIndex <= atIndex + 1 ||
    domainDotIndex >= email.length - 1
  ) {
    return false;
  }

  for (const character of email) {
    if (character.trim().length === 0) return false;
  }

  return true;
}

function parseOrderItems(value: unknown): CartItem[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > products.length) return null;

  const quantities = new Map<string, number>();
  for (const entry of value) {
    if (!isRecord(entry)) return null;
    const productId = typeof entry.productId === "string" ? entry.productId : entry.id;
    if (typeof productId !== "string" || !Number.isInteger(entry.quantity) || typeof entry.quantity !== "number" || entry.quantity < 1) {
      return null;
    }
    const product = products.find((item) => item.id === productId);
    if (!product || product.stock === 0) return null;
    quantities.set(productId, (quantities.get(productId) ?? 0) + entry.quantity);
  }

  const items = [...quantities].map(([productId, quantity]) => ({ productId, quantity }));
  return items.every((item) => item.quantity <= (products.find((product) => product.id === item.productId)?.stock ?? 0))
    ? items
    : null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, error: "Request body must contain valid JSON." }, { status: 400 });
  }

  if (!isRecord(body) || !isRecord(body.customer) || !isRecord(body.address)) {
    return Response.json({ success: false, error: "Customer and delivery address details are required." }, { status: 400 });
  }

  const customer = body.customer;
  const address = body.address;
  if (
    !requiredString(customer.name, 100) ||
    !requiredString(customer.email, 254) ||
    !isValidEmail(customer.email) ||
    !requiredString(customer.phone, 20) ||
    !/^(?:\+91[\s-]?)?[6-9]\d{9}$/.test(customer.phone.trim())
  ) {
    return Response.json({ success: false, error: "Please provide a valid name, email and Indian mobile number." }, { status: 400 });
  }

  if (
    !requiredString(address.address, 300) ||
    !requiredString(address.city, 80) ||
    !requiredString(address.state, 80) ||
    typeof address.pincode !== "string" ||
    !/^\d{6}$/.test(address.pincode)
  ) {
    return Response.json({ success: false, error: "Please provide a complete delivery address and valid 6-digit pincode." }, { status: 400 });
  }

  const items = parseOrderItems(body.items);
  if (!items) {
    return Response.json({ success: false, error: "Your cart contains an invalid product or unavailable quantity." }, { status: 400 });
  }

  if (typeof body.total !== "number" || !Number.isFinite(body.total) || body.total < 0) {
    return Response.json({ success: false, error: "The order total must be a valid amount." }, { status: 400 });
  }

  const totals = getCartTotals(getCartLines(items));

  return Response.json(
    {
      success: true,
      message: "Your order has been received.",
      order: {
        id: `DP-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
        items,
        total: totals.total,
        currency: "INR",
        payment: { status: "not_required", provider: null },
      },
    },
    { status: 201 },
  );
}
