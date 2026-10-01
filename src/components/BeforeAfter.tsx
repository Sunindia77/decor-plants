"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";

export default function BeforeAfter() {
  // Refs for the two elements whose position changes on every drag event.
  // We write to element.style directly (DOM API) rather than via JSX style={{}}
  // because inline HTML style="" attributes are blocked by CSP style-src-attr,
  // while JavaScript-assigned styles are NOT subject to that restriction.
  const beforeRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(50);

  // Apply the current position to the DOM nodes without a React re-render
  const applyPosition = useCallback((pct: number) => {
    positionRef.current = pct;
    if (beforeRef.current)  beforeRef.current.style.width = `${pct}%`;
    if (dividerRef.current) dividerRef.current.style.left  = `${pct}%`;
  }, []);

  // Set initial position after mount (server-render has no inline style)
  useEffect(() => {
    applyPosition(50);
  }, [applyPosition]);

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

            <Image
              src="/images/garden/after.png"
              alt="Beautiful transformed garden"
              width={900}
              height={600}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 60vw"
            />

            <span className="comparison-label after-label">
              AFTER
            </span>

          </div>


          {/* BEFORE IMAGE — width set via ref, NOT inline style attr */}
          <div ref={beforeRef} className="comparison-before" suppressHydrationWarning>

            <Image
              src="/images/garden/Before.png"
              alt="Garden space before transformation"
              width={900}
              height={600}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 60vw"
            />

            <span className="comparison-label before-label">
              BEFORE
            </span>

          </div>


          {/* SLIDER LINE — left position set via ref, NOT inline style attr */}
          <div ref={dividerRef} className="comparison-divider" suppressHydrationWarning>

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
            defaultValue={50}
            onChange={(event) => applyPosition(Number(event.target.value))}
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