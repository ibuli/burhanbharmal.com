import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { posts } from '../lib/blog';
import { getNoteBody } from '../lib/blog.functions';
import { formatDate, seo } from '../lib/site';
export const Route = createFileRoute('/posts/$slug')({
  loader: async ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    const html = await getNoteBody({ data: { slug: params.slug } });
    if (html === null) throw notFound();
    return { post, html };
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(loaderData.post.title, loaderData.post.description, `/posts/${loaderData.post.slug}`)
      : {},
  component: PostPage,
});
function PostPage() {
  const { post, html } = Route.useLoaderData();
  return (
    <article className="wrap blog-page note-page">
      <Link className="text-link" to="/posts">
        All posts
      </Link>
      <header className="blog-header">
        <h1>{post.title}</h1>
        <div className="blog-meta">
          <span>Burhan Bharmal</span>
          <span>{post.topic}</span>
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
        </div>
      </header>
      {post.attribution && <p className="attribution">{post.attribution}</p>}
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  );
}
