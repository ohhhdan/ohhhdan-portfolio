export function sanitizeString(input: string, maxLength: number = 4000): string {
  if (typeof input !== 'string') return '';
  let s = input.replace(/<[^>]*>/g, '').trim();
  if (s.length > maxLength) s = s.slice(0, maxLength);
  return s;
}

export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email.trim());
}

export interface SanitizedContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function sanitizeContactForm(data: unknown): SanitizedContactForm | null {
  if (!data || typeof data !== 'object') return null;
  const o = data as Record<string, unknown>;
  const name = sanitizeString(String(o.name ?? ''), 120);
  const email = sanitizeString(String(o.email ?? ''), 200);
  const subject = sanitizeString(String(o.subject ?? ''), 200);
  const message = sanitizeString(String(o.message ?? ''), 8000);
  if (name.length < 2 || !validateEmail(email) || subject.length < 2 || message.length < 10) {
    return null;
  }
  return { name, email, subject, message };
}
