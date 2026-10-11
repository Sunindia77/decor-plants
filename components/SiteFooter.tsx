import Image from "next/image";
import Link from "next/link";
import siteContent from "@/src/content/siteContent.json";

const whatsappUrl = `https://wa.me/${siteContent.site.whatsappNumber.replace(/\D/g, "")}`;

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
          <div className="site-footer-whatsapp">
            <a
              className="site-footer-qr-link"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Scan or open WhatsApp to chat with Decor-Plants"
            >
              <Image
                src="/images/garden/WhatsApp%20BarCode%20Account2020.png"
                width={160}
                height={160}
                sizes="112px"
                loading="eager"
                alt="WhatsApp QR code for Decor-Plants"
              />
            </a>
            <div>
              <strong>Prefer WhatsApp?</strong>
              <span>Scan the code to start a chat.</span>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <i className="bi bi-whatsapp" aria-hidden="true" /> Message us
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="site-footer-bottom">
        <span>© {new Date().getFullYear()} Decor-Plants. Grown with care in Pune.</span>
        <span>Plants for living, growing and everything in between.</span>
      </div>
    </footer>
  );
}
