import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null;
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 465,
    secure: Number(process.env.EMAIL_PORT) !== 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return transporter;
}

const LOGO_URL = process.env.EMAIL_LOGO_URL || "";

function emailShell(title, bodyHtml) {
  const brandMark = LOGO_URL
    ? `<img src="${LOGO_URL}" alt="Acentics" height="26" style="display:block;height:26px;width:auto;border:0;outline:none;" />`
    : `<span style="color:#ffffff;font-size:19px;font-weight:800;letter-spacing:-0.02em;font-family:Arial,Helvetica,sans-serif;">Acentics</span>`;

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#f5f2f0;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f2f0;padding:48px 16px;">
      <tr>
        <td align="center">
          <table width="520" cellpadding="0" cellspacing="0" style="max-width:520px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 2px 24px rgba(10,10,10,0.06);">
            <tr>
              <td bgcolor="#e94b27" style="background:#e94b27;background-image:linear-gradient(135deg,#e94b27,#c73f20);padding:32px 40px;">
                ${brandMark}
              </td>
            </tr>
            <tr>
              <td style="padding:40px 40px 8px;">
                <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#0a0a0a;font-weight:700;letter-spacing:-0.01em;">${title}</h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:8px 40px 36px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #ece6e2;margin-top:24px;">
                  <tr><td style="padding-top:20px;"></td></tr>
                </table>
                <p style="margin:0;font-size:12px;line-height:1.6;color:#6f6a66;">Acentics — sharp strategy meets craft.</p>
                <p style="margin:6px 0 0;font-size:11px;line-height:1.6;color:#a39d97;">This is a transactional email about your Acentics account.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendVerificationEmail(to, fullName, verifyUrl) {
  const t = getTransporter();
  if (!t) {
    console.warn("Email is not configured (EMAIL_HOST/EMAIL_USER/EMAIL_PASS missing) — skipping verification email send.");
    return { sent: false };
  }
  const bodyHtml = `
    <p style="margin:0 0 28px;font-size:14.5px;line-height:1.65;color:#4a4642;">
      Hi ${fullName.split(" ")[0]}, thanks for creating an Acentics account. Confirm your email to unlock your client dashboard — project status, invoices, and your relationship manager, all in one place.
    </p>
    <table cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-radius:999px;background:#e94b27;">
          <a href="${verifyUrl}" style="display:inline-block;color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;padding:14px 28px;">Verify Email</a>
        </td>
      </tr>
    </table>
    <p style="margin:24px 0 0;font-size:12.5px;line-height:1.7;color:#6f6a66;">This link expires in 24 hours. If you didn't create this account, you can safely ignore this email.</p>
    <p style="margin:16px 0 0;font-size:11.5px;line-height:1.6;color:#a39d97;word-break:break-all;">Button not working? Paste this into your browser:<br /><a href="${verifyUrl}" style="color:#c73f20;text-decoration:underline;">${verifyUrl}</a></p>
  `;
  await t.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to,
    subject: "Verify your Acentics account",
    html: emailShell("Confirm your email", bodyHtml),
  });
  return { sent: true };
}
