import { createFileRoute } from '@tanstack/react-router';
import { Library } from '../components/Library';
import { seo } from '../lib/site';
export const Route = createFileRoute('/articles/')({
  head: () =>
    seo(
      'Articles',
      'Articles by Burhan Bharmal on engineering, AI, and life. Complete articles on software, tools, and experiences.',
      '/articles',
    ),
  component: () => <Library type="articles" />,
});
