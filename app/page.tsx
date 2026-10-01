import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import BeforeAfter from "@/src/components/BeforeAfter";
import Header from "@/src/components/Header";
import QuoteForm from "@/src/components/QuoteForm";
import TestimonialsFAQ from "@/src/components/TestimonialsFAQ";
import WhyChooseUs from "@/src/components/WhyChooseUs";
import siteContent from "@/src/content/siteContent.json";
import { services } from "@/src/data/services";

const spaceChoices = siteContent.spaces.items;

const serviceIcons = [
  "bi-flower1",
  "bi-tree",
  "bi-droplet",
  "bi-bricks",
  "bi-bricks",
  "bi-scissors",
  "bi-building",
  "bi-tree",
  "bi-heart-pulse",
  "bi-stars",
];

export const metadata: Metadata = {
  title: "Garden Maintenance Services in Pune | Decor-Plants",
  description:
    "Garden maintenance services in Pune for homes and workspaces. Explore gardening services, plant maintenance, balcony and terrace gardens with Decor-Plants.",
  keywords: [
    "garden maintenance services Pune",
    "gardening services Pune",
    "plant maintenance services Pune",
  ],
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/" } : undefined,
  openGraph: {
    title: "Garden Maintenance Services in Pune | Decor-Plants",
    description:
      "Garden care, plant maintenance and thoughtful garden design for homes and workspaces in Pune.",
    type: "website",
  },
};

export default async function Home() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const { hero, spaces, servicesSection, projectsSection, cta, footer, site } = siteContent;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    description:
      "Garden maintenance, gardening, plant care, landscaping and garden design services in Pune.",
    areaServed: { "@type": "City", name: "Pune" },
    knowsAbout: [
      "Garden maintenance",
      "Balcony gardens",
      "Terrace garden design",
      "Vertical garden installation",
      "Office plant maintenance",
      "Landscaping",
      "Plant care",
    ],
  };

  return (
    <main>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-copy">
              <span className="hero-label">
                {hero.eyebrow}
              </span>

              <h1>
                {hero.titleLine1}
                <span>{hero.titleLine2}<em>{hero.titleHighlight}</em></span>
              </h1>

              <p className="hero-description">
                {hero.description}
              </p>

              <div className="hero-buttons">
                <a href="#contact" className="btn primary-btn">
                  {hero.primaryCta}
                  <i className="bi bi-arrow-up-right"></i>
                </a>

                <a href="#projects" className="btn secondary-btn">
                  <i className="bi bi-play-circle-fill" aria-hidden="true"></i>
                  {hero.secondaryCta}
                </a>
              </div>

              <div className="hero-stats">
                {hero.stats.map((stat, idx) => (
                  <div key={idx}>
                    <strong>{stat.number}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-note">
              <span className="hero-note-mark">✳</span>
              <span>Thoughtful<br />green living</span>
            </div>
          </div>
        </div>
        <a className="hero-feature hero-qr-feature" href="#quote">
          <Image
            src="/images/garden/WhatsApp%20BarCode%20Account2020.png"
            width={160}
            height={160}
            priority
            sizes="160px"
            alt={`${site.name} WhatsApp Business QR Code`}
          />
          <span><strong>{hero.qrFeature.title}</strong><small>{hero.qrFeature.subtitle}</small></span>
          <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
        </a>
        <a className="hero-scroll" href="#spaces" aria-label="Scroll to explore">
          <i className="bi bi-chevron-down" aria-hidden="true"></i>
        </a>
      </section>

      {/* CHOOSE YOUR SPACE */}
      <section id="spaces" className="space-section">
        <div className="container">
          <div className="section-heading text-center">
            <span>{spaces.eyebrow}</span>

            <h2>
              {spaces.title}
            </h2>
          </div>

          <div className="row g-4 mt-4">
            {spaceChoices.map(({ title, description, image }) => (
              <div className="col-md-6 col-lg-4" key={title}>
                <div className="space-card">
                  <div className="space-card-image">
                    <Image
                      src={image}
                      alt={title}
                      width={600}
                      height={400}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <span className="space-icon"><i className="bi bi-leaf-fill" aria-hidden="true"></i></span>
                  </div>
                  <h3>{title}</h3>

                  <p>{description}</p>

                  <a href="#services">
                    <span className="visually-hidden">Explore {title}</span>
                    <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-7">
              <span className="section-label">{servicesSection.eyebrow}</span>

              <h2>
                {servicesSection.title}
              </h2>
            </div>

            <div className="col-lg-5">
              <p>
                {servicesSection.description}
              </p>
              <a href="#services" className="project-link service-overview-link">
                {servicesSection.ctaText} <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="row g-4 mt-4">
            {services.map((service, index) => (
              <div className="col-md-6 col-lg-4" key={service.slug}>
                <div className="service-card">
                  <Image
                    className="service-card-art"
                    src={service.image}
                    alt=""
                    aria-hidden="true"
                    width={600}
                    height={400}
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="service-card-copy">
                    <div className="service-icon"><i className={`bi ${serviceIcons[index] ?? "bi-flower1"}`} aria-hidden="true"></i></div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  <a href={`/services/${service.slug}`}>
                    Learn More
                    <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                  </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="projects-header">
            <div>
              <span className="section-label">{projectsSection.eyebrow}</span>

              <h2>
                {projectsSection.title}
              </h2>
            </div>

            <div>
              <p>
                {projectsSection.description}
              </p>

              <a href="#" className="project-link">
                {projectsSection.ctaText}
                <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>
          </div>

          <div className="projects-grid mt-4">
            {projectsSection.items.map((project, idx) => (
              <div key={idx}>
                <div className={`project-card ${project.large ? "project-large" : ""}`}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={project.large ? 900 : 600}
                    height={project.large ? 600 : 500}
                    priority={project.priority}
                    loading={project.priority ? undefined : "lazy"}
                    sizes={project.large ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                  />

                  <div className="project-overlay">
                    <div>
                      <span>{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.location}</p>
                    </div>
                    <div className="project-arrow">
                      <i className="bi bi-arrow-up-right"></i>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <BeforeAfter />
      
      <WhyChooseUs />

      <TestimonialsFAQ />

      {/* QUOTE FORM */}
      <QuoteForm />

      {/* CTA */}
      <section id="contact" className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>
              {cta.title}
            </h2>

            <p>
              {cta.description}
            </p>

            <a href={cta.buttonHref} className="btn primary-btn">
              {cta.buttonText}
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand-block">
              <a className="brand-logo" href="#home">
                <Image
                  className="brand-logo-image"
                  src="/images/garden/logo-decor-plants.png"
                  width={240}
                  height={90}
                  loading="lazy"
                  sizes="240px"
                  alt={`${site.name}, ${site.tagline}`}
                />
              </a>
              <p>{footer.description}</p>
              <p className="footer-founder">
                {footer.founderLabel}: {site.coFounder}<br />
                {footer.phoneLabel}: <a href={`tel:${site.phone}`}>{site.phone}</a>
              </p>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
              {footer.links.map((link) => (
                <a key={link.label} href={link.href}>{link.label}</a>
              ))}
            </nav>

            <div className="footer-socials" aria-label="Social media">
              <a href={site.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="bi bi-instagram" aria-hidden="true" /></a>
              <a href={site.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="bi bi-facebook" aria-hidden="true" /></a>
              <a href={site.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="bi bi-linkedin" aria-hidden="true" /></a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>{site.copyright}</span>
            <div>
              {footer.legalLinks.map((legal) => (
                <a key={legal.label} href={legal.href}>{legal.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
