"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navigation = [
  { label: "Home", href: "/#home" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop#categories" },
  { label: "Plant Care", href: "/services/garden-maintenance" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { itemCount } = useCart();
  const { ids } = useWishlist();

  return (
    <header className="site-header shop-site-header">
      <nav className="shop-navbar" aria-label="Main navigation">
        <div className="shop-nav-inner">
          <Link className="shop-brand" href="/" aria-label="Decor-Plants home">
            <Image
              src="/images/garden/logo-decor-plants.png"
              width={2048}
              height={768}
              alt="Decor-Plants"
              priority
            />
          </Link>
          <button
            className="shop-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <i className={`bi ${menuOpen ? "bi-x-lg" : "bi-list"}`} aria-hidden="true" />
          </button>
          <div className={`shop-nav-content${menuOpen ? " is-open" : ""}`}>
            <ul className="shop-nav-links">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="shop-nav-actions">
              <button
                className="shop-nav-icon"
                type="button"
                aria-label={searchOpen ? "Close product search" : "Search products"}
                aria-expanded={searchOpen}
                onClick={() => setSearchOpen((open) => !open)}
              >
                <i className={`bi ${searchOpen ? "bi-x-lg" : "bi-search"}`} aria-hidden="true" />
              </button>
              <Link className="shop-nav-icon shop-nav-count" href="/wishlist" aria-label={`Wishlist, ${ids.length} saved items`}>
                <i className="bi bi-heart" aria-hidden="true" />
                {ids.length > 0 && <span>{ids.length}</span>}
              </Link>
              <Link className="shop-nav-icon shop-nav-count" href="/cart" aria-label={`Cart, ${itemCount} items`}>
                <i className="bi bi-bag" aria-hidden="true" />
                <span>{itemCount}</span>
              </Link>
              <Link className="shop-nav-icon" href="/account" aria-label="Your account">
                <i className="bi bi-person-circle" aria-hidden="true" />
              </Link>
              <Link className="shop-header-cta" href="/#contact">Book a visit</Link>
            </div>
          </div>
        </div>
        {searchOpen && (
          <form className="shop-header-search" action="/shop" role="search">
            <label htmlFor="header-product-search">Search the collection</label>
            <div>
              <i className="bi bi-search" aria-hidden="true" />
              <input
                id="header-product-search"
                type="search"
                name="q"
                placeholder="Search plants, planters, gardening products..."
              />
              <button type="submit">Search</button>
            </div>
          </form>
        )}
      </nav>
    </header>
  );
}
