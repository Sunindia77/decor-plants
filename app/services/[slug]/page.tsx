import type { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/src/components/Header";
import { services } from "@/src/data/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  return {
    title: service?.seoTitle ?? "Garden Services in Pune | Decor-Plants",
    description: service?.seoDescription,
    keywords: service ? [...service.keywords] : undefined,
    alternates:
      service && process.env.NEXT_PUBLIC_SITE_URL
        ? { canonical: `/services/${service.slug}` }
        : undefined,
    openGraph: service
      ? {
          title: service.seoTitle,
          description: service.seoDescription,
          type: "website",
        }
      : undefined,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const nonce = (await headers()).get("x-nonce") ?? undefined;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.seoHeading,
      serviceType: service.title,
      description: service.seoDescription,
      areaServed: {
        "@type": "City",
        name: "Pune",
        containedInPlace: { "@type": "State", name: "Maharashtra" },
      },
      provider: { "@type": "Organization", name: "Decor-Plants" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  return (
    <main>
      <script
        nonce={nonce}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      <section className="service-detail-hero">
        <div className="container">
          <Link className="service-back-link" href="/#services">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            All services
          </Link>

          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="hero-label">{service.eyebrow}</span>
              <h1>{service.seoHeading}</h1>
              <p className="service-detail-intro">{service.detail}</p>
              <Link className="btn primary-btn" href="/#contact">
                Get a free quote
                <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
              </Link>
            </div>
            <div className="col-lg-6">
              <img
                className="service-detail-image"
                src={service.image}
                alt={`${service.title} garden project`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="service-local-content">
        <div className="container">
          <span className="section-label">LOCAL SERVICE IN PUNE</span>
          <p>{service.localIntro}</p>

          <h2>Frequently asked questions</h2>
          <div className="service-local-faqs">
            {service.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="service-detail-content">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <span className="section-label">MADE FOR YOUR SPACE</span>
              <h2>A considered plan, from the first visit to the finishing touches.</h2>
            </div>
            <div className="col-lg-7">
              <ul className="service-benefits">
                {service.benefits.map((benefit) => (
                  <li key={benefit}>
                    <i className="bi bi-check2" aria-hidden="true"></i>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="service-process">
            <span className="section-label">HOW IT WORKS</span>
            <div className="row g-4 mt-2">
              {service.process.map((step, index) => (
                <div className="col-md-4" key={step}>
                  <article className="service-process-step">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{step}</h3>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="service-detail-cta">
        <div className="container">
          <span className="section-label">LET&apos;S GET STARTED</span>
          <h2>Ready to plan your {service.title.toLowerCase()}?</h2>
          <Link className="btn primary-btn" href="/#contact">
            Talk to our team
            <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
          </Link>
        </div>
      </section>
    </main>
  );
}