import { promises as fs } from 'node:fs';
import { relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Loader } from 'astro/loaders';
import { locales, type Locale } from './i18n';

type Translation = {
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
	location?: string;
	tech?: string[];
	heroImage?: string;
	link?: string;
	sourceLink?: string;
	translations?: Partial<Record<Locale, Translation>>;
};

const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

async function listMarkdownFiles(directory: URL, prefix = ''): Promise<string[]> {
	const entries = await fs.readdir(directory, { withFileTypes: true });
	const files = await Promise.all(
		entries.map(async (entry) => {
			const name = `${prefix}${entry.name}`;
			if (entry.isDirectory()) {
				return listMarkdownFiles(new URL(`${entry.name}/`, directory), `${name}/`);
			}
			return entry.isFile() && entry.name.endsWith('.md') ? [name] : [];
		}),
	);
	return files.flat().sort((a, b) => a.localeCompare(b));
}

function parseJsonFrontmatter(file: string, contents: string) {
	const match = contents.match(frontmatterPattern);
	if (!match) {
		throw new Error(`Missing JSON frontmatter in ${file}`);
	}

	try {
		return {
			data: JSON.parse(match[1]) as CvFrontmatter,
			body: contents.slice(match[0].length),
		};
	} catch (error) {
		throw new Error(
			`Invalid JSON frontmatter in ${file}: ${error instanceof Error ? error.message : String(error)}`,
		);
	}
}

function splitLocalizedBody(body: string): Partial<Record<Locale, string>> {
	const sections: Partial<Record<Locale, string>> = {};
	const lines = body.split(/\r?\n/);
	let activeLocale: Locale | null = null;
	let activeLines: string[] = [];

	const flush = () => {
		if (activeLocale) {
			sections[activeLocale] = activeLines.join('\n').trim();
		}
		activeLines = [];
	};

	for (const line of lines) {
		const sectionStart = line.match(/^:::(no|en)\s*$/);
		if (sectionStart) {
			flush();
			activeLocale = sectionStart[1] as Locale;
			continue;
		}
		if (line.match(/^:::\s*$/)) {
			flush();
			activeLocale = null;
			continue;
		}
		if (activeLocale) {
			activeLines.push(line);
		}
	}
	flush();

	return sections;
}

function fallbackTranslation(data: CvFrontmatter, locale: Locale): Translation {
	const translation = data.translations?.[locale];
	return {
		title: translation?.title ?? data.title ?? '',
		role: translation?.role ?? data.role ?? '',
		summary: translation?.summary ?? data.summary ?? '',
	};
}

export function cvLoader(): Loader {
	return {
		name: 'localized-cv-loader',
		load: async ({ config, store, parseData, renderMarkdown, generateDigest }) => {
			store.clear();
			const base = new URL('./content/cv/', config.srcDir);
			const files = await listMarkdownFiles(base);

			for (const file of files) {
				const fileUrl = new URL(file, base);
				const contents = await fs.readFile(fileUrl, 'utf-8');
				const { data, body } = parseJsonFrontmatter(file, contents);
				const slug = data.slug ?? file.replace(/\.md$/, '');
				const localizedBody = splitLocalizedBody(body);
				const relativePath = relative(fileURLToPath(config.root), fileURLToPath(fileUrl));

				for (const locale of locales) {
					const translation = fallbackTranslation(data, locale);
					const bodyForLocale = localizedBody[locale] ?? localizedBody.en ?? body.trim();
					const rendered = await renderMarkdown(bodyForLocale);
					const id = `${locale}/${slug}`;
					const parsedData = await parseData({
						id,
						data: {
							...data,
							...translation,
							locale,
							slug,
							tech: data.tech ?? [],
							capacity: data.capacity ?? 'professional',
						},
						filePath: fileURLToPath(fileUrl),
					});

					store.set({
						id,
						data: parsedData,
						body: bodyForLocale,
						filePath: relativePath,
						digest: generateDigest(`${contents}:${locale}`),
						rendered,
						assetImports: rendered.metadata?.imagePaths,
					});
				}
			}
		},
	};
}
