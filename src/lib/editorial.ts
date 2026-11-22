import { articles, type Article } from './blog';
export const readingPaths = [
  {
    slug: 'my-journey-with-cursor-ai',
    label: 'AI in everyday engineering',
    reason: 'What changed when AI coding tools became part of a real team workflow.',
  },
  {
    slug: 'frontend-ai-hackathon--sequoia',
    label: 'Helping a team build',
    reason: 'How shared rules, developer briefs, and human judgment shaped a frontend hackathon.',
  },
  {
    slug: 'our-journey-through-the-google-chrome-builtin-ai-challenge',
    label: 'From experiment to extension',
    reason: 'The APIs, constraints, and lessons behind building SmartScout with browser AI.',
  },
];
export const startingArticles = readingPaths.flatMap((path) => {
  const article = articles.find((a) => a.slug === path.slug);
  return article ? [{ ...article, description: path.reason, pathLabel: path.label }] : [];
});
export function relatedArticles(article: Article, candidates: Article[] = articles, limit = 2) {
  return candidates
    .filter((item) => item.slug !== article.slug)
    .map((item, index) => ({
      item,
      index,
      score:
        (item.topic === article.topic ? 3 : 0) +
        (['Engineering', 'AI & tools'].includes(item.topic) &&
        ['Engineering', 'AI & tools'].includes(article.topic)
          ? 1
          : 0),
    }))
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, Math.max(0, limit))
    .map(({ item }) => item);
}
