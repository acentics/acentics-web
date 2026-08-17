import { redirect } from "next/navigation";
import { getSession } from "../lib/auth";
import { prisma } from "../lib/prisma";

const PROJECT_TYPE_LABELS = {
  branding: "Branding",
  "graphic-design": "Graphic Design",
  "email-marketing": "Email Marketing",
  "public-relations": "Public Relations",
  seo: "SEO",
  "influencer-marketing": "Influencer Marketing",
  "website-development": "Website Development",
};

const STATUS_LABELS = {
  planning: "Planning",
  "in-progress": "In Progress",
  "on-hold": "On Hold",
  completed: "Completed",
};

export default async function DashboardOverviewPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const client = await prisma.client.findUnique({
    where: { id: session.clientId },
    include: {
      relationshipManager: true,
      updateLogs: { orderBy: { createdAt: "desc" }, take: 8 },
    },
  });
  if (!client) redirect("/login");

  return (
    <div className="dash-page">
      <h1>Welcome back, {client.fullName.split(" ")[0]}</h1>
      <p className="dash-page-sub">Here&apos;s where things stand with your project.</p>

      <div className="dash-progress-card">
        <div className="dash-progress-head">
          <div>
            <span className={"dash-status-badge status-" + client.projectStatus}>{STATUS_LABELS[client.projectStatus] || client.projectStatus}</span>
            <h2>{PROJECT_TYPE_LABELS[client.projectType] || client.projectType}</h2>
          </div>
          <div className="dash-progress-meta">
            <span className="dash-progress-percent">{client.projectProgress}%</span>
            <span className="dash-progress-label">Complete</span>
          </div>
        </div>
        <div className="dash-progress-track">
          <div className="dash-progress-fill" style={{ width: client.projectProgress + "%" }}></div>
        </div>
        <p className="dash-progress-updated">Last updated {new Date(client.lastUpdateAt).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>

      <div className="dash-grid">
        <div className="dash-card">
          <h2>Relationship Manager</h2>
          {client.relationshipManager ? (
            <div className="dash-rm">
              <p className="dash-rm-name">{client.relationshipManager.name}</p>
              <p className="dash-rm-title">{client.relationshipManager.title}</p>
              <a href={"mailto:" + client.relationshipManager.email}>{client.relationshipManager.email}</a>
              <a href={"tel:" + client.relationshipManager.phone}>{client.relationshipManager.phone}</a>
            </div>
          ) : (
            <p className="dash-card-note">Not yet assigned — we&apos;ll pair you with someone shortly.</p>
          )}
        </div>

        <div className="dash-card">
          <h2>Your Details</h2>
          <dl className="dash-dl">
            <div>
              <dt>Email</dt>
              <dd>{client.email}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>
                {client.countryCode} {client.phone}
              </dd>
            </div>
            {client.company && (
              <div>
                <dt>Company</dt>
                <dd>{client.company}</dd>
              </div>
            )}
          </dl>
        </div>

        <div className="dash-card dash-card-wide">
          <h2>Your Requirement</h2>
          <p className="dash-requirement">{client.requirement}</p>
        </div>

        <div className="dash-card dash-card-wide">
          <h2>Update Log</h2>
          {client.updateLogs.length === 0 ? (
            <p className="dash-card-note">No updates yet.</p>
          ) : (
            <ul className="dash-log-list">
              {client.updateLogs.map((log) => (
                <li key={log.id} className="dash-log-item">
                  <span className="dash-log-dot"></span>
                  <div>
                    <div className="dash-log-head">
                      <span className="dash-log-title">{log.title}</span>
                      <span className="dash-log-date">{new Date(log.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="dash-log-note">{log.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
