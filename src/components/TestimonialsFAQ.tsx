"use client";

import { useState } from "react";
import siteContent from "@/src/content/siteContent.json";

export default function TestimonialsFAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { testimonials, faq } = siteContent;

  return (
    <>
      {/* TESTIMONIALS */}

      <section className="testimonial-section">

        <div className="container">

          <div className="text-center testimonial-heading">

            <span className="section-label">
              {testimonials.eyebrow}
            </span>

            <h2>
              Spaces they love.
              <br />
              Stories they share.
            </h2>

          </div>


          <div className="row g-4 mt-5">

            {testimonials.items.map((testimonial) => (

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
                {faq.eyebrow}
              </span>

              <h2>
                Everything you
                <br />
                need to know.
              </h2>

              <p>
                {faq.description}
              </p>

              <a
                href="#contact"
                className="faq-contact"
              >
                {faq.linkText}
                <i className="bi bi-arrow-right"></i>
              </a>

            </div>


            <div className="col-lg-7">

              <div className="faq-list">

                {faq.items.map((item, index) => {

                  const isOpen = openFAQ === index;

                  return (

                    <div
                      className={`faq-item ${
                        isOpen ? "active" : ""
                      }`}
                      key={item.question}
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
                          {item.question}
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
                            {item.answer}
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