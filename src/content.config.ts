import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.(md*|astro)",
    base: "./src/pages/post"
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date()
  })
});

export const collections = { blog };
