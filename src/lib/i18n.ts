export const locales = ['no', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
	no: 'Norsk',
	en: 'English',
};

export const localeShortLabels: Record<Locale, string> = {
	no: 'NO',
	en: 'EN',
};

export const ui = {
	no: {
		siteDescription:
			'Fullstack- og frontendutvikler som bygger stabile, brukervennlige webapplikasjoner.',
		nav: {
			home: 'Hjem',
			cv: 'Erfaring',
			blog: 'Blogg',
		},
		home: {
			introTitle: 'Jonas Munthe Flønes',
			intro: [
				'Fullstack-utvikler med bachelorgrad i informasjonssystemer og spesialisering i webutvikling fra Høgskolen i Østfold.',
				'Fokusområdet er moderne webapplikasjoner, fra interaktive frontend-løsninger i Angular og React til robuste backend-tjenester med Spring Boot, Kotlin, .NET og TypeScript.',
				'Best effekt skapes i samarbeid med andre: konkrete problemer, praktiske løsninger og systemer som er enkle å bruke, vedlikeholde og videreutvikle.',
			],
			experienceTitle: 'Utvalgt erfaring',
			experienceLink: 'Se alle oppdrag',
			latestWritingTitle: 'Siste innlegg',
			latestWritingLink: 'Se bloggen',
		},
		cv: {
			title: 'Erfaring',
			description: 'Utvalgte kundeoppdrag, prosjekter og teknologier.',
			filterTitle: 'Filtrer oppdrag',
			clearFilters: 'Nullstill filtre',
			capacity: 'Type',
			allCapacities: 'Alle typer',
			tech: 'Teknologi',
			technologySingular: 'teknologi',
			technologyPlural: 'teknologier',
			projectSingular: 'prosjekt',
			projectPlural: 'prosjekter',
			professional: 'Kundeoppdrag',
			hobby: 'Hobbyprosjekt',
			professionalPlural: 'Kundeoppdrag',
			hobbyPlural: 'Hobbyprosjekter',
			highlightWithEntries: 'Nylige kundeoppdrag først, deretter resten av erfaringen.',
			highlightEmpty: 'Alle oppdrag vises kronologisk.',
			recentProfessionalLabel: 'Nylige kundeoppdrag',
			allEngagementsLabel: 'Alle oppdrag',
			empty: 'Ingen oppdrag funnet. Juster filtrene og prøv igjen.',
			techStack: 'Tech & tooling',
			visitProject: 'Besøk prosjektet',
			viewSource: 'Se kildekode på GitHub',
			present: 'nå',
			other: 'Annet',
		},
		redirect: {
			title: 'Velger språk',
			message: 'Du sendes videre til riktig språkversjon.',
			link: 'Fortsett til nettstedet',
		},
	},
	en: {
		siteDescription:
			'Full-stack and frontend developer building resilient, user-friendly web applications.',
		nav: {
			home: 'Home',
			cv: 'Experience',
			blog: 'Blog',
		},
		home: {
			introTitle: 'Jonas Munthe Flønes',
			intro: [
				'Full-stack developer with a bachelor’s degree in Information Systems, specializing in web development from the University College of Østfold.',
				'The main focus is modern web applications, from interactive front ends in Angular and React to robust backend services with Spring Boot, Kotlin, .NET and TypeScript.',
				'The best results come from close collaboration: concrete problems, practical solutions and systems that are easy to use, maintain and evolve.',
			],
			experienceTitle: 'Experience highlights',
			experienceLink: 'See every engagement',
			latestWritingTitle: 'Latest writing',
			latestWritingLink: 'Browse the blog',
		},
		cv: {
			title: 'Experience',
			description: 'Selected client engagements, projects and technologies.',
			filterTitle: 'Filter engagements',
			clearFilters: 'Clear filters',
			capacity: 'Capacity',
			allCapacities: 'All capacities',
			tech: 'Tech',
			technologySingular: 'technology',
			technologyPlural: 'technologies',
			projectSingular: 'project',
			projectPlural: 'projects',
			professional: 'Professional engagement',
			hobby: 'Hobby project',
			professionalPlural: 'Professional engagements',
			hobbyPlural: 'Hobby projects',
			highlightWithEntries: 'Recent professional highlights first, followed by every engagement.',
			highlightEmpty: 'All engagements listed chronologically.',
			recentProfessionalLabel: 'Most recent professional engagements',
			allEngagementsLabel: 'All engagements',
			empty: 'No engagements found. Adjust your filters and try again.',
			techStack: 'Tech & tooling',
			visitProject: 'Visit project',
			viewSource: 'View source on GitHub',
			present: 'Present',
			other: 'Other',
		},
		redirect: {
			title: 'Choosing language',
			message: 'You are being sent to the right language version.',
			link: 'Continue to the site',
		},
	},
} as const;

export function isLocale(value: string | undefined): value is Locale {
	return Boolean(value && locales.includes(value as Locale));
}

export function getLocaleFromParams(params: Record<string, string | undefined>): Locale {
	const locale = params.locale;
	if (!isLocale(locale)) {
		throw new Error(`Unsupported locale: ${locale}`);
	}
	return locale;
}

export function localeFromCvEntryId(id: string): Locale {
	const [locale] = id.split('/');
	if (!isLocale(locale)) {
		throw new Error(`CV entry id does not start with a supported locale: ${id}`);
	}
	return locale;
}

export function slugFromCvEntryId(id: string): string {
	return id.split('/').slice(1).join('/');
}

export function normalizePath(pathname: string): string {
	const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
	return normalized.length > 1 ? normalized.replace(/\/+$/, '') : normalized;
}

export function stripLocale(pathname: string): string {
	const normalized = normalizePath(pathname);
	const parts = normalized.split('/').filter(Boolean);
	if (isLocale(parts[0])) {
		const rest = parts.slice(1).join('/');
		return rest ? `/${rest}` : '/';
	}
	return normalized;
}

export function localizePath(pathname: string, locale: Locale): string {
	const stripped = stripLocale(pathname);
	return stripped === '/' ? `/${locale}/` : `/${locale}${stripped}`;
}

export function switchLocalePath(pathname: string, locale: Locale): string {
	return localizePath(pathname, locale);
}

export function detectLocaleScript(defaultPath: string) {
	return `
		const languages = navigator.languages && navigator.languages.length
			? navigator.languages
			: [navigator.language || ''];
		const isNorwegian = languages.some((language) => /^no\\b|^nb\\b|^nn\\b/i.test(language));
		const locale = isNorwegian ? 'no' : 'en';
		const target = '/' + locale + ${JSON.stringify(defaultPath)};
		window.location.replace(target + window.location.search + window.location.hash);
	`;
}

export function formatPeriod(
	start: Date,
	end: Date | null | undefined,
	locale: Locale,
): string {
	const formatter = new Intl.DateTimeFormat(locale === 'no' ? 'nb-NO' : 'en', {
		year: 'numeric',
		month: 'short',
	});
	const startLabel = formatter.format(start);
	const endLabel = end ? formatter.format(end) : ui[locale].cv.present;
	return `${startLabel} – ${endLabel}`;
}

export function formatDate(date: Date, locale: Locale): string {
	return date.toLocaleDateString(locale === 'no' ? 'nb-NO' : 'en-us', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});
}
