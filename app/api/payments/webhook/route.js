import { prisma } from "../../../lib/prisma";
import { verifyWebhookSignature } from "../../../lib/razorpay";

export async function POST(request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return Response.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (event.event === "payment_link.paid") {
    const link = event.payload?.payment_link?.entity;
    const payment = event.payload?.payment?.entity;
    if (link?.id) {
      const invoice = await prisma.invoice.findFirst({ where: { razorpayPaymentLinkId: link.id } });
      if (invoice && invoice.status !== "paid") {
        await prisma.invoice.update({
          where: { id: invoice.id },
          data: { status: "paid", paidAt: new Date(), razorpayPaymentId: payment?.id || null },
        });
      }
    }
  }

  return Response.json({ ok: true });
}
