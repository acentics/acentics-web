/* ================= shared animation engine =================
 * Pure math/DOM helpers. Safe to import from any client component:
 * nothing here calls a browser API at module-evaluation time (only
 * inside function bodies, which only ever run client-side once a
 * component's useEffect invokes them).
 */

export const EASE_OUT_EXPO = "cubic-bezier(.16,1,.3,1)";
export const EASE_OUT_QUART = "cubic-bezier(.25,1,.5,1)";
export const EASE_IN_OUT_CUBIC = "cubic-bezier(.65,0,.35,1)";

/* icon markup (inline SVGs, replace photography) */
export const ICON_TARGET = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none"/></svg>';
export const ICON_TREND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15l5.5-5.5L13 13l7-7"/><path d="M16 6h4v4"/></svg>';
export const ICON_SPARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/></svg>';
export const ICON_BRIEFCASE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></svg>';
export const ICON_HEART = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.35-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 5c-2.5 4.65-9.5 9-9.5 9z"/></svg>';
export const ICON_SHIELD = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/></svg>';
export const ICON_EXPAND = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4H4v5"/><path d="M15 4h5v5"/><path d="M9 20H4v-5"/><path d="M15 20h5v-5"/></svg>';
export const ICON_ARROW = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
export const ICON_LAYERS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/></svg>';
export const ICON_CHAT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 1 1-3.4-6.5"/><path d="M21 4v5h-5"/></svg>';
export const ICON_COMPASS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M14.5 9.5L13 14l-4.5 1.5L10 11l4.5-1.5z"/></svg>';
export const ICON_GRID = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/></svg>';
export const ICON_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
export const ICON_MEGAPHONE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4a1 1 0 0 0 1 1h2l10 5V4L6 9H4a1 1 0 0 0-1 1z"/><path d="M18 9a5 5 0 0 1 0 6"/></svg>';
export const ICON_SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M20 20l-4.35-4.35"/></svg>';
export const ICON_USERS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.2"/><path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.4"/><path d="M15.8 13.2c2.3.4 4.2 2.4 4.2 5.3"/></svg>';
export const ICON_CODE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 6L2 12l6 6"/><path d="M16 6l6 6-6 6"/></svg>';

/* ================= tiny spring engine ================= */
export class Spring {
  constructor(value, config) {
    this.value = value;
    this.target = value;
    this.v = 0;
    this.config = config;
  }
  update(dt) {
    const tension = this.config.tension,
      friction = this.config.friction;
    const force = -tension * (this.value - this.target) - friction * this.v;
    this.v += force * dt;
    this.value += this.v * dt;
    return this.value;
  }
  settled() {
    return Math.abs(this.value - this.target) < 0.01 && Math.abs(this.v) < 0.01;
  }
}

export const animators = new Set();
export function addAnimator(fn) {
  animators.add(fn);
  return fn;
}
export function removeAnimator(fn) {
  animators.delete(fn);
}

export function animateSpring(fromObj, toObj, config, onUpdate, onDone) {
  const springs = {};
  for (const k in fromObj) springs[k] = new Spring(fromObj[k], config);
  for (const k in toObj) {
    if (springs[k]) springs[k].target = toObj[k];
    else springs[k] = new Spring(toObj[k], config);
  }
  function step(dt) {
    let allSettled = true;
    const vals = {};
    for (const k in springs) {
      springs[k].update(dt);
      vals[k] = springs[k].value;
      if (!springs[k].settled()) allSettled = false;
    }
    onUpdate(vals);
    if (allSettled) {
      removeAnimator(step);
      if (onDone) onDone();
    }
  }
  addAnimator(step);
  return step;
}

let lastT = 0;
export let sharedRafId = null;
export function rafLoop(t) {
  const dt = Math.min((t - lastT) / 1000, 0.05);
  lastT = t;
  animators.forEach((fn) => fn(dt));
  sharedRafId = requestAnimationFrame(rafLoop);
}
export function startSharedRaf() {
  lastT = performance.now();
  sharedRafId = requestAnimationFrame(rafLoop);
  return sharedRafId;
}
export function stopSharedRaf() {
  if (sharedRafId != null) cancelAnimationFrame(sharedRafId);
}

export function isMobile() {
  return window.innerWidth <= 768;
}

