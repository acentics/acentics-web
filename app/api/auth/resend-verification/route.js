import crypto from "crypto";
import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";
import { sendVerificationEmail } from "../../../lib/mail";

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  const client = await prisma.client.findUnique({ where: { id: session.clientId } });
  if (!client) {
    return Response.json({ error: "Account not found." }, { status: 404 });
  }
  if (client.emailVerified) {
    return Response.json({ error: "This account is already verified." }, { status: 400 });
  }

  const emailVerifyToken = crypto.randomBytes(32).toString("hex");
  const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await prisma.client.update({
    where: { id: client.id },
    data: { emailVerifyToken, emailVerifyExpires },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const verifyUrl = appUrl + "/api/auth/verify-email?token=" + emailVerifyToken;

  try {
    await sendVerificationEmail(client.email, client.fullName, verifyUrl);
  } catch (err) {
    console.error("Failed to resend verification email:", err);
    return Response.json({ error: "Couldn't send the email right now. Please try again shortly." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
