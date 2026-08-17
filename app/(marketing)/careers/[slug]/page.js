import { notFound } from "next/navigation";
import { ROLES, getRole } from "../../../lib/careers-data";
import CareersJobContent from "../../../components/CareersJobContent";

export function generateStaticParams() {
  return ROLES.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) return { title: "Role Not Found — Acentics" };
  return {
    title: role.name + " — Careers — Acentics",
    description: role.summary,
  };
}

export default async function CareersJobPage({ params }) {
  const { slug } = await params;
  const role = getRole(slug);
  if (!role) notFound();
  return <CareersJobContent role={role} />;
}
