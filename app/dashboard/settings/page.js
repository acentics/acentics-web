import { redirect } from "next/navigation";
import { getSession } from "../../lib/auth";
import DashboardSettingsContent from "../../components/DashboardSettingsContent";

export const metadata = {
  title: "Settings — Acentics",
};

export default async function SettingsPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <DashboardSettingsContent />;
}
