import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactSchema } from "@/lib/validation";

export const runtime = "nodejs"; // nodemailer needs Node.js, not the Edge runtime

// Simple in-memory rate limit: 5 requests per IP per 10 minutes.
// On serverless hosting, swap for Upstash Ratelimit (state is not shared between instances).
const hits = new Map<string, { count: number; start: number }>();
function isLimited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > 10 * 60 * 1000) { hits.set(ip, { count: 1, start: now }); return false; }
  rec.count += 1;
  return rec.count > 5;
}

// Builds the SMTP connection from environment variables. Returns null if email is not configured.
function getTransporter() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT ?? 465);
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // 465 = SSL, 587 = STARTTLS
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

export async function POST(req: Request) {
  // Reject cross-site requests
  const origin = req.headers.get("origin");
  const host = req.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isLimited(ip)) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form", fields: parsed.error.flatten().fieldErrors }, { status: 400 });
  }
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // honeypot filled: pretend success

  const transporter = getTransporter();
  if (!transporter) {
    if (process.env.NODE_ENV !== "production") { console.log("[contact] SMTP not configured. Enquiry:", d); return NextResponse.json({ ok: true }); }
    return NextResponse.json({ error: "Email service is not configured" }, { status: 503 });
  }

  // Plain-text email only: user input is never rendered as HTML.
  const text = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nCompany: ${d.company || "-"}\nService: ${d.service}\n\n${d.message}`;
  try {
    await transporter.sendMail({
      from: `"Website enquiry" <${process.env.SMTP_USER}>`, // most providers require the sender to be your own mailbox
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      replyTo: d.email, // pressing Reply answers the customer
      subject: `New quote request: ${d.service}`,
      text,
    });
  } catch (err) {
    console.error("[contact] SMTP error:", err);
    return NextResponse.json({ error: "Could not send your request. Please call us instead." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}