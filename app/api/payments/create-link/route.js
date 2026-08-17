import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import { getRazorpayClient, isRazorpayConfigured } from "../../../lib/razorpay";

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  if (!isRazorpayConfigured()) {
    return Response.json(
      { error: "Payments aren't configured yet. Add your Razorpay API keys to enable this." },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const invoice = await prisma.invoice.findUnique({ where: { id: body.invoiceId } });
  if (!invoice || invoice.clientId !== session.clientId) {
    return Response.json({ error: "Invoice not found." }, { status: 404 });
  }
  if (invoice.status === "paid") {
    return Response.json({ error: "This invoice has already been paid." }, { status: 400 });
  }

  const client = await prisma.client.findUnique({ where: { id: session.clientId } });
  const razorpay = getRazorpayClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;

  try {
    const link = await razorpay.paymentLink.create({
      amount: Math.round(invoice.amount * 100),
      currency: "INR",
      description: "Acentics — " + invoice.number,
      customer: {
        name: client.fullName,
        email: client.email,
        ...(client.phone ? { contact: client.phone } : {}),
      },
      notify: { sms: false, email: true },
      reference_id: invoice.id,
      callback_url: appUrl + "/api/payments/confirm",
      callback_method: "get",
    });

    await prisma.invoice.update({
      where: { id: invoice.id },
      data: { razorpayPaymentLinkId: link.id },
    });

    return Response.json({ url: link.short_url });
  } catch (err) {
    console.error("Razorpay payment link creation failed:", err);
    return Response.json({ error: "Couldn't create a payment link right now. Please try again." }, { status: 502 });
  }
}
