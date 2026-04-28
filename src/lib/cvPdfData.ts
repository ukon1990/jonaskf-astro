import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { getTechDisplayName, getTechMeta, isTechSlug, type TechCategory } from '../data/tech';
import { locales, ui, type Locale } from './i18n';

type CvTranslation = {
  title: string;
  role: string;
  summary: string;
};

type CvFrontmatter = {
  slug?: string;
  title?: string;
  role?: string;
  summary?: string;
  employer?: string;
  customer?: string;
  customerUrl?: string;
  capacity?: 'professional' | 'hobby';
  draft?: boolean;
  startDate: string;
  endDate?: string | null;
  tech?: string[];
  translations?: Partial<Record<Locale, CvTranslation>>;
};

type CvProject = {
  title: string;
  role: string;
  employer: string;
  customer?: string;
  startDate: Date;
  endDate?: Date | null;
  summary: string;
  technologies: string[];
};

type ScoredTechnology = {
  label: string;
  groupLabel: string;
};

type DateRange = {
  start: Date;
  end: Date;
};

export type CvEmployerGroup = {
  employer: string;
  newestStartDate: Date;
  projects: CvProject[];
};

export type CvPdfData = {
  locale: Locale;
  contact: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
  summary: string;
  technologiesByGroup: Array<{ label: string; technologies: string[] }>;
  projectsByEmployer: CvEmployerGroup[];
};

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function parseJsonFrontmatter(contents: string): { data: CvFrontmatter } {
  const match = contents.match(frontmatterPattern);
  if (!match) {
    throw new Error('Missing JSON frontmatter in CV file');
  }
  return { data: JSON.parse(match[1]) as CvFrontmatter };
}

function getTranslation(data: CvFrontmatter, locale: Locale): CvTranslation {
  const translation = data.translations?.[locale];
  return {
    title: translation?.title ?? data.title ?? '',
    role: translation?.role ?? data.role ?? '',
    summary: translation?.summary ?? data.summary ?? '',
  };
}

function uniqueSorted(items: Iterable<string>): string[] {
  return Array.from(new Set(items)).sort((a, b) => a.localeCompare(b, 'en'));
}

function toDate(date: string | null | undefined): Date | undefined {
  if (!date) return undefined;
  const parsed = new Date(date);
  return Number.isNaN(parsed.valueOf()) ? undefined : parsed;
}

function monthDiff(startDate: Date, endDate: Date): number {
  const years = endDate.getFullYear() - startDate.getFullYear();
  const months = endDate.getMonth() - startDate.getMonth();
  return Math.max(1, years * 12 + months + 1);
}

function mergeOverlappingRanges(ranges: DateRange[]): DateRange[] {
  if (ranges.length <= 1) return ranges;
  const sorted = [...ranges].sort((a, b) => a.start.valueOf() - b.start.valueOf());
  const merged: DateRange[] = [sorted[0]];
  for (const range of sorted.slice(1)) {
    const last = merged[merged.length - 1];
    if (range.start.valueOf() <= last.end.valueOf()) {
      if (range.end.valueOf() > last.end.valueOf()) {
        last.end = range.end;
      }
      continue;
    }
    merged.push({ ...range });
  }
  return merged;
}

function groupLabelByCategory(category: TechCategory, locale: Locale): string {
  const labelsByLocale: Record<Locale, Partial<Record<TechCategory, string>>> = {
    no: {
      language: 'Språk',
      framework: 'Rammeverk',
      library: 'Biblioteker',
      runtime: 'Runtime',
      platform: 'Plattformer',
      service: 'Tjenester',
      database: 'Databaser',
      tooling: 'Verktøy',
      testing: 'Testing',
      analytics: 'Analyse',
      design: 'Design',
      process: 'Prosess',
      group: 'Annet',
    },
    en: {
      language: 'Languages',
      framework: 'Frameworks',
      library: 'Libraries',
      runtime: 'Runtime',
      platform: 'Platforms',
      service: 'Services',
      database: 'Databases',
      tooling: 'Tooling',
      testing: 'Testing',
      analytics: 'Analytics',
      design: 'Design',
      process: 'Process',
      group: 'Other',
    },
  };
  return labelsByLocale[locale][category] ?? (locale === 'no' ? 'Annet' : 'Other');
}

