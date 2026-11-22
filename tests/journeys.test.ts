import { test, expect } from 'bun:test';
import { prepareEnquiry } from '../src/lib/enquiry';
import { relatedArticles } from '../src/lib/editorial';
import { renderDocument } from '../scripts/content';
import type { Article } from '../src/lib/blog';
test('enquiry drafts preserve visitor input without injecting mail headers', () => {
  const input = {
    name: 'Alex & team',
    email: 'alex@example.com',
    service: 'Product development',
    timeline: 'Next quarter',
    details: 'A product with React & payments.\nPlease keep &subject=Injected in the message.',
  };
  const draft = new URL(prepareEnquiry('burhan@example.com', input));
  expect(draft.protocol).toBe('mailto:');
  expect(draft.pathname).toBe('burhan@example.com');
  expect(draft.searchParams.size).toBe(2);
  expect(draft.searchParams.get('subject')).toBe('Project enquiry: Product development');
  expect(draft.searchParams.get('body')).toContain(input.details);
  expect(draft.searchParams.get('body')).toContain(input.email);
  expect(draft.searchParams.get('body')).toContain(input.timeline);
});
test('related reading excludes the current article and puts shared topics first', () => {
  const base: Article = {
    slug: 'current',
    title: 'Current',
    date: '2026-01-01',
    description: 'A description',
    topic: 'Engineering',
    readingMinutes: 2,
  };
  const other = { ...base, slug: 'other', topic: 'Life' };
  const similar = { ...base, slug: 'similar' };
  expect(relatedArticles(base, [base, other, similar], 2).map((item) => item.slug)).toEqual([
    'similar',
    'other',
  ]);
  expect(relatedArticles(base, [base], 2)).toEqual([]);
  expect(relatedArticles(base, [other], 0)).toEqual([]);
});
test('article outlines match unique safe heading anchors in compiled Markdown', async () => {
  const { html, outline } = await renderDocument(
    '## Build & ship\n\nText.\n\n### Build & ship\n\n## 日本語\n\n<script>alert(1)</script>',
  );
  expect(outline.map((heading) => heading.id)).toEqual([
    'section-build-ship',
    'section-build-ship-2',
    'section-heading',
  ]);
  for (const heading of outline) expect(html).toContain(`id="${heading.id}"`);
  expect(outline[0].title).toBe('Build & ship');
  expect(outline[1].level).toBe(3);
  expect(html).not.toContain('<script>');
});

test('server-rendered enquiry controls cannot submit personal details before hydration', async () => {
  const { createElement } = await import('react');
  const { renderToString } = await import('react-dom/server');
  const { EnquiryForm } = await import('../src/components/EnquiryForm');
  const markup = renderToString(createElement(EnquiryForm));
  const form = markup.match(/<form\b[^>]*>([\s\S]*?)<\/form>/)?.[1] || '';
  const controls = [...form.matchAll(/<(?:input|textarea|select|button)\b[^>]*>/g)].map(
    (match) => match[0],
  );
  expect(controls.length).toBe(6);
  expect(controls.every((control) => /\bdisabled=""/.test(control))).toBe(true);
  expect(markup).toContain('mailto:bharmal.burhan@hotmail.com');
  expect(markup).not.toContain('Open email draft');
});
