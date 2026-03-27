'use client';

import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export function Contact() {
  const ref = useIntersectionObserver();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>(
    'idle'
  );
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Failed to send message');
      }

      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-forest-500">
      <div ref={ref} className="fade-in mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Get In Touch
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-mint-400" />
          <p className="mt-4 text-white/70">
            Have a project in mind? Let&apos;s talk about how I can help.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-mint-400/30 bg-white/10 p-8 text-center">
            <CheckCircle size={48} className="text-mint-400" />
            <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
            <p className="text-white/70">
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 text-sm text-mustard-500 hover:text-mustard-400"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-white/90"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 transition focus:border-mint-400 focus:outline-none focus:ring-1 focus:ring-mint-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-white/90"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={254}
                  className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 transition focus:border-mint-400 focus:outline-none focus:ring-1 focus:ring-mint-400"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                maxLength={200}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 transition focus:border-mint-400 focus:outline-none focus:ring-1 focus:ring-mint-400"
                placeholder="Project inquiry"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-white/90"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={5}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 transition focus:border-mint-400 focus:outline-none focus:ring-1 focus:ring-mint-400 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-lg border border-crimson/30 bg-crimson/10 p-3 text-sm text-white">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-mustard-500 px-8 py-3 font-semibold text-charcoal-800 transition hover:bg-mustard-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {status === 'sending' ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-charcoal-800/30 border-t-charcoal-800" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