function groupAndRankTechnologies(
  projects: CvProject[],
  technologyUsage: ScoredTechnology[],
  locale: Locale,
): Array<{ label: string; technologies: string[] }> {
  const now = new Date();
  const rangesByTech = new Map<string, DateRange[]>();
  const monthsByTech = new Map<string, number>();
  const techGroupByName = new Map<string, string>();
  const latestUsageByTech = new Map<string, Date>();
  const staleThresholdDate = new Date(now);
  staleThresholdDate.setFullYear(staleThresholdDate.getFullYear() - 4);
  const groupOrder = [
    locale === 'no' ? 'Språk' : 'Languages',
    locale === 'no' ? 'Rammeverk' : 'Frameworks',
    locale === 'no' ? 'Biblioteker' : 'Libraries',
    locale === 'no' ? 'Runtime' : 'Runtime',
    locale === 'no' ? 'Plattformer' : 'Platforms',
    locale === 'no' ? 'Tjenester' : 'Services',
    locale === 'no' ? 'Databaser' : 'Databases',
    locale === 'no' ? 'Verktøy' : 'Tooling',
    locale === 'no' ? 'Testing' : 'Testing',
    locale === 'no' ? 'Analyse' : 'Analytics',
    locale === 'no' ? 'Design' : 'Design',
    locale === 'no' ? 'Prosess' : 'Process',
    locale === 'no' ? 'Annet' : 'Other',
  ];
  for (const project of projects) {
    const rangeEnd = project.endDate ?? now;
    const latestUsageInProject = project.endDate ?? now;
    for (const technology of project.technologies) {
      const currentRanges = rangesByTech.get(technology) ?? [];
      currentRanges.push({ start: project.startDate, end: rangeEnd });
      rangesByTech.set(technology, currentRanges);
      const existingLatestUsage = latestUsageByTech.get(technology);
      if (!existingLatestUsage || latestUsageInProject > existingLatestUsage) {
        latestUsageByTech.set(technology, latestUsageInProject);
      }
    }
  }

  for (const [technology, ranges] of rangesByTech.entries()) {
    const merged = mergeOverlappingRanges(ranges);
    const totalMonths = merged.reduce((sum, range) => sum + monthDiff(range.start, range.end), 0);
    monthsByTech.set(technology, totalMonths);
  }

  for (const usage of technologyUsage) {
    techGroupByName.set(usage.label, usage.groupLabel);
  }

  const grouped = new Map<string, Array<{ name: string; months: number }>>();
  for (const [name, months] of monthsByTech.entries()) {
    const latestUsage = latestUsageByTech.get(name);
    const group = techGroupByName.get(name) ?? (locale === 'no' ? 'Annet' : 'Other');
    const isLanguageGroup = group === (locale === 'no' ? 'Språk' : 'Languages');
    if (!isLanguageGroup && (!latestUsage || latestUsage < staleThresholdDate)) continue;
    const bucket = grouped.get(group) ?? [];
    bucket.push({ name, months });
    grouped.set(group, bucket);
  }

  return Array.from(grouped.entries())
    .map(([label, items]) => ({
      label,
      technologies: items
        .sort((a, b) => b.months - a.months || a.name.localeCompare(b.name, 'en'))
        .map((item) => item.name),
    }))
    .sort((a, b) => {
      const aIndex = groupOrder.indexOf(a.label);
      const bIndex = groupOrder.indexOf(b.label);
      if (aIndex === -1 && bIndex === -1) return a.label.localeCompare(b.label, 'en');
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
}

export async function buildCvPdfData(locale: Locale): Promise<CvPdfData> {
  if (!locales.includes(locale)) {
    throw new Error(`Unsupported locale ${locale}`);
  }

  const cvDir = new URL('../content/cv/', import.meta.url);
  const files = (await fs.readdir(cvDir)).filter((entry) => entry.endsWith('.md')).sort();

  const projects: CvProject[] = [];
  const technologyUsage: ScoredTechnology[] = [];

  for (const file of files) {
    const fileUrl = new URL(file, cvDir);
    const source = await fs.readFile(fileUrl, 'utf-8');
    const { data } = parseJsonFrontmatter(source);

    if (data.draft || data.capacity === 'hobby') continue;

    const translation = getTranslation(data, locale);
    const startDate = toDate(data.startDate);
    if (!startDate) {
      throw new Error(`Invalid or missing startDate in ${fileURLToPath(fileUrl)}`);
    }
    const endDate = toDate(data.endDate ?? undefined) ?? null;
    const normalizedTech = (data.tech ?? []).map((slug) => {
      if (!isTechSlug(slug)) {
        const fallbackGroup = locale === 'no' ? 'Annet' : 'Other';
        return { label: slug, groupLabel: fallbackGroup };
      }
      return {
        label: getTechDisplayName(slug),
        groupLabel: groupLabelByCategory(getTechMeta(slug).category, locale),
      };
    });
    const technologies = uniqueSorted(normalizedTech.map((tech) => tech.label));

    projects.push({
      title: translation.title,
      role: translation.role,
      employer:
        data.employer?.trim() || (locale === 'no' ? 'Ukjent arbeidsgiver' : 'Unknown employer'),
      customer: data.customer,
      startDate,
      endDate,
      summary: translation.summary,
      technologies,
    });
    technologyUsage.push(...normalizedTech);
  }

  const projectsByEmployerMap = new Map<string, CvProject[]>();
  for (const project of projects) {
    const current = projectsByEmployerMap.get(project.employer) ?? [];
    current.push(project);
    projectsByEmployerMap.set(project.employer, current);
  }

  const projectsByEmployer: CvEmployerGroup[] = Array.from(projectsByEmployerMap.entries())
    .map(([employer, employerProjects]) => {
      const sortedProjects = employerProjects.sort(
        (a, b) => b.startDate.valueOf() - a.startDate.valueOf(),
      );
      return {
        employer,
        newestStartDate: sortedProjects[0]?.startDate ?? new Date(0),
        projects: sortedProjects,
      };
    })
    .sort((a, b) => b.newestStartDate.valueOf() - a.newestStartDate.valueOf());

  const summary = ui[locale].home.intro.slice(0, 2).join(' ');

  return {
    locale,
    contact: {
      email: 'jonas.flones@outlook.com',
      phone: '93256305',
      github: 'https://github.com/ukon1990',
      linkedin: 'https://www.linkedin.com/in/jonas-munthe-fl%C3%B8nes-07b68595',
    },
    summary,
    technologiesByGroup: groupAndRankTechnologies(projects, technologyUsage, locale),
    projectsByEmployer,
  };
}
