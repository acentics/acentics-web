"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import {
  ICON_USERS,
  ICON_LAYERS,
  ICON_CODE,
  attachInview,
  inviewStackedLines,
  wireSmoothAnchors,
  wirePillButtonHover,
} from "../lib/motion";

const PARTNER_TYPES = [
  {
    name: "Referral Partners",
    desc: "Introduce a client who needs strategy, media, or creative help and earn a share of the engagement for every introduction that converts.",
    icon: ICON_USERS,
  },
  {
    name: "Agency Partners",
    desc: "White-label our team as an extension of your own — we plug into your process for the disciplines you don't staff in-house.",
    icon: ICON_LAYERS,
  },
  {
    name: "Technology Partners",
    desc: "Build a joint offering with your platform or tool — from co-marketing to certified integration support for shared clients.",
    icon: ICON_CODE,
  },
];

const BENEFITS = [
  { name: "Revenue Share", desc: "Meaningful, ongoing compensation for referrals — not a one-time finder's fee." },
  { name: "Co-Marketing", desc: "Joint case studies, webinars, and content that put both brands in front of the right audience." },
  { name: "Priority Access", desc: "Partners get first access to our team's capacity and senior strategists for shared clients." },
  { name: "A Dedicated Lead", desc: "One point of contact on our side who knows your business and keeps things moving." },
];

export default function PartnershipContent() {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    inviewStackedLines(document.getElementById("partnership-intro-title"), ["Grow With Us,", "Not Just For Us"], { duration: 900 });
    const introBodyEl = document.getElementById("partnership-intro-body");
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

    inviewStackedLines(document.getElementById("partner-types-title"), ["Ways To", "Partner"]);
    const typesGrid = document.getElementById("partner-types-grid");
    PARTNER_TYPES.forEach((p, i) => {
      const card = document.createElement("div");
      card.className = "partner-card";
      card.innerHTML =
        '<div class="partner-card-icon">' + p.icon + "</div>" +
        '<div class="partner-card-body"><h3>' + p.name + "</h3><p>" + p.desc + "</p></div>";
      typesGrid.appendChild(card);
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

    document.querySelectorAll(".benefit-row").forEach((row, i) => {
      attachInview(row, {
        from: { opacity: 0, y: 20 },
        to: { opacity: 1, y: 0 },
        config: { tension: 190, friction: 26 },
        delayIn: i * 70,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    attachInview(document.getElementById("partnership-cta"), {
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
    <div id="partnership-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner">
          <p className="eyebrow light">Partnership</p>
          <h1 id="partnership-intro-title" className="page-intro-title"></h1>
          <p className="page-intro-body" id="partnership-intro-body">
            We work best alongside people who already have our clients&apos; trust — referral partners, complementary agencies, and platforms whose tools we recommend anyway.
          </p>
        </div>
      </section>

      <section className="partner-types">
        <p className="eyebrow dark">Ways to partner</p>
        <h2 id="partner-types-title" className="partner-types-title"></h2>
        <div className="partner-types-grid" id="partner-types-grid"></div>
      </section>

      <section className="partner-benefits">
        <p className="eyebrow light">Why partner with us</p>
        <h2 className="partner-benefits-title">What You Get</h2>
        <div className="benefit-list">
          {BENEFITS.map((b, i) => (
            <div className="benefit-row" key={b.name}>
              <span className="benefit-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="benefit-body">
                <h3>{b.name}</h3>
                <p>{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-cta" id="partnership-cta">
        <p className="page-cta-title">Think we&apos;d work well together?</p>
        <a href="mailto:partners@acentics.com" className="pill-btn solid">
          Start The Conversation
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>
    </div>
  );
}
