import { prisma } from "../../../lib/prisma";
import { getSession } from "../../../lib/auth";

const PRIORITIES = new Set(["low", "normal", "high"]);

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

  const subject = (body.subject || "").trim();
  const message = (body.message || "").trim();
  const priority = PRIORITIES.has(body.priority) ? body.priority : "normal";

  if (!subject || !message) {
    return Response.json({ error: "Please add a subject and a message." }, { status: 400 });
  }

  const ticket = await prisma.supportTicket.create({
    data: {
      clientId: session.clientId,
      subject,
      message,
      priority,
    },
  });

  return Response.json({ ok: true, id: ticket.id });
}
