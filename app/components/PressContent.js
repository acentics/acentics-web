"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import { attachInview, inviewStackedLines, wireSmoothAnchors, wirePillButtonHover } from "../lib/motion";

const FACTS = [
  { value: "2015", label: "Founded" },
  { value: "New York", label: "Headquarters" },
  { value: "24", label: "Team members" },
  { value: "150+", label: "Clients served" },
];

export default function PressContent() {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    inviewStackedLines(document.getElementById("press-intro-title"), ["Acentics In", "The Press"], { duration: 900 });
    const introBodyEl = document.getElementById("press-intro-body");
    introBodyEl.style.opacity = "0";
    introBodyEl.style.transform = "translateY(16px)";
    onReady(() => {
      attachInview(introBodyEl, {
        from: { opacity: 0, y: 16 },
        to: { opacity: 1, y: 0 },
        config: { tension: 200, friction: 26 },
        delayIn: 500,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    const factsGrid = document.getElementById("press-facts-grid");
    FACTS.forEach((f, i) => {
      const dt = document.createElement("dt");
      dt.className = "sr-only";
      dt.textContent = f.label;
      const dd = document.createElement("dd");
      dd.className = "stat-cell";
      dd.innerHTML = '<div class="stat-value">' + f.value + '</div><div class="stat-label" aria-hidden="true">' + f.label + "</div>";
      factsGrid.appendChild(dt);
      factsGrid.appendChild(dd);
      attachInview(dd, {
        from: { opacity: 0, y: 30 },
        to: { opacity: 1, y: 0 },
        config: { tension: 180, friction: 24 },
        delayIn: i * 110,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    attachInview(document.getElementById("press-boilerplate"), {
      from: { opacity: 0, y: 24 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 26 },
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });

    attachInview(document.getElementById("press-cta"), {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 26 },
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="press-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner">
          <p className="eyebrow light">Press</p>
          <h1 id="press-intro-title" className="page-intro-title"></h1>
          <p className="page-intro-body" id="press-intro-body">
            Resources for journalists and media covering Acentics — company facts, boilerplate copy, and a direct line to our team.
          </p>
        </div>
      </section>

      <section className="stats mt-3" id="press-facts">
        <p className="eyebrow light">Quick facts</p>
        <h2 className="stats-title">By The Numbers</h2>
        <dl className="stats-grid" id="press-facts-grid"></dl>
      </section>

      <section className="press-boilerplate-section">
        <div className="press-boilerplate-inner" id="press-boilerplate">
          <p className="eyebrow dark">About Acentics</p>
          <h2>Boilerplate</h2>
          <p>
            Acentics is a senior, full-service marketing agency pairing sharp strategy with craft — branding, performance media, content, SEO, and web development for growth-stage and enterprise clients. Founded in 2015 and based in New York, the team partners directly with client leadership rather than working through account layers, moving at the speed the business actually needs.
          </p>
          <p>For interviews, data requests, or commentary, contact our media team directly.</p>
        </div>
      </section>

      <section className="page-cta" id="press-cta">
        <p className="page-cta-title">Working on a story? We&apos;re happy to help.</p>
        <a href="mailto:media@acentics.com" className="pill-btn solid">
          Contact Media Team
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>
    </div>
  );
}
