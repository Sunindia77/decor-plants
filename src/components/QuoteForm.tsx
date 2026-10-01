"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import siteContent from "@/src/content/siteContent.json";

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const { quoteForm, site } = siteContent;

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

    const whatsappNumber = site.whatsappNumber;

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
              {quoteForm.eyebrow}
            </span>

            <h2>
              {quoteForm.title}
            </h2>

            <p>
              {quoteForm.description}
            </p>

            <div className="quote-points">
              {quoteForm.benefits.map((benefit, index) => (
                <div key={index}>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>{benefit}</span>
                </div>
              ))}
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
                  {quoteForm.successMessage.title}
                </h3>

                <p>
                  {quoteForm.successMessage.description}
                </p>

              </div>

            )}


            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="name">
                    {quoteForm.fields.name.label}
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder={quoteForm.fields.name.placeholder}
                    maxLength={100}
                    autoComplete="name"
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="phone">
                    {quoteForm.fields.phone.label}
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder={quoteForm.fields.phone.placeholder}
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
                    {quoteForm.fields.email.label}
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder={quoteForm.fields.email.placeholder}
                    maxLength={150}
                    autoComplete="email"
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="propertyType">
                    {quoteForm.fields.propertyType.label}
                  </label>

                  <select id="propertyType" name="propertyType" defaultValue="">
                    <option value="" disabled>{quoteForm.fields.propertyType.placeholder}</option>
                    {quoteForm.fields.propertyType.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>

                </div>

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label htmlFor="city">
                    {quoteForm.fields.city.label}
                  </label>

                  <input id="city" name="city" type="text" placeholder={quoteForm.fields.city.placeholder} maxLength={100} autoComplete="address-level2" required />

                </div>


                <div className="form-group">

                  <label htmlFor="area">
                    {quoteForm.fields.area.label}
                  </label>

                  <input
                    id="area"
                    name="area"
                    type="text"
                    placeholder={quoteForm.fields.area.placeholder}
                    maxLength={50}
                    pattern="[\d\s.a-zA-Z]{0,50}"
                  />

                </div>

              </div>


              <div className="form-group quote-service-field">
                <label htmlFor="service">{quoteForm.fields.service.label}</label>
                <select id="service" name="service" required defaultValue="">
                  <option value="" disabled>{quoteForm.fields.service.placeholder}</option>
                  {quoteForm.fields.service.options.map((srv) => (
                    <option key={srv}>{srv}</option>
                  ))}
                </select>
              </div>


              <div className="form-group">

                <label htmlFor="message">{quoteForm.fields.message.label}</label>

                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder={quoteForm.fields.message.placeholder}
                  maxLength={500}
                ></textarea>

              </div>


              <button
                type="submit"
                className="quote-submit"
              >

                {quoteForm.submitButton}

                <i className="bi bi-arrow-up-right"></i>

              </button>


              <p className="form-note">
                <i className="bi bi-whatsapp"></i>
                {quoteForm.formNote}
              </p>

            </form>

            <div className="quote-whatsapp-qr">
              <h3>{quoteForm.whatsappQr.title}</h3>
              <p>{quoteForm.whatsappQr.subtitle}</p>
              <Image
                src="/images/garden/WhatsApp%20BarCode%20Account2020.png"
                width={1278}
                height={1230}
                alt="Decor-Plants WhatsApp Business QR Code"
              />
              <p>{quoteForm.whatsappQr.footer}</p>
            </div>

          </div>

        <aside className="quote-aside" aria-label="A note about your garden">
          <span>✦</span>
          <p>&ldquo;{quoteForm.asideQuote.line1}<br />{quoteForm.asideQuote.line2}<br />{quoteForm.asideQuote.line3}<br />{quoteForm.asideQuote.line4}&rdquo;</p>
        </aside>

        </div>

      </div>

    </section>
  );
}