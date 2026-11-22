import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import matter from 'gray-matter';
import { z } from 'zod';
import { unified } from 'unified';
import { imageSize } from 'image-size';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeSanitize from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';

export const frontmatterSchema = z.object({
  title: z.string().min(1),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (value) =>
        !Number.isNaN(Date.parse(value)) && new Date(value).toISOString().slice(0, 10) === value,
      'Invalid calendar date',
    ),
  description: z.string().min(1).max(240),
  topic: z.string().min(1),
  status: z.enum(['draft', 'published']).default('draft'),
  cover: z.string().startsWith('/assets/').optional(),
});
export const noteSchema = frontmatterSchema.omit({ date: true }).extend({
  date: frontmatterSchema.shape.date.optional(),
  order: z.number().int().nonnegative(),
  attribution: z.string().optional(),
});

interface ImageNode {
  tagName?: string;
  properties?: Record<string, string | number | boolean>;
  children?: ImageNode[];
  value?: string;
}
const imageDimensions = new Map<string, { width: number; height: number }>();
function stableImages() {
  return async (tree: unknown) => {
    async function visit(node: ImageNode) {
      if (node.tagName === 'img' && node.properties) {
        const src = String(node.properties.src || '');
        if (src.startsWith('/assets/') && !src.includes('..')) {
          let dimensions = imageDimensions.get(src);
          if (!dimensions) {
            const size = imageSize(await readFile(`public${src}`));
            dimensions = { width: size.width, height: size.height };
            imageDimensions.set(src, dimensions);
          }
          Object.assign(node.properties, dimensions, { loading: 'lazy', decoding: 'async' });
        }
      }
      for (const child of node.children || []) await visit(child);
    }
    await visit(tree as ImageNode);
  };
}
export interface OutlineEntry {
  id: string;
  title: string;
  level: number;
}
export async function renderDocument(markdown: string) {
  const outline: OutlineEntry[] = [];
  const used = new Map<string, number>();
  const headings = () => (tree: unknown) => {
    const text = (node: ImageNode): string =>
      node.value || (node.children || []).map(text).join('');
    const walk = (node: ImageNode) => {
      if (node.tagName === 'h2' || node.tagName === 'h3') {
        const title = text(node).trim();
        const base =
          'section-' +
          (title
            .normalize('NFKD')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'heading');
        const count = (used.get(base) || 0) + 1;
        used.set(base, count);
        const id = count === 1 ? base : `${base}-${count}`;
        node.properties = { ...node.properties, id };
        outline.push({ id, title, level: Number(node.tagName.slice(1)) });
      }
      for (const child of node.children || []) walk(child);
    };
    walk(tree as ImageNode);
  };
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(headings)
      .use(stableImages)
      .use(rehypeStringify)
      .process(markdown),
  );
  return { html, outline };
}
export async function renderMarkdown(markdown: string) {
  return (await renderDocument(markdown)).html;
}

const xml = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]!,
  );
