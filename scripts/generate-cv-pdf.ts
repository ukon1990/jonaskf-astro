import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { buildCvPdfData } from '../src/lib/cvPdfData';
import { locales, type Locale } from '../src/lib/i18n';

const OUTPUT_BY_LOCALE: Record<Locale, string> = {
  no: 'public/cv/jonas-munthe-flones-cv-no.pdf',
  en: 'public/cv/jonas-munthe-flones-cv-en.pdf',
};

const PAGE = {
  width: 595,
  height: 842,
  marginX: 42,
  marginTop: 44,
  marginBottom: 42,
} as const;

const CONTENT_WIDTH = PAGE.width - PAGE.marginX * 2;

const COLORS = {
  text: rgb(0.1, 0.12, 0.16),
  muted: rgb(0.38, 0.42, 0.48),
  faint: rgb(0.78, 0.82, 0.88),
  accent: rgb(0.04, 0.24, 0.48),
  accentSoft: rgb(0.9, 0.94, 0.98),
} as const;

const LABELS: Record<
  Locale,
  {
    role: string;
    summary: string;
    education: string;
    certifications: string;
    technologies: string;
    projects: string;
    customer: string;
    projectTechnologies: string;
    present: string;
  }
> = {
  no: {
    role: 'Fullstack- og frontendutvikler',
    summary: 'Oppsummering',
    education: 'Utdanning',
    certifications: 'Sertifiseringer',
    technologies: 'Teknologier',
    projects: 'Prosjekter etter arbeidsgiver',
    customer: 'Kunde',
    projectTechnologies: 'Teknologier',
    present: 'nå',
  },
  en: {
    role: 'Full-stack and frontend developer',
    summary: 'Summary',
    education: 'Education',
    certifications: 'Certifications',
    technologies: 'Technologies',
    projects: 'Projects by employer',
    customer: 'Customer',
    projectTechnologies: 'Technologies',
    present: 'Present',
  },
};

type RenderState = {
  doc: PDFDocument;
  page: ReturnType<PDFDocument['addPage']>;
  y: number;
  fontRegular: Awaited<ReturnType<PDFDocument['embedFont']>>;
  fontBold: Awaited<ReturnType<PDFDocument['embedFont']>>;
};

type Font = RenderState['fontRegular'];

type TextStyle = {
  font?: Font;
  size?: number;
  color?: ReturnType<typeof rgb>;
  lineHeight?: number;
};

function formatPeriod(startDate: Date, endDate: Date | null | undefined, locale: Locale): string {
  const formatter = new Intl.DateTimeFormat(locale === 'no' ? 'nb-NO' : 'en', {
    year: 'numeric',
    month: 'short',
  });
  const start = formatter.format(startDate);
  const end = endDate ? formatter.format(endDate) : LABELS[locale].present;
  return `${start} - ${end}`;
}

function wrapText(text: string, maxWidth: number, font: Font, size: number): string[] {
  const words = text.replace(/\s+/g, ' ').trim().split(' ');
  if (words.length === 1 && words[0] === '') return [];
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function addPage(state: RenderState) {
  state.page = state.doc.addPage([PAGE.width, PAGE.height]);
  state.y = PAGE.height - PAGE.marginTop;
}

function ensureSpace(state: RenderState, height: number) {
  if (state.y - height > PAGE.marginBottom) return;
  addPage(state);
}

function drawTextAt(state: RenderState, text: string, x: number, y: number, style?: TextStyle) {
  state.page.drawText(text, {
    x,
    y,
    size: style?.size ?? 10,
    font: style?.font ?? state.fontRegular,
    color: style?.color ?? COLORS.text,
  });
}

function drawRightAlignedText(
  state: RenderState,
  text: string,
  rightX: number,
  y: number,
  style?: TextStyle,
) {
  const font = style?.font ?? state.fontRegular;
  const size = style?.size ?? 10;
  drawTextAt(state, text, rightX - font.widthOfTextAtSize(text, size), y, style);
}

function getWrappedHeight(
  text: string,
  width: number,
  style: Required<Pick<TextStyle, 'font' | 'size' | 'lineHeight'>>,
) {
  return Math.max(1, wrapText(text, width, style.font, style.size).length) * style.lineHeight;
}

function drawWrappedTextAt(
  state: RenderState,
  text: string,
  x: number,
  y: number,
  width: number,
  style?: TextStyle,
): number {
  const font = style?.font ?? state.fontRegular;
  const size = style?.size ?? 10;
  const lineHeight = style?.lineHeight ?? 13;
  const lines = wrapText(text, width, font, size);
  let cursorY = y;
  for (const line of lines) {
    drawTextAt(state, line, x, cursorY, { ...style, font, size });
    cursorY -= lineHeight;
  }
  return Math.max(1, lines.length) * lineHeight;
}

function drawSectionHeading(state: RenderState, text: string) {
  ensureSpace(state, 32);
  state.y -= 8;
  drawTextAt(state, text.toUpperCase(), PAGE.marginX, state.y, {
    font: state.fontBold,
    size: 9.5,
    color: COLORS.accent,
  });
  state.page.drawLine({
    start: { x: PAGE.marginX, y: state.y - 7 },
    end: { x: PAGE.width - PAGE.marginX, y: state.y - 7 },
    thickness: 0.75,
    color: COLORS.faint,
  });
  state.y -= 22;
}

function formatContactUrl(url: string): string {
  return decodeURIComponent(
    url
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/$/, ''),
  );
}

