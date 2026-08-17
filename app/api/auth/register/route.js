import crypto from "crypto";
import { prisma } from "../../../lib/prisma";
import { hashPassword, createSession } from "../../../lib/auth";
import { sendVerificationEmail } from "../../../lib/mail";

const PROJECT_TYPES = new Set(["branding", "graphic-design", "email-marketing", "public-relations", "seo", "influencer-marketing", "website-development"]);

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const fullName = (body.fullName || "").trim();
  const email = (body.email || "").trim().toLowerCase();
  const password = body.password || "";
  const confirmPassword = body.confirmPassword || "";
  const company = (body.company || "").trim();
  const countryCode = (body.countryCode || "").trim();
  const phone = (body.phone || "").trim();
  const requirement = (body.requirement || "").trim();
  const projectType = body.projectType || "";
  const acceptTerms = body.acceptTerms === true;

  if (!fullName || !email || !password || !confirmPassword || !countryCode || !phone || !requirement || !projectType) {
    return Response.json({ error: "Please fill in all required fields." }, { status: 400 });
  }
  if (password.length < 8) {
    return Response.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }
  if (password !== confirmPassword) {
    return Response.json({ error: "Passwords don't match." }, { status: 400 });
  }
  if (!PROJECT_TYPES.has(projectType)) {
    return Response.json({ error: "Please select a valid project type." }, { status: 400 });
  }
  if (!acceptTerms) {
    return Response.json({ error: "Please accept the Terms of Service to continue." }, { status: 400 });
  }

  const existing = await prisma.client.findUnique({ where: { email } });
  if (existing) {
    return Response.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const managers = await prisma.relationshipManager.findMany({ orderBy: { id: "asc" } });
  const clientCount = await prisma.client.count();
  const assignedManager = managers.length ? managers[clientCount % managers.length] : null;

  const passwordHash = await hashPassword(password);
  const emailVerifyToken = crypto.randomBytes(32).toString("hex");
  const emailVerifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const client = await prisma.client.create({
    data: {
      fullName,
      email,
      password: passwordHash,
      company: company || null,
      countryCode,
      phone,
      requirement,
      projectType,
      relationshipManagerId: assignedManager ? assignedManager.id : null,
      emailVerifyToken,
      emailVerifyExpires,
      updateLogs: {
        create: {
          title: "Project registered",
          note: "We received your requirement and " + (assignedManager ? assignedManager.name + " has been assigned as your relationship manager." : "we're pairing you with a relationship manager shortly."),
        },
      },
    },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || request.nextUrl.origin;
  const verifyUrl = appUrl + "/api/auth/verify-email?token=" + emailVerifyToken;
  try {
    await sendVerificationEmail(client.email, client.fullName, verifyUrl);
  } catch (err) {
    console.error("Failed to send verification email:", err);
  }

  await createSession(client.id);

  return Response.json({ ok: true });
}
