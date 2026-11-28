import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const origin = process.env.PORTFOLIO_ORIGIN || 'http://localhost:4173';
const checks = [
  ['/', 'I help founders'],
  ['/work-with-me', 'Prepare email draft'],
  ['/resume', 'iFlare Web Technologies'],
  ['/articles', 'Ads So Loud'],
  ['/posts', 'Dead Code'],
  ['/articles/frontend-ai-hackathon--sequoia', 'Cursor'],
  ['/posts/why-is-ai-slop-so-frustrating-to-read-pql8ln', 'Read here'],
  ['/work/arkive', 'Behind the build.'],
  ['/rss.xml', '<rss'],
  ['/sitemap.xml', '/articles/frontend-ai-hackathon--sequoia'],
  ['/robots.txt', 'Sitemap:'],
  ['/assets/fonts/public-sans-latin.woff2', null],
];
for (const [route, expected] of checks) {
  const response = await fetch(`${origin}${route}`);
  assert.equal(response.status, 200, `${route}: HTTP 200`);
  if (expected)
    assert((await response.text()).includes(expected), `${route}: server-rendered content`);
}
const postRedirects = JSON.parse(
  await readFile(new URL('../data/retired-post-redirects.json', import.meta.url), 'utf8'),
);
for (const [slug, destination] of Object.entries(postRedirects)) {
  const response = await fetch(`${origin}/posts/${slug}`, { redirect: 'manual' });
  assert.equal(response.status, 308, `${slug}: permanent redirect`);
  assert.equal(new URL(response.headers.get('location'), origin).pathname, destination);
  assert.equal((await fetch(new URL(destination, origin))).status, 200);
}

for (const route of [
  '/posts/ok-what-is-next-qrqg6g',
  '/not-a-route',
  '/articles/not-a-real-article',
  '/posts/not-a-post',
  '/work/not-a-project',
  '/Burhan_Bharmal.pdf',
  '/2018/',
  '/2018/index.html',
  '/css/main.css',
  '/js/script.js',
]) {
  const response = await fetch(`${origin}${route}`);
  assert.equal(response.status, 404, `${route}: genuine HTTP 404`);
}
for (const [route, action, recommendation] of [
  ['/not-a-route', 'Explore projects', 'Arkive'],
  ['/posts/not-a-post', 'Browse posts', 'HTML frames'],
]) {
  const response = await fetch(`${origin}${route}`);
  const html = await response.text();
  assert(html.includes('Scene missing.'), `${route}: renders the custom 404`);
  assert(html.includes(action), `${route}: relevant recovery link`);
  assert(html.includes(recommendation), `${route}: initial recommendation in HTML`);
}

// Sharing bots must receive complete metadata in the initial HTML, without JavaScript.
for (const route of [
  '/',
  '/articles/frontend-ai-hackathon--sequoia',
  '/work/arkive',
  '/posts/why-is-ai-slop-so-frustrating-to-read-pql8ln',
]) {
  for (const agent of ['Twitterbot/1.0', 'LinkedInBot/1.0']) {
    const response = await fetch(`${origin}${route}`, { headers: { 'User-Agent': agent } });
    assert.equal(response.status, 200);
    const html = await response.text();
    const head = html.split('</head>')[0];
    assert(head.includes('name="author" content="Burhan Bharmal"'), `${route}: named author`);
    if (route === '/') {
      assert(head.includes('<title>Burhan Bharmal</title>'), 'Identity-led homepage title');
      assert(head.includes('property="og:type" content="website"'), 'Homepage is a website');
      assert(!head.includes('article:published_time'), 'Homepage has no invented publication date');
    }
    if (route.startsWith('/articles/')) {
      assert(head.includes('property="og:type" content="article"'), 'Article content type');
      assert(head.includes('property="article:author"'), 'Article author');
      assert(
        head.includes('property="article:published_time"'),
        'Original article publication date',
      );
    }
    assert(head.includes('content="summary_large_image"'), `${route}: large social card in head`);
    const image = head.match(/property="og:image" content="([^"]+)"/);
    assert(image, `${route}: server-rendered image URL`);
    const url = new URL(image[1]);
    assert.equal(url.origin, 'https://burhanbharmal.com');
    const asset = await fetch(`${origin}${url.pathname}`);
    assert.equal(asset.status, 200, `${route}: preview image resolves`);
    assert(asset.headers.get('content-type')?.startsWith('image/jpeg'));
  }
}
for (const path of ['/favicon.svg', '/favicon.ico', '/apple-touch-icon.png', '/site.webmanifest']) {
  assert.equal((await fetch(`${origin}${path}`)).status, 200, `${path}: branding asset resolves`);
}
process.stdout.write(
  `PASS: SSR pages, article body, feeds, assets, and retired-route 404s on ${origin}\n`,
);
