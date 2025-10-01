export type TechCategory =
  | "group"
  | "language"
  | "framework"
  | "library"
  | "runtime"
  | "platform"
  | "service"
  | "database"
  | "tooling"
  | "testing"
  | "analytics"
  | "design"
  | "process";

type TechMetaBase = {
  readonly label: string;
  readonly category: TechCategory;
  readonly parent?: string;
};

const defineTechCatalog = <const T extends Record<string, TechMetaBase>>(
  catalog: T & {
    [K in keyof T]: T[K]["parent"] extends undefined
      ? unknown
      : T[K]["parent"] extends keyof T
      ? unknown
      : { ERROR_invalid_parent: T[K]["parent"] };
  }
) => catalog;

export const techCatalog = defineTechCatalog({
  // Groupings
  frontend: { label: "Frontend", category: "group" },
  backend: { label: "Backend", category: "group" },
  infrastructure: { label: "Infrastructure", category: "group" },
  data: { label: "Data", category: "group" },
  testing: { label: "Testing", category: "group" },
  devops: { label: "DevOps", category: "group" },
  languages: { label: "Languages", category: "group" },
  design: { label: "Design & UX", category: "group" },
  analytics: { label: "Analytics", category: "group" },
  process: { label: "Process", category: "group" },
  mobile: { label: "Mobile", category: "group", parent: "frontend" },

  // Frontend
  angular: { label: "Angular", category: "framework", parent: "frontend" },
  "angular-material": {
    label: "Angular Material",
    category: "library",
    parent: "angular",
  },
  "angular-pwa": {
    label: "Angular PWA",
    category: "tooling",
    parent: "angular",
  },
  astro: { label: "Astro", category: "framework", parent: "frontend" },
  bootstrap: { label: "Bootstrap", category: "library", parent: "frontend" },
  jquery: { label: "jQuery", category: "library", parent: "frontend" },
  react: { label: "React", category: "framework", parent: "frontend" },
  "react-hook-form": {
    label: "React Hook Form",
    category: "library",
    parent: "react",
  },
  redux: { label: "Redux", category: "library", parent: "react" },
  "tanstack-query": {
    label: "TanStack Query",
    category: "library",
    parent: "react",
  },
  "tanstack-table": {
    label: "TanStack Table",
    category: "library",
    parent: "react",
  },
  scss: { label: "SCSS", category: "language", parent: "frontend" },
  wordpress: { label: "WordPress", category: "framework", parent: "frontend" },
  android: { label: "Android", category: "platform", parent: "mobile" },

  // Backend & runtime
  nodejs: { label: "Node.js", category: "runtime", parent: "backend" },
  dropwizard: { label: "Dropwizard", category: "framework", parent: "backend" },
  "rest-api": { label: "REST API", category: "tooling", parent: "backend" },
  "spring-boot": {
    label: "Spring Boot",
    category: "framework",
    parent: "backend",
  },
  openapi: { label: "OpenAPI", category: "tooling", parent: "backend" },
  rails: { label: "Ruby on Rails", category: "framework", parent: "ruby" },

  // Cloud & infrastructure
  aws: {
    label: "Amazon Web Services",
    category: "platform",
    parent: "infrastructure",
  },
  "aws-appsync": { label: "AppSync", category: "service", parent: "aws" },
  "aws-elastic-beanstalk": {
    label: "Elastic Beanstalk",
    category: "service",
    parent: "aws",
  },
  "aws-lambda": { label: "Lambda", category: "service", parent: "aws" },
  azure: {
    label: "Microsoft Azure",
    category: "platform",
    parent: "infrastructure",
  },
  "azure-logic-apps": {
    label: "Azure Logic Apps",
    category: "service",
    parent: "azure",
  },
  "azure-sql": { label: "Azure SQL", category: "database", parent: "data" },
  apache: {
    label: "Apache HTTP Server",
    category: "platform",
    parent: "infrastructure",
  },
  kubernetes: { label: "Kubernetes", category: "platform", parent: "devops" },

  // Data
  dynamodb: { label: "DynamoDB", category: "database", parent: "aws" },
  indexeddb: { label: "IndexedDB", category: "database", parent: "data" },
  mariadb: { label: "MariaDB", category: "database", parent: "data" },
  mongodb: { label: "MongoDB", category: "database", parent: "data" },
  mongock: { label: "Mongock", category: "tooling", parent: "data" },
  mysql: { label: "MySQL", category: "database", parent: "data" },
  postgresql: { label: "PostgreSQL", category: "database", parent: "data" },
  sqlite: { label: "SQLite", category: "database", parent: "data" },

  // Languages
  java: { label: "Java", category: "language", parent: "languages" },
  kotlin: { label: "Kotlin", category: "language", parent: "languages" },
  ruby: { label: "Ruby", category: "language", parent: "languages" },
  php: { label: "PHP", category: "language", parent: "languages" },
  typescript: {
    label: "TypeScript",
    category: "language",
    parent: "languages",
  },
  javascript: {
    label: "JavaScript",
    category: "language",
    parent: "languages",
  },
  sql: { label: "SQL", category: "language", parent: "languages" },

  // DevOps & tooling
  docker: { label: "Docker", category: "tooling", parent: "devops" },
  git: { label: "Git", category: "tooling", parent: "devops" },
  "github-actions": {
    label: "GitHub Actions",
    category: "tooling",
    parent: "devops",
  },
  "azure-pipelines": {
    label: "Azure Pipelines",
    category: "tooling",
    parent: "devops",
  },
  jenkins: { label: "Jenkins", category: "tooling", parent: "devops" },
  "serverless-framework": {
    label: "Serverless Framework",
    category: "tooling",
    parent: "devops",
  },

  // Analytics & design
  "google-analytics": {
    label: "Google Analytics",
    category: "analytics",
    parent: "analytics",
  },
  "google-tag-manager": {
    label: "Google Tag Manager",
    category: "analytics",
    parent: "analytics",
  },
  datadog: { label: "Datadog", category: "analytics", parent: "analytics" },
  logrocket: { label: "LogRocket", category: "analytics", parent: "analytics" },
  "adobe-xd": { label: "Adobe XD", category: "design", parent: "design" },

  // Testing & QA
  junit: { label: "JUnit", category: "testing", parent: "testing" },
  jasmine: { label: "Jasmine", category: "testing", parent: "testing" },
  protractor: { label: "Protractor", category: "testing", parent: "testing" },
  jest: { label: "Jest", category: "testing", parent: "testing" },
  mockito: { label: "Mockito", category: "testing", parent: "testing" },
  mockk: { label: "MockK", category: "testing", parent: "testing" },
  testcontainers: {
    label: "TestContainers",
    category: "testing",
    parent: "testing",
  },

  // Ways of working
  scrum: { label: "Scrum", category: "process", parent: "process" },
} as const);

