export default function WhyChooseUs() {
  const benefits = [
    {
      number: "01",
      title: "Expert Design & Planning",
      description:
        "Personalized designs for every space and lifestyle.",
      icon: "bi-palette",
    },
    {
      number: "02",
      title: "High-Quality Plants",
      description:
        "A wide range of healthy indoor and outdoor plants.",
      icon: "bi-check2-circle",
    },
    {
      number: "03",
      title: "Sustainable Solutions",
      description:
        "Eco-friendly and low-maintenance options.",
      icon: "bi-flower1",
    },
    {
      number: "04",
      title: "Transparent Pricing",
      description:
        "Clear estimates with no hidden costs.",
      icon: "bi-tools",
    },
    {
      number: "05",
      title: "Long-Term Garden Care",
      description:
        "Ongoing maintenance for lasting beauty.",
      icon: "bi-receipt",
    },
    {
      number: "06",
      title: "Trusted by 500+ Clients",
      description:
        "A proven track record and happy customers.",
      icon: "bi-heart",
    },
  ];

  return (
    <>
      {/* WHY CHOOSE US */}

      <section className="why-section">

        <div className="container">

          <div className="row align-items-end mb-5">

            <div className="col-lg-7">

              <span className="section-label">
                REAL REASONS TO CHOOSE US
              </span>

              <h2 className="why-title">
                More than a garden.
                <br />
                <em>A complete experience.</em>
              </h2>

            </div>

            <div className="col-lg-5">

              <p className="why-intro">
                We combine design, nature and expert care to create green
                spaces that look beautiful and feel even better.
              </p>

            </div>

          </div>


          <div className="row g-4">

            {benefits.map((benefit) => (

              <div
                className="col-md-6 col-lg-4"
                key={benefit.number}
              >

                <div className="benefit-card">

                  <div className="benefit-top">

                    <span className="benefit-number">
                      {benefit.number}
                    </span>

                    <div className="benefit-icon">
                      <i className={`bi ${benefit.icon}`}></i>
                    </div>

                  </div>

                  <h3>
                    {benefit.title}
                  </h3>

                  <p>
                    {benefit.description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="process-section">

        <div className="container">

          <div className="process-heading">

            <span className="section-label">
              HOW IT WORKS
            </span>

            <h2>
              From idea to
              <br />
              beautiful garden.
            </h2>

            <p>
              A simple and transparent process to bring your green vision to life.
            </p>

            <a className="process-link" href="#contact">
              Our Process
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </a>

          </div>


          <div className="process-wrapper">

            <div className="process-line"></div>


            <div className="process-step">

              <div className="process-circle">
                01
              </div>

              <h3>
                Consultation
              </h3>

              <p>
                Share your space and requirements.
              </p>

            </div>


            <div className="process-step">

              <div className="process-circle">
                02
              </div>

              <h3>
                Design
              </h3>

              <p>
                Get a personalized design and estimate.
              </p>

            </div>


            <div className="process-step">

              <div className="process-circle">
                03
              </div>

              <h3>
                Installation
              </h3>

              <p>
                Our team brings your garden to life.
              </p>

            </div>


            <div className="process-step">

              <div className="process-circle">
                04
              </div>

              <h3>
                Maintenance
              </h3>

              <p>
                We keep it green and thriving.
              </p>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}