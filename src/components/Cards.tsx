import { Link } from '@tanstack/react-router';
import { formatDate } from '../lib/site';
import type { Article, Note } from '../lib/blog';
export function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
export function ArticleCard({
  article,
  featured = false,
  heading = 'h3',
}: {
  article: Article;
  featured?: boolean;
  heading?: 'h2' | 'h3';
}) {
  const Heading = heading;
  return (
    <article className={`article-card ${featured ? 'article-featured' : ''}`}>
      {article.cover && (
        <Link
          className="article-image"
          to="/articles/$slug"
          params={{ slug: article.slug }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img src={article.cover} alt="" loading="lazy" width={960} height={600} />
        </Link>
      )}
      <Heading>
        <Link to="/articles/$slug" params={{ slug: article.slug }}>
          {article.title}
        </Link>
      </Heading>
      <div className="article-meta">
        <span>{article.topic}</span>
        <time dateTime={article.date}>{formatDate(article.date)}</time>
      </div>
      <p>{article.description}</p>
      <div className="article-foot">
        <span>{article.readingMinutes} min read</span>
        <Link
          to="/articles/$slug"
          params={{ slug: article.slug }}
          aria-label={`Read article: ${article.title}`}
        >
          Read article
        </Link>
      </div>
    </article>
  );
}
export function PostCard({ post, heading = 'h3' }: { post: Note; heading?: 'h2' | 'h3' }) {
  const Heading = heading;
  return (
    <article className="post-card">
      <Heading>
        <Link to="/posts/$slug" params={{ slug: post.slug }}>
          {post.title}
        </Link>
      </Heading>
      <div className="article-meta">
        <span>{post.topic}</span>
        {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
      </div>
      <p>{post.description}</p>
      {post.attribution && <p className="attribution">{post.attribution}</p>}
      <Link className="text-link" to="/posts/$slug" params={{ slug: post.slug }}>
        Read post
      </Link>
    </article>
  );
}
