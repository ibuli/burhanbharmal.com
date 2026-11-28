import { Link, useLocation } from '@tanstack/react-router';
import { ArrowUpRight, Shuffle } from 'lucide-react';
import { useState } from 'react';

const recommendations = [
  {
    to: '/work/$slug',
    slug: 'arkive',
    title: 'Arkive',
    description: 'A local-first home for bookmarks, tabs, and reading.',
  },
  {
    to: '/articles/$slug',
    slug: 'why-does-targetblank-have-an-underscore',
    title: 'Why does target="_blank" have an underscore?',
    description: 'A short trip back to the days of HTML frames.',
  },
  {
    to: '/articles/$slug',
    slug: 'our-journey-through-the-google-chrome-builtin-ai-challenge',
    title: 'The Chrome Built-in AI Challenge',
    description: 'How we built SmartScout, an on-device AI sidekick.',
  },
] as const;

export function NotFound() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const missingPost = pathname.startsWith('/posts/');
  const [pickIndex, setPickIndex] = useState<number>(0);
  const [frames, setFrames] = useState({ spread: false, animate: false });
  const pick = recommendations[(pickIndex + (missingPost ? 1 : 0)) % recommendations.length]!;

  return (
    <section className="wrap missing-scene" aria-labelledby="missing-scene-title">
      <div className="missing-scene-main">
        <div className="missing-scene-copy">
          <h1 id="missing-scene-title">Scene missing.</h1>
          <p>
            {missingPost
              ? 'This post may have moved or been retired. Find another note or pick up with an article.'
              : 'This page may have moved. Pick up with a project or something to read.'}
          </p>
          <div className="missing-scene-actions">
            {missingPost ? (
              <Link className="button primary" to="/posts">
                Browse posts
              </Link>
            ) : (
              <Link className="button primary" to="/" hash="projects">
                Explore projects
              </Link>
            )}
            <Link className="text-link" to="/articles">
              Browse articles
            </Link>
          </div>
        </div>

        <div className="missing-scene-demo">
          <span className="sr-only">Error 404</span>
          <div
            className="missing-scene-frames"
            aria-hidden="true"
            data-spread={frames.spread}
            data-animate={frames.animate}
          >
            <span className="missing-scene-frame">4</span>
            <span className="missing-scene-frame">0</span>
            <span className="missing-scene-frame">4</span>
          </div>
          <button
            className="button missing-scene-rearrange"
            type="button"
            onClick={(event) => {
              const animate = event.detail > 0;
              setFrames(({ spread }) => ({ spread: !spread, animate }));
            }}
          >
            <Shuffle size={16} aria-hidden="true" />
            Rearrange
          </button>
        </div>
      </div>

      <div className="missing-scene-recommendation">
        <div aria-live="polite" aria-atomic="true">
          <h2>Try this next</h2>
          <Link className="missing-scene-pick" to={pick.to} params={{ slug: pick.slug }}>
            {pick.title}
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <p>{pick.description}</p>
        </div>
        <button
          className="button"
          type="button"
          onClick={() => setPickIndex((index) => (index + 1) % recommendations.length)}
        >
          Surprise me
        </button>
      </div>
    </section>
  );
}
