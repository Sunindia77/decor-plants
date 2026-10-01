"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import siteContent from "@/src/content/siteContent.json";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { header, site } = siteContent;

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg">
        <div className="container">

          {/* Logo */}
          <Link className="navbar-brand brand-logo" href="/">
            <Image
              className="brand-logo-image"
              src="/images/garden/logo-decor-plants.png"
              width={2048}
              height={768}
              priority
              alt={`${site.name}, ${site.tagline}`}
            />
          </Link>

          {/* Mobile button */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="bi bi-list"></i>
          </button>

          {/* Navigation */}
          <div className={`navbar-collapse ${menuOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
              {header.nav.map((item) => (
                <li className="nav-item" key={item.label}>
                  <Link className="nav-link" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link href="/#contact" className="btn quote-btn">
              {header.ctaButton} <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}