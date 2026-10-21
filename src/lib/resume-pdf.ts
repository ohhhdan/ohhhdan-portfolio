import PDFDocument from 'pdfkit';
import { getCollection, getSingleton } from '@/lib/cms/db';
import type {
  AwardItem,
  EducationItem,
  EngagementItem,
  ExperienceItem,
  Profile,
  SkillCategory,
  TalkItem,
} from '@/lib/cms/types';

const INK = '#1c1c1c';
const FOREST = '#1b4a38';
const MINT = '#69bc92';
const MUTED = '#5c6560';
const RULE = '#d5e0da';
const PAGE_W = 612;
const PAGE_H = 792;
const MARGIN = 36;
const BOTTOM = 36;
const CONTENT_W = PAGE_W - MARGIN * 2;
const COL_GAP = 20;
const LEFT_W = 348;
const RIGHT_X = MARGIN + LEFT_W + COL_GAP;
const RIGHT_W = CONTENT_W - LEFT_W - COL_GAP;

function plain(value: string) {
  return value
    .replace(/\u00b7/g, ' / ')
    .replace(/\u2022/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2014\u2013]/g, '-');
}

type Cursor = { page: number; y: number };
type Box = { x: number; w: number };

const leftBox: Box = { x: MARGIN, w: LEFT_W };
const rightBox: Box = { x: RIGHT_X, w: RIGHT_W };

export function buildResumePdf(): Promise<Buffer> {
  const profile = getSingleton<Profile>('profile');
  const experience = getCollection<ExperienceItem>('experience');
  const skills = getCollection<SkillCategory>('skills');
  const education = getCollection<EducationItem>('education');
  const awards = getCollection<AwardItem>('awards');
  const talks = getCollection<TalkItem>('presentations');
  const engagements = getCollection<EngagementItem>('engagements');

  const doc = new PDFDocument({
    size: 'LETTER',
    margin: 0,
    bufferPages: true,
    info: { Title: 'Dan Winter', Author: 'Dan Winter' },
  });
  const chunks: Buffer[] = [];
  doc.on('data', (chunk: Buffer) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve, reject) => {
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
  });

  const nameY = 34;
  drawName(doc, nameY);
  const contact = [profile?.email, 'linkedin.com/in/ohhhdan', 'www.ohhhdan.com'].filter(Boolean) as string[];
  drawContact(doc, contact, nameY);
  const headerBottom = nameY + Math.max(26, contact.length * 11) + 8;
  doc.save();
  doc.moveTo(MARGIN, headerBottom).lineTo(MARGIN + CONTENT_W, headerBottom).lineWidth(1).strokeColor(FOREST).stroke();
  doc.restore();

  const cursor: Cursor = { page: 0, y: headerBottom + 14 };
  const start: Cursor = { page: cursor.page, y: cursor.y };
  const side: Cursor = { page: start.page, y: start.y };
  drawSidebar(doc, side, skills, education, awards, talks, engagements);

  const main: Cursor = { page: start.page, y: start.y };
  sectionRule(doc, main, 'Experience', leftBox);
  for (const job of experience) {
    keep(doc, main, 48);
    if (job.roles?.length) {
      const company = plain(job.company);
      write(
        doc,
        main,
        company.length < 28 ? company.toUpperCase() : company,
        { font: 'Helvetica-Bold', size: 8, color: MUTED, gap: 2 },
        leftBox,
      );
      if (job.description) {
        write(doc, main, plain(job.description), { font: 'Helvetica', size: 8.5, color: INK, gap: 2, lineGap: 1 }, leftBox);
      }
      for (const role of job.roles) {
        main.y += 3;
        keep(doc, main, 36);
        pair(doc, main, plain(role.title), plain(role.period), leftBox);
        if (role.description) {
          write(doc, main, plain(role.description), { font: 'Helvetica-Oblique', size: 8.5, color: INK, gap: 2, lineGap: 0.8 }, leftBox);
        }
        bullets(doc, main, role.highlights, leftBox);
      }
    } else if (job.lines?.length) {
      write(doc, main, 'Earlier', { font: 'Helvetica-Bold', size: 8, color: MUTED, gap: 3 }, leftBox);
      for (const line of job.lines) {
        pair(doc, main, plain(line.title), plain(line.period ?? ''), leftBox);
        write(doc, main, plain(line.company), { font: 'Helvetica', size: 8, color: MUTED, gap: 3 }, leftBox);
      }
    } else {
      pair(doc, main, plain(job.title), plain(job.period), leftBox);
      if (job.company) {
        write(doc, main, plain(job.company), { font: 'Helvetica', size: 8, color: MUTED, gap: 1 }, leftBox);
      }
      if (job.description) {
        write(doc, main, plain(job.description), { font: 'Helvetica-Oblique', size: 8.5, color: INK, gap: 2, lineGap: 0.8 }, leftBox);
      }
      bullets(doc, main, job.highlights ?? [], leftBox);
    }
    main.y += 6;
  }

  doc.end();
  return done;
}

