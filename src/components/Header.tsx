"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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
              alt="Decor-Plants, transform your space into a living experience"
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

              <li className="nav-item">
                <Link className="nav-link" href="/#home">
                  Home
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/#services">
                  Services
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/#projects">
                  Projects
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/#spaces">
                  Plant Guide
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/#contact">
                  Contact
                </Link>
              </li>

            </ul>

            <Link href="/#contact" className="btn quote-btn">
              Book a Site Visit <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}