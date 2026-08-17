"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import {
  EASE_IN_OUT_CUBIC,
  EASE_OUT_QUART,
  animateSpring,
  attachHover,
  stackedLines,
  playUnits,
  resetUnits,
  startSharedRaf,
  stopSharedRaf,
  wireSmoothAnchors,
  wirePillButtonHover,
  pageEnterTransition,
} from "../lib/motion";
import { SiteContext } from "../lib/site-context";
import ScrollToTop from "./ScrollToTop";
import BrandMark from "./BrandMark";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 4l16 16M20 4L4 20" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7.5 10.5v6" />
      <circle cx="7.5" cy="7.4" r="0.6" fill="currentColor" stroke="none" />
      <path d="M12 16.5v-3.75c0-1.5.95-2.5 2.25-2.5S16.5 11.25 16.5 12.75v3.75" />
    </svg>
  );
}

export default function SiteChrome({ children }) {
  const chromeRootRef = useRef(null);
  const openModalRef = useRef(() => {});
  const scrollToRef = useRef(() => {});
  const readyRef = useRef(false);
  const readyCallbacksRef = useRef([]);
  const finishRouteProgressRef = useRef(() => {});
  const isFirstPathnameRef = useRef(true);
  const pathname = usePathname();

  useEffect(() => {
    const chromeRoot = chromeRootRef.current;

    /* ================= adaptive font scale ================= */
    function updateFontScale() {
      const FONT_BASE = 16,
        BASE_W = 1920,
        COEF = 0.6666;
      const reduction = ((BASE_W - window.innerWidth) / BASE_W) * 100 * COEF;
      const size = FONT_BASE - (FONT_BASE * reduction) / 100;
      if (size > FONT_BASE) document.documentElement.style.fontSize = size + "px";
      else document.documentElement.style.removeProperty("font-size");
    }
    updateFontScale();
    window.addEventListener("resize", updateFontScale);

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    startSharedRaf();

    /* ================= lenis ================= */
    const lenis = new Lenis({ smoothWheel: true });
    function raf(t) {
      lenis.raf(t);
      lenisRafId = requestAnimationFrame(raf);
    }
    let lenisRafId = requestAnimationFrame(raf);
    window.scrollTo(0, 0);
    scrollToRef.current = (target) => lenis.scrollTo(target);

    let lockCount = 0;
    function lockScroll() {
      lockCount++;
      document.documentElement.classList.add("lock");
      lenis.stop();
    }
    function unlockScroll() {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.documentElement.classList.remove("lock");
        lenis.start();
      }
    }

    /* ================= loader ================= */
    const loaderEl = document.getElementById("loader");
    const loaderMarkEl = document.getElementById("loader-mark");
    const loaderFillEl = document.getElementById("loader-fill");

    const MIN_VISIBLE_MS = prefersReduced ? 200 : 1400;
    const MAX_VISIBLE_MS = prefersReduced ? 200 : 2600;
    const EXIT_MS = prefersReduced ? 0 : 850;

    function onReady(cb) {
      if (readyRef.current) cb();
      else readyCallbacksRef.current.push(cb);
    }

    lockScroll();

    animateSpring({ opacity: 0, y: 16 }, { opacity: 1, y: 0 }, { tension: 200, friction: 22 }, (v) => {
      loaderMarkEl.style.opacity = v.opacity;
      loaderMarkEl.style.transform = "translateY(" + v.y + "px)";
    });

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        loaderFillEl.style.transition =
          "transform " + Math.max(MIN_VISIBLE_MS - 120, 60) + "ms " + EASE_IN_OUT_CUBIC + " 120ms";
        loaderFillEl.style.transform = "scaleX(1)";
      })
    );

    /* ================= header entrance: drop in as a circle, then expand into the pill ================= */
    const headerEl = document.querySelector(".site-header");
    const headerBrandEl = headerEl.querySelector(".header-brand");
    const headerRightEl = headerEl.querySelector(".header-right");
    let headerRevealTimer = null;
    const headerRevealSubTimers = [];
    let headerFinalWidth = 0;
    let headerCircleSize = 0;
    const HEADER_DROP_MS = 950;
    if (!prefersReduced) {
      const headerRect = headerEl.getBoundingClientRect();
      headerFinalWidth = headerRect.width;
      headerCircleSize = headerRect.height;
      headerEl.style.overflow = "hidden";
      headerEl.style.width = headerCircleSize + "px";
      headerEl.style.height = headerCircleSize + "px";
      headerEl.style.opacity = "0";
      headerEl.style.transform = "translate(-50%, -140px)";
      headerBrandEl.style.opacity = "0";
      headerRightEl.style.opacity = "0";
    }
    function revealHeader() {
      if (prefersReduced) return;
      /* phase 1: realistic gravity drop + decaying bounce, held to a true circle (locked width+height) */
      headerEl.style.transform = "";
      headerEl.style.opacity = "";
      headerEl.style.animation = "header-drop-bounce " + HEADER_DROP_MS + "ms forwards";
      headerRevealSubTimers.push(setTimeout(() => { headerEl.style.animation = ""; }, HEADER_DROP_MS + 20));

      /* phase 2: expand into the pill once the bounce has settled */
      headerRevealSubTimers.push(
        setTimeout(() => {
          animateSpring({ w: headerCircleSize }, { w: headerFinalWidth }, { tension: 150, friction: 22 }, (v) => {
            headerEl.style.width = v.w + "px";
          }, () => {
            headerEl.style.width = "";
            headerEl.style.height = "";
            headerEl.style.overflow = "";
          });
        }, HEADER_DROP_MS - 30)
      );
      /* phase 3: fade the logo/buttons in once the pill has mostly formed */
      headerRevealSubTimers.push(
        setTimeout(() => {
          animateSpring({ opacity: 0 }, { opacity: 1 }, { tension: 220, friction: 26 }, (v) => {
            headerBrandEl.style.opacity = v.opacity;
            headerRightEl.style.opacity = v.opacity;
          });
        }, HEADER_DROP_MS + 280)
      );
    }

    let exited = false;
    let loaderRemoveTimer = null;
    function startExit() {
      if (exited) return;
      exited = true;
      readyRef.current = true;
      readyCallbacksRef.current.forEach((cb) => cb());
      readyCallbacksRef.current = [];
      unlockScroll();
      loaderEl.classList.add("exit");
      loaderRemoveTimer = setTimeout(() => loaderEl.remove(), EXIT_MS + 20);
      headerRevealTimer = setTimeout(revealHeader, prefersReduced ? 0 : Math.max(EXIT_MS - 70, 0));
    }
    let loadFired = false;
    let minVisibleTimer = null;
    let maxVisibleTimer = null;
    function onLoadReached() {
      if (loadFired) return;
      loadFired = true;
      minVisibleTimer = setTimeout(startExit, MIN_VISIBLE_MS);
    }
    if (document.readyState === "complete") onLoadReached();
    else window.addEventListener("load", onLoadReached);
    maxVisibleTimer = setTimeout(() => {
      if (!loadFired) startExit();
    }, MAX_VISIBLE_MS);

    /* ================= chrome-scoped smooth-scroll + pill hover ================= */
    wireSmoothAnchors(chromeRoot, (target) => lenis.scrollTo(target));
    wirePillButtonHover(chromeRoot);

    /* ================= route transition: top loading bar ================= */
    const progressBarEl = document.getElementById("route-progress-bar");
    const PROGRESS_MIN_MS = 320;
    let progressActive = false;
    let progressStartTime = 0;
    let progressTimer = null;

    function startRouteProgress() {
      if (progressActive) return;
      progressActive = true;
      progressStartTime = performance.now();
      clearTimeout(progressTimer);
      progressBarEl.style.transition = "none";
      progressBarEl.style.width = "0%";
      progressBarEl.style.opacity = "1";
      void progressBarEl.offsetWidth;
      progressBarEl.style.transition = "width 3200ms " + EASE_OUT_QUART + ", opacity 200ms ease";
      progressBarEl.style.width = "78%";
    }
    function finishRouteProgress() {
      if (!progressActive) return;
      const wait = Math.max(0, PROGRESS_MIN_MS - (performance.now() - progressStartTime));
      clearTimeout(progressTimer);
      progressTimer = setTimeout(() => {
        progressActive = false;
        progressBarEl.style.transition = "width 260ms " + EASE_OUT_QUART;
        progressBarEl.style.width = "100%";
        progressTimer = setTimeout(() => {
          progressBarEl.style.transition = "opacity 200ms ease";
          progressBarEl.style.opacity = "0";
          progressTimer = setTimeout(() => {
            progressBarEl.style.transition = "none";
            progressBarEl.style.width = "0%";
          }, 220);
        }, 260);
      }, wait);
    }
    finishRouteProgressRef.current = finishRouteProgress;

    function isInternalNavAnchor(e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
      const a = e.target.closest("a[href]");
      if (!a) return null;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return null;
      if (a.target && a.target !== "_self") return null;
      if (/^https?:\/\//.test(href) && !href.startsWith(window.location.origin)) return null;
      return a;
    }
    function onNavClick(e) {
      const a = isInternalNavAnchor(e);
      if (!a) return;
      let url;
      try {
        url = new URL(a.getAttribute("href"), window.location.href);
      } catch {
        return;
      }
      if (url.pathname === window.location.pathname) return;
      startRouteProgress();
    }
    chromeRoot.addEventListener("click", onNavClick);

    /* ================= header ================= */
    document.getElementById("header-book-btn").addEventListener("click", () => openModal());

    /* ================= contact modal ================= */
    const modalOverlay = document.getElementById("modal-overlay");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const modalPanel = document.getElementById("modal-panel");
    let modalOpen = false;
    let modalTitleUnits = null;

    function openModal() {
      if (modalOpen) return;
      modalOpen = true;
      modalOverlay.classList.add("open");
      lockScroll();
      animateSpring({ opacity: 0 }, { opacity: 1 }, { tension: 240, friction: 30 }, (v) => {
        modalBackdrop.style.opacity = v.opacity;
      });
      animateSpring({ opacity: 0, y: 28, scale: 0.96 }, { opacity: 1, y: 0, scale: 1 }, { tension: 240, friction: 26 }, (v) => {
        modalPanel.style.opacity = v.opacity;
        modalPanel.style.transform = "translateY(" + v.y + "px) scale(" + v.scale + ")";
      });
      if (!modalTitleUnits) modalTitleUnits = stackedLines(document.getElementById("modal-title"), ["Let's talk", "growth"], { stagger: 90, duration: 800 });
      else resetUnits(modalTitleUnits);
      playUnits(modalTitleUnits);
      setTimeout(() => document.getElementById("f-name").focus(), 120);
    }
    function closeModal() {
      if (!modalOpen) return;
      modalOpen = false;
      modalOverlay.classList.remove("open");
      unlockScroll();
      animateSpring({ opacity: 1 }, { opacity: 0 }, { tension: 240, friction: 30 }, (v) => {
        modalBackdrop.style.opacity = v.opacity;
      });
      animateSpring({ opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: 28, scale: 0.96 }, { tension: 240, friction: 26 }, (v) => {
        modalPanel.style.opacity = v.opacity;
        modalPanel.style.transform = "translateY(" + v.y + "px) scale(" + v.scale + ")";
      });
      setTimeout(() => {
        const form = document.getElementById("modal-form");
        form.reset();
        form.style.display = "";
        document.getElementById("modal-success").classList.remove("show");
      }, 350);
    }
    openModalRef.current = openModal;
    modalBackdrop.addEventListener("click", closeModal);
    document.getElementById("modal-close").addEventListener("click", closeModal);

    document.getElementById("modal-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = document.getElementById("modal-submit-btn");
      const label = document.getElementById("modal-submit-label");
      const nameVal = document.getElementById("f-name").value.trim();
      btn.disabled = true;
      label.textContent = "Sending…";
      setTimeout(() => {
        document.getElementById("modal-form").style.display = "none";
        document.getElementById("modal-success-text").textContent =
          "Thanks, " + (nameVal.split(" ")[0] || "there") + " — our team will be in touch to schedule your call.";
        document.getElementById("modal-success").classList.add("show");
        btn.disabled = false;
        label.textContent = "Request a call";
      }, 700);
    });
    document.getElementById("modal-done-btn").addEventListener("click", closeModal);

    /* ================= fullscreen menu overlay ================= */
    const menuOverlay = document.getElementById("menu-overlay");
    const menuBackdrop = document.getElementById("menu-backdrop");
    const menuPanel = document.getElementById("menu-panel");
    const menuLinks = Array.prototype.slice.call(document.querySelectorAll("#menu-nav a"));
    let menuOpen = false;

    function openMenu() {
      if (menuOpen) return;
      menuOpen = true;
      menuOverlay.classList.add("open");
      lockScroll();
      animateSpring({ opacity: 0 }, { opacity: 1 }, { tension: 260, friction: 30 }, (v) => {
        menuBackdrop.style.opacity = v.opacity;
      });
      animateSpring({ opacity: 0, y: -24 }, { opacity: 1, y: 0 }, { tension: 220, friction: 28 }, (v) => {
        menuPanel.style.opacity = v.opacity;
        menuPanel.style.transform = "translateY(" + v.y + "px)";
      });
      menuLinks.forEach((a, i) => {
        a.style.opacity = "0";
        a.style.transform = "translateY(28px)";
        setTimeout(() => {
          animateSpring({ opacity: 0, y: 28 }, { opacity: 1, y: 0 }, { tension: 200, friction: 26 }, (v) => {
            a.style.opacity = v.opacity;
            a.style.transform = "translateY(" + v.y + "px)";
          });
        }, 120 + i * 70);
      });
    }
    function closeMenu() {
      if (!menuOpen) return;
      menuOpen = false;
      menuOverlay.classList.remove("open");
      unlockScroll();
      animateSpring({ opacity: 1 }, { opacity: 0 }, { tension: 260, friction: 30 }, (v) => {
        menuBackdrop.style.opacity = v.opacity;
      });
      animateSpring({ opacity: 1, y: 0 }, { opacity: 0, y: -24 }, { tension: 220, friction: 28 }, (v) => {
        menuPanel.style.opacity = v.opacity;
        menuPanel.style.transform = "translateY(" + v.y + "px)";
      });
    }
    document.getElementById("burger-btn").addEventListener("click", openMenu);
    menuBackdrop.addEventListener("click", closeMenu);
    document.getElementById("menu-close").addEventListener("click", closeMenu);
    menuLinks.forEach((a) =>
      a.addEventListener("click", () => {
        closeMenu();
      })
    );
    document.getElementById("menu-book-btn").addEventListener("click", () => {
      closeMenu();
      setTimeout(openModal, 60);
    });

    function onKeyDown(e) {
      if (e.key === "Escape") {
        if (modalOpen) closeModal();
        if (menuOpen) closeMenu();
      }
    }
    document.addEventListener("keydown", onKeyDown);

    /* ================= close-icon rotate hover (modal + menu) ================= */
    document.querySelectorAll(".modal-close, .menu-close").forEach((btn) => {
      const icon = btn.querySelector("svg");
      attachHover(btn, {
        from: { rotate: 0 },
        to: { rotate: 90 },
        config: { tension: 300, friction: 18 },
        apply: (el, v) => {
          icon.style.transform = "rotate(" + v.rotate + "deg)";
        },
      });
    });

    return () => {
      window.removeEventListener("resize", updateFontScale);
      window.removeEventListener("load", onLoadReached);
      document.removeEventListener("keydown", onKeyDown);
      chromeRoot.removeEventListener("click", onNavClick);
      clearTimeout(progressTimer);
      stopSharedRaf();
      cancelAnimationFrame(lenisRafId);
      if (loaderRemoveTimer) clearTimeout(loaderRemoveTimer);
      if (minVisibleTimer) clearTimeout(minVisibleTimer);
      if (maxVisibleTimer) clearTimeout(maxVisibleTimer);
      if (headerRevealTimer) clearTimeout(headerRevealTimer);
      headerRevealSubTimers.forEach((t) => clearTimeout(t));
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isFirstPathnameRef.current) {
      isFirstPathnameRef.current = false;
      return;
    }
    finishRouteProgressRef.current();
    const pageRoot = document.getElementById("page-transition-root");
    if (pageRoot) pageEnterTransition(pageRoot);
  }, [pathname]);

  const contextValue = useMemo(
    () => ({
      openModal: () => openModalRef.current(),
      onReady: (cb) => {
        if (readyRef.current) cb();
        else readyCallbacksRef.current.push(cb);
      },
      scrollTo: (target) => scrollToRef.current(target),
    }),
    []
  );

  return (
    <SiteContext.Provider value={contextValue}>
      <div ref={chromeRootRef}>
        <div className="route-progress" aria-hidden="true">
          <div className="route-progress-bar" id="route-progress-bar"></div>
        </div>

        <div className="loader" id="loader">
          <div className="loader-mark" id="loader-mark">
            <BrandMark className="brand-logo" />
          </div>
          <div className="loader-track">
            <div className="loader-fill" id="loader-fill"></div>
          </div>
        </div>

        <header className="site-header">
          <div className="header-brand">
            <Link href="/" className="header-brand-inner">
              <BrandMark className="brand-logo" />
            </Link>
          </div>
          <div className="header-right">
            <button type="button" className="book-visit-btn" id="header-book-btn">
              Book a Call
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <button type="button" className="burger" id="burger-btn" aria-label="Open menu">
              <span className="burger-bars">
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </header>

        <main id="main">
          <div className="page-transition" id="page-transition-root">
            {children}
          </div>

          <footer className="footer mt-3" id="contact">
            <div className="footer-cta">
              <div>
                <p className="eyebrow light">Get started</p>
                <p id="footer-cta-title" className="footer-cta-title">
                  Ready to grow?
                </p>
              </div>
              <button type="button" className="pill-btn light" id="footer-book-btn">
                Book a Call
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="footer-cols">
              <div className="footer-brand">
                <div className="footer-brand-mark">
                  <BrandMark className="brand-logo" />
                </div>
                <p>A marketing agency where sharp strategy meets craft — built for brands that want to grow.</p>
                <address className="footer-address">
                  <a href="mailto:contact@acentics.com">contact@acentics.com</a>
                  <a href="tel:+918904637520">+91 89046 37520</a>
                </address>
              </div>
              <nav className="footer-nav">
                <h4>Services</h4>
                <ul>
                  <li>
                    <Link href="/services#branding">Branding</Link>
                  </li>
                  <li>
                    <Link href="/services#graphic-design">Graphic Design</Link>
                  </li>
                  <li>
                    <Link href="/services#email-marketing">Email Marketing</Link>
                  </li>
                  <li>
                    <Link href="/services#press-release">Public Relations</Link>
                  </li>
                  <li>
                    <Link href="/services#seo">SEO</Link>
                  </li>
                  <li>
                    <Link href="/services#influencer-marketing">Influencer Marketing</Link>
                  </li>
                  <li>
                    <Link href="/services#website-development">Website Development</Link>
                  </li>
                </ul>
              </nav>
              <nav className="footer-nav">
                <h4>Agency</h4>
                <ul>
                  <li>
                    <Link href="/about">About Us</Link>
                  </li>
                  <li>
                    <Link href="/careers">Careers</Link>
                  </li>
                  <li>
                    <Link href="/blog">Blog</Link>
                  </li>
                </ul>
              </nav>
              <nav className="footer-nav">
                <h4>Company</h4>
                <ul>
                  <li>
                    <Link href="/press">Press</Link>
                  </li>
                  <li>
                    <Link href="/partnership">Partnership</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact</Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="footer-bottom">
              <p>© 2026 Acentics. All rights reserved.</p>
              <nav className="social-icons" aria-label="Social">
                <a href="#instagram" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#x" aria-label="X">
                  <XIcon />
                </a>
                <a href="#youtube" aria-label="YouTube">
                  <YouTubeIcon />
                </a>
                <a href="#linkedin" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
              </nav>
              <nav aria-label="Legal">
                <Link href="/privacy">Privacy</Link>
                <Link href="/terms">Terms</Link>
              </nav>
            </div>
          </footer>
        </main>

        <div className="modal-overlay" id="modal-overlay">
          <div className="modal-backdrop" id="modal-backdrop"></div>
          <div className="modal-panel" id="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-head">
              <div>
                <p className="eyebrow dark">Book a call</p>
                <h2 id="modal-title"></h2>
              </div>
              <button type="button" className="modal-close" id="modal-close" aria-label="Close">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <form className="modal-form" id="modal-form" noValidate>
              <div className="field">
                <label htmlFor="f-name">Full name</label>
                <input id="f-name" name="name" type="text" placeholder="Alex Rivera" required />
              </div>
              <div className="field">
                <label htmlFor="f-email">Email</label>
                <input id="f-email" name="email" type="email" placeholder="you@email.com" required />
              </div>
              <div className="field">
                <label htmlFor="f-msg">What are you looking to grow?</label>
                <textarea id="f-msg" name="message" rows="3" placeholder="We need help with paid media and a brand refresh…"></textarea>
              </div>
              <button type="submit" className="pill-btn solid modal-submit" id="modal-submit-btn">
                <span id="modal-submit-label">Request a call</span>
              </button>
            </form>
            <div className="modal-success" id="modal-success">
              <div className="check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3>Request received</h3>
              <p id="modal-success-text">Thanks, there — our team will be in touch to schedule your call.</p>
              <button type="button" className="pill-btn solid" id="modal-done-btn">
                Done
              </button>
            </div>
          </div>
        </div>

        <div className="menu-overlay" id="menu-overlay">
          <div className="menu-backdrop" id="menu-backdrop"></div>
          <div className="menu-panel" id="menu-panel">
            <div className="menu-panel-inner">
              <div className="menu-top">
                <span className="brand">
                  <BrandMark className="brand-logo" />
                </span>
                <button type="button" className="menu-close" id="menu-close" aria-label="Close menu">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              <nav className="menu-nav" id="menu-nav">
                <div className="menu-nav-primary">
                  <Link href="/services" className={pathname === "/services" ? "active" : undefined}>
                    <span className="menu-nav-index">01</span>
                    Services
                  </Link>
                  <Link href="/about" className={pathname === "/about" ? "active" : undefined}>
                    <span className="menu-nav-index">02</span>
                    About
                  </Link>
                  <Link href="/careers" className={pathname === "/careers" ? "active" : undefined}>
                    <span className="menu-nav-index">03</span>
                    Careers
                  </Link>
                </div>
                <div className="menu-nav-secondary">
                  <Link href="/contact">Contact</Link>
                  <Link href="/support">Support</Link>
                  <Link href="/blog">Blog</Link>
                  <Link href="/partnership">Partnership</Link>
                </div>
              </nav>
              <div className="menu-bottom">
                <div className="menu-bottom-main">
                  <button type="button" className="pill-btn light" id="menu-book-btn">
                    Book a Call
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                  <a href="mailto:contact@acentics.com" className="menu-contact-email">
                    contact@acentics.com
                  </a>
                </div>
                <nav className="menu-social" aria-label="Social">
                  <a href="#instagram" aria-label="Instagram">
                    <InstagramIcon />
                  </a>
                  <a href="#x" aria-label="X">
                    <XIcon />
                  </a>
                  <a href="#youtube" aria-label="YouTube">
                    <YouTubeIcon />
                  </a>
                  <a href="#linkedin" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <ScrollToTop />
      </div>
    </SiteContext.Provider>
  );
}
