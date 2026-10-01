import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/src/components/Header";
import siteContent from "@/src/content/siteContent.json";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${siteContent.site.name}`,
  description:
    `Read the Terms and Conditions for ${siteContent.site.name} garden maintenance, landscaping, balcony & terrace garden services in Pune.`,
};

export default function TermsAndConditionsPage() {
  const { site, termsAndConditions } = siteContent;

  return (
    <>
      <Header />
      <main className="service-local-content terms-and-conditions">
        <div className="container">
          <Link className="service-back-link" href="/">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to {site.name}
          </Link>

          <span className="section-label">{termsAndConditions.sectionLabel}</span>
          <h1>{termsAndConditions.title}</h1>
          <p>{termsAndConditions.lastUpdated}</p>

          {termsAndConditions.introParagraphs.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}

          {termsAndConditions.sections.map((section, idx) => (
            <div key={idx}>
              <h2>{section.heading}</h2>

              {"paragraphs" in section && section.paragraphs && (
                <>
                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </>
              )}

              {"intro" in section && section.intro && (
                <p>{section.intro}</p>
              )}

              {"list" in section && section.list && (
                <ul>
                  {section.list.map((item, lIdx) => (
                    <li key={lIdx}>{item}</li>
                  ))}
                </ul>
              )}

              {"footer" in section && section.footer && (
                <p>{section.footer}</p>
              )}
            </div>
          ))}

          <ul>
            <li>
              <strong>Business:</strong> {site.name}
            </li>
            <li>
              <strong>Co-Founder:</strong> {site.coFounder}
            </li>
            <li>
              <strong>Phone / WhatsApp:</strong>{" "}
              <a href={`tel:${site.phone}`}>{site.phone}</a>
            </li>
            <li>
              <strong>Location:</strong> {site.location}, India
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
