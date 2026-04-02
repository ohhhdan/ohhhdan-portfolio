'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Section } from './Section';

export function ContactForm() {
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
      subject: fd.get('subject'),
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
        setMessage(data.error ?? 'Something went wrong.');
        return;
      }
      setStatus('ok');
      form.reset();
    } catch {
      setStatus('err');
      setMessage('Network error.');
    }
  }

  return (
    <Section id="contact" eyebrow="Contact" title="Say hi" className="pb-8 sm:pb-10">
      <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
        <p className="text-sm leading-snug text-ink-muted sm:text-base">Form below—or email in the header.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-forest">
              Name
            </label>
            <input
              id="name"
              name="name"
              required
              className="mt-1 w-full rounded-lg border border-forest/15 bg-surface px-3 py-2 text-sm text-ink outline-none transition placeholder:text-ink-muted/60 focus:border-mustard focus:ring-2 focus:ring-mustard/25"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-forest">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1 w-full rounded-lg border border-forest/15 bg-surface px-3 py-2 text-sm text-ink outline-none transition focus:border-mustard focus:ring-2 focus:ring-mustard/25"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-forest">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              required
              className="mt-1 w-full rounded-lg border border-forest/15 bg-surface px-3 py-2 text-sm text-ink outline-none transition focus:border-mustard focus:ring-2 focus:ring-mustard/25"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-forest">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="mt-1 w-full rounded-lg border border-forest/15 bg-surface px-3 py-2 text-sm text-ink outline-none transition focus:border-mustard focus:ring-2 focus:ring-mustard/25"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-pine-600 hover:shadow-lg disabled:opacity-60 motion-reduce:hover:translate-y-0"
          >
            <Send size={16} /> {status === 'sending' ? 'Sending…' : 'Send'}
          </button>
          {status === 'ok' ? (
            <p className="flex items-center gap-2 text-sm text-pine-600">
              <CheckCircle size={16} /> Sent. I’ll get back to you soon.
            </p>
          ) : null}
          {status === 'err' ? (
            <p className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle size={16} /> {message}
            </p>
          ) : null}
        </form>
      </div>
    </Section>
  );
}
