import { Heart } from 'lucide-react';
import { useEffect, useId, useState, type MouseEvent } from 'react';

type Reaction = { count: number; liked: boolean };

const rateLimitMessage = 'Too many requests. Try again in a minute.';

export function LikeButton({ kind, slug }: { kind: 'articles' | 'posts'; slug: string }) {
  const endpoint = `/api/likes/${kind}/${slug}`;
  const [reaction, setReaction] = useState<Reaction | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const countId = useId();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const request = new AbortController();
    async function load() {
      try {
        const response = await fetch(endpoint, { signal: request.signal });
        if (response.status === 429) {
          setError(rateLimitMessage);
          return;
        }
        if (!response.ok) throw new Error('Unable to load likes');
        const result: Reaction = await response.json();
        setReaction(result);
      } catch {
        if (!request.signal.aborted) setError('Likes couldn’t load. Try again.');
      }
    }
    void load();
    return () => request.abort();
  }, [endpoint]);

  async function toggle(event: MouseEvent<HTMLButtonElement>) {
    if (pending) return;
    const method = reaction ? (reaction.liked ? 'DELETE' : 'PUT') : 'GET';
    setPending(true);
    setError('');
    setAnnouncement('');
    setAnimate(false);
    try {
      const response = await fetch(endpoint, { method });
      if (response.status === 429) {
        setError(rateLimitMessage);
        return;
      }
      if (response.status === 409) {
        setError('Enable cookies to save your like.');
        return;
      }
      if (!response.ok) throw new Error('Unable to update likes');
      const result: Reaction = await response.json();
      setReaction(result);
      setAnimate(event.detail > 0 && method === 'PUT' && result.liked);
      if (method !== 'GET') {
        setAnnouncement(result.liked ? 'Like added.' : 'Like removed.');
      }
    } catch {
      setError('Couldn’t update likes. Try again.');
    } finally {
      setPending(false);
    }
  }

  const liked = reaction?.liked ?? false;
  const failed = !reaction && !!error;
  return (
    <div className="content-reaction">
      <button
        className="button content-like"
        type="button"
        aria-label={failed ? 'Retry likes' : 'Like'}
        aria-describedby={reaction ? countId : undefined}
        aria-pressed={failed ? undefined : liked}
        aria-disabled={pending || (!reaction && !failed)}
        onClick={(event) => {
          if (reaction || failed) void toggle(event);
        }}
      >
        <Heart
          size={20}
          aria-hidden="true"
          data-pop={animate}
          fill={liked ? 'currentColor' : 'none'}
        />
        {failed ? 'Retry likes' : 'Like'}
        {reaction && (
          <span id={countId} className="like-count">
            {reaction.count}
          </span>
        )}
      </button>
      <output className={error ? 'like-message' : 'sr-only'}>{error || announcement}</output>
    </div>
  );
}
