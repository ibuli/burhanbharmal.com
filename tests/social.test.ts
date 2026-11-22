import { expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';
import { imageSize } from 'image-size';
import images from '../src/generated/social-images.json';
import { seo, SITE_URL } from '../src/lib/site';

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
