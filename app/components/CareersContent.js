"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import { ROLES, PERKS } from "../lib/careers-data";
import {
  ICON_EXPAND,
  ICON_TARGET,
  ICON_HEART,
  ICON_SPARK,
  ICON_ARROW,
  attachHover,
  attachInview,
  inviewStackedLines,
  wireSmoothAnchors,
  wirePillButtonHover,
} from "../lib/motion";

const PERK_ICONS = {
  "remote-first": ICON_EXPAND,
  "real-ownership": ICON_TARGET,
  "health-wellness": ICON_HEART,
  "learning-budget": ICON_SPARK,
};

export default function CareersContent() {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    /* page intro (loader-gated) */
    inviewStackedLines(document.getElementById("careers-intro-title"), ["Do The Best", "Work Of Your Career"], { duration: 900 });
    const introBodyEl = document.getElementById("careers-intro-body");
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

    /* perks */
    inviewStackedLines(document.getElementById("perks-title"), ["Why Work", "With Us"]);
    const perksGrid = document.getElementById("perks-grid");
    PERKS.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "perk-card";
      card.innerHTML =
        '<div class="perk-card-icon">' + PERK_ICONS[p.slug] + "</div>" +
        '<div class="perk-card-body"><h3>' + p.name + "</h3><p>" + p.desc + "</p></div>";
      perksGrid.appendChild(card);
      attachInview(card, {
        from: { opacity: 0, y: 28 },
        to: { opacity: 1, y: 0 },
        config: { tension: 190, friction: 26 },
        delayIn: i * 100,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    /* open roles */
    const rolesList = document.getElementById("careers-roles-list");
    ROLES.forEach((row, i) => {
      const li = document.createElement("li");
      li.className = "career-row";
      const a = document.createElement("a");
      a.href = "/careers/" + row.slug;
      a.className = "career-row-inner";
      a.innerHTML =
        '<span class="career-index">' + row.index + "</span>" +
        '<span class="career-body">' +
        '<span class="career-name">' + row.name + "</span>" +
        '<span class="career-meta">' + row.tags.map((t) => '<span class="career-tag">' + t + "</span>").join("") + "</span>" +
        "</span>" +
        '<span class="career-arrow">' + ICON_ARROW + "</span>";
      li.appendChild(a);
      rolesList.appendChild(li);

      attachInview(li, {
        from: { opacity: 0, y: 26 },
        to: { opacity: 1, y: 0 },
        config: { tension: 190, friction: 26 },
        delayIn: i * 90,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
      const arrowGroup = a.querySelector(".career-arrow");
      attachHover(a, {
        from: { x: 0, opacity: 0.55 },
        to: { x: 8, opacity: 1 },
        config: { tension: 300, friction: 20 },
        apply: (el, v) => {
          arrowGroup.style.transform = "translateX(" + v.x + "px)";
          arrowGroup.style.opacity = v.opacity;
        },
      });
    });

    /* cta */
    attachInview(document.getElementById("careers-page-cta"), {
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
    <div id="careers-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner">
          <p className="eyebrow light">Careers</p>
          <h1 id="careers-intro-title" className="page-intro-title"></h1>
          <p className="page-intro-body" id="careers-intro-body">
            We&apos;re a small, senior team — no bloated account layers, no busywork. If you want ownership over real client outcomes, you&apos;ll fit right in.
          </p>
        </div>
      </section>

      <section className="perks">
        <p className="eyebrow dark">Why Acentics</p>
        <h2 id="perks-title" className="perks-title"></h2>
        <div className="perks-grid" id="perks-grid"></div>
      </section>

      <section className="careers-roles" id="open-roles">
        <p className="eyebrow dark">Open roles</p>
        <h2 className="careers-roles-title">Current Openings</h2>
        <ul className="careers-list" id="careers-roles-list"></ul>
      </section>

      <section className="page-cta" id="careers-page-cta">
        <p className="page-cta-title">Don&apos;t see your role? We&apos;re always open to meeting great people.</p>
        <a href="mailto:careers@acentics.com" className="pill-btn solid">
          Email Us
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>
    </div>
  );
}
