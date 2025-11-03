import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://konger.online",
  integrations: [sitemap()],
  compressHTML: false,
});
