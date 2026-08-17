"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { attachInview, attachInviewAndHover, inviewStackedLines, wireSmoothAnchors, wirePillButtonHover } from "../lib/motion";

const OTHER_WAYS = [
  { name: "Careers", desc: "See open roles and what it's like to work here.", href: "/careers" },
  { name: "Support", desc: "Get help with an active engagement or billing.", href: "/support" },
  { name: "Partnership", desc: "Explore referral, agency, and tech partnerships.", href: "/partnership" },
  { name: "Press", desc: "Media resources and press contact information.", href: "/press" },
];

export default function ContactContent() {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    inviewStackedLines(document.getElementById("contact-intro-title"), ["Let's Talk", "Growth"], { duration: 900 });
    const introBodyEl = document.getElementById("contact-intro-body");
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

    attachInview(document.getElementById("contact-form-wrap"), {
      from: { opacity: 0, y: 24 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 26 },
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });
    attachInview(document.getElementById("contact-info"), {
      from: { opacity: 0, y: 24 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 26 },
      delayIn: 100,
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });

    document.querySelectorAll(".contact-link-card").forEach((card, i) => {
      attachInviewAndHover(
        card,
        { from: { opacity: 0, y: 28 }, to: { opacity: 1, y: 0 }, config: { tension: 190, friction: 26 }, delayIn: i * 90 },
        { from: { y: 0 }, to: { y: -6 }, config: { tension: 300, friction: 24 } }
      );
    });

    const form = document.getElementById("contact-page-form");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = document.getElementById("contact-page-submit-btn");
      const label = document.getElementById("contact-page-submit-label");
      const nameVal = document.getElementById("c-name").value.trim();
      btn.disabled = true;
      label.textContent = "Sending…";
      setTimeout(() => {
        form.style.display = "none";
        document.getElementById("contact-page-success-text").textContent =
          "Thanks, " + (nameVal.split(" ")[0] || "there") + " — our team will be in touch within one business day.";
        document.getElementById("contact-page-success").classList.add("show");
        btn.disabled = false;
        label.textContent = "Send Message";
      }, 700);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="contact-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner">
          <p className="eyebrow light">Contact</p>
          <h1 id="contact-intro-title" className="page-intro-title"></h1>
          <p className="page-intro-body" id="contact-intro-body">
            Tell us about your goals and we&apos;ll get back to you within one business day — no forms disappearing into a queue.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-grid">
          <div className="contact-form-wrap" id="contact-form-wrap">
            <h2>Send Us A Message</h2>
            <form className="modal-form" id="contact-page-form" noValidate>
              <div className="field">
                <label htmlFor="c-name">Full name</label>
                <input id="c-name" name="name" type="text" placeholder="Alex Rivera" required />
              </div>
              <div className="field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" name="email" type="email" placeholder="you@email.com" required />
              </div>
              <div className="field">
                <label htmlFor="c-company">Company</label>
                <input id="c-company" name="company" type="text" placeholder="Acme Inc." />
              </div>
              <div className="field">
                <label htmlFor="c-service">What are you looking to grow?</label>
                <select id="c-service" name="service" defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="branding">Branding</option>
                  <option value="graphic-design">Graphic Design</option>
                  <option value="email-marketing">Email Marketing</option>
                  <option value="public-relations">Public Relations</option>
                  <option value="seo">SEO</option>
                  <option value="influencer-marketing">Influencer Marketing</option>
                  <option value="website-development">Website Development</option>
                  <option value="other">Something else</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="c-msg">Message</label>
                <textarea id="c-msg" name="message" rows="4" placeholder="Tell us a bit about the project…"></textarea>
              </div>
              <button type="submit" className="pill-btn solid modal-submit" id="contact-page-submit-btn">
                <span id="contact-page-submit-label">Send Message</span>
              </button>
            </form>
            <div className="modal-success" id="contact-page-success">
              <div className="check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3>Message received</h3>
              <p id="contact-page-success-text">Thanks — our team will be in touch within one business day.</p>
            </div>
          </div>

          <div className="contact-info" id="contact-info">
            <div className="contact-info-block">
              <h3>Email</h3>
              <a href="mailto:contact@acentics.com">contact@acentics.com</a>
            </div>
            <div className="contact-info-block">
              <h3>Phone</h3>
              <a href="tel:+918904637520">+91 89046 37520</a>
            </div>
            <div className="contact-info-block">
              <h3>Response time</h3>
              <p>Within 1 business day</p>
            </div>
            <div className="contact-info-block">
              <h3>Availability</h3>
              <p>Mon – Sat, 10am – 7pm IST</p>
            </div>
            <div className="contact-info-block">
              <h3>Working with you</h3>
              <p>Remote-first, worldwide</p>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-links">
        <p className="eyebrow dark">Looking for something specific?</p>
        <h2 className="contact-links-title">Other Ways In</h2>
        <div className="contact-links-grid">
          {OTHER_WAYS.map((w) => (
            <Link href={w.href} className="contact-link-card" key={w.name}>
              <h3>{w.name}</h3>
              <p>{w.desc}</p>
              <span className="contact-link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
