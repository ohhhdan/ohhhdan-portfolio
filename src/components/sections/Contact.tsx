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
    <section id="contact" className="py-24 px-6">
      <div ref={ref} className="fade-in mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-white sm:text-4xl">
            Get In Touch
          </h2>
          <div className="mx-auto h-1 w-16 rounded bg-accent-500" />
          <p className="mt-4 text-navy-300">
            Have a project in mind? Let&apos;s talk about how I can help.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="flex flex-col items-center gap-4 rounded-xl border border-green-500/30 bg-green-500/10 p-8 text-center">
            <CheckCircle size={48} className="text-green-400" />
            <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
            <p className="text-navy-300">
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-2 text-sm text-accent-400 hover:text-accent-300"
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
                  className="mb-2 block text-sm font-medium text-navy-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={100}
                  className="w-full rounded-lg border border-navy-600 bg-navy-800 px-4 py-3 text-white placeholder-navy-400 transition focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-navy-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={254}
                  className="w-full rounded-lg border border-navy-600 bg-navy-800 px-4 py-3 text-white placeholder-navy-400 transition focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-navy-200"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                maxLength={200}
                className="w-full rounded-lg border border-navy-600 bg-navy-800 px-4 py-3 text-white placeholder-navy-400 transition focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
                placeholder="Project inquiry"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-navy-200"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={5}
                className="w-full rounded-lg border border-navy-600 bg-navy-800 px-4 py-3 text-white placeholder-navy-400 transition focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                <AlertCircle size={16} />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-8 py-3 font-semibold text-white transition hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
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
