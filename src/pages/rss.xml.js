import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';

export async function GET(context) {
    const posts = await getCollection('blog');

    return rss({
        title: 'j konger | blog',
        description: 'a nice website',
        site: context.site,
        items: posts
            .filter((post) => post.data.draft !== true)
            .map((post) => {
                return {
                    title: post.data.title,
                    pubDate: post.data.pubDate,
                    link: `/posts/${post.id}`,
                    description: post.rendered.html || 'this is a special post! to view it please open in a browser'
                };
            }),
        customData: `<language>en-us</language>`,
    });
}
