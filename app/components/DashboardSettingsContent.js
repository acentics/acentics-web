"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardSettingsContent() {
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [rmSubmitting, setRmSubmitting] = useState(false);
  const [rmMessage, setRmMessage] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  async function handleRmRequest(e) {
    e.preventDefault();
    setRmSubmitting(true);
    setRmMessage("");
    try {
      const res = await fetch("/api/client/rm-change-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json();
      setRmMessage(res.ok ? "Request submitted — we'll follow up shortly." : data.error || "Something went wrong.");
      if (res.ok) setReason("");
    } catch {
      setRmMessage("Couldn't reach the server.");
    }
    setRmSubmitting(false);
  }

  async function handleDelete() {
    setDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch("/api/client/delete", { method: "POST" });
      if (!res.ok) {
        const data = await res.json();
        setDeleteError(data.error || "Couldn't delete your account.");
        setDeleting(false);
        return;
      }
      router.push("/");
      router.refresh();
    } catch {
      setDeleteError("Couldn't reach the server.");
      setDeleting(false);
    }
  }

  return (
    <div className="dash-page">
      <h1>Settings</h1>
      <p className="dash-page-sub">Manage your relationship manager and account.</p>

      <section className="dash-card">
        <h2>Request A New Relationship Manager</h2>
        <p className="dash-card-note">Not the right fit? Tell us why and we&apos;ll find someone better suited to your project.</p>
        <form className="modal-form" onSubmit={handleRmRequest}>
          <div className="field">
            <label htmlFor="rm-reason">Reason</label>
            <textarea
              id="rm-reason"
              rows="3"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell us what's not working…"
              required
            ></textarea>
          </div>
          <button type="submit" className="pill-btn solid modal-submit" disabled={rmSubmitting}>
            {rmSubmitting ? "Submitting…" : "Submit Request"}
          </button>
          {rmMessage && <p className="dash-form-message">{rmMessage}</p>}
        </form>
      </section>

      <section className="dash-card dash-danger-zone">
        <h2>Delete Account</h2>
        <p className="dash-card-note">This permanently deletes your account, project details, and invoice history. This can&apos;t be undone.</p>
        {!deleteConfirm ? (
          <button type="button" className="pill-btn outline dash-danger-btn" onClick={() => setDeleteConfirm(true)}>
            Delete My Account
          </button>
        ) : (
          <div className="dash-delete-confirm">
            <p>Are you sure? This can&apos;t be undone.</p>
            <div className="dash-delete-actions">
              <button type="button" className="pill-btn dash-danger-solid" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting…" : "Yes, Delete My Account"}
              </button>
              <button type="button" className="pill-btn outline" onClick={() => setDeleteConfirm(false)} disabled={deleting}>
                Cancel
              </button>
            </div>
          </div>
        )}
        {deleteError && <p className="dash-form-message">{deleteError}</p>}
      </section>
    </div>
  );
}