function drawHeader(
  state: RenderState,
  labels: (typeof LABELS)[Locale],
  data: Awaited<ReturnType<typeof buildCvPdfData>>,
) {
  const nameY = PAGE.height - PAGE.marginTop;
  drawTextAt(state, 'Jonas Munthe Flønes', PAGE.marginX, nameY, {
    font: state.fontBold,
    size: 22,
    color: COLORS.text,
  });
  drawTextAt(state, labels.role, PAGE.marginX, nameY - 18, {
    size: 11,
    color: COLORS.accent,
  });

  const contactLines = [
    data.contact.email,
    data.contact.phone,
    formatContactUrl(data.contact.github),
    formatContactUrl(data.contact.linkedin),
  ];
  let contactY = nameY + 1;
  for (const line of contactLines) {
    drawRightAlignedText(state, line, PAGE.width - PAGE.marginX, contactY, {
      size: 8.4,
      color: COLORS.muted,
    });
    contactY -= 10.5;
  }

  state.page.drawLine({
    start: { x: PAGE.marginX, y: nameY - 41 },
    end: { x: PAGE.width - PAGE.marginX, y: nameY - 41 },
    thickness: 1.5,
    color: COLORS.accent,
  });
  state.y = nameY - 63;
}

function drawSummary(state: RenderState, text: string) {
  const height = getWrappedHeight(text, CONTENT_WIDTH, {
    font: state.fontRegular,
    size: 10.4,
    lineHeight: 14.5,
  });
  ensureSpace(state, height + 8);
  state.y -= drawWrappedTextAt(state, text, PAGE.marginX, state.y, CONTENT_WIDTH, {
    size: 10.4,
    lineHeight: 14.5,
    color: COLORS.text,
  });
  state.y -= 8;
}

function formatMonthYear(date: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === 'no' ? 'nb-NO' : 'en', {
    year: 'numeric',
    month: 'short',
  }).format(new Date(date));
}

function formatCertificationPeriod(
  certification: { issuedAt: string; expiresAt?: string },
  locale: Locale,
): string {
  const issued = formatMonthYear(certification.issuedAt, locale);
  const expires = certification.expiresAt ? formatMonthYear(certification.expiresAt, locale) : '';
  return expires ? `${issued} - ${expires}` : issued;
}

function drawEducation(
  state: RenderState,
  education: {
    degree: string;
    specialization: string;
    institution: string;
    period: string;
  },
) {
  const detailText = `${education.specialization} · ${education.institution}`;
  const detailsHeight = getWrappedHeight(detailText, CONTENT_WIDTH, {
    font: state.fontRegular,
    size: 9.6,
    lineHeight: 12.5,
  });
  const blockHeight = 16 + detailsHeight + 12;
  ensureSpace(state, blockHeight);

  drawTextAt(state, education.degree, PAGE.marginX, state.y, {
    font: state.fontBold,
    size: 10.2,
    color: COLORS.text,
  });
  drawRightAlignedText(state, education.period, PAGE.width - PAGE.marginX, state.y, {
    size: 8.8,
    color: COLORS.muted,
  });
  state.y -= 14;
  state.y -= drawWrappedTextAt(state, detailText, PAGE.marginX, state.y, CONTENT_WIDTH, {
    size: 9.6,
    lineHeight: 12.5,
    color: COLORS.muted,
  });
  state.y -= 8;
}

