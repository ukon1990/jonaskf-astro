# Content Management Guide

This guide explains how to add and manage content on the personal website, including blog posts and CV entries.

## Blog Posts

### Adding a New Blog Post

1. **Create a new file** in `src/content/blog/` with a descriptive filename (e.g., `my-new-post.md`)

2. **Add frontmatter** at the top of the file:
   ```markdown
   ---
   title: "Your Post Title"
   description: "A brief description of your post"
   pubDate: 2024-01-15
   heroImage: "/path/to/image.jpg"
   tags: ["tag1", "tag2"]
   ---
   ```

3. **Write your content** in Markdown below the frontmatter:
   ```markdown
   # Your Post Title
   
   Your blog post content goes here. You can use all standard Markdown features:
   
   - Lists
   - **Bold text**
   - *Italic text*
   - [Links](https://example.com)
   - Code blocks
   
   ```javascript
   console.log("Hello, world!");
   ```
   ```

### Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The title of your blog post |
| `description` | Yes | Brief description for SEO and previews |
| `pubDate` | Yes | Publication date (YYYY-MM-DD format) |
| `heroImage` | No | Path to featured image |
| `tags` | No | Array of tags for categorization |

### Blog Post Best Practices

- Use descriptive filenames that reflect the content
- Keep descriptions concise but informative
- Add relevant tags to help with categorization
- Use proper Markdown formatting for readability
- Include code examples when relevant

## CV Entries

### Adding a New CV Entry

1. **Create a new file** in `src/content/cv/` with a descriptive filename (e.g., `2024-project-name.md`)

2. **Add frontmatter**:
   ```markdown
   ---
   title: "Project Name"
   description: "Brief description of the project"
   startDate: 2024-01-01
   endDate: 2024-06-30
   company: "Company Name"
   role: "Your Role"
   technologies: ["React", "TypeScript", "Node.js"]
   image: "/path/to/project-image.jpg"
   ---
   ```

3. **Write your project description** in Markdown:
   ```markdown
   # Project Overview
   
   Detailed description of what you built, your role, and the impact.
   
   ## Key Achievements
   
   - Specific accomplishment 1
   - Specific accomplishment 2
   - Specific accomplishment 3
   
   ## Technologies Used
   
   - Technology 1
   - Technology 2
   - Technology 3
   ```

### CV Entry Frontmatter Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Project or role title |
| `description` | Yes | Brief description |
| `startDate` | Yes | Start date (YYYY-MM-DD) |
| `endDate` | No | End date (omit for current roles) |
| `company` | No | Company or organization name |
| `role` | No | Your specific role/title |
| `technologies` | No | Array of technologies used |
| `image` | No | Path to project image |

### CV Entry Best Practices

- Use consistent date formats
- Include specific achievements and metrics
- Mention technologies and tools used
- Keep descriptions focused and impactful
- Use action verbs to describe your contributions

## Content Organization

### File Naming Conventions

- **Blog posts**: Use descriptive, URL-friendly names (e.g., `building-a-react-app.md`)
- **CV entries**: Use year and project name (e.g., `2024-ecommerce-platform.md`)

### Image Management

1. **Place images** in the `public/` directory
2. **Reference images** with absolute paths starting with `/`
3. **Optimize images** for web (use tools like ImageOptim or similar)
4. **Use appropriate formats**: WebP for photos, SVG for icons

### Content Structure

```
src/content/
├── blog/
│   ├── post-1.md
│   ├── post-2.md
│   └── ...
└── cv/
    ├── 2024-project-1.md
    ├── 2023-project-2.md
    └── ...
```

## Previewing Content

### Development Mode

1. **Start the dev server**: `pnpm dev`
2. **Navigate to your content**: Visit the relevant pages to see your content
3. **Make changes**: Edit your Markdown files and see changes in real-time

### Content Validation

The site uses Astro's Content Collections to validate your frontmatter. If you see errors:

1. Check the terminal for validation messages
2. Ensure all required fields are present
3. Verify date formats are correct (YYYY-MM-DD)
4. Check that arrays in frontmatter are properly formatted

## Publishing Content

### Local Testing

1. **Build the site**: `pnpm build`
2. **Preview the build**: `pnpm preview`
3. **Check all pages**: Navigate through your content to ensure everything looks correct

### Deployment

The site is configured for static deployment. Your content will be automatically included when you build and deploy the site.

## Tips and Tricks

### Markdown Features

- Use `#` for main headings, `##` for subheadings
- Create lists with `-` or `*`
- Add code blocks with triple backticks
- Use `**bold**` and `*italic*` for emphasis
- Create links with `[text](url)`

### Content Ideas

**For Blog Posts:**
- Technical tutorials
- Project retrospectives
- Industry insights
- Learning experiences

**For CV Entries:**
- Major projects
- Professional roles
- Open source contributions
- Certifications and achievements

### SEO Considerations

- Write descriptive titles and descriptions
- Use relevant tags for categorization
- Include alt text for images
- Keep content fresh and updated regularly
