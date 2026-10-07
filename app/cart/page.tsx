"use client";

import Link from "next/link";
import Header from "@/components/Header";
import CartItemRow from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/context/CartContext";
import { getCartLines, getCartTotals } from "@/lib/commerce";

export default function CartPage() {
  const { items, ready } = useCart();
  const lines = getCartLines(items);

  return (
    <main className="shop-page">
      <Header />
      <section className="shop-cart-page">
        <div className="shop-page-heading">
          <span className="shop-eyebrow">YOUR LITTLE GREEN CORNER</span>
          <h1>Your bag</h1>
          <p>A lovely start to something growing.</p>
        </div>
        {!ready ? (
          <div className="shop-loading-state" role="status">Loading your bag…</div>
        ) : lines.length === 0 ? (
          <div className="shop-cart-empty">
            <i className="bi bi-bag" aria-hidden="true" />
            <h2>Your bag is taking a little breather</h2>
            <p>Find a plant or planter that feels right and it will be waiting here.</p>
            <Link className="shop-checkout-button" href="/shop">Browse the collection</Link>
          </div>
        ) : (
          <div className="shop-cart-layout">
            <div className="shop-cart-list">
              {lines.map((line) => <CartItemRow key={line.productId} line={line} />)}
              <Link className="shop-continue-link" href="/shop">
                <i className="bi bi-arrow-left" aria-hidden="true" /> Keep exploring
              </Link>
            </div>
            <CartSummary totals={getCartTotals(lines)} />
          </div>
        )}
      </section>
    </main>
  );
}
