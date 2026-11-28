import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { articles } from '../lib/blog';
import { ArticleContinuation } from '../components/ArticleContinuation';
import { LikeButton } from '../components/LikeButton';
import { getPostBody } from '../lib/blog.functions';
import { formatDate, seo, SITE_URL } from '../lib/site';
export const Route = createFileRoute('/articles/$slug')({
  loader: async ({ params }) => {
    const article = articles.find((post) => post.slug === params.slug);
    if (!article) throw notFound();
    const html = await getPostBody({ data: { slug: params.slug } });
    if (html === null) throw notFound();
    return { article, html };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(
          loaderData.article.title,
          loaderData.article.description,
          `/articles/${loaderData.article.slug}`,
          {
            type: 'article',
            publishedTime: loaderData.article.date,
          },
        )
      : {},
  component: ArticlePage,
});
function ArticlePage() {
  const { article, html } = Route.useLoaderData();
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    datePublished: article.date,
    description: article.description,
    ...(article.cover ? { image: `${SITE_URL}${article.cover}` } : {}),
    author: { '@type': 'Person', name: 'Burhan Bharmal', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
  };
  return (
    <article className="wrap blog-page">
      <Link className="text-link" to="/articles">
        Articles
      </Link>
      <header className="blog-header">
        <h1>{article.title}</h1>
        <div className="blog-meta">
          <span>Burhan Bharmal</span>
          <span>{article.topic}</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          <span>{article.readingMinutes} min read</span>
        </div>
      </header>
      {article.cover && (
        <img className="article-cover" src={article.cover} alt="" fetchPriority="high" />
      )}
      {article.outline && article.outline.length >= 3 && (
        <nav className="article-outline" aria-labelledby="article-outline-heading">
          <h2 id="article-outline-heading">In this article</h2>
          <ol>
            {article.outline.map((heading) => (
              <li key={heading.id}>
                <a href={`#${heading.id}`}>{heading.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      <LikeButton key={article.slug} kind="articles" slug={article.slug} />
      <ArticleContinuation article={article} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }}
      />
    </article>
  );
}
