'use client';
import { useState } from 'react';
import { articles, posts } from '../lib/blog';
import { ArticleCard, PostCard } from './Cards';
import { StartReading } from './StartReading';
export function Library({ type }: { type: 'articles' | 'posts' }) {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('all');
  const items =
    type === 'articles'
      ? articles.map((article) => ({
          key: article.slug,
          topic: article.topic,
          search: `${article.title} ${article.description} ${article.topic}`,
          card: <ArticleCard article={article} heading="h2" />,
        }))
      : posts.map((post) => ({
          key: post.slug,
          topic: post.topic,
          search: `${post.title} ${post.description} ${post.topic}`,
          card: <PostCard post={post} heading="h2" />,
        }));
  const topics = [...new Set(items.map((item) => item.topic))];
  const visible = items.filter(
    (item) =>
      (topic === 'all' || topic === item.topic) &&
      item.search.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  );
  function reset() {
    setQuery('');
    setTopic('all');
  }
  return (
    <div className="wrap subpage">
      <section className="page-intro">
        <h1>
          {type === 'articles' ? (
            <>
              A place to
              <br />
              <span>think out loud.</span>
            </>
          ) : (
            <>
              Small thoughts.
              <br />
              <span>Open conversations.</span>
            </>
          )}
        </h1>
        <p>
          {type === 'articles'
            ? 'Engineering, AI, and the occasional detour into life.'
            : 'Things I’m building, reading, and figuring out. Notes from along the way.'}
        </p>
        <a className="text-link" href="/rss.xml">
          Subscribe to articles with RSS
        </a>
      </section>
      {type === 'articles' && <StartReading compact />}
      <section className="library" aria-label={`${type} library`}>
        <div className="library-controls">
          <div className="search-field">
            <label htmlFor="library-search">Search {type}</label>
            <input
              id="library-search"
              type="search"
              placeholder="Search by title or topic"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <fieldset className="filter-field">
            <legend>Filter by topic</legend>
            <div className="filters">
              {['all', ...topics].map((value) => (
                <button
                  className={`filter ${topic === value ? 'active' : ''}`}
                  key={value}
                  type="button"
                  aria-pressed={topic === value}
                  onClick={() => setTopic(value)}
                >
                  {value === 'all' ? 'All' : value}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <output className="library-count block" aria-live="polite">
          {visible.length} of {items.length} {type}
        </output>
        <div className={type === 'articles' ? 'article-library' : 'posts-library'}>
          {visible.map((item) => (
            <div className="library-entry" key={item.key}>
              {item.card}
            </div>
          ))}
        </div>
        {visible.length === 0 && (
          <div className="empty-state">
            <h2>No matches this time.</h2>
            <p>Try another search or choose a different topic.</p>
            <button className="button secondary" type="button" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
