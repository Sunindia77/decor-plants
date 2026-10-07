"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { formatINR } from "@/lib/commerce";
import { useCart } from "@/context/CartContext";

export default function ProductPurchasePanel({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addToCart } = useCart();
  const unavailable = product.stock === 0;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  function buyNow(): void {
    if (unavailable) return;
    addToCart(product.id, quantity);
    router.push("/checkout");
  }

  return (
    <div className="shop-detail-buybox">
      <div className="shop-detail-prices">
        <strong>{formatINR(product.price)}</strong>
        {product.originalPrice && <del>{formatINR(product.originalPrice)}</del>}
        {discount > 0 && <span>Save {discount}%</span>}
      </div>
      <div className={`shop-stock-status shop-detail-stock${unavailable ? " is-out" : ""}`}>
        <span aria-hidden="true" /> {unavailable ? "Currently unavailable" : `In stock · ${product.stock} available`}
      </div>
      <div className="shop-detail-quantity-row">
        <span>Quantity</span>
        <div className="shop-quantity-control">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || unavailable}
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            <i className="bi bi-dash" aria-hidden="true" />
          </button>
          <span aria-live="polite">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= product.stock}
            onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
          >
            <i className="bi bi-plus" aria-hidden="true" />
          </button>
        </div>
      </div>
      <button
        className="shop-detail-add-button"
        type="button"
        disabled={unavailable}
        onClick={() => addToCart(product.id, quantity)}
      >
        <i className="bi bi-bag-plus" aria-hidden="true" />
        {unavailable ? "Out of stock" : "Add to cart"}
      </button>
      <button className="shop-detail-buy-button" type="button" disabled={unavailable} onClick={buyNow}>
        Buy now
      </button>
      <p className="shop-payment-note">
        <i className="bi bi-shield-check" aria-hidden="true" /> Secure checkout · Payment options coming soon
      </p>
      <Link className="shop-continue-link" href="/shop">
        <i className="bi bi-arrow-left" aria-hidden="true" /> Continue shopping
      </Link>
    </div>
  );
}
