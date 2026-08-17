"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import {
  attachInview,
  inviewStackedLines,
  inviewWordFade,
  wireSmoothAnchors,
  wirePillButtonHover,
} from "../lib/motion";

export default function AboutContent() {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    /* page intro (loader-gated, matches hero-style gating on other pages) */
    inviewStackedLines(document.getElementById("about-intro-title"), ["People Over", "Process"], { duration: 900 });
    const introBodyEl = document.getElementById("about-intro-body");
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

    /* story */
    inviewStackedLines(document.getElementById("about-story-title"), ["Built By", "Builders"]);
    attachInview(document.getElementById("about-story-body"), {
      from: { opacity: 0, y: 24 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 26 },
      delayIn: 100,
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });

    /* approach */
    inviewStackedLines(document.getElementById("approach-title"), ["From Insight,", "To Impact"]);
    document.querySelectorAll(".approach-card").forEach((card, i) => {
      attachInview(card, {
        from: { opacity: 0, y: 28 },
        to: { opacity: 1, y: 0 },
        config: { tension: 190, friction: 26 },
        delayIn: i * 110,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    /* stats */
    inviewStackedLines(document.getElementById("about-stats-title"), ["A Team Built", "To Deliver"]);
    const statsData = [
      { value: "24", label: "Team members" },
      { value: "11", label: "Years in business" },
      { value: "150+", label: "Clients served" },
      { value: "6", label: "Countries represented" },
    ];
    const statsGrid = document.getElementById("about-stats-grid");
    statsData.forEach((s, i) => {
      const dt = document.createElement("dt");
      dt.className = "sr-only";
      dt.textContent = s.label;
      const dd = document.createElement("dd");
      dd.className = "stat-cell";
      dd.innerHTML = '<div class="stat-value">' + s.value + '</div><div class="stat-label" aria-hidden="true">' + s.label + "</div>";
      statsGrid.appendChild(dt);
      statsGrid.appendChild(dd);
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

    /* cta */
    attachInview(document.getElementById("about-cta"), {
      from: { opacity: 0, y: 20 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 26 },
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });

    /* word-fade for the intro paragraph replaces the simple block-reveal above; kept simple for readability */
    inviewWordFade(
      document.getElementById("about-story-lead"),
      "Acentics started with a simple observation: most agencies are optimized for their own margins, not their clients' outcomes.",
      { wordStagger: 16, duration: 650 }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="about-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner">
          <p className="eyebrow light">About us</p>
          <h1 id="about-intro-title" className="page-intro-title"></h1>
          <p className="page-intro-body" id="about-intro-body">
            We&apos;re Acentics — a senior team of strategists, creatives, and analysts who partner with ambitious brands to build things that actually work.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="about-story-grid">
          <div>
            <h2 id="about-story-title" className="about-story-title"></h2>
          </div>
          <div className="about-story-body" id="about-story-body">
            <p id="about-story-lead"></p>
            <p>No account layers between you and the people doing the work. No junior hand-offs disguised as senior strategy. Just a small, obsessively capable team that treats your business like their own.</p>
            <p>Eleven years and 150+ clients later, that hasn&apos;t changed — and it&apos;s not going to.</p>
          </div>
        </div>
      </section>

      <section className="approach">
        <p className="eyebrow dark">Our approach</p>
        <h2 id="approach-title" className="approach-title"></h2>
        <div className="approach-grid">
          <div className="approach-card">
            <span className="approach-step">01 — Discover</span>
            <h3>Get uncomfortably close</h3>
            <p>We start by getting close to your business — your customers, your data, your competitive landscape — before a single deck gets built.</p>
          </div>
          <div className="approach-card">
            <span className="approach-step">02 — Build</span>
            <h3>Move as one team</h3>
            <p>Strategy, creative, and media come together under one senior team, moving in weeks, not quarters.</p>
          </div>
          <div className="approach-card">
            <span className="approach-step">03 — Measure</span>
            <h3>Prove it, then improve it</h3>
            <p>Every program ships with clear metrics and a feedback loop — so we know what&apos;s working, fast.</p>
          </div>
        </div>
      </section>

      <section className="stats mt-3" id="about-stats">
        <p className="eyebrow light">By the numbers</p>
        <h2 id="about-stats-title" className="stats-title"></h2>
        <dl className="stats-grid" id="about-stats-grid"></dl>
      </section>

      <section className="page-cta" id="about-cta">
        <p className="page-cta-title">Ready to work with a team that gives a damn?</p>
        <a href="#contact" className="pill-btn solid">
          Book a Call
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>
    </div>
  );
}
