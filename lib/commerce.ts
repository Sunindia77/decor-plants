import { products } from "@/data/products";
import type { CartItem, Product } from "@/types/product";

export interface CartLine extends CartItem {
  product: Product;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  delivery: number;
  total: number;
}

export function formatINR(amount: number): string {
  return `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount)}`;
}

export function getCartLines(items: CartItem[]): CartLine[] {
  return items.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product && item.quantity > 0 ? [{ ...item, product }] : [];
  });
}

export function getCartTotals(lines: CartLine[]): CartTotals {
  const subtotal = lines.reduce(
    (sum, line) => sum + (line.product.originalPrice ?? line.product.price) * line.quantity,
    0,
  );
  const discount = lines.reduce(
    (sum, line) => sum + ((line.product.originalPrice ?? line.product.price) - line.product.price) * line.quantity,
    0,
  );
  const delivery = subtotal - discount === 0 || subtotal - discount >= 1500 ? 0 : 79;

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}
