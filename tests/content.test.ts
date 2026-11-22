import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { compileContent, frontmatterSchema, renderMarkdown } from '../scripts/content';

test('frontmatter rejects invalid calendar dates and external cover assets', () => {
  const base = {
    title: 'An article',
    date: '2026-02-30',
    description: 'A description',
    topic: 'Engineering',
    status: 'published',
  };
  assert.equal(frontmatterSchema.safeParse(base).success, false);
  assert.equal(
    frontmatterSchema.safeParse({
      ...base,
      date: '2026-02-28',
      cover: 'https://example.com/image.jpg',
    }).success,
    false,
  );
  assert.equal(frontmatterSchema.safeParse({ ...base, date: '2026-02-28' }).success, true);
});
test('Markdown supports GFM and removes scripts and unsafe links', async () => {
  const html = await renderMarkdown(
    '# Heading\n\n<script>alert(1)</script>\n\n[unsafe](javascript:alert%281%29)\n\n| Column | Value |\n| --- | --- |\n| A | B |\n\n```js\nconst safe = true;\n```',
  );
  assert(html.includes('<table>'));
  assert(html.includes('<code class="language-js">'));
  assert(!html.includes('<script>'));
  assert(!html.includes('href="javascript:'));
});
test('only published, non-future posts reach the index, bodies, RSS, and sitemap', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-content-'));
  const paths = {
    content: path.join(directory, 'content'),
    generated: path.join(directory, 'generated'),
    public: path.join(directory, 'public'),
  };
  await mkdir(paths.content);
  try {
    for (const [slug, status, date] of [
      ['visible', 'published', '2026-01-01'],
      ['draft', 'draft', '2026-01-01'],
      ['future', 'published', '2099-01-01'],
    ]) {
      await writeFile(
        path.join(paths.content, `${slug}.md`),
        `---\ntitle: "Code & craft"\ndate: "${date}"\ndescription: "A <careful> description"\ntopic: Engineering\nstatus: ${status}\n---\n\n## A real body\n\nHello **world**.\n`,
      );
    }
    const posts = await compileContent(new Date('2026-11-21T00:00:00Z'), paths);
    assert.deepEqual(
      posts.map((post) => post.slug),
      ['visible'],
    );
    const index = JSON.parse(await readFile(path.join(paths.generated, 'posts.json'), 'utf8'));
    assert(!Object.hasOwn(index[0], 'html'), 'Full bodies are not in the client metadata index');
    const bodies = JSON.parse(
      await readFile(path.join(paths.generated, 'post-bodies.server.json'), 'utf8'),
    );
    assert(bodies.visible.includes('<strong>world</strong>'));
    const rss = await readFile(path.join(paths.public, 'rss.xml'), 'utf8');
    assert(rss.includes('Code &amp; craft'));
    assert(!rss.includes('/draft'));
    assert(!rss.includes('/future'));
    const sitemap = await readFile(path.join(paths.public, 'sitemap.xml'), 'utf8');
    assert(sitemap.includes('/articles/visible'));
    assert(!sitemap.includes('/articles/draft'));
    assert(!sitemap.includes('/articles/future'));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('local notes preserve attribution, publication boundaries, and server-only full bodies', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'portfolio-notes-'));
  const paths = {
    content: path.join(directory, 'blog'),
    generated: path.join(directory, 'generated'),
    public: path.join(directory, 'public'),
  };
  await mkdir(paths.content);
  await mkdir(path.join(directory, 'posts'));
  try {
    for (const [slug, status, date] of [
      ['shared', 'published', '2024-01-01'],
      ['private', 'draft', '2024-01-01'],
      ['scheduled', 'published', '2099-01-01'],
    ]) {
      await writeFile(
        path.join(directory, 'posts', `${slug}.md`),
        `---\ntitle: A shared thought\ndescription: A useful reading note\ntopic: Shared reading\nstatus: ${status}\norder: 1\ndate: '${date}'\nattribution: From the original author\n---\n\nThe full note with a [source](https://example.com/original).`,
      );
    }
    await compileContent(new Date('2026-11-21T00:00:00Z'), paths);
    const notes = JSON.parse(await readFile(path.join(paths.generated, 'notes.json'), 'utf8'));
    assert.equal(notes.length, 1);
    assert.equal(notes[0].attribution, 'From the original author');
    assert(!Object.hasOwn(notes[0], 'html'));
    const bodies = JSON.parse(
      await readFile(path.join(paths.generated, 'note-bodies.server.json'), 'utf8'),
    );
    assert(bodies.shared.includes('https://example.com/original'));
    assert(!Object.hasOwn(bodies, 'private'));
    assert(!Object.hasOwn(bodies, 'scheduled'));
    const sitemap = await readFile(path.join(paths.public, 'sitemap.xml'), 'utf8');
    assert(sitemap.includes('/posts/shared'));
    assert(!sitemap.includes('/posts/private'));
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
