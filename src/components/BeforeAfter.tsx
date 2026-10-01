"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import siteContent from "@/src/content/siteContent.json";

export default function BeforeAfter() {
  const { beforeAfter } = siteContent;
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
              {beforeAfter.eyebrow}
            </span>

            <h2>
              From ordinary
              <br />
              to extraordinary.
            </h2>
          </div>

          <p>
            {beforeAfter.description}
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
              {beforeAfter.afterLabel}
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
              {beforeAfter.beforeLabel}
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
          <span className="section-label">{beforeAfter.featuredProject.eyebrow}</span>
          <h3>{beforeAfter.featuredProject.title}</h3>
          <div className="comparison-metrics">
            {beforeAfter.featuredProject.metrics.map((metric, idx) => (
              <div key={idx}>
                <i className={`bi ${metric.icon}`} aria-hidden="true"></i>
                <span>{metric.label}<strong>{metric.value}</strong></span>
              </div>
            ))}
          </div>
          <a href={beforeAfter.featuredProject.linkHref}>
            {beforeAfter.featuredProject.linkText} <i className="bi bi-arrow-up-right" aria-hidden="true"></i>
          </a>
        </aside>
        </div>

      </div>

    </section>
  );
}