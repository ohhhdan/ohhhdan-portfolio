'use client';

import { useEffect, useRef, useState } from 'react';
import { Scorm12Api } from '@/lib/scorm/api-1.2';
import { Scorm2004Api } from '@/lib/scorm/api-2004';
import type { ScormVersion } from '@/lib/scorm/types';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ScormPlayerProps {
  packageId: string;
  launchUrl: string;
  title: string;
  version: ScormVersion;
}

export function ScormPlayer({ packageId, launchUrl, title, version }: ScormPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const win = window as any;
    if (version === '1.2') {
      win.API = new Scorm12Api();
    } else {
      win.API_1484_11 = new Scorm2004Api();
    }

    return () => {
      delete win.API;
      delete win.API_1484_11;
    };
  }, [version]);

  const iframeSrc = `/api/scorm/${encodeURIComponent(packageId)}/files/${launchUrl}`;

  return (
    <div className="flex h-screen flex-col bg-pine-900">
      <div className="flex items-center gap-4 border-b border-pine-700 bg-pine-950 px-4 py-3">
        <Link
          href="/#work"
          className="flex items-center gap-1 text-sm text-pine-300 transition hover:text-pine-100"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="h-4 w-px bg-pine-700" />
        <h1 className="truncate text-sm font-medium text-white">{title}</h1>
        <span className="ml-auto rounded-full bg-pine-800 px-2 py-0.5 text-xs text-pine-300">Sample player</span>
      </div>

      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-pine-900">
            <Loader2 size={32} className="animate-spin text-pine-300" />
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          className="h-full w-full border-0"
          title={title}
          onLoad={() => setLoading(false)}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </div>
    </div>
  );
}
