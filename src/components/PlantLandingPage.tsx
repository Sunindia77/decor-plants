import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Header from "@/src/components/Header";
import { getPlantLandingPath, type PlantLandingPage as PlantLandingPageContent } from "@/src/data/plantLandingPages";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.decor-plants.com").replace(/\/$/, "");

export function getPlantLandingMetadata(content: PlantLandingPageContent): Metadata {
  const pagePath = `/${getPlantLandingPath(content)}`;
  const pageUrl = `${SITE_URL}${pagePath}`;

  return {
    title: content.seoTitle,
    description: content.description,
    keywords: [...content.keywords],
    alternates: { canonical: pagePath },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: content.seoTitle,
      description: content.description,
      images: [{ url: content.image, width: 1200, height: 630, alt: `${content.title} by Decor-Plants` }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.seoTitle,
      description: content.description,
      images: [content.image],
    },
  };
}

export default async function PlantLandingPage({ content }: { content: PlantLandingPageContent }) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const pagePath = `/${getPlantLandingPath(content)}`;
  const pageUrl = `${SITE_URL}${pagePath}`;
  const parentLink = "parent" in content
    ? content.parent
    : content.type === "category"
      ? { label: "Plants", href: "/plants" }
      : undefined;
  const breadcrumbItems = [
    { name: "Home", item: SITE_URL, href: "/" },
    ...(parentLink
      ? [{ name: parentLink.label, item: `${SITE_URL}${parentLink.href}`, href: parentLink.href }]
      : []),
    { name: content.title, item: pageUrl, href: pagePath },
  ];
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": content.type === "local" ? "WebPage" : "CollectionPage",
      name: content.title,
      description: content.description,
      url: pageUrl,
      isPartOf: { "@type": "WebSite", name: "Decor-Plants", url: SITE_URL },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: content.links.map((link, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: link.label,
          url: link.href.startsWith("/") ? `${SITE_URL}${link.href}` : link.href,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.item,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main className="plant-landing">
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <section className="plant-landing-hero">
        <div className="container">
          <nav className="plant-landing-breadcrumbs" aria-label="Breadcrumb">
            {breadcrumbItems.map((item, index) => (
              <span key={item.item}>
                {index > 0 && <i className="bi bi-chevron-right" aria-hidden="true" />}
                {index < breadcrumbItems.length - 1 ? (
                  <Link href={item.href}>{item.name}</Link>
                ) : (
                  <span aria-current="page">{item.name}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="plant-landing-hero-grid">
            <div className="plant-landing-copy">
              <span className="section-label">{content.eyebrow}</span>
              <h1>{content.title}</h1>
              <p>{content.intro}</p>
              <Link className="btn primary-btn" href="/#contact">
                Request a consultation
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            </div>
            <div className="plant-landing-image-wrap">
              <Image
                src={content.image}
                alt="A designed garden space by Decor-Plants in Pune"
                width={1000}
                height={720}
                loading="eager"
                fetchPriority="high"
                sizes="(max-width: 767px) 100vw, (max-width: 1100px) 45vw, 520px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="plant-landing-details">
        <div className="container">
          <div className="plant-landing-section-heading">
            <span className="section-label">A PRACTICAL STARTING POINT</span>
            <h2>{content.type === "local" ? "Plan a garden around your place" : "Choose plants around their growing conditions"}</h2>
          </div>
          <div className="plant-landing-articles">
            {content.sections.map((section) => (
              <article key={section.heading}>
                <h3>{section.heading}</h3>
                <p>{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="plant-landing-planning">
        <div className="container plant-landing-planning-grid">
          <div>
            <span className="section-label">BEFORE YOU CHOOSE</span>
            <h2>{content.type === "local" ? "Help us understand your project" : "A few details make recommendations more useful"}</h2>
          </div>
          <ul>
            {content.planningPoints.map((point) => (
              <li key={point}>
                <i className="bi bi-check2" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="plant-landing-links">
        <div className="container">
          <div className="plant-landing-section-heading">
            <span className="section-label">KEEP EXPLORING</span>
            <h2>{content.type === "hub" ? "Plant guides and garden services" : "Related guidance and services"}</h2>
          </div>
          <div className="plant-landing-link-list">
            {content.links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="plant-landing-faq">
        <div className="container">
          <div className="plant-landing-section-heading">
            <span className="section-label">COMMON QUESTIONS</span>
            <h2>Good to know</h2>
          </div>
          <div className="plant-landing-faq-list">
            {content.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="plant-landing-cta">
        <div className="container">
          <span className="section-label">DECOR-PLANTS · PUNE</span>
          <h2>Tell us about the space you want to make greener.</h2>
          <p>Share your location, light conditions and goals. We’ll confirm service availability and discuss a useful next step.</p>
          <Link className="btn primary-btn" href="/#contact">
            Talk to our team
            <i className="bi bi-arrow-up-right" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
