import { mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import * as fontkit from 'fontkit';
import sharp from 'sharp';

// Render lettering as paths so build machines and social crawlers need no installed fonts.
const displayFont = fontkit.create(
  await readFile('public/assets/fonts/syne-latin.woff2'),
) as fontkit.Font;
const bodyFont = fontkit.create(
  await readFile('public/assets/fonts/public-sans-latin.woff2'),
) as fontkit.Font;
const display = displayFont.getVariation({ wght: 600 });
const body = bodyFont.getVariation({ wght: 400 });
const paper = '#efeeea';
const ink = '#22241f';
const copper = '#944528';
const monogram = `<path fill="${paper}" fill-rule="evenodd" d="M16 12H32C42 12 47 17 47 23C47 27 45 30 42 32C47 34 50 37 50 42C50 49 44 53 33 53H16ZM25 20V28H32C36 28 38 27 38 24C38 21 36 20 32 20ZM25 36V45H33C38 45 41 44 41 41C41 38 38 36 33 36Z"/><circle cx="53" cy="53" r="4" fill="#e5ad84"/>`;
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="${ink}"/>${monogram}</svg>`;
await mkdir('public/assets/social', { recursive: true });
await writeFile('public/favicon.svg', favicon);
for (const [size, filename] of [
  [32, 'favicon-32.png'],
  [180, 'apple-touch-icon.png'],
  [192, 'icon-192.png'],
  [512, 'icon-512.png'],
] as const) {
  await sharp(Buffer.from(favicon)).resize(size, size).png().toFile(`public/${filename}`);
}
// A PNG-compressed ICO keeps the conventional /favicon.ico URL working too.
const png = await sharp(Buffer.from(favicon)).resize(32, 32).png().toBuffer();
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2);
ico.writeUInt16LE(1, 4);
ico[6] = 32;
ico[7] = 32;
ico.writeUInt16LE(1, 10);
ico.writeUInt16LE(32, 12);
ico.writeUInt32LE(png.length, 14);
ico.writeUInt32LE(22, 18);
await writeFile('public/favicon.ico', Buffer.concat([ico, png]));
await writeFile(
  'public/site.webmanifest',
  JSON.stringify(
    {
      name: 'Burhan Bharmal',
      short_name: 'Burhan',
      start_url: '/',
      display: 'browser',
      background_color: paper,
      theme_color: ink,
      icons: [192, 512].map((size) => ({
        src: `/icon-${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png',
        purpose: 'any',
      })),
    },
    null,
    2,
  ) + '\n',
);

