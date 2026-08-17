"use client";

import { useState } from "react";

const STATUS_LABELS = { open: "Open", "in-progress": "In Progress", resolved: "Resolved" };
const PRIORITY_LABELS = { low: "Low", normal: "Normal", high: "High" };

export default function DashboardSupportContent({ initialTickets }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("normal");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/tickets/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, message, priority }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't submit your ticket.");
        setSubmitting(false);
        return;
      }
      setTickets((t) => [
        { id: data.id, subject, message, priority, status: "open", createdAt: new Date().toISOString() },
        ...t,
      ]);
      setSubject("");
      setMessage("");
      setPriority("normal");
      setShowForm(false);
    } catch {
      setError("Couldn't reach the server.");
    }
    setSubmitting(false);
  }

  return (
    <div className="dash-page">
      <div className="dash-page-head">
        <div>
          <h1>Support Tickets</h1>
          <p className="dash-page-sub">Raise an issue or question — we typically respond within one business day.</p>
        </div>
        <button type="button" className="pill-btn solid" onClick={() => setShowForm((s) => !s)}>
          {showForm ? "Cancel" : "New Ticket"}
        </button>
      </div>

      {showForm && (
        <section className="dash-card dash-ticket-form-card">
          <h2>Raise A New Ticket</h2>
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="t-subject">Subject</label>
              <input id="t-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="What's this about?" required />
            </div>
            <div className="field">
              <label htmlFor="t-priority">Priority</label>
              <select id="t-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="t-message">Message</label>
              <textarea id="t-message" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Give us the details…" required></textarea>
            </div>
            <button type="submit" className="pill-btn solid modal-submit" disabled={submitting}>
              {submitting ? "Submitting…" : "Submit Ticket"}
            </button>
            {error && <p className="dash-form-message">{error}</p>}
          </form>
        </section>
      )}

      <div className="dash-ticket-list">
        {tickets.length === 0 && <p className="dash-card-note">No tickets yet — raise one if you need anything.</p>}
        {tickets.map((t) => (
          <div className="dash-ticket-row" key={t.id}>
            <div className="dash-ticket-main">
              <span className="dash-ticket-subject">{t.subject}</span>
              <p className="dash-ticket-message">{t.message}</p>
            </div>
            <div className="dash-ticket-meta">
              <span className={"dash-ticket-status status-" + t.status}>{STATUS_LABELS[t.status] || t.status}</span>
              <span className={"dash-ticket-priority priority-" + t.priority}>{PRIORITY_LABELS[t.priority] || t.priority}</span>
              <span className="dash-ticket-date">{new Date(t.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
