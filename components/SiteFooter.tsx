import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { label: "Shop all", href: "/shop" },
  { label: "Plant care", href: "/services/garden-maintenance" },
  { label: "About Decor-Plants", href: "/#about" },
  { label: "My account", href: "/account" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms-and-conditions" },
];

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer-main">
        <div className="site-footer-brand">
          <Link href="/" aria-label="Decor-Plants home">
            <Image
              src="/images/garden/logo-decor-plants.png"
              width={2048}
              height={768}
              alt="Decor-Plants"
            />
          </Link>
          <p>Thoughtful plants and garden care for the spaces where life happens.</p>
          <a href="mailto:info@decor-plants.com">info@decor-plants.com</a>
          <a href="tel:+918788159687">+91 87881 59687</a>
        </div>
        <div className="site-footer-links">
          <h2>Explore</h2>
          {footerLinks.map((link) => (
            <Link href={link.href} key={link.label}>{link.label}</Link>
          ))}
        </div>
        <div className="site-footer-note">
          <span className="storefront-kicker">A note from our plant people</span>
          <p>Not sure where to start? Tell us about your light, space and routine — we’ll help you find a fit.</p>
          <Link className="site-footer-contact" href="/services/garden-design">
            Let’s talk plants <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Decor-Plants. Grown with care in Pune.</span>
        <span>Plants for living, growing and everything in between.</span>
      </div>
    </footer>
  );
}
