"use client";

import { useState } from "react";

export default function BeforeAfter() {
  const [position, setPosition] = useState(50);

  return (
    <section className="before-after-section">

      <div className="container">

        {/* Heading */}
        <div className="before-after-heading">

          <div>
            <span className="section-label">
              SEE THE TRANSFORMATION
            </span>

            <h2>
              From ordinary
              <br />
              to extraordinary.
            </h2>
          </div>

          <p>
            Every space has potential. See how we transform
            empty and unused spaces into beautiful green
            environments.
          </p>

        </div>


        {/* Slider */}
        <div className="comparison-layout">
        <div className="comparison-wrapper">

          {/* AFTER IMAGE */}
          <div className="comparison-after">

            <img
              src="/images/garden/after.png"
              alt="Beautiful transformed garden"
            />

            <span className="comparison-label after-label">
              AFTER
            </span>

          </div>


          {/* BEFORE IMAGE */}
          <div
            className="comparison-before"
            style={{
              width: `${position}%`,
            }}
          >

            <img
              src="/images/garden/Before.png"
              alt="Garden space before transformation"
            />

            <span className="comparison-label before-label">
              BEFORE
            </span>

          </div>


          {/* SLIDER LINE */}
          <div
            className="comparison-divider"
            style={{
              left: `${position}%`,
            }}
          >

            <div className="comparison-handle">
              <i className="bi bi-chevron-left"></i>
              <i className="bi bi-chevron-right"></i>
            </div>

          </div>


          {/* RANGE INPUT */}
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) =>
              setPosition(Number(event.target.value))
            }
            className="comparison-input"
            aria-label="Compare before and after"
          />

        </div>
        <aside className="comparison-project">
          <span className="section-label">FEATURED TRANSFORMATION</span>
          <h3>Terrace Garden Transformation</h3>
          <div className="comparison-metrics">
            <div><i className="bi bi-rulers" aria-hidden="true"></i><span>Area<strong>350 sq.ft</strong></span></div>
            <div><i className="bi bi-house-heart" aria-hidden="true"></i><span>Project type<strong>Residential</strong></span></div>
            <div><i className="bi bi-flower1" aria-hidden="true"></i><span>Plants used<strong>25+ varieties</strong></span></div>
          </div>
          <a href="#contact">
            View Project Details <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
          </a>
        </aside>
        </div>

      </div>

    </section>
  );
}