"use client";

import Image from "next/image";
import Link from "next/link";
import type { CartLine } from "@/lib/commerce";
import { formatINR } from "@/lib/commerce";
import { useCart } from "@/context/CartContext";

export default function CartItemRow({ line }: { line: CartLine }) {
  const { setQuantity, removeFromCart } = useCart();

  return (
    <article className="shop-cart-item">
      <Link className="shop-cart-item-image" href={`/shop/${line.product.slug}`} aria-label={`View ${line.product.name}`}>
        <Image src={line.product.image} alt={line.product.name} fill sizes="120px" />
      </Link>
      <div className="shop-cart-item-main">
        <span className="shop-product-category">{line.product.category} · {line.product.subcategory}</span>
        <Link className="shop-cart-item-name" href={`/shop/${line.product.slug}`}>{line.product.name}</Link>
        <span className="shop-cart-unit-price">{formatINR(line.product.price)} each</span>
        <div className="shop-cart-item-controls">
          <div className="shop-quantity-control" aria-label={`Quantity for ${line.product.name}`}>
            <button
              type="button"
              aria-label={`Decrease ${line.product.name} quantity`}
              onClick={() => setQuantity(line.productId, line.quantity - 1)}
            >
              <i className="bi bi-dash" aria-hidden="true" />
            </button>
            <span aria-live="polite">{line.quantity}</span>
            <button
              type="button"
              aria-label={`Increase ${line.product.name} quantity`}
              disabled={line.quantity >= line.product.stock}
              onClick={() => setQuantity(line.productId, line.quantity + 1)}
            >
              <i className="bi bi-plus" aria-hidden="true" />
            </button>
          </div>
          <button
            className="shop-remove-item"
            type="button"
            onClick={() => removeFromCart(line.productId)}
          >
            <i className="bi bi-trash3" aria-hidden="true" /> Remove
          </button>
        </div>
      </div>
      <strong className="shop-cart-item-subtotal">{formatINR(line.product.price * line.quantity)}</strong>
    </article>
  );
}
