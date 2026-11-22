import { Link } from '@tanstack/react-router';
import { startingArticles } from '../lib/editorial';
import { ArticleCard } from './Cards';
export function StartReading({ compact = false }: { compact?: boolean }) {
  return (
    <section
      id={compact ? undefined : 'writing'}
      className={
        compact
          ? 'start-reading start-reading-compact'
          : 'start-reading section writing-section wrap'
      }
      aria-labelledby="start-reading-heading"
    >
      <div className="section-heading">
        <h2 id="start-reading-heading">
          Start with
          <br /> the experience.
        </h2>
        <div>
          <p>Three ways into what I’m learning about building products and working with AI.</p>
          {!compact && (
            <Link className="text-link" to="/articles">
              Explore all articles
            </Link>
          )}
        </div>
      </div>
      <div className="writing-grid">
        {startingArticles.map((article, index) => (
          <ArticleCard article={article} featured={index === 0} key={article.slug} />
        ))}
      </div>
    </section>
  );
}
