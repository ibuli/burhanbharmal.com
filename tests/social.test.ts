import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { imageSize } from 'image-size';
import images from '../src/generated/social-images.json';
import { profile, seo, SITE_URL } from '../src/lib/site';

const metadata = (result: ReturnType<typeof seo>) =>
  Object.fromEntries(
    result.meta.map((item) => [
      'property' in item ? item.property : 'name' in item ? item.name : 'title',
      'content' in item ? item.content : item.title,
    ]),
  );

test('the homepage leads with identity and stays a website without fabricated publication dates', () => {
  const meta = metadata(seo(profile.name, 'Portfolio description', '/'));
  expect(meta.title).toBe('Burhan Bharmal');
  expect(meta['og:title']).toBe(meta.title);
  expect(meta['twitter:title']).toBe(meta.title);
  expect(meta.author).toBe(profile.name);
  expect(meta['og:type']).toBe('website');
  expect(meta['article:published_time']).toBeUndefined();
  expect(meta['article:author']).toBeUndefined();
});

test('article author and known publication dates reach social crawlers', () => {
  const meta = metadata(
    seo('An article', 'Description', '/articles/example', {
      type: 'article',
      publishedTime: '2025-01-15',
    }),
  );
  expect(meta['og:type']).toBe('article');
  expect(meta['article:author']).toBe(profile.linkedin);
  expect(meta['article:published_time']).toBe('2025-01-15');
  const undated = metadata(
    seo('An undated note', 'Description', '/posts/example', { type: 'article' }),
  );
  expect(undated['article:author']).toBe(profile.linkedin);
  expect(undated['article:published_time']).toBeUndefined();
});

test('every published route has a real, correctly sized social card', async () => {
  const sitemap = await readFile('public/sitemap.xml', 'utf8');
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]!).pathname,
  );
  expect(Object.keys(images).sort()).toEqual(paths.sort());
  for (const entry of Object.values(images)) {
    const size = imageSize(await readFile(`public${entry.image}`));
    expect([size.width, size.height, size.type]).toEqual([1200, 630, 'jpg']);
    expect(entry.alt.length).toBeGreaterThan(10);
  }
});

test('sharing metadata uses absolute image URLs and large cards with descriptive alternatives', () => {
  for (const [pathname, entry] of Object.entries(images)) {
    const result = seo('A page title', 'A page description', pathname);
    const meta = Object.fromEntries(
      result.meta.map((item) => [
        'property' in item ? item.property : 'name' in item ? item.name : 'title',
        'content' in item ? item.content : item.title,
      ]),
    );
    expect(meta['og:image']).toBe(`${SITE_URL}${entry.image}`);
    expect(meta['twitter:image']).toBe(meta['og:image']);
    expect(meta['twitter:card']).toBe('summary_large_image');
    expect(meta['og:image:alt']).toBe(entry.alt);
    expect(meta['og:image:width']).toBe('1200');
    expect(meta['og:image:height']).toBe('630');
    expect(result.links[0]!.href).toBe(`${SITE_URL}${pathname}`);
  }
});
