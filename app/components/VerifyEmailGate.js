"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailGate({ email }) {
  const searchParams = useSearchParams();
  const verifyResult = searchParams.get("verify");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleResend() {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/auth/resend-verification", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't resend the email.");
        setSending(false);
        return;
      }
      setSent(true);
    } catch {
      setError("Couldn't reach the server.");
    }
    setSending(false);
  }

  return (
    <div className="dash-gate">
      <div className="dash-gate-card">
        <div className="dash-gate-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        </div>
        <h1>Verify Your Email</h1>
        <p>
          We sent a verification link to <strong>{email}</strong>. Click it to unlock your dashboard.
        </p>
        {verifyResult === "expired" && <div className="auth-error">That link expired. Send yourself a new one below.</div>}
        {verifyResult === "invalid" && <div className="auth-error">That link isn&apos;t valid. Send yourself a new one below.</div>}
        {sent && <div className="dash-gate-success">Verification email sent — check your inbox.</div>}
        {error && <div className="auth-error">{error}</div>}
        <button type="button" className="pill-btn solid" onClick={handleResend} disabled={sending}>
          {sending ? "Sending…" : "Resend Verification Email"}
        </button>
      </div>
    </div>
  );
}
