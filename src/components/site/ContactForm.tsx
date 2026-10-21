'use client';

import { useState } from 'react';
import { ArrowUpRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Section } from './Section';

const fieldClass =
  'mt-2 w-full rounded-2xl bg-paper px-4 py-3 text-base text-ink outline-none ring-1 ring-forest/10 transition placeholder:text-ink-muted/45 focus:bg-surface focus:ring-2 focus:ring-forest/25';

export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setMessage('');
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      message: fd.get('message'),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus('err');
        setMessage(data.error ?? 'Couldn’t send. Email me directly instead.');
        return;
      }
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('err');
      setMessage('Couldn’t reach the server. Email me directly instead.');
    }
  }

  return (
    <Section id="contact" title="Get in touch" className="pb-8 sm:pb-10" align="center">
      <div className="mx-auto flex max-w-md flex-col gap-8">
        <p className="text-sm text-ink-muted">
          <a
            href={`mailto:${email}`}
            className="font-medium text-forest underline decoration-mint underline-offset-4 transition hover:decoration-forest"
          >
            {email}
          </a>
        </p>
        {status === 'ok' ? (
          <p className="flex items-start justify-center gap-2 rounded-2xl bg-forest/5 px-4 py-4 text-left text-sm leading-relaxed text-forest">
            <CheckCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
            Got it. I’ll reply to the email you entered.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="w-full space-y-5 text-left">
            <div>
              <label htmlFor="name" className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                Name
              </label>
              <input id="name" name="name" required autoComplete="name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                Email
              </label>
              <input id="email" name="email" type="email" required autoComplete="email" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="message" className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
                Message
              </label>
              <textarea id="message" name="message" required rows={5} className={`${fieldClass} resize-y`} />
            </div>
            {status === 'err' ? (
              <p className="flex items-start gap-2 text-sm text-crimson" role="alert">
                <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden />
                {message}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-pine-600 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending…' : 'Send'}
              {status === 'sending' ? null : <ArrowUpRight size={16} aria-hidden />}
            </button>
          </form>
        )}
      </div>
    </Section>
  );
}