function drawName(doc: PDFKit.PDFDocument, y: number) {
  doc.font('Helvetica-Bold').fontSize(22).fillColor(INK);
  const dan = 'DAN';
  const winter = 'WINTER';
  const tracking = 1.4;
  const danW = doc.widthOfString(dan) + tracking * (dan.length - 1);
  const tieW = 26;
  doc.text(dan, MARGIN, y, { characterSpacing: tracking, lineBreak: false });
  drawBowtie(doc, MARGIN + danW + 7, y + 3, 16);
  doc.font('Helvetica-Bold').fontSize(22).fillColor(INK);
  doc.text(winter, MARGIN + danW + 7 + tieW + 7, y, { characterSpacing: tracking, lineBreak: false });
}

function drawBowtie(doc: PDFKit.PDFDocument, x: number, y: number, h: number) {
  const s = h / 40;
  const wing = (pts: Array<[number, number]>) => {
    doc.moveTo(x + pts[0][0] * s, y + pts[0][1] * s);
    for (let i = 1; i < pts.length; i += 1) doc.lineTo(x + pts[i][0] * s, y + pts[i][1] * s);
    doc.closePath();
    doc.fill(MINT);
  };
  doc.save();
  wing([
    [4, 4],
    [22, 14],
    [22, 26],
    [4, 36],
  ]);
  wing([
    [56, 4],
    [38, 14],
    [38, 26],
    [56, 36],
  ]);
  wing([
    [22, 14],
    [38, 14],
    [38, 26],
    [22, 26],
  ]);
  doc.restore();
}

function drawContact(doc: PDFKit.PDFDocument, lines: string[], y: number) {
  doc.font('Helvetica').fontSize(8).fillColor(INK);
  const width = Math.max(...lines.map((line) => doc.widthOfString(line)));
  const x = MARGIN + CONTENT_W - width;
  lines.forEach((line, i) => {
    doc.text(line, x, y + i * 11, { width, align: 'right', lineBreak: false, characterSpacing: 0 });
  });
}

function drawSidebar(
  doc: PDFKit.PDFDocument,
  cursor: Cursor,
  skills: SkillCategory[],
  education: EducationItem[],
  awards: AwardItem[],
  talks: TalkItem[],
  engagements: EngagementItem[],
) {
  if (skills.length) {
    sideHead(doc, cursor, 'Skills');
    for (const category of skills) {
      write(doc, cursor, plain(category.name), { font: 'Helvetica-Bold', size: 8, color: FOREST, gap: 2 }, rightBox);
      for (const skill of category.skills) {
        write(doc, cursor, plain(skill), { font: 'Helvetica', size: 8, color: INK, gap: 1.5 }, rightBox);
      }
      cursor.y += 4;
    }
  }
  if (education.length) {
    sideHead(doc, cursor, 'Education');
    for (const item of education) {
      const meta = [item.institution, item.year].filter(Boolean).join(', ');
      reserve(doc, cursor, [plain(item.degree), plain(meta)], [8, 7.5]);
      write(doc, cursor, plain(item.degree), { font: 'Helvetica-Bold', size: 8, color: INK, gap: 1 }, rightBox);
      write(doc, cursor, plain(meta), { font: 'Helvetica', size: 7.5, color: MUTED, gap: 5 }, rightBox);
    }
  }
  if (awards.length) {
    sideHead(doc, cursor, 'Recognition');
    for (const award of awards) {
      const when = [award.org, award.year].filter(Boolean).join(', ');
      const parts = [plain(award.name), plain(when)];
      const sizes = [8, 7.5];
      if (award.description) {
        parts.push(plain(award.description));
        sizes.push(7.5);
      }
      reserve(doc, cursor, parts, sizes);
      write(doc, cursor, parts[0], { font: 'Helvetica-Bold', size: 8, color: INK, gap: 1 }, rightBox);
      write(doc, cursor, parts[1], { font: 'Helvetica', size: 7.5, color: MUTED, gap: award.description ? 1 : 4 }, rightBox);
      if (award.description) {
        write(doc, cursor, parts[2], { font: 'Helvetica', size: 7.5, color: INK, gap: 4, lineGap: 0.6 }, rightBox);
      }
    }
  }
  if (talks.length) {
    sideHead(doc, cursor, 'Talks');
    for (const talk of talks) {
      const when = [talk.event, talk.year].filter(Boolean).join(', ');
      reserve(doc, cursor, [plain(talk.name), plain(when)], [8, 7.5]);
      write(doc, cursor, plain(talk.name), { font: 'Helvetica-Bold', size: 8, color: INK, gap: 1 }, rightBox);
      write(doc, cursor, plain(when), { font: 'Helvetica', size: 7.5, color: MUTED, gap: 4 }, rightBox);
    }
  }
  if (engagements.length) {
    sideHead(doc, cursor, 'Engagement');
    for (const item of engagements) {
      const meta = `${item.role}${item.description ? `, ${item.description}` : ''}`;
      reserve(doc, cursor, [plain(item.name), plain(meta)], [8, 7.5]);
      write(doc, cursor, plain(item.name), { font: 'Helvetica-Bold', size: 8, color: INK, gap: 1 }, rightBox);
      write(doc, cursor, plain(meta), { font: 'Helvetica', size: 7.5, color: MUTED, gap: 4 }, rightBox);
    }
  }
}

