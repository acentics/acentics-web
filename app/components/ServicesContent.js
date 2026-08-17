"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import {
  ICON_COMPASS,
  ICON_LAYERS,
  ICON_MAIL,
  ICON_MEGAPHONE,
  ICON_SEARCH,
  ICON_USERS,
  ICON_CODE,
  attachInview,
  inviewStackedLines,
  wireSmoothAnchors,
  wirePillButtonHover,
} from "../lib/motion";

const SERVICES = [
  {
    slug: "branding",
    tag: "01 — Branding",
    title: "Branding",
    icon: ICON_COMPASS,
    desc: "We build brand strategy, visual identity, and messaging systems designed for long-term recognition — from initial positioning through the guidelines that keep every touchpoint consistent.",
    includes: ["Brand strategy & positioning", "Visual identity systems", "Brand guidelines & governance", "Naming & verbal identity"],
  },
  {
    slug: "graphic-design",
    tag: "02 — Graphic Design",
    title: "Graphic Design",
    icon: ICON_LAYERS,
    desc: "Professional design for campaigns, packaging, and digital assets — crafted to reflect your brand strategy across every channel your audience engages with.",
    includes: ["Social & campaign design", "Print & packaging design", "Presentation & pitch design", "Design systems"],
  },
  {
    slug: "email-marketing",
    tag: "03 — Email Marketing",
    title: "Email Marketing",
    icon: ICON_MAIL,
    desc: "Lifecycle and campaign email programs built on segmentation and automation — designed to nurture leads, retain customers, and turn your list into a measurable revenue channel.",
    includes: ["Lifecycle & automation flows", "Campaign strategy & copy", "List growth & segmentation", "Deliverability & reporting"],
  },
  {
    slug: "press-release",
    tag: "04 — Public Relations",
    title: "Public Relations",
    icon: ICON_MEGAPHONE,
    desc: "Media relations and press strategy that earns coverage from the journalists and outlets that matter to your industry — from announcement planning to ongoing press outreach.",
    includes: ["Press release writing & distribution", "Media list building & outreach", "Launch & announcement strategy", "Coverage tracking & reporting"],
  },
  {
    slug: "seo",
    tag: "05 — SEO",
    title: "SEO",
    icon: ICON_SEARCH,
    desc: "Technical audits, on-page optimization, and content strategy built to compound organic search rankings over time — grounded in data, not algorithm guesswork.",
    includes: ["Technical & on-page SEO", "Keyword & content strategy", "Link building & authority", "Analytics & rank tracking"],
  },
  {
    slug: "influencer-marketing",
    tag: "06 — Influencer Marketing",
    title: "Influencer Marketing",
    icon: ICON_USERS,
    desc: "End-to-end creator partnerships — from vetting and outreach to contracts and performance reporting — built around engaged, relevant audiences rather than follower counts alone.",
    includes: ["Creator sourcing & vetting", "Campaign management & briefs", "Contracts & usage rights", "Performance tracking & reporting"],
  },
  {
    slug: "website-development",
    tag: "07 — Website Development",
    title: "Website Development",
    icon: ICON_CODE,
    desc: "Custom-built, high-performance websites and landing pages engineered for speed, usability, and conversion — from initial build through ongoing optimization.",
    includes: ["Custom website builds", "Landing pages & funnels", "CMS & e-commerce integration", "Performance & SEO optimization"],
  },
];

export default function ServicesContent() {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    /* page intro (loader-gated) */
    inviewStackedLines(document.getElementById("services-intro-title"), ["Services That", "Move Metrics"], { duration: 900 });
    const introBodyEl = document.getElementById("services-intro-body");
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

    /* each service detail block */
    document.querySelectorAll(".service-detail").forEach((section) => {
      attachInview(section.querySelector(".service-detail-visual"), {
        from: { opacity: 0, scale: 0.9 },
        to: { opacity: 1, scale: 1 },
        config: { tension: 220, friction: 22 },
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "scale(" + v.scale + ")";
        },
      });
      attachInview(section.querySelector(".service-detail-body"), {
        from: { opacity: 0, y: 24 },
        to: { opacity: 1, y: 0 },
        config: { tension: 200, friction: 26 },
        delayIn: 100,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    /* cta */
    attachInview(document.getElementById("services-cta"), {
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
    <div id="services-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner">
          <p className="eyebrow light">Services</p>
          <h1 id="services-intro-title" className="page-intro-title"></h1>
          <p className="page-intro-body" id="services-intro-body">
            Seven capabilities, one senior team — built to work together or stand alone, depending on what your business actually needs.
          </p>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <section key={s.slug} id={s.slug} className={"service-detail" + (i % 2 === 1 ? " alt" : "")}>
          <div className="service-detail-grid">
            <div className="service-detail-visual">
              <div className="service-detail-icon" dangerouslySetInnerHTML={{ __html: s.icon }} />
              <span className="service-detail-tag">{s.tag}</span>
            </div>
            <div className="service-detail-body">
              <h2>{s.title}</h2>
              <p>{s.desc}</p>
              <ul className="service-detail-includes">
                {s.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ))}

      <section className="page-cta" id="services-cta">
        <p className="page-cta-title">Not sure which service fits? Let&apos;s talk it through.</p>
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