function lettering(
  text: string,
  font: fontkit.Font,
  size: number,
  x: number,
  y: number,
  color = ink,
) {
  const run = font.layout(text);
  let cursor = 0;
  const paths = run.glyphs
    .map((glyph, index) => {
      const position = run.positions[index]!;
      const path = `<path transform="translate(${cursor + position.xOffset} ${position.yOffset})" d="${glyph.path.toSVG()}"/>`;
      cursor += position.xAdvance;
      return path;
    })
    .join('');
  const scale = size / font.unitsPerEm;
  return `<g fill="${color}" transform="translate(${x} ${y}) scale(${scale} ${-scale})">${paths}</g>`;
}
function lines(text: string, size: number, width: number) {
  const result: string[] = [];
  let line = '';
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (line && (display.layout(next).advanceWidth * size) / display.unitsPerEm > width) {
      result.push(line);
      line = word;
    } else line = next;
  }
  if (line) result.push(line);
  return result;
}
type Card = { pathname: string; title: string; subtitle: string; cover?: string };
const portfolio = JSON.parse(await readFile('data/portfolio.json', 'utf8')) as {
  projects: { slug: string; name: string; gallery: string[] }[];
};
const articles = JSON.parse(await readFile('src/generated/posts.json', 'utf8')) as {
  slug: string;
  title: string;
  cover?: string;
}[];
const posts = JSON.parse(await readFile('src/generated/notes.json', 'utf8')) as typeof articles;
const cards: Card[] = [
  {
    pathname: '/',
    title: 'Burhan Bharmal.',
    subtitle: 'Lead Engineer · Products, architecture & ideas.',
  },
  {
    pathname: '/resume',
    title: 'Experience that moves products forward.',
    subtitle: 'Burhan Bharmal · Lead Engineer',
  },
  {
    pathname: '/work-with-me',
    title: 'Let’s build something useful.',
    subtitle: 'Product development · Architecture · Performance',
  },
  {
    pathname: '/articles',
    title: 'Ideas from behind the build.',
    subtitle: 'Articles by Burhan Bharmal',
  },
  {
    pathname: '/posts',
    title: 'Notes from a curious engineer.',
    subtitle: 'Notes by Burhan Bharmal',
  },
  ...articles.map((article) => ({
    pathname: `/articles/${article.slug}`,
    title: article.title,
    subtitle: 'An article by Burhan Bharmal',
    cover: article.cover,
  })),
  ...posts.map((post) => ({
    pathname: `/posts/${post.slug}`,
    title: post.title,
    subtitle: 'A note by Burhan Bharmal',
  })),
  ...portfolio.projects.map((project) => ({
    pathname: `/work/${project.slug}`,
    title: project.name,
    subtitle: 'Selected work by Burhan Bharmal',
    cover: project.gallery[0],
  })),
];
const images: Record<string, { image: string; alt: string }> = {};
for (const card of cards) {
  // Decorative emoji are absent from the brand fonts; omit them from artwork
  // rather than publishing missing-glyph boxes. Metadata retains the full title.
  const displayTitle =
    [...card.title]
      .filter((character) => display.hasGlyphForCodePoint(character.codePointAt(0)!))
      .join('')
      .replace(/\s+/g, ' ')
      .trim() || 'Notes from Burhan';
  const width = card.cover ? 610 : 1040;
  let size = card.pathname === '/' ? 112 : 72;
  while (size > 32 && lines(displayTitle, size, width).length > 4) size -= 2;
  const titleLines =
    card.pathname === '/' ? ['Burhan', 'Bharmal.'] : lines(displayTitle, size, width);
  const baseline = card.pathname === '/' ? 278 : titleLines.length === 1 ? 322 : 222;
  const title = titleLines
    .map((line, i) => lettering(line, display, size, 80, baseline + i * size * 1.12))
    .join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${paper}"/><rect x="80" y="64" width="64" height="64" rx="10" fill="${ink}"/><g transform="translate(80 64)">${monogram}</g>${title}${lettering(card.subtitle, body, 24, 80, 534)}<path d="M80 566H1120" stroke="#c9c8c0"/>${lettering('burhanbharmal.com', body, 19, 80, 602, copper)}</svg>`;
  const overlay = card.cover
    ? [
        {
          input: await sharp(`public${card.cover}`)
            .resize(398, 400, { fit: 'contain', background: '#e4e3de' })
            .png()
            .toBuffer(),
          left: 722,
          top: 136,
        },
      ]
    : [];
  const image = await sharp(Buffer.from(svg))
    .composite(overlay)
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();
  const hash = createHash('sha256').update(image).digest('hex').slice(0, 12);
  const filename = `${card.pathname === '/' ? 'home' : card.pathname.slice(1).replaceAll('/', '-')}-${hash}.jpg`;
  await writeFile(`public/assets/social/${filename}`, image);
  images[card.pathname] = {
    image: `/assets/social/${filename}`,
    alt: `${card.title} — ${card.subtitle}`,
  };
}
await writeFile('src/generated/social-images.json', JSON.stringify(images, null, 2) + '\n');
const keep = new Set(Object.values(images).map((entry) => entry.image.split('/').at(-1)));
for (const file of await readdir('public/assets/social')) {
  if (file.endsWith('.jpg') && !keep.has(file)) await unlink(`public/assets/social/${file}`);
}
process.stdout.write(`Generated favicon set and ${cards.length} social preview cards.\n`);
