import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";

export async function POST(request) {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const reason = (body.reason || "").trim();
  if (!reason) {
    return Response.json({ error: "Please tell us why you'd like a new relationship manager." }, { status: 400 });
  }

  await prisma.rMChangeRequest.create({
    data: {
      clientId: session.clientId,
      reason,
    },
  });

  return Response.json({ ok: true });
}
