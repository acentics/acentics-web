import { prisma } from "../../../lib/prisma";
import { getSession, destroySession } from "../../../lib/auth";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return Response.json({ error: "Not signed in." }, { status: 401 });
  }

  await prisma.client.delete({ where: { id: session.clientId } }).catch(() => null);
  await destroySession();

  return Response.json({ ok: true });
}
