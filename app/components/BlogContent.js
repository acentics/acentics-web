"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import {
  ICON_TARGET,
  ICON_TREND,
  ICON_SEARCH,
  ICON_MAIL,
  ICON_USERS,
  ICON_CODE,
  attachInview,
  attachInviewAndHover,
  inviewStackedLines,
  wireSmoothAnchors,
  wirePillButtonHover,
} from "../lib/motion";

const POSTS = [
  {
    category: "Strategy",
    title: "Why Most Rebrands Fail in the First 90 Days",
    excerpt: "A new logo doesn't fix a positioning problem. The rebrands that stick start with the story, not the visual system.",
    read: "6 min read",
    date: "Jul 2026",
    icon: ICON_TARGET,
    tone: "a",
  },
  {
    category: "Growth",
    title: "The Real ROI of Fractional Marketing Teams",
    excerpt: "Full-time hires aren't always the answer. Here's how to think about the math before your next headcount request.",
    read: "5 min read",
    date: "Jul 2026",
    icon: ICON_TREND,
    tone: "b",
  },
  {
    category: "SEO",
    title: "SEO In 2026: What Actually Moves Rankings",
    excerpt: "Less about keyword density, more about entity relevance and answer quality. What we're seeing across client accounts.",
    read: "7 min read",
    date: "Jun 2026",
    icon: ICON_SEARCH,
    tone: "c",
  },
  {
    category: "Email Marketing",
    title: "Email Deliverability: The Metrics Nobody Tracks",
    excerpt: "Open rates lie. Here's what to watch instead if you actually want your emails landing in the inbox.",
    read: "4 min read",
    date: "Jun 2026",
    icon: ICON_MAIL,
    tone: "a",
  },
  {
    category: "Influencer Marketing",
    title: "How To Brief An Influencer Campaign That Converts",
    excerpt: "Most briefs are too vague or too controlling. The best-performing campaigns split the difference — here's how.",
    read: "6 min read",
    date: "May 2026",
    icon: ICON_USERS,
    tone: "b",
  },
  {
    category: "Web Development",
    title: "Website Speed Is A Brand Decision, Not Just A Dev One",
    excerpt: "Every extra second of load time is a design choice with a conversion cost attached. Treat it like one.",
    read: "5 min read",
    date: "May 2026",
    icon: ICON_CODE,
    tone: "c",
  },
];

export default function BlogContent() {
  const rootRef = useRef(null);
  const { onReady, scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;

    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    inviewStackedLines(document.getElementById("blog-intro-title"), ["Ideas Worth", "Stealing"], { duration: 900 });
    const introBodyEl = document.getElementById("blog-intro-body");
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

    const postsGrid = document.getElementById("blog-grid");
    POSTS.forEach((p, i) => {
      const card = document.createElement("article");
      card.className = "blog-card";
      card.innerHTML =
        '<div class="blog-card-image tone-' + p.tone + '"><div class="tile-icon">' + p.icon + "</div></div>" +
        '<div class="blog-card-body">' +
        '<span class="blog-card-tag">' + p.category + "</span>" +
        "<h3>" + p.title + "</h3>" +
        "<p>" + p.excerpt + "</p>" +
        '<div class="blog-card-meta"><span>' + p.date + "</span><span>" + p.read + "</span></div>" +
        "</div>";
      postsGrid.appendChild(card);
      attachInviewAndHover(
        card,
        { from: { opacity: 0, y: 32 }, to: { opacity: 1, y: 0 }, config: { tension: 190, friction: 26 }, delayIn: i * 90 },
        { from: { y: 0 }, to: { y: -6 }, config: { tension: 300, friction: 24 } }
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="blog-page" ref={rootRef}>
      <section className="page-intro">
        <div className="page-intro-pattern" aria-hidden="true"></div>
        <div className="page-intro-inner">
          <p className="eyebrow light">Blog</p>
          <h1 id="blog-intro-title" className="page-intro-title"></h1>
          <p className="page-intro-body" id="blog-intro-body">
            Notes from the team on strategy, growth, and what&apos;s actually working across our client accounts right now.
          </p>
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-grid" id="blog-grid"></div>
      </section>
    </div>
  );
}
