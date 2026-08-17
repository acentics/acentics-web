"use client";

import { useState } from "react";

export default function PayButton({ invoiceId }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handlePay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/payments/create-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ invoiceId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't start payment.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Couldn't reach the server.");
      setLoading(false);
    }
  }

  return (
    <div className="dash-pay-btn-wrap">
      <button type="button" className="pill-btn solid dash-pay-btn" onClick={handlePay} disabled={loading}>
        {loading ? "Redirecting…" : "Pay Now"}
      </button>
      {error && <p className="dash-pay-error">{error}</p>}
    </div>
  );
}
