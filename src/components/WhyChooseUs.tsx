import siteContent from "@/src/content/siteContent.json";

export default function WhyChooseUs() {
  const { whyChooseUs, process } = siteContent;

  return (
    <>
      {/* WHY CHOOSE US */}
      <section id="about" className="why-section">
        <div className="container">
          <div className="row align-items-end mb-5">
            <div className="col-lg-7">
              <span className="section-label">
                {whyChooseUs.eyebrow}
              </span>

              <h2 className="why-title">
                More than a garden.
                <br />
                <em>A complete experience.</em>
              </h2>
            </div>

            <div className="col-lg-5">
              <p className="why-intro">
                {whyChooseUs.intro}
              </p>
            </div>
          </div>

          <div className="row g-4">
            {whyChooseUs.benefits.map((benefit) => (
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
              {process.eyebrow}
            </span>

            <h2>
              From idea to
              <br />
              beautiful garden.
            </h2>

            <p>
              {process.description}
            </p>

            <a className="process-link" href="#contact">
              {process.linkText}
              <i className="bi bi-arrow-right" aria-hidden="true"></i>
            </a>
          </div>

          <div className="process-wrapper">
            <div className="process-line"></div>

            {process.steps.map((step) => (
              <div className="process-step" key={step.number}>
                <div className="process-circle">
                  {step.number}
                </div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}