"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/types/product";
import { formatINR } from "@/lib/commerce";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const outOfStock = product.stock === 0;
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const liked = isWishlisted(product.id);

  function addProduct(): void {
    addToCart(product.id, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  function buyProduct(): void {
    if (outOfStock) return;
    addToCart(product.id, quantity);
    router.push("/checkout");
  }

  return (
    <article className="shop-product-card">
      <div className="shop-product-image-wrap">
        <Link className="shop-product-image-link" href={`/shop/${product.slug}`} aria-label={`View ${product.name}`}>
          <Image
            className="shop-product-image"
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 575px) 46vw, (max-width: 991px) 30vw, (max-width: 1199px) 45vw, 23vw"
          />
        </Link>
        {product.badge && <span className="shop-product-badge">{product.badge}</span>}
        {discount > 0 && <span className="shop-discount-badge">-{discount}%</span>}
        <button
          className={`shop-wishlist-button${liked ? " is-active" : ""}`}
          type="button"
          aria-label={liked ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={liked}
          onClick={() => toggleWishlist(product.id)}
        >
          <i className={`bi ${liked ? "bi-heart-fill" : "bi-heart"}`} aria-hidden="true" />
        </button>
        <Link className="shop-quick-view" href={`/shop/${product.slug}`}>
          View details <i className="bi bi-arrow-up-right" aria-hidden="true" />
        </Link>
      </div>
      <div className="shop-product-content">
        <div className="shop-product-category">{product.subcategory}</div>
        <Link className="shop-product-name" href={`/shop/${product.slug}`}>
          {product.name}
        </Link>
        <p className="shop-product-description">{product.description}</p>
        {product.reviewCount > 0 ? (
          <div className="shop-product-rating" aria-label={`${product.rating} out of 5 stars, ${product.reviewCount} reviews`}>
            <span aria-hidden="true">★</span> {product.rating.toFixed(1)} <span className="shop-review-count">({product.reviewCount})</span>
          </div>
        ) : (
          <div className="shop-product-rating shop-no-reviews">New to our shop</div>
        )}
        <div className="shop-product-price">
          <strong>{formatINR(product.price)}</strong>
          {product.originalPrice && <del>{formatINR(product.originalPrice)}</del>}
        </div>
        <div className={`shop-stock-status${outOfStock ? " is-out" : ""}`}>
          <span aria-hidden="true" /> {outOfStock ? "Currently unavailable" : `${product.stock} in stock`}
        </div>
        <div className="shop-card-quantity">
          <span>Quantity</span>
          <div className="shop-quantity-control" aria-label={`Quantity for ${product.name}`}>
            <button
              type="button"
              aria-label={`Decrease ${product.name} quantity`}
              disabled={quantity <= 1 || outOfStock}
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            >
              <i className="bi bi-dash" aria-hidden="true" />
            </button>
            <span aria-live="polite">{quantity}</span>
            <button
              type="button"
              aria-label={`Increase ${product.name} quantity`}
              disabled={quantity >= product.stock}
              onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
            >
              <i className="bi bi-plus" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="shop-product-actions">
          <button className="shop-add-button" type="button" disabled={outOfStock} onClick={addProduct}>
            {outOfStock ? "Out of stock" : added ? "Added to cart" : "Add to cart"}
          </button>
          <button className="shop-buy-button" type="button" disabled={outOfStock} onClick={buyProduct}>
            Buy now
          </button>
        </div>
      </div>
    </article>
  );
}
