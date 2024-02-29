import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
    const postImportResult = import.meta.glob('../posts/**/*.md', { eager: true });
    const posts = Object.values(postImportResult);

    return rss({
        title: 'j konger | blog',
        description: 'a nice site',
        site: context.site,
        items: posts.map((post) => ({
            link: post.url,
            content: sanitizeHtml(post.compiledContent()),
            ...post.frontmatter,
        })),
        customData: `<language>en-us</language>`,
    });
}