export function attachHover(el, opts) {
  const from = opts.from,
    to = opts.to,
    config = opts.config,
    apply = opts.apply;
  let current = Object.assign({}, from);
  apply(el, current);
  let activeStep = null;
  function go(target) {
    if (activeStep) removeAnimator(activeStep);
    activeStep = animateSpring(
      current,
      target,
      config,
      (v) => {
        current = v;
        apply(el, v);
      },
      () => {
        activeStep = null;
      }
    );
  }
  el.addEventListener("pointerenter", () => {
    if (isMobile()) return;
    go(to);
  });
  el.addEventListener("pointerleave", () => {
    if (isMobile()) return;
    go(from);
  });
}

export function attachInview(el, opts) {
  const from = opts.from,
    to = opts.to,
    config = opts.config,
    delayIn = opts.delayIn || 0,
    apply = opts.apply,
    threshold = opts.threshold || 0.15;
  apply(el, from);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.disconnect();
          setTimeout(() => animateSpring(from, to, config, (v) => apply(el, v)), delayIn);
        }
      });
    },
    { threshold }
  );
  io.observe(el);
}

export function attachInviewAndHover(el, inviewOpts, hoverOpts) {
  let baseY = inviewOpts.from.y,
    hoverY = 0,
    opacity = inviewOpts.from.opacity;
  function render() {
    el.style.opacity = opacity;
    el.style.transform = "translateY(" + (baseY + hoverY) + "px)";
  }
  render();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.disconnect();
          setTimeout(() => {
            animateSpring({ y: baseY, opacity: opacity }, { y: inviewOpts.to.y, opacity: inviewOpts.to.opacity }, inviewOpts.config, (v) => {
              baseY = v.y;
              opacity = v.opacity;
              render();
            });
          }, inviewOpts.delayIn || 0);
        }
      });
    },
    { threshold: 0.15 }
  );
  io.observe(el);
  let hstep = null;
  function goHover(target) {
    if (hstep) removeAnimator(hstep);
    hstep = animateSpring(
      { y: hoverY },
      { y: target },
      hoverOpts.config,
      (v) => {
        hoverY = v.y;
        render();
      },
      () => {
        hstep = null;
      }
    );
  }
  el.addEventListener("pointerenter", () => {
    if (isMobile()) return;
    goHover(hoverOpts.to.y);
  });
  el.addEventListener("pointerleave", () => {
    if (isMobile()) return;
    goHover(hoverOpts.from.y);
  });
}

export function scrollProgress(el) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const p = (vh - rect.top) / (vh + rect.height);
  return Math.min(1, Math.max(0, p));
}

/* fade + rise the page container in on route change */
export function pageEnterTransition(rootEl, opts) {
  opts = opts || {};
  const distance = opts.distance != null ? opts.distance : 18;
  const config = opts.config || { tension: 210, friction: 26 };
  rootEl.style.opacity = "0";
  rootEl.style.transform = "translateY(" + distance + "px)";
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      animateSpring({ opacity: 0, y: distance }, { opacity: 1, y: 0 }, config, (v) => {
        rootEl.style.opacity = v.opacity;
        rootEl.style.transform = "translateY(" + v.y + "px)";
      });
    });
  });
}

