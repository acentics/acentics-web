"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandMark from "./BrandMark";

export default function LoginContent() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
    <div className="auth-page">
      <Link href="/" className="auth-back-link auth-back-link-standalone">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M11 18l-6-6 6-6" />
        </svg>
        Back to website
      </Link>
      <div className="auth-card">
        <Link href="/" className="auth-logo">
          <BrandMark className="brand-logo" />
        </Link>
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Log in to your Acentics client dashboard.</p>

        {error && <div className="auth-error">{error}</div>}

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="l-email">Email</label>
            <input id="l-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
          </div>
          <div className="field">
            <label htmlFor="l-password">Password</label>
            <input id="l-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
          </div>
          <button type="submit" className="pill-btn solid modal-submit" disabled={loading}>
            {loading ? "Signing in…" : "Log In"}
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
