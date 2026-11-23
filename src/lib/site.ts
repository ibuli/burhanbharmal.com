import portfolio from '../../data/portfolio.json';
import socialImages from '../generated/social-images.json';
export const profile = portfolio;
export const SITE_URL = 'https://burhanbharmal.com';
export const external = { target: '_blank', rel: 'noopener noreferrer' } as const;
export const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date}T00:00:00Z`));
export function seo(
  title: string,
  description: string,
  pathname: string,
  options: { type?: 'website' | 'article'; publishedTime?: string } = {},
) {
  const card =
    (socialImages as Record<string, { image: string; alt: string }>)[pathname] || socialImages['/'];
  const image = `${SITE_URL}${card.image}`;
  const imageAlt = card.alt;
  const pageTitle = pathname === '/' ? profile.name : `${title} | ${profile.name}`;
  return {
    meta: [
      { title: pageTitle },
      { name: 'description', content: description },
      { name: 'author', content: profile.name },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: `${SITE_URL}${pathname}` },
      { property: 'og:type', content: options.type || 'website' },
      ...(options.type === 'article'
        ? [
            { property: 'article:author', content: profile.linkedin },
            ...(options.publishedTime
              ? [{ property: 'article:published_time', content: options.publishedTime }]
              : []),
          ]
        : []),
      { property: 'og:image', content: image },
      { property: 'og:image:secure_url', content: image },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:locale', content: 'en_IN' },
      {
        property: 'og:image:alt',
        content: imageAlt,
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      {
        name: 'twitter:image:alt',
        content: imageAlt,
      },
    ],
    links: [{ rel: 'canonical', href: `${SITE_URL}${pathname}` }],
  };
}