function certificationHeight(
  state: RenderState,
  certification: { name: string; issuer: string; issuedAt: string; expiresAt?: string; verificationId?: string },
): number {
  const issuerHeight = getWrappedHeight(certification.issuer, CONTENT_WIDTH - 12, {
    font: state.fontRegular,
    size: 9.1,
    lineHeight: 11.5,
  });
  const idHeight = certification.verificationId
    ? getWrappedHeight(`ID: ${certification.verificationId}`, CONTENT_WIDTH - 12, {
        font: state.fontRegular,
        size: 8.2,
        lineHeight: 10.4,
      })
    : 0;
  return 14 + issuerHeight + idHeight + 8;
}

function drawCertifications(
  state: RenderState,
  certifications: Array<{
    name: string;
    issuer: string;
    issuedAt: string;
    expiresAt?: string;
    verificationId?: string;
  }>,
  locale: Locale,
) {
  for (const certification of certifications) {
    ensureSpace(state, certificationHeight(state, certification) + 6);
    drawTextAt(state, certification.name, PAGE.marginX, state.y, {
      font: state.fontBold,
      size: 9.8,
      color: COLORS.text,
    });
    drawRightAlignedText(
      state,
      formatCertificationPeriod(certification, locale),
      PAGE.width - PAGE.marginX,
      state.y,
      {
        size: 8.8,
        color: COLORS.muted,
      },
    );
    state.y -= 12;
    state.y -= drawWrappedTextAt(
      state,
      certification.issuer,
      PAGE.marginX,
      state.y,
      CONTENT_WIDTH - 12,
      {
        size: 9.1,
        lineHeight: 11.5,
        color: COLORS.muted,
      },
    );
    if (certification.verificationId) {
      state.y -= drawWrappedTextAt(
        state,
        `ID: ${certification.verificationId}`,
        PAGE.marginX,
        state.y,
        CONTENT_WIDTH - 12,
        {
          size: 8.2,
          lineHeight: 10.4,
          color: COLORS.muted,
        },
      );
    }
    state.y -= 8;
  }
}

function getTechnologyBlockHeight(
  state: RenderState,
  group: { label: string; technologies: string[] },
  width: number,
) {
  const techHeight = getWrappedHeight(group.technologies.join(', '), width, {
    font: state.fontRegular,
    size: 8.5,
    lineHeight: 10.5,
  });
  return 12 + techHeight;
}

function drawTechnologyBlock(
  state: RenderState,
  group: { label: string; technologies: string[] },
  x: number,
  y: number,
  width: number,
) {
  drawTextAt(state, group.label, x, y, {
    font: state.fontBold,
    size: 9.2,
    color: COLORS.text,
  });
  drawWrappedTextAt(state, group.technologies.join(', '), x, y - 12, width, {
    size: 8.5,
    lineHeight: 10.5,
    color: COLORS.muted,
  });
}

function drawTechnologies(
  state: RenderState,
  groups: Array<{ label: string; technologies: string[] }>,
) {
  const columnGap = 22;
  const columnWidth = (CONTENT_WIDTH - columnGap) / 2;
  for (let index = 0; index < groups.length; index += 2) {
    const left = groups[index];
    const right = groups[index + 1];
    const leftHeight = getTechnologyBlockHeight(state, left, columnWidth);
    const rightHeight = right ? getTechnologyBlockHeight(state, right, columnWidth) : 0;
    const rowHeight = Math.max(leftHeight, rightHeight);
    ensureSpace(state, rowHeight + 9);
    drawTechnologyBlock(state, left, PAGE.marginX, state.y, columnWidth);
    if (right) {
      drawTechnologyBlock(
        state,
        right,
        PAGE.marginX + columnWidth + columnGap,
        state.y,
        columnWidth,
      );
    }
    state.y -= rowHeight + 9;
  }
}

function projectHeight(
  state: RenderState,
  project: {
    title: string;
    role: string;
    summary: string;
    technologies: string[];
    customer?: string;
  },
) {
  const titleHeight = getWrappedHeight(`${project.title} - ${project.role}`, CONTENT_WIDTH - 128, {
    font: state.fontBold,
    size: 10.2,
    lineHeight: 12.5,
  });
  const summaryHeight = getWrappedHeight(project.summary, CONTENT_WIDTH - 16, {
    font: state.fontRegular,
    size: 9.4,
    lineHeight: 12.5,
  });
  const techHeight = getWrappedHeight(project.technologies.join(', '), CONTENT_WIDTH - 16, {
    font: state.fontRegular,
    size: 8.2,
    lineHeight: 10.4,
  });
  const customerHeight = project.customer ? 12 : 0;
  return 18 + titleHeight + customerHeight + summaryHeight + techHeight;
}

