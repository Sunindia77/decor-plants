import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/src/components/Header";

export const metadata: Metadata = {
  title: "Privacy Policy | Decor-Plants",
  description:
    "Learn how Decor-Plants handles information submitted through its garden service enquiry form and WhatsApp contact options.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="service-local-content privacy-policy">
        <div className="container">
          <Link className="service-back-link" href="/">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to Decor-Plants
          </Link>

          <span className="section-label">LEGAL INFORMATION</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: September 30, 2026</p>
          <p>
            This policy explains how Decor-Plants handles information when you
            visit this website or contact us about garden, plant-care, and
            landscaping services in Pune.
          </p>

          <h2>Information you provide</h2>
          <p>
            If you complete the enquiry form, it may include your name, phone
            number, email address, property type, city, approximate area,
            requested service, and any message you enter. The email field is
            optional. Please avoid including sensitive personal information in
            your enquiry.
          </p>

          <h2>How the enquiry form works</h2>
          <p>
            When you submit the form, this website creates a pre-filled message
            and opens WhatsApp. The details are included in the WhatsApp link;
            you can review them and choose whether to send the message. The
            website does not send the message automatically or store enquiry
            submissions in its own database.
          </p>
          <p>
            Scanning the WhatsApp QR code opens the Decor-Plants WhatsApp
            contact. Scanning it alone does not send your details; information
            is shared when you choose to message us through WhatsApp.
          </p>

          <h2>How we use enquiry information</h2>
          <p>
            If you send us a WhatsApp message, we use the information you choose
            to provide to respond to your enquiry, discuss your project, prepare
            a quotation, and arrange follow-up about the requested service.
          </p>

          <h2>WhatsApp and other providers</h2>
          <p>
            WhatsApp is operated by Meta. When you open WhatsApp or send us a
            message, WhatsApp processes information under its own terms and
            privacy policy. Review the{" "}
            <a
              href="https://www.whatsapp.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp Privacy Policy
            </a>
            .
          </p>
          <p>
            This website loads fonts from Google Fonts. Our hosting provider
            may process routine technical request information, such as IP
            address, browser details, and request time, to deliver and protect
            the website. Those providers handle information under their own
            policies.
          </p>

          <h2>Cookies and analytics</h2>
          <p>
            The current website code does not configure advertising or analytics
            tracking or save enquiry form data in cookies or browser storage.
            Your browser, hosting provider, or third-party services may process
            technical information needed to operate their services.
          </p>

          <h2>Retention and your choices</h2>
          <p>
            The website itself does not retain enquiry submissions. If you send
            us a WhatsApp message, the message may remain in your and our
            WhatsApp chat history. You can choose not to submit the form or send
            a message. To ask us to correct or delete information in a chat we
            control, contact us at{" "}
            <a href="tel:+918788159687">+91-8788159687</a>. WhatsApp controls
            its own records and retention.
          </p>

          <h2>Security</h2>
          <p>
            The form hands off information to WhatsApp rather than storing it on
            this website. No method of internet transmission or electronic
            storage is completely risk-free, so share only details needed for
            your enquiry.
          </p>

          <h2>Changes and contact</h2>
          <p>
            We may update this policy when our website or enquiry process
            changes. The date above indicates when it was last updated. For
            privacy questions, contact Decor-Plants at{" "}
            <a href="tel:+918788159687">+91-8788159687</a>.
          </p>
        </div>
      </main>
    </>
  );
}