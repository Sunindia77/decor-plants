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
const spaceLinks: Record<string, string> = {
  "Home Garden": "/services/garden-design",
  Balcony: "/services/balcony-gardens",
  Terrace: "/services/terrace-gardens",
  Office: "/services/office-plant-maintenance",
  "Vertical Wall": "/services/vertical-gardens",
  "Indoor Plants": "/indoor-plants",
};

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
  title: "Garden Maintenance Services in Pune | Decor-Plants – Free Site Visit",
  description:
    "Decor-Plants provides garden maintenance, balcony gardens, terrace garden design, vertical green walls and office plant care across Pune. 500+ happy clients. Call +91-8788159687 for a FREE site visit.",
  keywords: [
    "garden maintenance services Pune",
    "gardening services Pune",
    "plant maintenance Pune",
    "balcony garden Pune",
    "terrace garden Pune",
    "vertical garden Pune",
    "landscaping Pune",
    "office plant care Pune",
    "indoor plants Pune",
    "garden design Pune",
    "Baner garden maintenance",
    "Wakad gardening services",
    "Hinjewadi office plants",
    "garden care Pune",
    "Decor Plants Pune",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Garden Maintenance Services in Pune | Decor-Plants",
    description:
      "Professional garden care for homes, balconies, terraces and offices in Pune. 500+ clients served. Free site visit available.",
    type: "website",
    url: "/",
    images: [
      {
        url: "/images/garden/Luxury%20Terrace%20Garden.png",
        width: 1200,
        height: 630,
        alt: "Luxury Terrace Garden transformed by Decor-Plants, Pune",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Garden Maintenance Services in Pune | Decor-Plants",
    description:
      "Professional garden care for homes, balconies, terraces and offices in Pune. Free site visit.",
    images: ["/images/garden/Luxury%20Terrace%20Garden.png"],
  },
};

export default async function Home() {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const { hero, spaces, servicesSection, projectsSection, cta, footer, site } = siteContent;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.decor-plants.com/#business",
    name: "Decor-Plants",
    alternateName: "Decor Plants",
    description:
      "Garden maintenance, balcony gardens, terrace garden design, vertical green walls, indoor plants and office plant care services in Pune, Maharashtra.",
    url: "https://www.decor-plants.com",
    telephone: "+91-8788159687",
    email: "info@decor-plants.com",
    foundingDate: "2020",
    priceRange: "₹₹",
    image: "https://www.decor-plants.com/images/garden/logo-decor-plants.png",
    logo: "https://www.decor-plants.com/images/garden/logo-decor-plants.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "City", name: "Pune" },
      { "@type": "Place", name: "Baner, Pune" },
      { "@type": "Place", name: "Wakad, Pune" },
      { "@type": "Place", name: "Hinjewadi, Pune" },
      { "@type": "Place", name: "Kothrud, Pune" },
      { "@type": "Place", name: "Aundh, Pune" },
      { "@type": "Place", name: "Viman Nagar, Pune" },
    ],
    sameAs: [
      "https://www.instagram.com/decorplants_/",
      "https://www.facebook.com/DecorPlants7/",
      "https://www.linkedin.com/company/decorplants/",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Garden & Plant Care Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garden Maintenance", areaServed: "Pune" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Balcony Garden Design", areaServed: "Pune" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Terrace Garden Design", areaServed: "Pune" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Vertical Garden Installation", areaServed: "Pune" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Office Plant Care", areaServed: "Pune" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Indoor Plant Styling", areaServed: "Pune" } },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Rahul Mehta" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "The entire experience was excellent. They transformed our empty balcony into a beautiful green space that our family absolutely loves.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Sneha Kulkarni" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "Very professional team from design to installation. They understood exactly what we wanted for our terrace and delivered beautifully.",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Amit Shah" },
        reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
        reviewBody: "We wanted greenery for our office reception and the result looks fantastic. The maintenance service has also been very reliable.",
      },
    ],
    knowsAbout: [
      "Garden Maintenance",
      "Balcony Garden Design",
      "Terrace Garden Design",
      "Vertical Garden Installation",
      "Office Plant Care",
      "Indoor Plant Styling",
      "Landscaping",
      "Plant Care",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a garden design cost in Pune?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The cost depends on the space size, type of garden, plants, planters, materials and level of customization. You can request a free consultation for an accurate quotation from Decor-Plants in Pune.",
        },
      },
      {
        "@type": "Question",
        name: "Do you provide garden maintenance services in Pune?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Decor-Plants offers regular maintenance visits and annual plans tailored to your garden in Pune, including pruning, plant health checks and seasonal care.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer a free consultation or site visit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer a free initial consultation and site visit to understand your space, goals and budget before recommending the next steps. Call +91-8788159687 to book.",
        },
      },
      {
        "@type": "Question",
        name: "Which areas in Pune do you serve?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Decor-Plants serves all areas of Pune including Baner, Wakad, Hinjewadi, Kothrud, Aundh, Viman Nagar, and surrounding localities.",
        },
      },
      {
        "@type": "Question",
        name: "Can you create gardens for small balconies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. We design for compact balconies, patios and corners with space-smart layouts, vertical planting and carefully chosen containers.",
        },
      },
    ],
  };

  return (
    <main>
      {/* LocalBusiness schema — triggers Google Business Panel signals */}
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      {/* FAQPage schema — renders expandable Q&A rich results in Google */}
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
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

                  <a href={spaceLinks[title] ?? "/plants"}>
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
