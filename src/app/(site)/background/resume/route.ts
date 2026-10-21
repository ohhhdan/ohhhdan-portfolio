import { buildResumePdf } from '@/lib/resume-pdf';

export const dynamic = 'force-dynamic';

export async function GET() {
  const pdf = await buildResumePdf();
  return new Response(new Uint8Array(pdf), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Dan-Winter.pdf"',
      'Cache-Control': 'no-store',
    },
  });
}
