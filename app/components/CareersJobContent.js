"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { PERKS } from "../lib/careers-data";
import {
  ICON_EXPAND,
  ICON_TARGET,
  ICON_HEART,
  ICON_SPARK,
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

export default function CareersJobContent({ role }) {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    const introEl = document.getElementById("job-intro-inner");
    introEl.style.opacity = "0";
    introEl.style.transform = "translateY(18px)";
    onReady(() => {
      attachInview(introEl, {
        from: { opacity: 0, y: 18 },
        to: { opacity: 1, y: 0 },
        config: { tension: 200, friction: 26 },
        delayIn: 200,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    const fadeUpIds = ["job-overview-inner", "job-responsibilities", "job-requirements", "job-nice-inner", "apply-form-wrap"];
    fadeUpIds.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      attachInview(el, {
        from: { opacity: 0, y: 24 },
        to: { opacity: 1, y: 0 },
        config: { tension: 200, friction: 26 },
        delayIn: id === "job-requirements" ? 100 : 0,
        apply: (el2, v) => {
          el2.style.opacity = v.opacity;
          el2.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    inviewStackedLines(document.getElementById("perks-title"), ["What We", "Offer"]);
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

    const form = document.getElementById("apply-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = document.getElementById("apply-submit-btn");
      const label = document.getElementById("apply-submit-label");
      const nameVal = document.getElementById("a-name").value.trim();
      btn.disabled = true;
      label.textContent = "Sending…";
      setTimeout(() => {
        form.style.display = "none";
        document.getElementById("apply-success-text").textContent =
          "Thanks, " + (nameVal.split(" ")[0] || "there") + " — we'll review your application for " + role.name + " and be in touch soon.";
        document.getElementById("apply-success").classList.add("show");
        btn.disabled = false;
        label.textContent = "Submit Application";
      }, 700);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="careers-job-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner" id="job-intro-inner">
          <Link href="/careers" className="job-back-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
            All roles
          </Link>
          <h1 className="page-intro-title">{role.name}</h1>
          <p className="page-intro-body">{role.summary}</p>
          <div className="job-facts">
            <div className="job-fact">
              <span className="job-fact-label">Salary</span>
              <span className="job-fact-value">{role.salary}</span>
            </div>
            <div className="job-fact">
              <span className="job-fact-label">Team</span>
              <span className="job-fact-value">{role.team}</span>
            </div>
            <div className="job-fact">
              <span className="job-fact-label">Location</span>
              <span className="job-fact-value">{role.location}</span>
            </div>
          </div>
          <a href="#apply" className="pill-btn light">
            Apply Now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>
      </section>

      <section className="job-overview">
        <div className="job-overview-inner" id="job-overview-inner">
          <p className="eyebrow dark">About the role</p>
          <h2>{role.name}</h2>
          <p>{role.overview}</p>
        </div>
      </section>

      <section className="job-detail">
        <div className="job-detail-grid">
          <div className="job-detail-col" id="job-responsibilities">
            <h2>Responsibilities</h2>
            <ul className="job-detail-list">
              {role.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="job-detail-col" id="job-requirements">
            <h2>What We&apos;re Looking For</h2>
            <ul className="job-detail-list">
              {role.requirements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="job-nice">
        <div className="job-nice-inner" id="job-nice-inner">
          <h2>Nice To Have</h2>
          <p className="job-nice-note">Not required — but these make you stand out.</p>
          <ul className="job-detail-list">
            {role.niceToHave.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="perks">
        <p className="eyebrow dark">Why Acentics</p>
        <h2 id="perks-title" className="perks-title"></h2>
        <div className="perks-grid" id="perks-grid"></div>
      </section>

      <section className="apply-section" id="apply">
        <div className="apply-form-wrap" id="apply-form-wrap">
          <p className="eyebrow dark">Apply</p>
          <h2 className="apply-form-title">Apply for {role.name}</h2>
          <form className="modal-form" id="apply-form" noValidate>
            <div className="field">
              <label htmlFor="a-name">Full name</label>
              <input id="a-name" name="name" type="text" placeholder="Alex Rivera" required />
            </div>
            <div className="field">
              <label htmlFor="a-email">Email</label>
              <input id="a-email" name="email" type="email" placeholder="you@email.com" required />
            </div>
            <div className="field">
              <label htmlFor="a-phone">Phone</label>
              <input id="a-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
            </div>
            <div className="field">
              <label htmlFor="a-portfolio">Portfolio / LinkedIn URL</label>
              <input id="a-portfolio" name="portfolio" type="url" placeholder="https://" />
            </div>
            <div className="field">
              <label htmlFor="a-resume">Resume</label>
              <input id="a-resume" name="resume" type="file" accept=".pdf,.doc,.docx" />
            </div>
            <div className="field">
              <label htmlFor="a-msg">Why this role?</label>
              <textarea id="a-msg" name="message" rows="4" placeholder="A few sentences on why you're a fit…"></textarea>
            </div>
            <button type="submit" className="pill-btn solid modal-submit" id="apply-submit-btn">
              <span id="apply-submit-label">Submit Application</span>
            </button>
          </form>
          <div className="modal-success" id="apply-success">
            <div className="check">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3>Application received</h3>
            <p id="apply-success-text">Thanks — we&apos;ll review your application and be in touch soon.</p>
            <Link href="/careers" className="pill-btn solid">
              Back to all roles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
