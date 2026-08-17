"use client";

import { useEffect, useRef } from "react";
import { useSite } from "../lib/site-context";
import { attachInview, wireSmoothAnchors, wirePillButtonHover } from "../lib/motion";

export default function TermsContent() {
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
    <div id="terms-page" ref={rootRef}>
      <section className="legal-hero">
        <p className="eyebrow dark">Legal</p>
        <h1>Terms of Service</h1>
        <p className="legal-updated">Last updated: August 16, 2026</p>
      </section>

      <section className="legal-section">
        <div className="legal-body" id="legal-body">
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the Acentics website and any engagement with Acentics as a client, applicant, or partner. By using this site or engaging our services, you agree to these Terms.
          </p>

          <h2>Use Of This Site</h2>
          <p>
            This site is provided for informational purposes and to facilitate inquiries about our services, careers, and partnerships. You agree not to misuse the site, attempt unauthorized access, or use it in a way that could damage, disable, or impair its operation.
          </p>

          <h2>Client Engagements</h2>
          <p>
            Any marketing, strategy, creative, or development services described on this site are subject to a separate signed agreement outlining scope, fees, timelines, and deliverables. Nothing on this site constitutes a binding offer of services absent a signed engagement letter or statement of work.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            All content on this site — including text, graphics, logos, and design — is the property of Acentics unless otherwise noted, and may not be reproduced without written permission. Deliverables created under a client engagement are governed by the intellectual property terms of that engagement&apos;s signed agreement.
          </p>

          <h2>Confidentiality</h2>
          <p>
            Information shared with us through inquiries, applications, or active engagements is treated as confidential and used solely for the purpose it was provided, consistent with our Privacy Policy.
          </p>

          <h2>Limitation Of Liability</h2>
          <p>
            Acentics is not liable for any indirect, incidental, or consequential damages arising from use of this site. Liability related to a specific client engagement is governed exclusively by that engagement&apos;s signed agreement.
          </p>

          <h2>Termination</h2>
          <p>
            We reserve the right to restrict access to this site for any user who violates these Terms. Termination of a client engagement is governed by the terms of the relevant signed agreement.
          </p>

          <h2>Governing Law</h2>
          <p>These Terms are governed by the laws of the State of New York, without regard to its conflict-of-law provisions.</p>

          <h2>Contact</h2>
          <p>
            Questions about these Terms can be sent to <a href="mailto:legal@acentics.com">legal@acentics.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