function sideHead(doc: PDFKit.PDFDocument, cursor: Cursor, label: string) {
  cursor.y += 2;
  ensure(doc, cursor, 46);
  doc.switchToPage(cursor.page);
  doc.save();
  doc.moveTo(rightBox.x, cursor.y).lineTo(rightBox.x, cursor.y + 9).lineWidth(2.2).strokeColor(FOREST).stroke();
  doc.restore();
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(FOREST);
  doc.text(label.toUpperCase(), rightBox.x + 7, cursor.y, { characterSpacing: 0.35, lineBreak: false });
  cursor.y += 13;
}

function sectionRule(doc: PDFKit.PDFDocument, cursor: Cursor, label: string, box: Box) {
  ensure(doc, cursor, 16);
  doc.switchToPage(cursor.page);
  doc.font('Helvetica-Bold').fontSize(8).fillColor(FOREST);
  const text = label.toUpperCase();
  doc.text(text, box.x, cursor.y, { characterSpacing: 0.6, lineBreak: false });
  const labelW = doc.widthOfString(text) + 0.6 * (text.length - 1);
  doc.save();
  doc
    .moveTo(box.x + labelW + 8, cursor.y + 5)
    .lineTo(box.x + box.w, cursor.y + 5)
    .lineWidth(0.6)
    .strokeColor(RULE)
    .stroke();
  doc.restore();
  cursor.y += 14;
}

function pair(doc: PDFKit.PDFDocument, cursor: Cursor, title: string, aside: string, box: Box) {
  doc.font('Helvetica').fontSize(8);
  const asideW = aside ? Math.min(doc.widthOfString(aside) + 2, box.w * 0.42) : 0;
  const titleW = box.w - (aside ? asideW + 8 : 0);
  doc.font('Helvetica-Bold').fontSize(10);
  const titleH = doc.heightOfString(title, { width: titleW });
  doc.font('Helvetica').fontSize(8);
  const asideH = aside ? doc.heightOfString(aside, { width: asideW, align: 'right' }) : 0;
  ensure(doc, cursor, Math.max(titleH, asideH));
  doc.switchToPage(cursor.page);
  doc.font('Helvetica-Bold').fontSize(10).fillColor(INK);
  doc.text(title, box.x, cursor.y, { width: titleW, characterSpacing: 0 });
  if (aside) {
    doc.font('Helvetica').fontSize(8).fillColor(MUTED);
    doc.text(aside, box.x + box.w - asideW, cursor.y + 1, { width: asideW, align: 'right', characterSpacing: 0 });
  }
  cursor.y += Math.max(titleH, asideH) + 2;
}

function bullets(doc: PDFKit.PDFDocument, cursor: Cursor, items: string[], box: Box) {
  const textW = box.w - 10;
  for (const item of items) {
    const text = plain(item);
    doc.font('Helvetica').fontSize(8.5);
    const h = doc.heightOfString(text, { width: textW, lineGap: 0.4 });
    ensure(doc, cursor, h);
    doc.switchToPage(cursor.page);
    doc.save();
    doc.circle(box.x + 2, cursor.y + 4, 1.15).fill(FOREST);
    doc.restore();
    doc.font('Helvetica').fontSize(8.5).fillColor(INK);
    doc.text(text, box.x + 8, cursor.y, { width: textW, lineGap: 0.4, characterSpacing: 0 });
    cursor.y += h + 2;
  }
}

function write(
  doc: PDFKit.PDFDocument,
  cursor: Cursor,
  text: string,
  style: { font: string; size: number; color: string; gap?: number; lineGap?: number },
  box: Box,
) {
  if (!text.trim()) return;
  const lineGap = style.lineGap ?? 0;
  doc.font(style.font).fontSize(style.size);
  const h = doc.heightOfString(text, { width: box.w, lineGap });
  ensure(doc, cursor, h);
  doc.switchToPage(cursor.page);
  doc.font(style.font).fontSize(style.size).fillColor(style.color);
  doc.text(text, box.x, cursor.y, { width: box.w, lineGap, characterSpacing: 0 });
  cursor.y += h + (style.gap ?? 0);
}

function reserve(doc: PDFKit.PDFDocument, cursor: Cursor, lines: string[], sizes: number[]) {
  let h = 4;
  lines.forEach((line, i) => {
    doc.font('Helvetica').fontSize(sizes[i] ?? 8);
    h += doc.heightOfString(line, { width: rightBox.w }) + 2;
  });
  ensure(doc, cursor, h);
}

function keep(doc: PDFKit.PDFDocument, cursor: Cursor, min: number) {
  if (cursor.y + min > PAGE_H - BOTTOM) ensure(doc, cursor, min);
}

function ensure(doc: PDFKit.PDFDocument, cursor: Cursor, needed: number) {
  if (cursor.y + needed <= PAGE_H - BOTTOM) return;
  cursor.page += 1;
  if (cursor.page >= doc.bufferedPageRange().count) doc.addPage();
  doc.switchToPage(cursor.page);
  cursor.y = 32;
}
