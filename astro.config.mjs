// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://d1aft2yhy01cjd.cloudfront.net',
  integrations: [mdx(), sitemap()],
  output: 'static',
});
