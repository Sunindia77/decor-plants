"use client";

import Link from "next/link";
import Header from "@/components/Header";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { ids, ready } = useWishlist();
  const savedProducts = products.filter((product) => ids.includes(product.id));

  return (
    <main className="shop-page">
      <Header />
      <section className="shop-wishlist-page">
        <div className="shop-page-heading">
          <span className="shop-eyebrow">A COLLECTION OF MAYBES</span>
          <h1>Your wishlist</h1>
          <p>Keep the plants and little things you love close by.</p>
        </div>
        {!ready ? (
          <div className="shop-loading-state" role="status">Loading your wishlist…</div>
        ) : savedProducts.length ? (
          <ProductGrid products={savedProducts} />
        ) : (
          <div className="shop-cart-empty">
            <i className="bi bi-heart" aria-hidden="true" />
            <h2>Nothing saved for later (yet)</h2>
            <p>Tap the heart on anything that catches your eye and it will show up here.</p>
            <Link className="shop-checkout-button" href="/shop">Explore the shop</Link>
          </div>
        )}
      </section>
    </main>
  );
}
