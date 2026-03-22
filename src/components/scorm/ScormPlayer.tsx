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

export function ScormPlayer({
  packageId,
  launchUrl,
  title,
  version,
}: ScormPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Attach the appropriate SCORM API to the window
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
    <div className="flex h-screen flex-col bg-navy-950">
      {/* Player header */}
      <div className="flex items-center gap-4 border-b border-navy-700 bg-navy-900 px-4 py-3">
        <Link
          href="/portfolio"
          className="flex items-center gap-1 text-sm text-navy-300 transition hover:text-accent-400"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
        <div className="h-4 w-px bg-navy-700" />
        <h1 className="truncate text-sm font-medium text-white">{title}</h1>
        <span className="ml-auto rounded-full bg-navy-800 px-2 py-0.5 text-xs text-navy-400">
          SCORM {version}
        </span>
      </div>

      {/* iframe container */}
      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-navy-950">
            <Loader2 size={32} className="animate-spin text-accent-400" />
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
