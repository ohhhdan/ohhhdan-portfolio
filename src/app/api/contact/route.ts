import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { rateLimit } from '@/lib/rate-limit';
import { sanitizeContactForm } from '@/lib/sanitize';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const { success, remaining } = rateLimit(ip);
  if (!success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'X-RateLimit-Remaining': String(remaining) } }
    );
  }

  if (!process.env.SMTP_HOST || !process.env.CONTACT_TO_EMAIL) {
    return NextResponse.json({ error: 'This form is temporarily unavailable. Please use email instead.' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const data = sanitizeContactForm(body);
    if (!data) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: data.email,
      subject: `[ohhhdan.com] ${data.subject}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      html: `<p><strong>Name:</strong> ${esc(data.name)}</p><p><strong>Email:</strong> ${esc(data.email)}</p><p><strong>Subject:</strong> ${esc(data.subject)}</p><hr/><p>${esc(data.message).replace(/\n/g, '<br/>')}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Contact error:', e);
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
