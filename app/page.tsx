import type { Metadata } from "next";
import Image from "next/image";
import BeforeAfter from "@/src/components/BeforeAfter";
import Header from "@/src/components/Header";
import QuoteForm from "@/src/components/QuoteForm";
import TestimonialsFAQ from "@/src/components/TestimonialsFAQ";
import WhyChooseUs from "@/src/components/WhyChooseUs";
import { services } from "@/src/data/services";

export const metadata: Metadata = {
  title: "Garden Maintenance Services in Pune | Decor-Plants",
  description:
    "Garden maintenance services in Pune for homes and workspaces. Explore gardening services, plant maintenance, balcony and terrace gardens with Decor-Plants.",
  keywords: [
    "garden maintenance services Pune",
    "gardening services Pune",
    "plant maintenance services Pune",
  ],
  alternates: process.env.NEXT_PUBLIC_SITE_URL ? { canonical: "/" } : undefined,
  openGraph: {
    title: "Garden Maintenance Services in Pune | Decor-Plants",
    description:
      "Garden care, plant maintenance and thoughtful garden design for homes and workspaces in Pune.",
    type: "website",
  },
};

export default function Home() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Decor-Plants",
    description:
      "Garden maintenance, gardening, plant care, landscaping and garden design services in Pune.",
    areaServed: { "@type": "City", name: "Pune" },
    knowsAbout: [
      "Garden maintenance",
      "Balcony gardens",
      "Terrace garden design",
      "Vertical garden installation",
      "Office plant maintenance",
      "Landscaping",
      "Plant care",
    ],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Header />

      {/* HERO */}
      <section id="home" className="hero-section">
        <div className="hero-backdrop" aria-hidden="true" />
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-copy">
              <span className="hero-label">
                PLANT & GARDEN CARE STUDIO
              </span>

              <h1>
                Transform Your Space
                <span> Into A <em>Living Experience.</em></span>
              </h1>

              <p className="hero-description">
                Garden maintenance services in Pune for homes and workspaces.
                Our gardening services include plant maintenance, balcony and
                terrace gardens, and thoughtful landscaping.
              </p>

              <div className="hero-buttons">
                <a href="#contact" className="btn primary-btn">
                  Get Free Quote
                  <i className="bi bi-arrow-up-right"></i>
                </a>

                <a href="#projects" className="btn secondary-btn">
                  <i className="bi bi-play-circle-fill" aria-hidden="true"></i>
                  Watch Our Story
                </a>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>500+</strong>
                  <span>Happy Clients</span>
                </div>

                <div>
                  <strong>150+</strong>
                  <span>Projects Completed</span>
                </div>

                <div>
                  <strong>100+</strong>
                  <span>Plant Varieties</span>
                </div>
              </div>
            </div>

            <div className="hero-note">
              <span className="hero-note-mark">✳</span>
              <span>Thoughtful<br />green living</span>
            </div>
          </div>
        </div>
        <a className="hero-feature" href="#projects">
          <img
            src="/images/garden/Luxury%20Terrace%20Garden.png"
            alt=""
          />
          <span><strong>Terrace Garden</strong><small>Modern & serene</small></span>
          <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
        </a>
        <a className="hero-scroll" href="#spaces" aria-label="Scroll to explore">
          <i className="bi bi-chevron-down" aria-hidden="true"></i>
        </a>
      </section>

      {/* CHOOSE YOUR SPACE */}
      <section id="spaces" className="space-section">
        <div className="container">
          <div className="section-heading text-center">
            <span>START YOUR GREEN JOURNEY</span>

            <h2>
              What would you like to transform?
            </h2>
          </div>

          <div className="row g-4 mt-4">
            {[
              ["Home Garden", "Create a natural retreat at home.", "/images/garden/modern-garden-home.png"],
              ["Balcony", "Bring living into small spaces.", "/images/garden/pergola-garden-lounge.png"],
              ["Terrace", "Turn your terrace into an urban escape.", "/images/garden/Luxury%20Terrace%20Garden.png"],
              ["Office", "Bring nature to your workspace.", "/images/garden/indoor-tropical-garden.png"],
              ["Vertical Wall", "Green walls with modern design.", "/images/garden/indoor-garden-lounge.png"],
              ["Indoor Plants", "Beautiful plants for healthier interiors.", "/images/garden/garden-courtyard-bougainvillea.png"],
            ].map(([title, description, image]) => (
              <div className="col-md-6 col-lg-4" key={title}>
                <div className="space-card">
                  <div className="space-card-image">
                    <img src={image} alt={title} />
                    <span className="space-icon"><i className="bi bi-leaf-fill" aria-hidden="true"></i></span>
                  </div>
                  <h3>{title}</h3>

                  <p>{description}</p>

                  <a href="#services">
                    <span className="visually-hidden">Explore {title}</span>
                    <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="services-section">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-7">
              <span className="section-label">OUR SERVICES</span>

              <h2>
                Complete Garden &amp;<br />Landscaping Solutions
              </h2>
            </div>

            <div className="col-lg-5">
              <p>
                From concept to creation, we provide end-to-end green solutions
                for every space.
              </p>
              <a href="#services" className="project-link service-overview-link">
                View All Services <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div className="row g-4 mt-4">
            {services.map((service, index) => (
              <div className="col-md-6 col-lg-4" key={service.slug}>
                <div className="service-card">
                  <div
                    className="service-card-art"
                    style={{ backgroundImage: `url("${service.image}")` }}
                    aria-hidden="true"
                  />
                  <div className="service-card-copy">
                    <div className="service-icon"><i className={`bi ${["bi-flower1", "bi-tree", "bi-droplet", "bi-bricks", "bi-bricks", "bi-scissors", "bi-building", "bi-tree", "bi-heart-pulse", "bi-stars"][index]}`} aria-hidden="true"></i></div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  <a href={`/services/${service.slug}`}>
                    Learn More
                    <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
                  </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="projects-header">
            <div>
              <span className="section-label">OUR RECENT WORK</span>

              <h2>
                Spaces we&apos;ve
                <br />
                transformed.
              </h2>
            </div>

            <div>
              <p>
                From peaceful balconies to impressive commercial landscapes,
                explore some of the spaces we&apos;ve brought to life.
              </p>

              <a href="#" className="project-link">
                View All Projects
                <i className="bi bi-arrow-up-right"></i>
              </a>
            </div>
          </div>

          <div className="projects-grid mt-4">
            {/* Project 1 */}
            <div>
              <div className="project-card project-large">
                <img
                  src="/images/garden/Luxury%20Terrace%20Garden.png"
                  alt="Luxury terrace garden"
                />

                <div className="project-overlay">
                  <div>
                    <span>RESIDENTIAL</span>

                    <h3>Luxury Terrace Garden</h3>

                    <p>Pune, Maharashtra</p>
                  </div>

                  <div className="project-arrow">
                    <i className="bi bi-arrow-up-right"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div>
              <div className="project-card">
                <img
                  src="/images/garden/Urban%20Balcony.png"
                  alt="Modern balcony garden"
                />

                <div className="project-overlay">
                  <div>
                    <span>BALCONY</span>

                    <h3>Urban Balcony</h3>

                    <p>Pune, Maharashtra</p>
                  </div>

                  <div className="project-arrow">
                    <i className="bi bi-arrow-up-right"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div>
              <div className="project-card">
                <img
                  src="/images/garden/Corporate%20Green%20Space.png"
                  alt="Indoor office plants"
                />

                <div className="project-overlay">
                  <div>
                    <span>COMMERCIAL</span>

                    <h3>Corporate Green Space</h3>

                    <p>Hinjewadi, Pune</p>
                  </div>

                  <div className="project-arrow">
                    <i className="bi bi-arrow-up-right"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Project 4 */}
            <div>
              <div className="project-card project-large">
                <img
                  src="/images/garden/Contemporary%20Garden.png"
                  alt="Beautiful garden landscape"
                />

                <div className="project-overlay">
                  <div>
                    <span>LANDSCAPING</span>

                    <h3>Contemporary Garden</h3>

                    <p>Pune, Maharashtra</p>
                  </div>

                  <div className="project-arrow">
                    <i className="bi bi-arrow-up-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <BeforeAfter />
      
      <WhyChooseUs />

      <TestimonialsFAQ />

      {/* QUOTE FORM */}
      <QuoteForm />

      {/* CTA */}
      <section id="contact" className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2>
              Ready to transform
              <br />
              your space?
            </h2>

            <p>
              Get a free consultation and let&apos;s create something beautiful together.
            </p>

            <a href="tel:+919999999999" className="btn primary-btn">
              Book a Free Consultation
              <i className="bi bi-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand-block">
              <a className="brand-logo" href="#home">
                <Image
                  className="brand-logo-image"
                  src="/images/garden/logo-decor-plants.png"
                  width={2048}
                  height={768}
                  alt="Decor-Plants, transform your space into a living experience"
                />
              </a>
              <p>Creating beautiful green spaces for healthier, happier lives.</p>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#projects">Projects</a>
              <a href="#spaces">Plant Guide</a>
              <a href="#contact">Contact</a>
            </nav>

            <div className="footer-socials" aria-label="Social media">
              <a href="#contact" aria-label="Instagram"><i className="bi bi-instagram" aria-hidden="true" /></a>
              <a href="#contact" aria-label="Facebook"><i className="bi bi-facebook" aria-hidden="true" /></a>
              <a href="#contact" aria-label="LinkedIn"><i className="bi bi-linkedin" aria-hidden="true" /></a>
              <a href="#contact" aria-label="YouTube"><i className="bi bi-youtube" aria-hidden="true" /></a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Decor-Plants. All rights reserved.</span>
            <div>
              <a href="#contact">Privacy Policy</a>
              <a href="#contact">Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