export type TechSlug = keyof typeof techCatalog;

export const techSlugs = Object.keys(techCatalog) as TechSlug[];

export const isTechSlug = (value: string): value is TechSlug =>
  value in techCatalog;

type GroupSlug = {
  [K in TechSlug]: (typeof techCatalog)[K]["category"] extends "group"
    ? K
    : never;
}[TechSlug];

export type AssignableTechSlug = Exclude<TechSlug, GroupSlug>;

const isGroupSlug = (slug: TechSlug): slug is GroupSlug =>
  techCatalog[slug].category === "group";

export const assignableTechSlugs = techSlugs.filter(
  (slug): slug is AssignableTechSlug => !isGroupSlug(slug)
);

export const getTechMeta = (slug: TechSlug) => techCatalog[slug];

export const getTechDisplayName = (slug: TechSlug): string => {
  const labels: string[] = [];
  let current: TechSlug | undefined = slug;
  while (current) {
    const meta = techCatalog[current];
    if (!meta) break;
    if (labels.length === 0 || meta.category !== "group") {
      labels.unshift(meta.label);
    }
    const parent = meta.parent;
    if (!parent || !isTechSlug(parent)) break;
    if (isGroupSlug(parent)) {
      break;
    }
    current = parent;
  }
  return labels.join(" › ");
};

export const getTechAncestors = (slug: TechSlug): TechSlug[] => {
  const ancestors: TechSlug[] = [];
  let current: TechSlug | undefined = slug;
  while (current) {
    const parent = techCatalog[current]?.parent;
    if (!parent || !isTechSlug(parent)) break;
    ancestors.push(parent);
    current = parent;
  }
  return ancestors;
};
