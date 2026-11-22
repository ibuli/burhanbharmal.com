import { expect, test } from 'bun:test';
import redirect from '../src/redirect';

test('www permanently redirects pages and assets to HTTPS apex while preserving paths and queries', () => {
  for (const path of [
    '/',
    '/articles/my-journey-with-cursor-ai?ref=profile&tag=a%20b',
    '/assets/images/avatar.jpg',
  ]) {
    const response = redirect.fetch(new Request(`http://www.burhanbharmal.com${path}`));
    expect(response.status).toBe(308);
    expect(response.headers.get('location')).toBe(`https://burhanbharmal.com${path}`);
  }
});
