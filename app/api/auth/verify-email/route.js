import { prisma } from "../../../lib/prisma";

export async function GET(request) {
  const token = request.nextUrl.searchParams.get("token");
  const dashboardUrl = new URL("/dashboard", request.nextUrl.origin);

  if (!token) {
    dashboardUrl.searchParams.set("verify", "invalid");
    return Response.redirect(dashboardUrl);
  }

  const client = await prisma.client.findUnique({ where: { emailVerifyToken: token } });
  if (!client || !client.emailVerifyExpires || client.emailVerifyExpires < new Date()) {
    dashboardUrl.searchParams.set("verify", "expired");
    return Response.redirect(dashboardUrl);
  }

  await prisma.client.update({
    where: { id: client.id },
    data: { emailVerified: true, emailVerifyToken: null, emailVerifyExpires: null },
  });

  dashboardUrl.searchParams.set("verify", "success");
  return Response.redirect(dashboardUrl);
}
