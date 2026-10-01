import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/src/components/Header";
import siteContent from "@/src/content/siteContent.json";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteContent.site.name}`,
  description:
    `Learn how ${siteContent.site.name} handles information submitted through its garden service enquiry form and WhatsApp contact options.`,
};

export default function PrivacyPolicyPage() {
  const { site, privacyPolicy } = siteContent;

  return (
    <>
      <Header />
      <main className="service-local-content privacy-policy">
        <div className="container">
          <Link className="service-back-link" href="/">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to {site.name}
          </Link>

          <span className="section-label">{privacyPolicy.sectionLabel}</span>
          <h1>{privacyPolicy.title}</h1>
          <p>{privacyPolicy.lastUpdated}</p>
          <p>{privacyPolicy.intro}</p>

          {privacyPolicy.sections.map((section, idx) => (
            <div key={idx}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
              {"links" in section && section.links && (
                <p>
                  {section.links.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.text}
                    </a>
                  ))}
                </p>
              )}
            </div>
          ))}

          <p>
            For privacy questions, contact {site.name} at{" "}
            <a href={`tel:${site.phone}`}>{site.phone}</a>.
          </p>
        </div>
      </main>
    </>
  );
}