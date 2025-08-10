import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.(md*|astro)",
    base: "./src/pages/posts",
  }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
  }),
});

const books = defineCollection({
  loader: file("src/data/books.json"),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    started: z.string().optional(),
    finished: z.string().optional(),
    status: z.string().optional(),
    cover: z.string().optional(),
    content: z.string().optional(),
    review: z.string().optional(),
    whyRead: z.string().optional(),
    gaveUp: z.string().optional(),
  }),
});

export const collections = { blog, books };
