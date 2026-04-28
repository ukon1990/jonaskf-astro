import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { assignableTechSlugs } from "./data/tech";
import { cvLoader } from "./lib/cvLoader";

const techEnum = z.enum(
  assignableTechSlugs as [
    (typeof assignableTechSlugs)[number],
    ...(typeof assignableTechSlugs)[number][]
  ]
);

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image().optional(),
      draft: z.boolean().default(false),
      tags: z.array(z.string()).default([]),
    }),
});

const cv = defineCollection({
  loader: cvLoader(),
  schema: ({ image }) =>
    z.object({
      locale: z.enum(["no", "en"]),
      slug: z.string(),
      title: z.string(),
      role: z.string(),
      employer: z.string().optional(),
      customer: z.string().optional(),
      customerUrl: z.string().url().optional(),
      capacity: z.enum(["professional", "hobby"]).default("professional"),
      draft: z.boolean().default(false),
      summary: z.string(),
      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional().nullable(),
      location: z.string().optional(),
      tech: z.array(techEnum).default([]),
      heroImage: image().optional(),
      link: z.string().url().optional(),
      sourceLink: z.string().url().optional(),
    }),
});

export const collections = { blog, cv };
