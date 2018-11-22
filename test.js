'use strict';

const WP_HOMEPAGE_URL = 'https://wordpress.org/';
const WP_BLOG_URL = 'https://wordpress.org/news';

const test = require('tape');
const WordPressClient = require('./client');

test('fetch posts', async t => {
  t.plan(4);
  const client = new WordPressClient(WP_BLOG_URL);
  const { total, items: posts } = await client.fetchPosts({ offset: 3, order: 'asc' });
  t.ok(posts.length > 0, `fetched ${posts.length} posts [pageSize=10]`);
  t.ok(total > 500, `found more than 500 posts [total=${total}]`);
  let target = posts[7];
  t.equals(target && target.id, 11, `matched id of 7th post [url=${target.link}]`);
  target = posts[9];
  t.equals(target && target.title, 'WordPress Official b2 Branch', `matched title of 9th post [url=${target.link}]`);
});

test('fetch pages', async t => {
  t.plan(4);
  const client = new WordPressClient(WP_HOMEPAGE_URL);
  const { total, items: pages } = await client.fetchPages({ pageSize: 5, offset: 2, order: 'asc' });
  t.ok(pages.length > 0, `fetched ${pages.length} pages [pageSize=5]`);
  t.ok(total > 20, `found more than 20 posts [total=${total}]`);
  let target = pages[4];
  t.equals(target && target.id, 257, `matched id of 4th page [url=${target.link}]`);
  target = pages[2];
  t.equals(target && target.title, 'Features', `matched title of 5th page [url=${target.link}]`);
});
