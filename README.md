# Personal Website

This is the repository for my personal website, built with [Astro](https://astro.build/) to create a fast, static website rather than a traditional web application.

## About This Site

This personal website showcases my portfolio, blog posts, and CV entries. It's built using Astro's static site generation capabilities to deliver optimal performance and SEO benefits.

You can visit the live site at **[https://jonaskf.net](https://jonaskf.net)** to see it in action!

### Features

- ✅ Minimal, clean styling
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support for blog posts and CV entries
- ✅ Static site generation for fast loading times

## 🚀 Project Structure

This personal website follows Astro's standard structure:

```text
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── components/         # Reusable Astro components
│   ├── content/           # Content collections (blog posts, CV entries)
│   │   ├── blog/          # Blog post markdown files
│   │   └── cv/            # CV entry markdown files
│   ├── layouts/           # Page layouts
│   ├── pages/             # Website pages (routes)
│   └── styles/            # Global CSS styles
├── docs/                  # Documentation and how-to guides
├── astro.config.mjs       # Astro configuration
├── README.md
├── package.json
└── tsconfig.json
```

### Content Organization

- **Blog posts**: Stored in `src/content/blog/` as Markdown files
- **CV entries**: Stored in `src/content/cv/` as Markdown files  
- **Pages**: Located in `src/pages/` - each `.astro` or `.md` file becomes a route
- **Components**: Reusable UI components in `src/components/`
- **Static assets**: Images, fonts, and other static files in `public/`

The site uses Astro's Content Collections to manage blog posts and CV entries with type-safe frontmatter.

## 🚀 Getting Started

To run this personal website on your own computer:

### Prerequisites
- Node.js (version 18 or higher)
- pnpm package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd jonaskf
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Start the development server**
   ```bash
   pnpm start
   ```
   The site will be available at `http://localhost:4321`

### Available Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`           | Installs dependencies                            |
| `pnpm start`             | Starts Astro's local dev server with hot reload |
| `pnpm build`             | Build your production site to `./dist/`         |
| `pnpm preview`           | Serves the already built `dist/` output locally |
| `pnpm astro ...`         | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help`   | Get help using the Astro CLI                    |

`pnpm start` and Astro's more common `pnpm dev` convention serve the same purpose here: run the local development server. This project uses the script name `start` for that task. `pnpm preview` is different: it serves the production build after you run `pnpm build`, so it is useful for checking the built site rather than live editing.

## 📚 Documentation

For detailed guides and how-to instructions, check out the [docs/](./docs/) folder.

## 👀 Want to learn more?

- [Astro Documentation](https://docs.astro.build) - Learn more about Astro
- [Astro Discord Community](https://astro.build/chat) - Join the community
- [Content Collections Guide](https://docs.astro.build/en/guides/content-collections/) - Learn about managing content

## Credits

This website is built with [Astro](https://astro.build/) and inspired by the clean design of [Bear Blog](https://github.com/HermanMartinus/bearblog/).
