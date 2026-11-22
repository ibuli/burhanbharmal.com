import { createFileRoute } from '@tanstack/react-router';
import { Library } from '../components/Library';
import { seo } from '../lib/site';
export const Route = createFileRoute('/posts/')({
  head: () =>
    seo('Posts', 'Notes on building software, shared reading, and things I’m learning.', '/posts'),
  component: () => <Library type="posts" />,
});