export async function compileContent(
  now = new Date(),
  paths = { content: 'content/blog', generated: 'src/generated', public: 'public' },
) {
  const files = (await readdir(paths.content)).filter((file) => file.endsWith('.md')).sort();
  const posts = [];
  for (const file of files) {
    const slug = file.slice(0, -3);
    if (!/^[a-z0-9]+(?:-+[a-z0-9]+)*$/.test(slug))
      throw new Error(`Invalid blog filename: ${file}`);
    const { data, content } = matter(await readFile(`${paths.content}/${file}`, 'utf8'));
    const meta = frontmatterSchema.parse(data);
    if (!content.trim()) throw new Error(`Empty Markdown body: ${file}`);
    if (meta.status !== 'published' || new Date(`${meta.date}T00:00:00Z`) > now) continue;
    const { html, outline } = await renderDocument(content);
    posts.push({
      ...meta,
      slug,
      readingMinutes: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220)),
      html,
      outline,
    });
  }
  const notesDirectory = paths.content.replace(/blog$/, 'posts');
  const notes = [];
  if (notesDirectory !== paths.content) {
    for (const file of (await readdir(notesDirectory))
      .filter((file) => file.endsWith('.md'))
      .sort()) {
      const slug = file.slice(0, -3);
      if (!/^[a-z0-9]+(?:-+[a-z0-9]+)*$/.test(slug))
        throw new Error(`Invalid post filename: ${file}`);
      const { data, content } = matter(await readFile(`${notesDirectory}/${file}`, 'utf8'));
      const meta = noteSchema.parse(data);
      if (!content.trim()) throw new Error(`Empty post: ${file}`);
      if (meta.status !== 'published' || (meta.date && new Date(`${meta.date}T00:00:00Z`) > now))
        continue;
      notes.push({ ...meta, slug, html: await renderMarkdown(content) });
    }
    notes.sort((a, b) => a.order - b.order);
  }
  posts.sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  await mkdir(paths.generated, { recursive: true });
  await mkdir(paths.public, { recursive: true });
  await writeFile(
    `${paths.generated}/posts.json`,
    JSON.stringify(
      posts.map(({ html: _html, ...post }) => post),
      null,
      2,
    ) + '\n',
  );
  await writeFile(
    `${paths.generated}/post-bodies.server.json`,
    JSON.stringify(Object.fromEntries(posts.map((post) => [post.slug, post.html])), null, 2) + '\n',
  );
  await writeFile(
    `${paths.generated}/notes.json`,
    JSON.stringify(
      notes.map(({ html: _html, ...note }) => note),
      null,
      2,
    ) + '\n',
  );
  await writeFile(
    `${paths.generated}/note-bodies.server.json`,
    JSON.stringify(Object.fromEntries(notes.map((note) => [note.slug, note.html])), null, 2) + '\n',
  );
  const projectRoutes: string[] = [];
  if (paths.content === 'content/blog') {
    const portfolio = JSON.parse(await readFile('data/portfolio.json', 'utf8')) as {
      projects: { slug: string; gallery?: string[] }[];
    };
    const gallerySizes: Record<string, { width: number; height: number }> = {};
    for (const project of portfolio.projects) {
      projectRoutes.push(`/work/${project.slug}`);
      for (const image of project.gallery || []) {
        const size = imageSize(await readFile(`public${image}`));
        gallerySizes[image] = { width: size.width, height: size.height };
      }
    }
    await writeFile(
      `${paths.generated}/image-dimensions.json`,
      JSON.stringify(gallerySizes, null, 2) + '\n',
    );
    const projectBodies: Record<string, string> = {};
    for (const file of (await readdir('content/work')).filter((file) => file.endsWith('.md'))) {
      const { content } = matter(await readFile(`content/work/${file}`, 'utf8'));
      projectBodies[file.slice(0, -3)] = await renderMarkdown(content);
    }
    await writeFile(
      `${paths.generated}/project-bodies.server.json`,
      JSON.stringify(projectBodies, null, 2) + '\n',
    );
  }
  const origin = 'https://burhanbharmal.com';
  await writeFile(
    `${paths.public}/rss.xml`,
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Burhan Bharmal</title><link>${origin}/articles</link><description>Engineering, AI, and life.</description><language>en</language>${posts.map((post) => `<item><title>${xml(post.title)}</title><link>${origin}/articles/${post.slug}</link><guid>${origin}/articles/${post.slug}</guid><pubDate>${new Date(`${post.date}T00:00:00Z`).toUTCString()}</pubDate><description>${xml(post.description)}</description></item>`).join('')}</channel></rss>`,
  );
  await writeFile(
    `${paths.public}/sitemap.xml`,
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/work-with-me', '/resume', '/articles', '/posts', ...posts.map((post) => `/articles/${post.slug}`), ...notes.map((note) => `/posts/${note.slug}`), ...projectRoutes].map((route) => `<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>`,
  );
  await writeFile(
    `${paths.public}/robots.txt`,
    `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
  );
  return posts;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await compileContent();
