import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import { isRazorpayConfigured } from "../../lib/razorpay";
import PayButton from "../../components/PayButton";

export const metadata = {
  title: "Invoices — Acentics",
};

export default async function InvoicesPage({ searchParams }) {
  const sp = await searchParams;
  const session = await getSession();
  if (!session) redirect("/login");

  const invoices = await prisma.invoice.findMany({
    where: { clientId: session.clientId },
    orderBy: { issuedAt: "desc" },
  });

  const paymentStatus = sp?.payment;
  const razorpayReady = isRazorpayConfigured();

  return (
    <div className="dash-page">
      <h1>Invoices</h1>
      <p className="dash-page-sub">Pay upcoming invoices and review your billing history.</p>

      {paymentStatus === "success" && <div className="dash-banner dash-banner-success">Payment received — thank you!</div>}
      {paymentStatus === "failed" && (
        <div className="dash-banner dash-banner-error">We couldn&apos;t confirm that payment. Please try again or contact your relationship manager.</div>
      )}
      {!razorpayReady && (
        <div className="dash-banner">Payments aren&apos;t configured yet — the &quot;Pay Now&quot; button will be available once Razorpay API keys are added.</div>
      )}

      <div className="dash-invoice-list">
        {invoices.length === 0 && <p className="dash-card-note">No invoices yet.</p>}
        {invoices.map((inv) => (
          <div className="dash-invoice-row" key={inv.id}>
            <div className="dash-invoice-main">
              <span className="dash-invoice-number">{inv.number}</span>
              <span className={"dash-invoice-status status-" + inv.status}>{inv.status}</span>
            </div>
            <span className="dash-invoice-amount">${inv.amount.toLocaleString()}</span>
            <span className="dash-invoice-due">
              {inv.status === "paid" ? "Paid " + new Date(inv.paidAt).toLocaleDateString() : "Due " + new Date(inv.dueAt).toLocaleDateString()}
            </span>
            {inv.status !== "paid" && <PayButton invoiceId={inv.id} />}
          </div>
        ))}
      </div>
    </div>
  );
}
