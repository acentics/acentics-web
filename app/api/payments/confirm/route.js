import { prisma } from "../../../lib/prisma";
import { verifyPaymentLinkSignature } from "../../../lib/razorpay";

export async function GET(request) {
  const url = request.nextUrl;
  const paymentId = url.searchParams.get("razorpay_payment_id");
  const paymentLinkId = url.searchParams.get("razorpay_payment_link_id");
  const referenceId = url.searchParams.get("razorpay_payment_link_reference_id");
  const status = url.searchParams.get("razorpay_payment_link_status");
  const signature = url.searchParams.get("razorpay_signature");

  const dashboardUrl = new URL("/dashboard/invoices", url.origin);

  if (!paymentId || !paymentLinkId || !status || !signature) {
    dashboardUrl.searchParams.set("payment", "failed");
    return Response.redirect(dashboardUrl);
  }

  const valid = verifyPaymentLinkSignature({ paymentLinkId, referenceId, status, paymentId, signature });
  if (!valid) {
    dashboardUrl.searchParams.set("payment", "failed");
    return Response.redirect(dashboardUrl);
  }

  if (status === "paid") {
    const invoice = await prisma.invoice.findFirst({ where: { razorpayPaymentLinkId: paymentLinkId } });
    if (invoice && invoice.status !== "paid") {
      await prisma.invoice.update({
        where: { id: invoice.id },
        data: { status: "paid", paidAt: new Date(), razorpayPaymentId: paymentId },
      });
    }
    dashboardUrl.searchParams.set("payment", "success");
  } else {
    dashboardUrl.searchParams.set("payment", "failed");
  }

  return Response.redirect(dashboardUrl);
}
