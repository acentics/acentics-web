"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSite } from "../lib/site-context";
import { ROLES } from "../lib/careers-data";
import {
  EASE_OUT_EXPO,
  ICON_HEART,
  ICON_SHIELD,
  ICON_SPARK,
  ICON_EXPAND,
  ICON_ARROW,
  ICON_COMPASS,
  ICON_LAYERS,
  ICON_MAIL,
  ICON_MEGAPHONE,
  ICON_SEARCH,
  ICON_USERS,
  ICON_CODE,
  ICON_TARGET,
  ICON_GRID,
  ICON_BRIEFCASE,
  ICON_TREND,
  addAnimator,
  removeAnimator,
  animateSpring,
  attachHover,
  attachInview,
  attachInviewAndHover,
  scrollProgress,
  renderWordReveal,
  playUnits,
  inviewStackedLines,
  inviewWordFade,
  wireSmoothAnchors,
  wirePillButtonHover,
  wireScrollWordOpacity,
} from "../lib/motion";

export default function HomeContent() {
  const rootRef = useRef(null);
  const { openModal, onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);
    const stopScrollWordOpacity = wireScrollWordOpacity(root);

    document.getElementById("hero-book-btn").addEventListener("click", () => openModal());

    /* ================= hero title / description / CTAs (loader-gated) ================= */
    const heroTitleUnits = renderWordReveal(document.getElementById("hero-title"), "clip", ["We", "Grow", "Brands"], {
      stagger: 140,
      duration: 1100,
      easing: EASE_OUT_EXPO,
      translateY: 115,
    });
    const heroDescEl = document.getElementById("hero-desc");
    const heroCtaEl = document.getElementById("hero-cta-group");
    heroDescEl.style.opacity = "0";
    heroDescEl.style.transform = "translateY(16px)";
    heroCtaEl.style.opacity = "0";
    heroCtaEl.style.transform = "translateY(16px)";
    onReady(() => {
      playUnits(heroTitleUnits);
      animateSpring({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { tension: 200, friction: 26 }, (v) => {
        heroDescEl.style.opacity = v.opacity;
        heroDescEl.style.transform = "translateY(" + v.y + "px)";
      });
      setTimeout(() => {
        animateSpring({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { tension: 200, friction: 26 }, (v) => {
          heroCtaEl.style.opacity = v.opacity;
          heroCtaEl.style.transform = "translateY(" + v.y + "px)";
        });
      }, 150);
    });

    /* ================= hero parallax bg (tracked for cleanup) ================= */
    const heroSection = document.getElementById("hero-section");
    const heroBgInner = document.getElementById("hero-bg-inner");
    const heroParallax = () => {
      const p = scrollProgress(heroSection);
      heroBgInner.style.transform = "translateY(" + p * 12 + "%)";
    };
    addAnimator(heroParallax);

    /* ================= about us: manifesto ================= */
    const aboutHeadingUnits = inviewStackedLines(document.getElementById("about-heading"), ["We Do This", "For A Single Reason"]);
    if (aboutHeadingUnits[1]) aboutHeadingUnits[1].style.color = "var(--ink-soft)";
    attachInview(document.getElementById("about-highlights"), {
      from: { opacity: 0, y: 16 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 26 },
      delayIn: 150,
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });

    /* ================= why choose us ================= */
    document.getElementById("why-heading").textContent = "A Partner Invested In Your Growth";
    document.getElementById("why-body").textContent =
      "Operating across every channel, we provide tailored strategy and execution — with the accountability of a true growth partner, not just a vendor.";
    attachInview(document.getElementById("why-visual"), {
      from: { opacity: 0, y: 32 },
      to: { opacity: 1, y: 0 },
      config: { tension: 180, friction: 26 },
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });
    const whyCardsData = [
      { tone: "surface", title: "Client-Centric Approach", desc: "Putting your goals first, delivering tailored strategy, and ensuring results at every step.", icon: ICON_HEART },
      { tone: "accent", title: "Integrity in Every Interaction", desc: "Operating with the highest ethical standards, fostering transparency, and building trust.", icon: ICON_SHIELD },
      { tone: "accent", title: "Innovation as a Driver", desc: "Embracing new channels, testing bold ideas, and staying ahead of the curve.", icon: ICON_SPARK },
      { tone: "surface", title: "Data at Our Core", desc: "Every decision backed by data, so results are measurable, not just deliverables.", icon: ICON_EXPAND },
    ];
    const whyCardsWrap = document.getElementById("why-cards");
    whyCardsData.forEach((c, i) => {
      const card = document.createElement("div");
      card.className = "why-card tone-" + c.tone;
      card.innerHTML =
        '<div class="why-card-icon">' + c.icon + "</div>" +
        "<div><h3>" + c.title + "</h3><p>" + c.desc + "</p></div>";
      whyCardsWrap.appendChild(card);
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

    /* ================= services (teaser grid, links out to /services) ================= */
    inviewStackedLines(document.getElementById("services-title"), ["Built for", "every brand"]);

    const serviceCardsData = [
      { slug: "branding", name: "Branding", desc: "Brand strategy, visual identity, and messaging systems built for lasting recognition.", icon: ICON_COMPASS },
      { slug: "graphic-design", name: "Graphic Design", desc: "Professional design across campaigns, packaging, and every brand touchpoint.", icon: ICON_LAYERS },
      { slug: "email-marketing", name: "Email Marketing", desc: "Automated lifecycle flows and campaigns engineered to convert subscribers into revenue.", icon: ICON_MAIL },
      { slug: "press-release", name: "Public Relations", desc: "Media relations and press strategy that earns coverage from outlets that matter.", icon: ICON_MEGAPHONE },
      { slug: "seo", name: "SEO", desc: "Technical audits, keyword strategy, and content built to grow organic rankings.", icon: ICON_SEARCH },
      { slug: "influencer-marketing", name: "Influencer Marketing", desc: "Vetted creator partnerships managed end-to-end, from outreach to performance reporting.", icon: ICON_USERS },
      { slug: "website-development", name: "Website Development", desc: "Custom-built, high-performance websites engineered for speed and conversion.", icon: ICON_CODE },
    ];
    const servicesGrid = document.getElementById("services-grid");
    serviceCardsData.forEach((s, i) => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.innerHTML =
        '<div class="service-card-top">' +
        '<div class="service-card-icon">' + s.icon + "</div>" +
        '<span class="service-card-index">' + String(i + 1).padStart(2, "0") + "</span>" +
        "</div>" +
        '<div class="service-card-body"><h3>' + s.name + "</h3><p>" + s.desc + "</p></div>" +
        '<a class="service-card-link" href="/services#' + s.slug + '">Learn more' + ICON_ARROW + "</a>";
      servicesGrid.appendChild(card);
      attachInviewAndHover(
        card,
        { from: { opacity: 0, y: 32 }, to: { opacity: 1, y: 0 }, config: { tension: 190, friction: 26 }, delayIn: i * 100 },
        { from: { y: 0 }, to: { y: -8 }, config: { tension: 300, friction: 24 } }
      );
      const linkEl = card.querySelector(".service-card-link");
      attachHover(linkEl, {
        from: { x: 0 },
        to: { x: 5 },
        config: { tension: 320, friction: 20 },
        apply: (el, v) => {
          el.querySelector("svg").style.transform = "translateX(" + v.x + "px)";
        },
      });
    });

    /* ================= how we work (process, 4-up) ================= */
    inviewStackedLines(document.getElementById("process-title"), ["A Process", "Built To Perform"]);

    const processStepsData = [
      { step: "01", name: "Discover", desc: "We dig into your business, audience, and competitive landscape before a single deliverable gets made.", icon: ICON_TARGET },
      { step: "02", name: "Strategy", desc: "We turn research into a clear plan — positioning, channels, and priorities mapped to your goals.", icon: ICON_GRID },
      { step: "03", name: "Execute", desc: "Our senior team designs, builds, and ships across every channel the strategy calls for.", icon: ICON_BRIEFCASE },
      { step: "04", name: "Optimize", desc: "We track what's working, cut what isn't, and reinvest in the channels driving real growth.", icon: ICON_TREND },
    ];
    const processGrid = document.getElementById("process-grid");
    processStepsData.forEach((s, i) => {
      const card = document.createElement("div");
      card.className = "process-card";
      card.innerHTML =
        '<div class="process-card-top">' +
        '<div class="process-card-icon">' + s.icon + "</div>" +
        '<span class="process-card-step">' + s.step + "</span>" +
        "</div>" +
        '<div class="process-card-body"><h3>' + s.name + "</h3><p>" + s.desc + "</p></div>";
      processGrid.appendChild(card);
      attachInview(card, {
        from: { opacity: 0, y: 32 },
        to: { opacity: 1, y: 0 },
        config: { tension: 190, friction: 26 },
        delayIn: i * 100,
        apply: (el, v) => {
          el.style.opacity = v.opacity;
          el.style.transform = "translateY(" + v.y + "px)";
        },
      });
    });

    /* ================= stats ================= */
    inviewStackedLines(document.getElementById("stats-title"), ["Results you", "can measure"]);
    const statsData = [
      { value: "120+", label: "Brands launched" },
      { value: "4.8x", label: "Average client ROAS" },
      { value: "150+", label: "Clients served" },
      { value: "11", label: "Years in business" },
    ];
    const statsGrid = document.getElementById("stats-grid");
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

    /* ================= careers (last section) ================= */
    inviewStackedLines(document.getElementById("careers-title"), ["Build Your", "Career With Us"]);
    inviewWordFade(
      document.getElementById("careers-intro"),
      "We're always looking for senior talent who want ownership, not just output. Explore open roles below.",
      { wordStagger: 24, delayIn: 150, duration: 650 }
    );
    attachInview(document.getElementById("careers-cta-btn"), {
      from: { opacity: 0, y: 16 },
      to: { opacity: 1, y: 0 },
      config: { tension: 200, friction: 26 },
      delayIn: 250,
      apply: (el, v) => {
        el.style.opacity = v.opacity;
        el.style.transform = "translateY(" + v.y + "px)";
      },
    });
    const careersList = document.getElementById("careers-list");
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
      careersList.appendChild(li);

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

    return () => {
      removeAnimator(heroParallax);
      stopScrollWordOpacity();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="home-page" ref={rootRef}>
      <section className="hero" id="hero-section">
        <div className="hero-bg-outer">
          <div className="hero-bg-inner" id="hero-bg-inner">
            <div className="hero-bg-pattern" aria-hidden="true"></div>
          </div>
          <div className="hero-bg-overlay"></div>
        </div>

        <div className="hero-content-bottom">
          <div className="hero-title-wrap">
            <h1 id="hero-title" className="hero-title"></h1>
          </div>

          <div className="hero-bottom">
            <p className="hero-desc" id="hero-desc">
              A senior team of strategists, creatives, and analysts who build brands that convert — from positioning to performance.
            </p>
            <div className="hero-cta-group" id="hero-cta-group">
              <button type="button" className="pill-btn light" id="hero-book-btn">
                Book a Call
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <Link href="/services" className="pill-btn outline-light">
                See Our Services
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <div className="about-manifesto">
          <div>
            <p className="eyebrow dark">About us</p>
            <h2 id="about-heading" className="about-heading"></h2>
            <div className="about-highlights" id="about-highlights">
              <div className="about-highlight">
                <span className="about-highlight-value">11+</span>
                <span className="about-highlight-label">Years in business</span>
              </div>
              <div className="about-highlight">
                <span className="about-highlight-value">150+</span>
                <span className="about-highlight-label">Brands served</span>
              </div>
              <div className="about-highlight">
                <span className="about-highlight-value">6</span>
                <span className="about-highlight-label">Countries, one team</span>
              </div>
            </div>
          </div>
          <div className="about-manifesto-body" id="about-manifesto-body">
            <p data-scroll-words>Our entire team works across time zones with clients who want a true partner — not just another vendor. That freedom is what attracts diverse, senior talent to Acentics.</p>
            <p data-scroll-words>Most agencies scale by adding layers. We scale by staying small, senior, and obsessively close to the work — because that’s where the best ideas actually come from.</p>
            <p data-scroll-words>Enter the Acentics model: strategists, creatives, and analysts embedded directly with your team, moving at the speed your business actually needs.</p>
            <p data-scroll-words>We measure ourselves the same way you measure us — by outcomes, not activity. Every engagement starts with a clear definition of what winning looks like, and we don’t stop until we get there.</p>
            <Link href="/about" className="manifesto-link">
              Read Our Manifesto
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="why" id="why">
        <div className="why-grid">
          <div className="why-visual" id="why-visual">
            <div className="why-visual-pattern" aria-hidden="true"></div>
            <span className="why-badge">Why Choose Us</span>
            <div className="why-visual-text">
              <h2 id="why-heading"></h2>
              <p id="why-body"></p>
            </div>
          </div>
          <div className="why-cards" id="why-cards"></div>
        </div>
      </section>

      <section className="services" id="services">
        <p className="eyebrow dark">What we do</p>
        <h2 id="services-title" className="services-title"></h2>
        <div className="services-grid" id="services-grid"></div>
      </section>

      <section className="process" id="how-we-work">
        <p className="eyebrow dark">How we work</p>
        <h2 id="process-title" className="process-title"></h2>
        <div className="process-grid" id="process-grid"></div>
      </section>

      <section className="stats mt-3" id="stats">
        <p className="eyebrow light">By the numbers</p>
        <h2 id="stats-title" className="stats-title"></h2>
        <dl className="stats-grid" id="stats-grid"></dl>
      </section>

      <section className="careers" id="careers">
        <div className="careers-head">
          <div>
            <p className="eyebrow dark">Careers</p>
            <h2 id="careers-title" className="careers-title"></h2>
          </div>
          <div className="careers-head-side">
            <p className="careers-intro" id="careers-intro"></p>
            <Link href="/careers" className="pill-btn solid" id="careers-cta-btn">
              View All Openings
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>
        </div>
        <ul className="careers-list" id="careers-list"></ul>
      </section>
    </div>
  );
}
