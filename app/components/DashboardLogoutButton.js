"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardLogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button type="button" className="dash-logout-btn" onClick={handleLogout} disabled={loading}>
      {loading ? "Logging out…" : "Log Out"}
    </button>
  );
}
