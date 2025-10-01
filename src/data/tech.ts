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
  readonly website?: string;
  readonly description?: string;
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
  angular: {
    label: "Angular",
    category: "framework",
    parent: "frontend",
    website: "https://angular.dev/",
    description: "Full-featured TypeScript framework for building web applications.",
  },
  "angular-material": {
    label: "Angular Material",
    category: "library",
    parent: "angular",
    website: "https://material.angular.io/",
    description: "Material Design component library for Angular projects.",
  },
  "angular-pwa": {
    label: "Angular PWA",
    category: "tooling",
    parent: "angular",
    website: "https://angular.dev/guide/pwa",
    description: "Angular service worker tooling for building progressive web apps.",
  },
  astro: {
    label: "Astro",
    category: "framework",
    parent: "frontend",
    website: "https://astro.build/",
    description: "Content-focused web framework that ships minimal client-side JavaScript.",
  },
  bootstrap: {
    label: "Bootstrap",
    category: "library",
    parent: "frontend",
    website: "https://getbootstrap.com/",
    description: "Popular CSS framework for responsive, mobile-first sites.",
  },
  jquery: {
    label: "jQuery",
    category: "library",
    parent: "frontend",
    website: "https://jquery.com/",
    description: "Utility library simplifying DOM traversal, events, and AJAX.",
  },
  react: {
    label: "React",
    category: "framework",
    parent: "frontend",
    website: "https://react.dev/",
    description: "Library for building composable user interfaces with declarative components.",
  },
  "react-hook-form": {
    label: "React Hook Form",
    category: "library",
    parent: "react",
    website: "https://react-hook-form.com/",
    description: "Headless form utilities for managing React form state with hooks.",
  },
  redux: {
    label: "Redux",
    category: "library",
    parent: "react",
    website: "https://redux.js.org/",
    description: "Predictable state container commonly used with React.",
  },
  "tanstack-query": {
    label: "TanStack Query",
    category: "library",
    parent: "react",
    website: "https://tanstack.com/query/latest",
    description: "Data fetching and caching utilities for React and other UI frameworks.",
  },
  "tanstack-table": {
    label: "TanStack Table",
    category: "library",
    parent: "react",
    website: "https://tanstack.com/table/latest",
    description: "Headless table utilities for managing complex data grids.",
  },
  scss: {
    label: "SCSS",
    category: "language",
    parent: "frontend",
    website: "https://sass-lang.com/",
    description: "Sass syntax variant that compiles to CSS with variables and mixins.",
  },
  slim: {
    label: "Slim",
    category: "language",
    parent: "frontend",
    website: "https://slim-template.github.io/",
    description: "Ruby templating language that compiles terse syntax into HTML.",
  },
  wordpress: {
    label: "WordPress",
    category: "framework",
    parent: "frontend",
    website: "https://wordpress.org/",
    description: "PHP-powered CMS and site builder with a large plugin ecosystem.",
  },
  android: {
    label: "Android",
    category: "platform",
    parent: "mobile",
    website: "https://developer.android.com/",
    description: "Google's mobile operating system and development platform.",
  },

  // Backend & runtime
  nodejs: {
    label: "Node.js",
    category: "runtime",
    parent: "backend",
    website: "https://nodejs.org/",
    description: "JavaScript runtime built on V8 for building backend services.",
  },
  dropwizard: {
    label: "Dropwizard",
    category: "framework",
    parent: "backend",
    website: "https://www.dropwizard.io/",
    description: "Java framework bundling Jetty, Jersey, and Jackson for REST APIs.",
  },
  "rest-api": {
    label: "REST API",
    category: "tooling",
    parent: "backend",
    website: "https://restfulapi.net/",
    description: "Principles and tooling for building RESTful HTTP services.",
  },
  "spring-boot": {
    label: "Spring Boot",
    category: "framework",
    parent: "backend",
    website: "https://spring.io/projects/spring-boot",
    description: "Opinionated Spring framework for rapid production-ready services.",
  },
  openapi: {
    label: "OpenAPI",
    category: "tooling",
    parent: "backend",
    website: "https://www.openapis.org/",
    description: "Specification for describing REST APIs in a language-agnostic format.",
  },
  rails: {
    label: "Ruby on Rails",
    category: "framework",
    parent: "ruby",
    website: "https://rubyonrails.org/",
    description: "Ruby MVC framework emphasizing convention over configuration.",
  },

  // Cloud & infrastructure
  aws: {
    label: "Amazon Web Services",
    category: "platform",
    parent: "infrastructure",
    website: "https://aws.amazon.com/",
    description: "Comprehensive cloud platform with compute, storage, and managed services.",
  },
  "aws-appsync": {
    label: "AppSync",
    category: "service",
    parent: "aws",
    website: "https://aws.amazon.com/appsync/",
    description: "AWS managed GraphQL and pub/sub API service.",
  },
  "aws-elastic-beanstalk": {
    label: "Elastic Beanstalk",
    category: "service",
    parent: "aws",
    website: "https://aws.amazon.com/elasticbeanstalk/",
    description: "Platform-as-a-service for deploying web apps to AWS.",
  },
  "aws-lambda": {
    label: "Lambda",
    category: "service",
    parent: "aws",
    website: "https://aws.amazon.com/lambda/",
    description: "Event-driven serverless compute service.",
  },
  azure: {
    label: "Microsoft Azure",
    category: "platform",
    parent: "infrastructure",
    website: "https://azure.microsoft.com/",
    description: "Microsoft's cloud platform spanning compute, data, and AI services.",
  },
  "azure-logic-apps": {
    label: "Azure Logic Apps",
    category: "service",
    parent: "azure",
    website: "https://azure.microsoft.com/products/logic-apps/",
    description: "Workflow automation platform within Azure for integrating systems.",
  },
  "azure-sql": {
    label: "Azure SQL",
    category: "database",
    parent: "data",
    website: "https://azure.microsoft.com/products/azure-sql/",
    description: "Managed SQL Server-compatible database services on Azure.",
  },
  apache: {
    label: "Apache HTTP Server",
    category: "platform",
    parent: "infrastructure",
    website: "https://httpd.apache.org/",
    description: "Widely used open-source web server.",
  },
  kubernetes: {
    label: "Kubernetes",
    category: "platform",
    parent: "devops",
    website: "https://kubernetes.io/",
    description: "Container orchestration platform for automated deployment and scaling.",
  },

  // Data
  dynamodb: {
    label: "DynamoDB",
    category: "database",
    parent: "aws",
    website: "https://aws.amazon.com/dynamodb/",
    description: "AWS-managed NoSQL database with single-digit millisecond performance.",
  },
  indexeddb: {
    label: "IndexedDB",
    category: "database",
    parent: "data",
    website: "https://developer.mozilla.org/docs/Web/API/IndexedDB_API",
    description: "Browser-based transactional key-value database for offline storage.",
  },
  mariadb: {
    label: "MariaDB",
    category: "database",
    parent: "data",
    website: "https://mariadb.org/",
    description: "Open-source relational database compatible with MySQL.",
  },
  mongodb: {
    label: "MongoDB",
    category: "database",
    parent: "data",
    website: "https://www.mongodb.com/",
    description: "Document-oriented NoSQL database with flexible schemas.",
  },
  mongock: {
    label: "Mongock",
    category: "tooling",
    parent: "data",
    website: "https://www.mongock.io/",
    description: "Java migration tool for MongoDB change management.",
  },
  mysql: {
    label: "MySQL",
    category: "database",
    parent: "data",
    website: "https://www.mysql.com/",
    description: "Open-source relational database widely used in web applications.",
  },
  postgresql: {
    label: "PostgreSQL",
    category: "database",
    parent: "data",
    website: "https://www.postgresql.org/",
    description: "Advanced open-source relational database with strong SQL support.",
  },
  sqlite: {
    label: "SQLite",
    category: "database",
    parent: "data",
    website: "https://www.sqlite.org/",
    description: "Self-contained SQL database engine commonly embedded in applications.",
  },

  // Languages
  java: {
    label: "Java",
    category: "language",
    parent: "languages",
    website: "https://www.java.com/",
    description: "Object-oriented programming language targeting the JVM.",
  },
  kotlin: {
    label: "Kotlin",
    category: "language",
    parent: "languages",
    website: "https://kotlinlang.org/",
    description: "Modern statically typed language interoperable with Java.",
  },
  ruby: {
    label: "Ruby",
    category: "language",
    parent: "languages",
    website: "https://www.ruby-lang.org/",
    description: "Dynamic, expressive language focused on developer happiness.",
  },
  php: {
    label: "PHP",
    category: "language",
    parent: "languages",
    website: "https://www.php.net/",
    description: "Server-side scripting language powering many web applications.",
  },
  typescript: {
    label: "TypeScript",
    category: "language",
    parent: "languages",
    website: "https://www.typescriptlang.org/",
    description: "Typed superset of JavaScript that compiles to plain JS.",
  },
  javascript: {
    label: "JavaScript",
    category: "language",
    parent: "languages",
    website: "https://developer.mozilla.org/docs/Web/JavaScript",
    description: "High-level, dynamic language of the web.",
  },
  sql: {
    label: "SQL",
    category: "language",
    parent: "languages",
    website: "https://developer.oracle.com/learn/technologies/sql.html",
    description: "Standard language for querying and manipulating relational databases.",
  },

  // DevOps & tooling
  docker: {
    label: "Docker",
    category: "tooling",
    parent: "devops",
    website: "https://www.docker.com/",
    description: "Platform for building, shipping, and running containers.",
  },
  git: {
    label: "Git",
    category: "tooling",
    parent: "devops",
    website: "https://git-scm.com/",
    description: "Distributed version control for tracking source changes.",
  },
  "github-actions": {
    label: "GitHub Actions",
    category: "tooling",
    parent: "devops",
    website: "https://github.com/features/actions",
    description: "CI/CD and automation workflows native to GitHub repositories.",
  },
  "azure-pipelines": {
    label: "Azure Pipelines",
    category: "tooling",
    parent: "devops",
    website: "https://azure.microsoft.com/products/devops/pipelines/",
    description: "Microsoft's CI/CD service within Azure DevOps.",
  },
  jenkins: {
    label: "Jenkins",
    category: "tooling",
    parent: "devops",
    website: "https://www.jenkins.io/",
    description: "Open-source automation server for building and deploying software.",
  },
  "serverless-framework": {
    label: "Serverless Framework",
    category: "tooling",
    parent: "devops",
    website: "https://www.serverless.com/",
    description: "Toolkit for building and deploying serverless applications across clouds.",
  },

  // Analytics & design
  "google-analytics": {
    label: "Google Analytics",
    category: "analytics",
    parent: "analytics",
    website: "https://analytics.google.com/",
    description: "Website analytics platform for tracking traffic and engagement.",
  },
  "google-tag-manager": {
    label: "Google Tag Manager",
    category: "analytics",
    parent: "analytics",
    website: "https://tagmanager.google.com/",
    description: "Tag management system for deploying analytics and marketing scripts.",
  },
  datadog: {
    label: "Datadog",
    category: "analytics",
    parent: "analytics",
    website: "https://www.datadoghq.com/",
    description: "Monitoring and observability platform for cloud applications.",
  },
  logrocket: {
    label: "LogRocket",
    category: "analytics",
    parent: "analytics",
    website: "https://logrocket.com/",
    description: "Session replay and product analytics for web applications.",
  },
  "adobe-xd": {
    label: "Adobe XD",
    category: "design",
    parent: "design",
    website: "https://www.adobe.com/products/xd.html",
    description: "UI/UX design and prototyping tool by Adobe.",
  },

  // Testing & QA
  junit: {
    label: "JUnit",
    category: "testing",
    parent: "testing",
    website: "https://junit.org/",
    description: "Unit testing framework for Java applications.",
  },
  jasmine: {
    label: "Jasmine",
    category: "testing",
    parent: "testing",
    website: "https://jasmine.github.io/",
    description: "Behavior-driven testing framework for JavaScript.",
  },
  protractor: {
    label: "Protractor",
    category: "testing",
    parent: "testing",
    website: "https://www.protractortest.org/",
    description: "End-to-end testing framework for Angular applications.",
  },
  jest: {
    label: "Jest",
    category: "testing",
    parent: "testing",
    website: "https://jestjs.io/",
    description: "Delightful JavaScript testing framework with snapshot support.",
  },
  mockito: {
    label: "Mockito",
    category: "testing",
    parent: "testing",
    website: "https://site.mockito.org/",
    description: "Mocking framework for unit testing in Java.",
  },
  mockk: {
    label: "MockK",
    category: "testing",
    parent: "testing",
    website: "https://mockk.io/",
    description: "Mocking library for Kotlin tests inspired by Mockito.",
  },
  testcontainers: {
    label: "TestContainers",
    category: "testing",
    parent: "testing",
    website: "https://testcontainers.com/",
    description: "Provides throwaway containerized dependencies for integration tests.",
  },

  // Ways of working
  scrum: {
    label: "Scrum",
    category: "process",
    parent: "process",
    website: "https://www.scrum.org/",
    description: "Agile framework for iterative product development and delivery.",
  },
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
