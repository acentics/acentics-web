import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "../lib/auth";
import { prisma } from "../lib/prisma";
import BrandMark from "../components/BrandMark";
import DashboardNav from "../components/DashboardNav";
import DashboardLogoutButton from "../components/DashboardLogoutButton";
import VerifyEmailGate from "../components/VerifyEmailGate";

export const metadata = {
  title: "Dashboard — Acentics",
};

export default async function DashboardLayout({ children }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const client = await prisma.client.findUnique({ where: { id: session.clientId } });
  if (!client) redirect("/login");

  return (
    <div className="dash-shell">
      <header className="dash-header">
        <Link href="/dashboard" className="dash-header-brand">
          <BrandMark className="brand-logo" />
        </Link>
        <div className="dash-header-right">
          <span className="dash-header-avatar" aria-hidden="true">
            {client.fullName
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
          <span className="dash-header-name">{client.fullName}</span>
          <DashboardLogoutButton />
        </div>
      </header>
      {client.emailVerified ? (
        <div className="dash-body">
          <DashboardNav />
          <main className="dash-main">{children}</main>
        </div>
      ) : (
        <Suspense fallback={null}>
          <VerifyEmailGate email={client.email} />
        </Suspense>
      )}
    </div>
  );
}
