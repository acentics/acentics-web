"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import { attachInview, wireSmoothAnchors, wirePillButtonHover } from "../lib/motion";

export default function PrivacyContent() {
  const rootRef = useRef(null);
  const { scrollTo } = useSite();

  useEffect(() => {
    const root = rootRef.current;
    wireSmoothAnchors(root, scrollTo);
    wirePillButtonHover(root);

    attachInview(document.getElementById("legal-body"), {
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
    <div id="privacy-page" ref={rootRef}>
      <section className="legal-hero">
        <p className="eyebrow dark">Legal</p>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: August 16, 2026</p>
      </section>

      <section className="legal-section">
        <div className="legal-body" id="legal-body">
          <p>
            Acentics (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) respects your privacy and is committed to protecting the personal information you share with us. This policy explains what we collect, how we use it, and the choices you have.
          </p>

          <h2>Information We Collect</h2>
          <p>
            When you contact us through this site — via the booking form, a job application, or a direct email — we collect the information you provide, such as your name, email address, phone number, company, and any message content. We also collect standard technical data (browser type, device, pages visited) through normal web server logs.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            We use the information you provide to respond to inquiries, schedule calls, evaluate job applications, and deliver the services you&apos;ve engaged us for. We do not sell your personal information to third parties.
          </p>

          <h2>Cookies</h2>
          <p>
            This site may use cookies or similar technologies to remember basic preferences and understand how visitors use the site. You can disable cookies through your browser settings; doing so may affect some site functionality.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party tools for analytics, scheduling, and email delivery. These providers only receive the information necessary to perform their function and are bound by their own privacy commitments.
          </p>

          <h2>Data Retention</h2>
          <p>
            We retain personal information only as long as necessary to fulfill the purpose it was collected for, or as required by law or active contractual obligations.
          </p>

          <h2>Your Rights</h2>
          <p>
            You can request access to, correction of, or deletion of your personal information at any time by contacting us at the address below. We will respond within a reasonable timeframe.
          </p>

          <h2>Changes To This Policy</h2>
          <p>
            We may update this policy from time to time. The &quot;last updated&quot; date at the top of this page reflects the most recent revision.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to <a href="mailto:privacy@acentics.com">privacy@acentics.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
