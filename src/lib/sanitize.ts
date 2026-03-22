/**
 * Input sanitization and validation utilities for contact forms and general use.
 */

/**
 * Strip HTML tags, trim whitespace, and truncate to a maximum length.
 *
 * @param input     - Raw string input
 * @param maxLength - Maximum allowed length (default: 1000)
 * @returns Sanitized string
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') return '';

  // Remove HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');

  // Trim leading/trailing whitespace
  sanitized = sanitized.trim();

  // Truncate to max length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized;
}

/**
 * Validate an email address using a standard regex pattern.
 *
 * @param email - Email string to validate
 * @returns true if the email matches a valid pattern
 */
export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') return false;

  // Standard email validation pattern (RFC 5322 simplified)
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email.trim());
}

/** Shape of a validated and sanitized contact form submission. */
export interface SanitizedContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

/**
 * Validate and sanitize all fields of a contact form submission.
 *
 * @param data - Unknown input (typically parsed from a request body)
 * @returns A sanitized form object, or null if validation fails
 */
export function sanitizeContactForm(data: unknown): SanitizedContactForm | null {
  if (!data || typeof data !== 'object') return null;

  const form = data as Record<string, unknown>;

  // Validate required fields exist and are strings
  if (
    typeof form.name !== 'string' ||
    typeof form.email !== 'string' ||
    typeof form.subject !== 'string' ||
    typeof form.message !== 'string'
  ) {
    return null;
  }

  const name = sanitizeString(form.name, 100);
  const email = sanitizeString(form.email, 254);
  const subject = sanitizeString(form.subject, 200);
  const message = sanitizeString(form.message, 5000);

  // Validate non-empty after sanitization
  if (!name || !email || !subject || !message) {
    return null;
  }

  // Validate email format
  if (!validateEmail(email)) {
    return null;
  }

  return { name, email, subject, message };
}
