import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { getCollection } from 'astro:content';

import sanitizeHtml from 'sanitize-html';

export async function GET(context) {
    const posts = await getCollection('blog');

    return rss({
        title: 'j konger | blog',
        description: 'a nice website',
        site: context.site,
        items: posts.map((post) => {
            const item = {
              title: post.data.title,
              pubDate: post.data.pubDate,
              link: `/posts/${post.id}`,
              description: 'post'
            }
            if( post.rendered.html ) {
                item.content = post.rendered.html
            } else {
                item.content = 'this is a special post! to view it please open in a browser'
            }
            return item;
        }),
        customData: `<language>en-us</language>`,
    });
}
