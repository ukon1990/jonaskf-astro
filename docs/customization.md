# Customization Guide

This guide covers how to customize the appearance, functionality, and behavior of your personal website.

## Styling and Design

### Global Styles

The main stylesheet is located at `src/styles/global.css`. This file contains:

- CSS custom properties (variables) for colors and spacing
- Base typography styles
- Layout utilities
- Component-specific styles

### Color Scheme

The site uses CSS custom properties for colors. To change the color scheme:

1. **Open** `src/styles/global.css`
2. **Find the `:root` selector** with color variables
3. **Update the color values**:

```css
:root {
  --color-primary: #your-primary-color;
  --color-secondary: #your-secondary-color;
  --color-accent: #your-accent-color;
  --color-text: #your-text-color;
  --color-background: #your-background-color;
}
```

### Typography

Typography is controlled through CSS custom properties:

```css
:root {
  --font-family-primary: 'Your Font', sans-serif;
  --font-family-mono: 'Your Mono Font', monospace;
  --font-size-base: 16px;
  --line-height-base: 1.6;
}
```

### Layout Customization

#### Header and Navigation

The header component is in `src/components/Header.astro`. You can:

- Modify the navigation links
- Change the logo or site title
- Adjust the header styling
- Add new navigation items

#### Footer

The footer component is in `src/components/Footer.astro`. Customize:

- Social media links
- Copyright information
- Additional footer content
- Footer styling

### Component Styling

Each component can have its own styles. For example, to customize the blog post layout:

1. **Open** `src/layouts/BlogPost.astro`
2. **Add styles** in the `<style>` section
3. **Use CSS custom properties** for consistency

```astro
<style>
  .blog-post {
    max-width: var(--max-width-content);
    margin: 0 auto;
    padding: var(--spacing-lg);
  }
  
  .blog-post h1 {
    color: var(--color-primary);
    font-size: var(--font-size-xl);
  }
</style>
```

## Content Customization

### Site Configuration

Update site-wide settings in `src/consts.ts`:

```typescript
export const SITE = {
  title: "Your Name",
  description: "Your personal website description",
  url: "https://yourwebsite.com",
  image: "/your-image.jpg",
  author: "Your Name",
  twitter: "@yourtwitter",
};
```

### Page Layouts

#### Blog Post Layout

Customize the blog post layout in `src/layouts/BlogPost.astro`:

- Change the article structure
- Modify the metadata
- Adjust the styling
- Add custom elements

#### CV Entry Layout

Customize CV entries in `src/layouts/CvEntry.astro`:

- Change how project information is displayed
- Modify the layout structure
- Add custom styling
- Include additional metadata

### Content Collections

The content collections are configured in `src/content.config.ts`. You can:

- Add new fields to frontmatter
- Modify validation rules
- Create new content types
- Change how content is processed

## Functionality Customization

### Adding New Pages

1. **Create a new file** in `src/pages/`
2. **Use the `.astro` extension** for Astro pages
3. **Add frontmatter** if needed:

```astro
---
// Page metadata
const title = "Page Title";
const description = "Page description";
---

<html>
  <head>
    <title>{title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <!-- Your page content -->
  </body>
</html>
```

### Adding Components

1. **Create a new file** in `src/components/`
2. **Use the `.astro` extension**
3. **Export the component** if needed
4. **Import and use** in your pages

```astro
---
// Component logic
const { title, content } = Astro.props;
---

<div class="custom-component">
  <h2>{title}</h2>
  <p>{content}</p>
</div>

<style>
  .custom-component {
    /* Component styles */
  }
</style>
```

### Adding JavaScript Functionality

For interactive features, you can:

1. **Add scripts** to individual components
2. **Use client-side frameworks** (React, Vue, Svelte)
3. **Include external scripts** in the head

```astro
<script>
  // Client-side JavaScript
  document.addEventListener('DOMContentLoaded', () => {
    // Your interactive code
  });
</script>
```

## SEO and Metadata

### Site Metadata

Update site-wide metadata in `src/components/BaseHead.astro`:

```astro
---
const { title, description, image } = Astro.props;
---

<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  <!-- Additional meta tags -->
</head>
```

### Page-Specific Metadata

Add metadata to individual pages:

```astro
---
const title = "Page Title";
const description = "Page description";
const image = "/page-image.jpg";
---

<BaseHead title={title} description={description} image={image} />
```

## Performance Optimization

### Image Optimization

1. **Use WebP format** for photos
2. **Optimize image sizes** before uploading
3. **Use appropriate dimensions** for different screen sizes
4. **Consider lazy loading** for images below the fold

### Build Optimization

The site is already optimized with:

- Static site generation
- Minified CSS and JavaScript
- Optimized images
- Efficient bundling

### Additional Optimizations

You can add:

- Service workers for caching
- Critical CSS inlining
- Resource hints (preload, prefetch)
- Compression (handled by hosting)

## Deployment Customization

### Build Configuration

Modify `astro.config.mjs` for:

- Build output settings
- Integration configurations
- Development server settings
- Build optimizations

### Environment Variables

Create a `.env` file for:

- API keys
- Environment-specific settings
- Build-time configurations

```env
PUBLIC_SITE_URL=https://yourwebsite.com
PUBLIC_GA_ID=your-google-analytics-id
```

## Advanced Customization

### Custom Integrations

Add integrations in `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [
    sitemap(),
    // Add more integrations
  ],
});
```

### Custom Build Process

Modify the build process by:

1. **Adding build scripts** in `package.json`
2. **Using Astro's build hooks**
3. **Customizing the output** structure

### Third-Party Services

Integrate with:

- Analytics (Google Analytics, Plausible)
- Comments (Disqus, Giscus)
- Search (Algolia, Fuse.js)
- Forms (Netlify Forms, Formspree)

## Testing Your Changes

### Local Testing

1. **Start the dev server**: `pnpm dev`
2. **Test all pages**: Navigate through your site
3. **Check responsiveness**: Test on different screen sizes
4. **Validate HTML**: Use browser dev tools

### Build Testing

1. **Build the site**: `pnpm build`
2. **Preview the build**: `pnpm preview`
3. **Check for errors**: Review the build output
4. **Test functionality**: Ensure everything works

## Best Practices

### Code Organization

- Keep components focused and reusable
- Use consistent naming conventions
- Comment complex logic
- Follow Astro's conventions

### Performance

- Optimize images before adding them
- Minimize external dependencies
- Use CSS custom properties for consistency
- Test on slow connections

### Accessibility

- Use semantic HTML
- Include alt text for images
- Ensure good color contrast
- Test with screen readers

### Maintenance

- Keep dependencies updated
- Regular content updates
- Monitor site performance
- Backup your content regularly
