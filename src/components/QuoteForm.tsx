"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);

  // ── Input sanitization ──────────────────────────────────────────────────────
  // Remove individual characters (<, >, ', ", `, ;) that enable script/tag injection.
  // Using character-level sanitization avoids incomplete multi-character bypasses (CodeQL).
  const sanitize = (value: string, maxLen = 200): string =>
    value
      .replace(/[<>'"`;]/g, "")
      .trim()
      .slice(0, maxLen);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name         = sanitize(String(formData.get("name")         || ""), 100);
    const phone        = sanitize(String(formData.get("phone")        || ""), 20);
    const email        = sanitize(String(formData.get("email")        || ""), 150);
    const propertyType = sanitize(String(formData.get("propertyType") || ""), 50);
    const city         = sanitize(String(formData.get("city")         || ""), 100);
    const service      = sanitize(String(formData.get("service")      || ""), 100);
    const area         = sanitize(String(formData.get("area")         || ""), 50);
    const message      = sanitize(String(formData.get("message")      || ""), 500);

    // ── Validate phone: digits, spaces, +, -, () only; 7–15 digits ────────────
    const digitsOnly = phone.replace(/\D/g, "");
    if (phone && (!/^[+\d\s\-().]{7,20}$/.test(phone) || digitsOnly.length < 7)) {
      alert("Please enter a valid phone number.");
      return;
    }

    // ── Validate email format ─────────────────────────────────────────────────
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // ── Validate name: no purely numeric or symbol strings ────────────────────
    if (name && !/[a-zA-Z]/.test(name)) {
      alert("Please enter your name.");
      return;
    }

    const whatsappMessage = `
Hello Decor-Plants! 🌿

I would like to get a free quotation.

*Customer Details*

Name: ${name}
Phone: ${phone}
Email: ${email}
Property type: ${propertyType}
City: ${city}

*Project Details*

Service: ${service}
Approximate Area: ${area} sq.ft

Message:
${message}

Please contact me regarding this project.
    `.trim();

    // Replace this number with your actual WhatsApp number.
    const whatsappNumber = "+919780371983"; // Example: +919876543210

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=` +
      encodeURIComponent(whatsappMessage);

    setSubmitted(true);

    window.open(whatsappURL, "_blank");

    form.reset();
  };

  return (
    <section id="quote" className="quote-section">

      <div className="container">

        <div className="quote-wrapper">

          {/* LEFT SIDE */}

          <div className="quote-content">

            <span className="section-label">
              START YOUR PROJECT
            </span>

            <h2>
              Let&apos;s create
              <br />
              something green.
            </h2>

            <p>
              Tell us about your space and get a personalized
              consultation and estimate from our experts.
            </p>


            <div className="quote-points">

              <div>
                <i className="bi bi-check-circle-fill"></i>
                <span>Free consultation</span>
              </div>

              <div>
                <i className="bi bi-check-circle-fill"></i>
                <span>Personalized design plan</span>
              </div>

              <div>
                <i className="bi bi-check-circle-fill"></i>
                <span>Transparent pricing</span>
              </div>

              <div>
                <i className="bi bi-check-circle-fill"></i>
                <span>Expert guidance</span>
              </div>

            </div>

          </div>


          {/* FORM */}

          <div className="quote-form-card">

            {submitted && (

              <div className="quote-success">

                <div className="success-icon">
                  <i className="bi bi-check-lg"></i>
                </div>

                <h3>
                  Enquiry Ready! 🌿
                </h3>

                <p>
                  WhatsApp should have opened with your
                  enquiry details. Send the message to
                  complete your enquiry.
                </p>

              </div>

            )}


            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="name">
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your name"
                    maxLength={100}
                    autoComplete="name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="phone">
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    pattern="[+\d\s\-().]{7,20}"
                    maxLength={20}
                    autoComplete="tel"
                    required
                  />

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="email">
                    Email Address
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    maxLength={150}
                    autoComplete="email"
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="propertyType">
                    Property Type
                  </label>

                  <select id="propertyType" name="propertyType" defaultValue="">
                    <option value="" disabled>Select property type</option>
                    <option>Home</option>
                    <option>Apartment</option>
                    <option>Office</option>
                    <option>Commercial</option>
                  </select>

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="city">
                    City *
                  </label>

                  <input id="city" name="city" type="text" placeholder="Pune" maxLength={100} autoComplete="address-level2" required />

                </div>


                <div className="form-group">

                  <label htmlFor="area">
                    Area (sq.ft)
                  </label>

                  <input
                    id="area"
                    name="area"
                    type="text"
                    placeholder="e.g. 500 sq.ft"
                    maxLength={50}
                    pattern="[\d\s.a-zA-Z]{0,50}"
                  />

                </div>

              </div>


              <div className="form-group quote-service-field">
                <label htmlFor="service">Service Interested In</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>Select a service</option>
                  <option>Garden Design</option>
                  <option>Balcony Garden</option>
                  <option>Terrace Garden</option>
                  <option>Vertical Garden</option>
                  <option>Plant Rental</option>
                  <option>Garden Maintenance</option>
                  <option>Office Plantscaping</option>
                  <option>Other</option>
                </select>
              </div>


              <div className="form-group">

                  <label htmlFor="message">Additional Details</label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your space and requirements..."
                  maxLength={500}
                ></textarea>

              </div>


              <button
                type="submit"
                className="quote-submit"
              >

                Get My Free Quote

                <i className="bi bi-arrow-up-right"></i>

              </button>


              <p className="form-note">
                <i className="bi bi-whatsapp"></i>
                Your enquiry will open in WhatsApp.
              </p>

            </form>

            <div className="quote-whatsapp-qr">
              <h3>Prefer WhatsApp?</h3>
              <p>Scan to chat with Decor-Plants</p>
              <Image
                src="/images/garden/WhatsApp%20BarCode%20Account2020.png"
                width={1278}
                height={1230}
                alt="Decor-Plants WhatsApp Business QR Code"
              />
              <p>Scan to start a WhatsApp conversation</p>
            </div>

          </div>

        <aside className="quote-aside" aria-label="A note about your garden">
          <span>✦</span>
          <p>&ldquo;Let&apos;s turn<br />your space<br />into a green<br />escape.&rdquo;</p>
        </aside>

        </div>

      </div>

    </section>
  );
}