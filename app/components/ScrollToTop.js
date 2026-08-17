"use client";

import { useEffect, useState } from "react";
import { useSite } from "../lib/site-context";

export default function ScrollToTop() {
  const { scrollTo } = useSite();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    function check() {
      setVisible(window.scrollY > 480);
      ticking = false;
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    check();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className={"scroll-top-btn" + (visible ? " visible" : "")}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => scrollTo(0)}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