/* ================= text reveal primitives ================= */
export function renderWordReveal(el, mode, items, opts) {
  opts = opts || {};
  el.innerHTML = "";
  const stagger = opts.stagger != null ? opts.stagger : 140;
  const duration = opts.duration || 1100;
  const easing = opts.easing || EASE_OUT_EXPO;
  const baseDelay = opts.baseDelay || 0;
  const ty = opts.translateY != null ? opts.translateY : mode === "fade" ? 18 : 115;
  const units = [];
  items.forEach((text, i) => {
    const outer = document.createElement("span");
    outer.className = mode === "clip" ? "rv-clip" : "rv-fade";
    const inner = document.createElement("span");
    inner.className = "rv-inner";
    inner.textContent = text;
    inner.style.setProperty("--ty", mode === "fade" ? ty + "px" : ty + "%");
    inner.style.transitionDuration = duration + "ms";
    inner.style.transitionTimingFunction = easing;
    inner.style.transitionDelay = baseDelay + i * stagger + "ms";
    outer.appendChild(inner);
    el.appendChild(outer);
    if (i < items.length - 1) el.appendChild(document.createTextNode(" "));
    units.push(inner);
  });
  return units;
}
export function stackedLines(el, lines, opts) {
  opts = opts || {};
  el.innerHTML = "";
  const stagger = opts.stagger != null ? opts.stagger : 120;
  const duration = opts.duration || 950;
  const easing = opts.easing || EASE_OUT_EXPO;
  const baseDelay = opts.baseDelay || 0;
  const units = [];
  lines.forEach((text, i) => {
    const wrap = document.createElement("span");
    wrap.className = "rv-line-wrap";
    const inner = document.createElement("span");
    inner.className = "rv-line-inner";
    inner.textContent = text;
    inner.style.transitionDuration = duration + "ms";
    inner.style.transitionTimingFunction = easing;
    inner.style.transitionDelay = baseDelay + i * stagger + "ms";
    wrap.appendChild(inner);
    el.appendChild(wrap);
    units.push(inner);
  });
  return units;
}
export function playUnits(units) {
  requestAnimationFrame(() => requestAnimationFrame(() => units.forEach((u) => u.classList.add("in"))));
}
export function resetUnits(units) {
  units.forEach((u) => u.classList.remove("in"));
}

export function inviewStackedLines(el, lines, opts) {
  const units = stackedLines(el, lines, opts);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.disconnect();
          setTimeout(() => playUnits(units), (opts && opts.delayIn) || 0);
        }
      });
    },
    { threshold: 0.2 }
  );
  io.observe(el);
  return units;
}
/* ================= scoped wiring helpers =================
 * Take a root element so chrome (header/footer/modal/menu, mounted once)
 * and each page (remounted on every client-side navigation) can each wire
 * only the elements they own, instead of re-querying the whole document
 * and double-attaching listeners to elements that persist across routes.
 */
export function wireSmoothAnchors(root, scrollToFn) {
  root.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (a.hasAttribute("data-menu-link")) return;
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        scrollToFn(target);
      }
    });
  });
}

export function wirePillButtonHover(root) {
  root.querySelectorAll(".pill-btn").forEach((btn) => {
    const arrow = btn.querySelector("svg");
    if (!arrow) return;
    attachHover(btn, {
      from: { x: 0 },
      to: { x: 5 },
      config: { tension: 320, friction: 20 },
      apply: (el, v) => {
        arrow.style.transform = "translateX(" + v.x + "px)";
      },
    });
  });
}

/* words dim (minOpacity) to full opacity as they scroll through the
 * reading zone between topFrac/bottomFrac of viewport height — driven
 * every frame by scroll position, not a one-time trigger. */
export function wireScrollWordOpacity(root, opts) {
  opts = opts || {};
  const minOpacity = opts.minOpacity != null ? opts.minOpacity : 0.5;
  const topFrac = opts.topFrac != null ? opts.topFrac : 0.35;
  const bottomFrac = opts.bottomFrac != null ? opts.bottomFrac : 0.85;

  const spans = [];
  root.querySelectorAll("[data-scroll-words]").forEach((el) => {
    const words = el.textContent.split(" ");
    el.innerHTML = "";
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.className = "sw-word";
      span.textContent = word;
      el.appendChild(span);
      if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
      spans.push(span);
    });
  });

  function update() {
    const vh = window.innerHeight;
    const bottomY = vh * bottomFrac;
    const topY = vh * topFrac;
    spans.forEach((span) => {
      const rect = span.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      let t = (bottomY - centerY) / (bottomY - topY);
      t = Math.min(1, Math.max(0, t));
      span.style.opacity = minOpacity + t * (1 - minOpacity);
    });
  }
  addAnimator(update);
  return () => removeAnimator(update);
}

export function inviewWordFade(el, text, opts) {
  opts = opts || {};
  const words = text.split(" ");
  const units = renderWordReveal(el, "fade", words, {
    stagger: opts.wordStagger != null ? opts.wordStagger : 28,
    duration: opts.duration || 700,
    easing: EASE_OUT_QUART,
    baseDelay: 0,
    translateY: 18,
  });
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.disconnect();
          setTimeout(() => playUnits(units), opts.delayIn || 0);
        }
      });
    },
    { threshold: 0.2 }
  );
  io.observe(el);
}
