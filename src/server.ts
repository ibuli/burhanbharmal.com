import handler, { createServerEntry } from '@tanstack/react-start/server-entry';
export default createServerEntry({
  async fetch(request, options) {
    const response = await handler.fetch(request, options);
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    // SSR may contain framework transport state. Avoid caching complete documents
    // until a route-specific, tested cache policy is introduced.
    if (headers.get('content-type')?.includes('text/html'))
      headers.set('Cache-Control', 'no-store');
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
});
