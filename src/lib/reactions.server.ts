import { DurableObject, env } from 'cloudflare:workers';
import articles from '../generated/posts.json';
import posts from '../generated/notes.json';

const publishedPaths = new Set([
  ...articles.map(({ slug }) => `articles/${slug}`),
  ...posts.map(({ slug }) => `posts/${slug}`),
]);
const visitorCookie = 'portfolio_reaction';
const visitorPattern = /^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/;
const responseHeaders = { 'Cache-Control': 'no-store' };

export class ContentReactions extends DurableObject {
  constructor(ctx: DurableObjectState, bindings: Env) {
    super(ctx, bindings);
    ctx.storage.sql.exec(
      'CREATE TABLE IF NOT EXISTS likes (visitor_id TEXT PRIMARY KEY) WITHOUT ROWID',
    );
  }

  reaction(visitor: string, method: 'GET' | 'PUT' | 'DELETE') {
    const sql = this.ctx.storage.sql;
    if (method === 'PUT') sql.exec('INSERT OR IGNORE INTO likes VALUES (?)', visitor);
    if (method === 'DELETE') sql.exec('DELETE FROM likes WHERE visitor_id = ?', visitor);
    const { count } = sql.exec<{ count: number }>('SELECT COUNT(*) AS count FROM likes').one();
    const liked =
      sql.exec('SELECT 1 FROM likes WHERE visitor_id = ?', visitor).toArray().length > 0;
    return { count, liked };
  }
}

export async function handleReaction(request: Request, url: URL) {
  const { method } = request;
  if (method !== 'GET' && method !== 'PUT' && method !== 'DELETE') {
    return new Response(null, {
      status: 405,
      headers: { ...responseHeaders, Allow: 'GET, PUT, DELETE' },
    });
  }

  const contentPath = url.pathname.slice('/api/likes/'.length);
  if (!publishedPaths.has(contentPath)) {
    return new Response(null, { status: 404, headers: responseHeaders });
  }

  if (method !== 'GET' && request.headers.get('Origin') !== url.origin) {
    return new Response(null, { status: 403, headers: responseHeaders });
  }

  const cookie = request.headers.get('Cookie')?.match(/(?:^|;\s*)portfolio_reaction=([^;]+)/)?.[1];
  const existingVisitor = cookie && visitorPattern.test(cookie) ? cookie : undefined;
  if (method !== 'GET' && !existingVisitor) {
    return new Response(null, { status: 409, headers: responseHeaders });
  }

  const limiter = method === 'GET' ? env.LIKE_READ_LIMIT : env.LIKE_WRITE_LIMIT;
  // Cloudflare sets this header at ingress. Ignore client-supplied forwarding headers.
  const client = request.headers.get('CF-Connecting-IP') ?? 'unknown';
  const { success } = await limiter.limit({ key: client });
  if (!success) {
    return new Response(null, {
      status: 429,
      headers: { ...responseHeaders, 'Retry-After': '60' },
    });
  }

  const visitor = existingVisitor ?? crypto.randomUUID();
  const result = await env.CONTENT_REACTIONS.getByName(contentPath).reaction(visitor, method);
  const headers = new Headers(responseHeaders);
  if (!existingVisitor) {
    const secure = url.protocol === 'https:' ? '; Secure' : '';
    headers.set(
      'Set-Cookie',
      `${visitorCookie}=${visitor}; Path=/api/likes/; Max-Age=31536000; HttpOnly; SameSite=Lax${secure}`,
    );
  }
  return Response.json(result, { headers });
}
