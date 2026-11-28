import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
import { handleReaction } from './lib/reactions.server';

export { ContentReactions } from './lib/reactions.server';

export default createServerEntry({
  async fetch(request, options) {
    const url = new URL(request.url);
    const response = url.pathname.startsWith('/api/likes/')
      ? await handleReaction(request, url)
      : await handler.fetch(request, options);
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    // SSR may contain framework transport state. Avoid caching complete documents
    // until a route-specific, tested cache policy is introduced.
    if (url.protocol === 'https:') {
      headers.set('Strict-Transport-Security', 'max-age=31536000');
    }
    if (headers.get('content-type')?.includes('text/html')) {
      headers.set('Cache-Control', 'no-store');
      headers.set('X-Frame-Options', 'DENY');
      headers.set(
        'Content-Security-Policy',
        "frame-ancestors 'none'; base-uri 'none'; object-src 'none'",
      );
    }
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
});
