import Razorpay from "razorpay";
import crypto from "crypto";

export function isRazorpayConfigured() {
  return !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

export function getRazorpayClient() {
  if (!isRazorpayConfigured()) return null;
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

/** Verifies the signature Razorpay appends to the callback_url redirect after a Payment Link is paid. */
export function verifyPaymentLinkSignature({ paymentLinkId, referenceId, status, paymentId, signature }) {
  if (!process.env.RAZORPAY_KEY_SECRET || !signature) return false;
  const payload = paymentLinkId + "|" + (referenceId || "") + "|" + status + "|" + paymentId;
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(payload).digest("hex");
  return expected === signature;
}

/** Verifies the X-Razorpay-Signature header on incoming webhook requests. */
export function verifyWebhookSignature(rawBody, signature) {
  if (!process.env.RAZORPAY_WEBHOOK_SECRET || !signature) return false;
  const expected = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest("hex");
  return expected === signature;
}
