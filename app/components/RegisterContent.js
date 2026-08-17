"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandMark from "./BrandMark";
import { COUNTRIES } from "../lib/countries";

const PROJECT_TYPES = [
  { value: "branding", label: "Branding" },
  { value: "graphic-design", label: "Graphic Design" },
  { value: "email-marketing", label: "Email Marketing" },
  { value: "public-relations", label: "Public Relations" },
  { value: "seo", label: "SEO" },
  { value: "influencer-marketing", label: "Influencer Marketing" },
  { value: "website-development", label: "Website Development" },
];

const TRUST_POINTS = [
  "A senior team, not account layers — you work directly with the people doing the work",
  "A dedicated relationship manager assigned the moment you sign up",
  "Real-time visibility into project status, progress, and every update",
  "Transparent invoicing with no surprise line items",
];

export default function RegisterContent() {
  const router = useRouter();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    countryCode: "+91",
    phone: "",
    requirement: "",
    projectType: "",
    acceptTerms: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!form.acceptTerms) {
      setError("Please accept the Terms of Service to continue.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="register-shell">
      <div className="register-panel">
        <Link href="/" className="auth-back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Back to website
        </Link>
        <div className="register-panel-inner">
          <Link href="/" className="auth-logo auth-logo-light">
            <BrandMark className="brand-logo" />
          </Link>
          <h1>Work With A Team That Actually Delivers</h1>
          <p className="register-panel-sub">
            Your dashboard gives you a direct line to your project — status, progress, invoices, and your relationship manager, all in one place.
          </p>
          <ul className="register-trust-list">
            {TRUST_POINTS.map((t) => (
              <li key={t}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="register-form-panel">
        <div className="auth-card auth-card-wide auth-card-borderless">
          <h1>Create Your Account</h1>
          <p className="auth-subtitle">Tell us about you and your project — your dashboard is ready as soon as you submit.</p>

          {error && <div className="auth-error">{error}</div>}

          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <div className="field">
                <label htmlFor="r-name">Full name</label>
                <input id="r-name" type="text" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Alex Rivera" required />
              </div>
              <div className="field">
                <label htmlFor="r-email">Email</label>
                <input id="r-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" required />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label htmlFor="r-password">Password</label>
                <input id="r-password" type="password" value={form.password} onChange={(e) => update("password", e.target.value)} placeholder="At least 8 characters" required minLength={8} />
              </div>
              <div className="field">
                <label htmlFor="r-confirm-password">Confirm password</label>
                <input
                  id="r-confirm-password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  minLength={8}
                />
              </div>
            </div>
            <div className="field">
              <label htmlFor="r-phone">Phone number</label>
              <div className="phone-field">
                <select id="r-country-code" value={form.countryCode} onChange={(e) => update("countryCode", e.target.value)} aria-label="Country code">
                  {COUNTRIES.map((c) => (
                    <option value={c.dial} key={c.name}>
                      {c.dial} {c.name}
                    </option>
                  ))}
                </select>
                <input id="r-phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="555 000 1234" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="r-company">Company</label>
              <input id="r-company" type="text" value={form.company} onChange={(e) => update("company", e.target.value)} placeholder="Acme Inc." />
            </div>

            <div className="field">
              <label htmlFor="r-type">Project type</label>
              <select id="r-type" value={form.projectType} onChange={(e) => update("projectType", e.target.value)} required>
                <option value="" disabled>
                  Select a service
                </option>
                {PROJECT_TYPES.map((t) => (
                  <option value={t.value} key={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="r-requirement">What do you need help with?</label>
              <textarea
                id="r-requirement"
                rows="4"
                value={form.requirement}
                onChange={(e) => update("requirement", e.target.value)}
                placeholder="Tell us about your goals, timeline, and anything else we should know…"
                required
              ></textarea>
            </div>

            <label className="checkbox-field">
              <input type="checkbox" checked={form.acceptTerms} onChange={(e) => update("acceptTerms", e.target.checked)} required />
              <span>
                I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
              </span>
            </label>

            <button type="submit" className="pill-btn solid modal-submit" disabled={loading}>
              {loading ? "Creating account…" : "Create Account"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
