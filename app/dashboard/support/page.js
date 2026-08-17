import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import { prisma } from "../../lib/prisma";
import DashboardSupportContent from "../../components/DashboardSupportContent";

export const metadata = {
  title: "Support — Acentics",
};

export default async function DashboardSupportPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const tickets = await prisma.supportTicket.findMany({
    where: { clientId: session.clientId },
    orderBy: { createdAt: "desc" },
  });

  return <DashboardSupportContent initialTickets={JSON.parse(JSON.stringify(tickets))} />;
}
