# Setup Guide

This guide will help you get this personal website running on your own computer.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **pnpm** package manager - Install with: `npm install -g pnpm`

## Step-by-Step Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd jonaskf
```

### 2. Install Dependencies

```bash
pnpm install
```

This will install all the necessary packages including Astro and its dependencies.

### 3. Start the Development Server

```bash
pnpm start
```

The website will be available at `http://localhost:4321`

### 4. View the Website

Open your browser and navigate to `http://localhost:4321` to see the website running locally.

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm start` | Start development server with hot reload |
| `pnpm build` | Build the site for production |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro check` | Check for TypeScript errors |

## Project Structure Overview

```
jonaskf/
├── docs/                   # Documentation (this folder)
├── public/                 # Static assets
│   ├── fonts/             # Custom fonts
│   └── favicon.svg         # Site favicon
├── src/
│   ├── components/         # Reusable components
│   ├── content/           # Content collections
│   │   ├── blog/          # Blog posts (Markdown)
│   │   └── cv/            # CV entries (Markdown)
│   ├── layouts/           # Page layouts
│   ├── pages/             # Website pages/routes
│   └── styles/            # Global CSS
├── astro.config.mjs       # Astro configuration
└── package.json           # Dependencies and scripts
```

## Adding Content

### Blog Posts

1. Create a new `.md` file in `src/content/blog/`
2. Add frontmatter with title, date, and description
3. Write your content in Markdown
4. The post will automatically appear on the blog page

### CV Entries

1. Create a new `.md` file in `src/content/cv/`
2. Add frontmatter with project details
3. Write your project description in Markdown
4. The entry will automatically appear on the CV page

## Customization

### Styling

- Global styles are in `src/styles/global.css`
- Component-specific styles can be added to individual `.astro` files
- The site uses a minimal, clean design that's easy to customize

### Configuration

- Site configuration is in `astro.config.mjs`
- Content collections are configured in `src/content.config.ts`

## Troubleshooting

### Common Issues

**Port already in use:**
```bash
pnpm run start --port 3000
```

**Dependencies not installing:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**Build errors:**
```bash
pnpm astro check
```

## Next Steps

- Explore the [Astro documentation](https://docs.astro.build) for advanced features
- Check out the [Content Collections guide](https://docs.astro.build/en/guides/content-collections/) for content management
- Join the [Astro Discord community](https://astro.build/chat) for help and inspiration

## Need Help?

If you run into issues:

1. Check the [Astro documentation](https://docs.astro.build)
2. Search existing [GitHub issues](https://github.com/withastro/astro/issues)
3. Ask for help in the [Astro Discord](https://astro.build/chat)
