import assert from 'node:assert/strict';
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
for (const route of [
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
