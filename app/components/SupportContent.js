"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import { attachInview, inviewStackedLines, wireSmoothAnchors, wirePillButtonHover } from "../lib/motion";

const FAQS = [
  {
    q: "How do I get started with Acentics?",
    a: "Book a call through the site or email hello@acentics.com — we'll scope your engagement and have a plan back to you within a week.",
  },
  {
    q: "What's the typical response time for support requests?",
    a: "Active clients hear back within one business day, usually much sooner. Urgent issues are triaged the same day.",
  },
  {
    q: "Can I change the scope of an active engagement?",
    a: "Yes — reach out to your account lead and we'll re-scope together. There's no long-term lock-in on any engagement.",
  },
  {
    q: "Do you offer support outside of standard engagements?",
    a: "We offer ad-hoc consulting and fractional support for teams that need occasional senior input without a full retainer.",
  },
  {
    q: "How do I report an urgent issue?",
    a: "Email urgent@acentics.com or contact your account lead directly. Flagged issues are picked up the same business day.",
  },
  {
    q: "Where can I find invoices and account details?",
    a: "Billing questions go to billing@acentics.com — your account lead can also pull anything you need on a call.",
  },
];

export default function SupportContent() {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    inviewStackedLines(document.getElementById("support-intro-title"), ["We're Here", "To Help"], { duration: 900 });
    const introBodyEl = document.getElementById("support-intro-body");
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

    document.querySelectorAll(".faq-item").forEach((item, i) => {
      attachInview(item, {
        from: { opacity: 0, y: 22 },
        to: { opacity: 1, y: 0 },
        config: { tension: 190, friction: 26 },
        delayIn: i * 70,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    attachInview(document.getElementById("support-cta"), {
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
    <div id="support-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner">
          <p className="eyebrow light">Support</p>
          <h1 id="support-intro-title" className="page-intro-title"></h1>
          <p className="page-intro-body" id="support-intro-body">
            Questions about an active engagement, billing, or how we work? Our team typically responds within one business day.
          </p>
        </div>
      </section>

      <section className="faq-section">
        <p className="eyebrow dark">Common questions</p>
        <h2 className="faq-title">Frequently Asked</h2>
        <div className="faq-list">
          {FAQS.map((f) => (
            <div className="faq-item" key={f.q}>
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="support-contact">
        <p className="eyebrow light">Reach us directly</p>
        <h2 className="support-contact-title">Talk To A Human</h2>
        <div className="support-contact-grid">
          <div className="support-contact-item">
            <span className="support-contact-label">General support</span>
            <a href="mailto:hello@acentics.com">hello@acentics.com</a>
          </div>
          <div className="support-contact-item">
            <span className="support-contact-label">Urgent issues</span>
            <a href="mailto:urgent@acentics.com">urgent@acentics.com</a>
          </div>
          <div className="support-contact-item">
            <span className="support-contact-label">Billing</span>
            <a href="mailto:billing@acentics.com">billing@acentics.com</a>
          </div>
        </div>
      </section>

      <section className="page-cta" id="support-cta">
        <p className="page-cta-title">Can&apos;t find what you need? Just ask.</p>
        <a href="mailto:hello@acentics.com" className="pill-btn solid">
          Email Us
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </section>
    </div>
  );
}
