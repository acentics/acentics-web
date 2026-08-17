"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function IconOverview() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.2" />
      <rect x="14" y="3" width="7" height="7" rx="1.2" />
      <rect x="3" y="14" width="7" height="7" rx="1.2" />
      <rect x="14" y="14" width="7" height="7" rx="1.2" />
    </svg>
  );
}
function IconInvoices() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3z" />
      <path d="M9 8h6M9 12h6" />
    </svg>
  );
}
function IconSupport() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M5.6 5.6l3 3M18.4 5.6l-3 3M5.6 18.4l3-3M18.4 18.4l-3-3" />
    </svg>
  );
}
function IconSettings() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 13.5c.1-.5.1-1 0-1.5l1.6-1.2-1.5-2.6-1.9.5c-.4-.3-.8-.6-1.3-.8l-.3-2H10l-.3 2c-.5.2-.9.5-1.3.8l-1.9-.5-1.5 2.6L6.6 12c-.1.5-.1 1 0 1.5L5 14.7l1.5 2.6 1.9-.5c.4.3.8.6 1.3.8l.3 2h4l.3-2c.5-.2.9-.5 1.3-.8l1.9.5 1.5-2.6-1.6-1.2z" />
    </svg>
  );
}

const TABS = [
  { href: "/dashboard", label: "Overview", icon: IconOverview },
  { href: "/dashboard/invoices", label: "Invoices", icon: IconInvoices },
  { href: "/dashboard/support", label: "Support", icon: IconSupport },
  { href: "/dashboard/settings", label: "Settings", icon: IconSettings },
];

export default function DashboardNav() {
  const pathname = usePathname();
  return (
    <nav className="dash-nav">
      {TABS.map((t) => {
        const Icon = t.icon;
        return (
          <Link key={t.href} href={t.href} className={"dash-nav-link" + (pathname === t.href ? " active" : "")}>
            <Icon />
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
