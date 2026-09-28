"use client";

import { useState } from "react";

export default function TestimonialsFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const testimonials = [
    {
      review:
        "The entire experience was excellent. They transformed our empty balcony into a beautiful green space that our family absolutely loves.",
      name: "Rahul Mehta",
      location: "Baner, Pune",
      service: "Balcony Garden",
      rating: 5,
    },
    {
      review:
        "Very professional team from design to installation. They understood exactly what we wanted for our terrace and delivered beautifully.",
      name: "Sneha Kulkarni",
      location: "Wakad, Pune",
      service: "Terrace Garden",
      rating: 5,
    },
    {
      review:
        "We wanted greenery for our office reception and the result looks fantastic. The maintenance service has also been very reliable.",
      name: "Amit Shah",
      location: "Hinjewadi, Pune",
      service: "Office Plantscaping",
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: "How much does a garden design cost?",
      answer:
        "The cost depends on the space size, type of garden, plants, planters, materials and level of customization. You can use our Garden Cost Calculator for an initial estimate, or request a free consultation for an accurate quotation.",
    },
    {
      question: "Do you provide maintenance services?",
      answer:
        "Yes. We offer regular maintenance visits and annual plans tailored to your garden, including pruning, plant health checks and seasonal care.",
    },
    {
      question: "What types of plants do you use?",
      answer:
        "We select plants to suit your space, local climate, light levels and care preferences, with native and water-wise options where appropriate.",
    },
    {
      question: "How long does installation take?",
      answer:
        "Timing depends on the size and complexity of your project. We provide a clear schedule after assessing the space and finalizing the design.",
    },
    {
      question: "Can you work with small spaces?",
      answer:
        "Absolutely. We design for compact balconies, patios and corners with space-smart layouts, vertical planting and carefully chosen containers.",
    },
    {
      question: "Do you provide a free consultation?",
      answer:
        "Yes. We offer a free initial consultation to understand your space, goals and budget before recommending the next steps.",
    },
  ];

  return (
    <>
      {/* TESTIMONIALS */}

      <section className="testimonial-section">

        <div className="container">

          <div className="text-center testimonial-heading">

            <span className="section-label">
              WHAT OUR CLIENTS SAY
            </span>

            <h2>
              Spaces they love.
              <br />
              Stories they share.
            </h2>

          </div>


          <div className="row g-4 mt-5">

            {testimonials.map((testimonial) => (

              <div
                className="col-lg-4"
                key={testimonial.name}
              >

                <div className="testimonial-card">

                  <div className="stars">

                    {Array.from({
                      length: testimonial.rating,
                    }).map((_, index) => (
                      <i
                        key={index}
                        className="bi bi-star-fill"
                      ></i>
                    ))}

                  </div>


                  <p className="testimonial-review">
                    &ldquo;{testimonial.review}&rdquo;
                  </p>


                  <div className="testimonial-client">

                    <div className="client-avatar">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div>

                      <strong>
                        {testimonial.name}
                      </strong>

                      <span>
                        {testimonial.location}
                      </span>

                    </div>

                  </div>


                  <div className="testimonial-service">
                    {testimonial.service}
                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* FAQ */}

      <section className="faq-section">

        <div className="container">

          <div className="row">

            <div className="col-lg-5">

              <span className="section-label">
                FAQ
              </span>

              <h2>
                Everything you
                <br />
                need to know.
              </h2>

              <p>
                Quick answers to common questions
                about our services.
              </p>

              <a
                href="#contact"
                className="faq-contact"
              >
                View All FAQs
                <i className="bi bi-arrow-right"></i>
              </a>

            </div>


            <div className="col-lg-7">

              <div className="faq-list">

                {faqs.map((faq, index) => {

                  const isOpen = openFAQ === index;

                  return (

                    <div
                      className={`faq-item ${
                        isOpen ? "active" : ""
                      }`}
                      key={faq.question}
                    >

                      <button
                        type="button"
                        className="faq-question"
                        onClick={() =>
                          setOpenFAQ(
                            isOpen ? null : index
                          )
                        }
                      >

                        <span>
                          {faq.question}
                        </span>

                        <i
                          className={`bi ${
                            isOpen
                              ? "bi-dash"
                              : "bi-plus"
                          }`}
                        ></i>

                      </button>


                      {isOpen && (

                        <div className="faq-answer">
                          <p>
                            {faq.answer}
                          </p>
                        </div>

                      )}

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}