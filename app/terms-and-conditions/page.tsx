import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/src/components/Header";

export const metadata: Metadata = {
  title: "Terms & Conditions | Decor-Plants",
  description:
    "Read the Terms and Conditions for Decor-Plants garden maintenance, landscaping, balcony & terrace garden services in Pune.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="service-local-content terms-and-conditions">
        <div className="container">
          <Link className="service-back-link" href="/">
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
            Back to Decor-Plants
          </Link>

          <span className="section-label">LEGAL INFORMATION</span>
          <h1>Terms &amp; Conditions</h1>
          <p>Last updated: October 1, 2026</p>
          <p>
            Welcome to Decor-Plants. These Terms and Conditions (&quot;Terms&quot;)
            govern your access to and use of our website, as well as the garden
            maintenance, landscaping, balcony and terrace garden design, and
            plant-care services provided by Decor-Plants in Pune, Maharashtra.
          </p>
          <p>
            By accessing our website, submitting an enquiry, or booking our
            services, you acknowledge that you have read, understood, and agreed
            to be bound by these Terms. If you do not agree, please do not use
            our website or engage our services.
          </p>

          <h2>1. Services &amp; Scope of Work</h2>
          <p>
            Decor-Plants provides residential and commercial gardening services,
            including but not limited to:
          </p>
          <ul>
            <li>Routine garden and lawn maintenance</li>
            <li>Balcony and terrace garden design and setup</li>
            <li>Indoor and outdoor plant care and procurement</li>
            <li>Vertical green wall installations</li>
            <li>Pruning, trimming, and shaping</li>
            <li>Soil conditioning, fertilization, and organic pest management</li>
            <li>Garden rejuvenation and soft landscaping</li>
          </ul>
          <p>
            The specific scope of work, deliverables, schedules, and costs for any
            project will be outlined in a formal quotation, project estimate, or
            service agreement provided to the client.
          </p>

          <h2>2. Consultations, Site Visits &amp; Quotations</h2>
          <p>
            Initial estimates provided online or through WhatsApp are approximate
            and based solely on information and photos provided by the client. An
            on-site inspection may be required to evaluate sunlight exposure,
            drainage, site accessibility, and exact dimensions.
          </p>
          <p>
            Written quotations are valid for 15 calendar days from the date of
            issuance unless otherwise stated. Any modifications to project scope,
            plant varieties, or materials requested by the client after approval
            may result in adjusted pricing and delivery timelines.
          </p>

          <h2>3. Client Responsibilities &amp; Site Access</h2>
          <p>
            To ensure the timely and safe completion of work, the client agrees
            to:
          </p>
          <ul>
            <li>
              Provide safe and unobstructed access to the work area (gardens,
              balconies, terraces, courtyards, or office spaces) during agreed
              working hours.
            </li>
            <li>
              Provide adequate water supply and electrical access necessary for
              plant care, irrigation, and installation equipment without charge.
            </li>
            <li>
              Secure all required permissions, approvals, or No Objection
              Certificates (NOC) from housing society committees, building
              managements, or landlords regarding weight restrictions, drilling,
              or material movement.
            </li>
            <li>
              Notify our team in advance of any concealed water pipes, electrical
              cables, fragile waterproof membranes, or hazardous site conditions.
            </li>
          </ul>

          <h2>4. Living Goods &amp; Plant Care Disclaimer</h2>
          <p>
            Plants, shrubs, turf, and trees are living biological organisms.
            Their health, growth, and survival depend significantly on ambient
            environmental factors such as adequate natural light, watering
            frequency, drainage, temperature, humidity, and ongoing care.
          </p>
          <p>
            Decor-Plants guarantees that all plants supplied are healthy, viable,
            and free from pests and diseases at the time of delivery and installation.
          </p>
          <p>
            Following handover, Decor-Plants cannot be held responsible for plant
            deterioration or loss caused by:
          </p>
          <ul>
            <li>Over-watering, under-watering, or irregular watering by the client</li>
            <li>Inadequate natural sunlight or extreme indoor air-conditioning</li>
            <li>
              Severe weather events, including heavy monsoon waterlogging, hail,
              or heatwaves
            </li>
            <li>Infestations, fungal disease, or pet and rodent damage</li>
            <li>Use of unauthorized chemical fertilizers or pesticides</li>
          </ul>
          <p>
            Free plant replacement is not provided unless explicitly included as
            part of an active Decor-Plants Maintenance Agreement.
          </p>

          <h2>5. Periodic Maintenance Contracts</h2>
          <p>
            Clients subscribed to recurring maintenance packages (weekly,
            bi-weekly, or monthly) receive scheduled visits for weeding, soil
            aeration, pruning, nutrient application, and pest inspection.
          </p>
          <p>
            If a scheduled visit cannot occur due to client unavailability or
            denied access, we will make reasonable efforts to reschedule within
            the same billing cycle. However, visits missed due to client fault are
            not eligible for fee deductions or refunds.
          </p>

          <h2>6. Pricing, Payments &amp; Deposits</h2>
          <p>
            Prices for our services and products are quoted in Indian Rupees (INR).
          </p>
          <ul>
            <li>
              <strong>Custom Projects &amp; Installations:</strong> An advance
              deposit (typically 50%) is required prior to plant procurement and
              site preparation. The remaining balance is due immediately upon
              project completion or according to agreed project milestones.
            </li>
            <li>
              <strong>Ongoing Maintenance:</strong> Maintenance services are
              billed in advance on a monthly or quarterly cycle.
            </li>
            <li>
              <strong>Payment Modes:</strong> We accept payments via UPI, bank
              transfer (NEFT/IMPS), and cash.
            </li>
          </ul>
          <p>
            Decor-Plants reserves the right to pause ongoing maintenance visits or
            delay installation schedules if scheduled payments remain outstanding.
          </p>

          <h2>7. Rescheduling &amp; Weather Disruptions</h2>
          <p>
            Clients may reschedule a service visit by notifying us at least 24
            hours prior to the appointment.
          </p>
          <p>
            For outdoor projects and terrace gardens, Decor-Plants reserves the
            right to postpone scheduled work in case of adverse weather conditions
            (such as torrential rainfall, thunderstorms, or extreme heat) to
            protect personnel safety and plant integrity. Rescheduled dates will
            be coordinated with the client promptly.
          </p>

          <h2>8. Limitation of Liability</h2>
          <p>
            While our team exercises utmost care and professionalism on site,
            Decor-Plants shall not be held liable for:
          </p>
          <ul>
            <li>
              Pre-existing civil defects, roof seepage, or structural weaknesses
              not caused by our installation.
            </li>
            <li>
              Damage to concealed plumbing or electrical lines that were not
              disclosed to our team in advance.
            </li>
            <li>
              Indirect, incidental, or consequential damages resulting from
              service delays due to weather, transport delays, or supply chain
              shortages.
            </li>
          </ul>
          <p>
            To the maximum extent permitted by applicable Indian law,
            Decor-Plants&apos; total aggregate liability for any claim arising out
            of our services shall not exceed the total fees paid by the client for
            the specific service or project in dispute.
          </p>

          <h2>9. Intellectual Property</h2>
          <p>
            All content on this website—including photographs, logo, branding,
            text, graphics, design layouts, and project showcases—is the
            property of Decor-Plants and protected by applicable copyright and
            intellectual property laws. You may not copy, reproduce, distribute,
            or publish any content from this site without our prior written
            consent.
          </p>

          <h2>10. Third-Party Services &amp; WhatsApp</h2>
          <p>
            Our website utilizes WhatsApp (Meta) to facilitate direct
            communication and quote requests. When communicating via WhatsApp,
            you are subject to Meta&apos;s Terms of Service and Privacy Policy.
          </p>

          <h2>11. Governing Law &amp; Jurisdiction</h2>
          <p>
            These Terms and any disputes arising out of or related to our
            services shall be governed by and construed in accordance with the
            laws of India. The courts of Pune, Maharashtra shall have exclusive
            jurisdiction over any disputes or legal proceedings.
          </p>

          <h2>12. Changes to These Terms</h2>
          <p>
            Decor-Plants reserves the right to revise these Terms &amp; Conditions
            at any time. Changes will be posted to this page with an updated
            &quot;Last updated&quot; date. Continued use of our website or
            services following any changes indicates your acceptance of the
            revised terms.
          </p>

          <h2>13. Contact Information</h2>
          <p>
            If you have any questions or require clarification regarding these
            Terms and Conditions, please contact us:
          </p>
          <ul>
            <li>
              <strong>Business:</strong> Decor-Plants
            </li>
            <li>
              <strong>Co-Founder:</strong> Suraj Satav
            </li>
            <li>
              <strong>Phone / WhatsApp:</strong>{" "}
              <a href="tel:+918788159687">+91-8788159687</a>
            </li>
            <li>
              <strong>Location:</strong> Pune, Maharashtra, India
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}
