import { Link } from '@tanstack/react-router';
import { profile } from '../lib/site';
import { relatedArticles } from '../lib/editorial';
import type { Article } from '../lib/blog';
import { ArticleCard } from './Cards';
export function ArticleContinuation({ article }: { article: Article }) {
  const related = relatedArticles(article);
  const engineering = article.topic === 'Engineering' || article.topic === 'AI & tools';
  return (
    <div className="article-continuation">
      <aside className="article-author" aria-label="About the author">
        <img src="/assets/images/avatar.jpg" alt="" width={64} height={68} loading="lazy" />
        <div>
          <h2>Burhan Bharmal</h2>
          <p>
            {profile.role} at {profile.company}. I build independent products and write about what I
            learn along the way.
          </p>
          <Link className="text-link" to="/resume">
            Explore my experience
          </Link>
        </div>
      </aside>
      {engineering && (
        <aside className="article-project-invitation">
          <h2>Put the ideas to work.</h2>
          <p>
            Building a product or working through a frontend challenge? Tell me what your team
            needs.
          </p>
          <Link className="text-link" to="/work-with-me">
            Discuss a project
          </Link>
        </aside>
      )}
      {related.length > 0 && (
        <section className="related-reading" aria-labelledby="related-heading">
          <div className="related-heading">
            <h2 id="related-heading">Keep reading.</h2>
            <Link className="text-link" to="/articles">
              All articles
            </Link>
          </div>
          <div className="related-grid">
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </div>
        </section>
      )}
      <div className="article-follow">
        <p>Follow the next piece when it’s published.</p>
        <a className="text-link" href="/rss.xml">
          Subscribe with RSS
        </a>
      </div>
    </div>
  );
}
