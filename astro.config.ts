import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

// https://astro.build/config
export default defineConfig({
  site: "https://konger.online",
  integrations: [sitemap(), mdx()],
  compressHTML: false,
  markdown: {
    rehypePlugins: [rehypeHeadingIds],
  },
  scopedStyleStrategy: 'where',
});