function drawProject(
  state: RenderState,
  project: {
    title: string;
    role: string;
    customer?: string;
    startDate: Date;
    endDate?: Date | null;
    summary: string;
    technologies: string[];
  },
  labels: (typeof LABELS)[Locale],
  locale: Locale,
) {
  const blockHeight = projectHeight(state, project);
  ensureSpace(state, blockHeight + 10);

  const topY = state.y;
  state.page.drawRectangle({
    x: PAGE.marginX,
    y: topY - blockHeight + 2,
    width: 3,
    height: blockHeight - 4,
    color: COLORS.accentSoft,
  });

  drawWrappedTextAt(
    state,
    `${project.title} - ${project.role}`,
    PAGE.marginX + 12,
    topY,
    CONTENT_WIDTH - 140,
    {
      font: state.fontBold,
      size: 10.2,
      lineHeight: 12.5,
      color: COLORS.text,
    },
  );
  drawRightAlignedText(
    state,
    formatPeriod(project.startDate, project.endDate, locale),
    PAGE.width - PAGE.marginX,
    topY,
    {
      size: 8.7,
      color: COLORS.muted,
    },
  );

  let cursorY = topY - 15;
  if (project.customer) {
    drawTextAt(state, `${labels.customer}: ${project.customer}`, PAGE.marginX + 12, cursorY, {
      size: 8.8,
      color: COLORS.muted,
    });
    cursorY -= 12;
  }

  cursorY -= drawWrappedTextAt(
    state,
    project.summary,
    PAGE.marginX + 12,
    cursorY,
    CONTENT_WIDTH - 16,
    {
      size: 9.4,
      lineHeight: 12.5,
      color: COLORS.text,
    },
  );
  cursorY -= 2;
  drawTextAt(state, labels.projectTechnologies, PAGE.marginX + 12, cursorY, {
    font: state.fontBold,
    size: 7.8,
    color: COLORS.accent,
  });
  cursorY -= 10;
  cursorY -= drawWrappedTextAt(
    state,
    project.technologies.join(', '),
    PAGE.marginX + 12,
    cursorY,
    CONTENT_WIDTH - 16,
    {
      size: 8.2,
      lineHeight: 10.4,
      color: COLORS.muted,
    },
  );

  state.y = cursorY - 8;
}

function drawFooter(state: RenderState) {
  const pages = state.doc.getPages();
  pages.forEach((page, index) => {
    const label = `${index + 1}/${pages.length}`;
    page.drawText(label, {
      x: PAGE.width - PAGE.marginX - state.fontRegular.widthOfTextAtSize(label, 8),
      y: 24,
      size: 8,
      font: state.fontRegular,
      color: COLORS.faint,
    });
  });
}

async function generatePdf(locale: Locale): Promise<void> {
  const data = await buildCvPdfData(locale);
  const labels = LABELS[locale];

  const doc = await PDFDocument.create();
  const fontRegular = await doc.embedFont(StandardFonts.Helvetica);
  const fontBold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([PAGE.width, PAGE.height]);
  const state: RenderState = {
    doc,
    page,
    y: PAGE.height - PAGE.marginTop,
    fontRegular,
    fontBold,
  };

  drawHeader(state, labels, data);

  drawSectionHeading(state, labels.summary);
  drawSummary(state, data.summary);

  drawSectionHeading(state, labels.education);
  drawEducation(state, data.education);

  if (data.certifications.length > 0) {
    drawSectionHeading(state, labels.certifications);
    drawCertifications(state, data.certifications, locale);
  }

  drawSectionHeading(state, labels.technologies);
  drawTechnologies(state, data.technologiesByGroup);

  const firstGroup = data.projectsByEmployer[0];
  const firstProject = firstGroup?.projects[0];
  const projectSectionStartHeight = firstProject ? 34 + projectHeight(state, firstProject) : 34;
  ensureSpace(state, projectSectionStartHeight);
  drawSectionHeading(state, labels.projects);
  for (const employerGroup of data.projectsByEmployer) {
    ensureSpace(state, 24 + projectHeight(state, employerGroup.projects[0]));
    drawTextAt(state, employerGroup.employer, PAGE.marginX, state.y, {
      font: state.fontBold,
      size: 12,
      color: COLORS.accent,
    });
    state.y -= 18;
    for (const project of employerGroup.projects) {
      drawProject(state, project, labels, locale);
    }
    state.y -= 2;
  }

  drawFooter(state);

  const outputPath = resolve(process.cwd(), OUTPUT_BY_LOCALE[locale]);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, await doc.save());
}

async function main() {
  for (const locale of locales) {
    await generatePdf(locale);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
