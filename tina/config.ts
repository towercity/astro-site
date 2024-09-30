import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "img",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/pages/posts",
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return `${values?.title
                ?.toLowerCase()
                .replace(/ /g, '-')}`
            },
          },
        },
        defaultItem: () => {
          return {
            layout: "../../layouts/MarkdownPostLayout.astro",
            tags: ["update"],
            pubDate: new Date().toJSON().slice(0, 10)
          }
        },
        fields: [
          {
            name: "layout",
            label: "Layout",
            type: "string",
            required: true,
            searchable: false,
            options: [
              {
                value: "../../layouts/MarkdownPostLayout.astro",
                label: "Default"
              }
            ]
          },
          {
            name: "title",
            label: "Title",
            type: "string",
            isTitle: true,
            required: true,
          },
          {
            label: "Tags",
            name: "tags",
            type: "string",
            list: true
          },
          {
            label: "Date",
            name: "pubDate",
            type: "datetime",
            dateFormat: "YYYY-MM-DD",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: process.env.TINASEARCH,
      stopwordLanguages: ["eng"],
    },
    indexBatchSize: 50,
    maxSearchIndexFieldLength: 100,
  },
});
