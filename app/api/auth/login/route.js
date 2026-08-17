import { prisma } from "../../../lib/prisma";
import { verifyPassword, createSession } from "../../../lib/auth";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";

  if (!email || !password) {
    return Response.json({ error: "Please enter your email and password." }, { status: 400 });
  }

  const client = await prisma.client.findUnique({ where: { email } });
  if (!client) {
    return Response.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  const valid = await verifyPassword(password, client.password);
  if (!valid) {
    return Response.json({ error: "Incorrect email or password." }, { status: 401 });
  }

  await createSession(client.id);

  return Response.json({ ok: true });
}
