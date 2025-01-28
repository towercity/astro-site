import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
    const postImportResult = import.meta.glob('../pages/posts/**/*.*', { eager: true });
    const posts = Object.values(postImportResult);

    return rss({
        title: 'j konger | blog',
        description: 'a nice website',
        site: context.site,
        items: posts.map((post) => {
            const item = {
                link: post.url,
                ...post.frontmatter,
            }
            if( post.compiledContent ) {
                item.content = sanitizeHtml(post.compiledContent())
            } else {
                item.content = 'this is a special post! to view it please open in a browser'
            }
            return item;
        }),
        customData: `<language>en-us</language>`,
    });
}