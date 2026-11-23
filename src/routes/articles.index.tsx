import { createFileRoute } from '@tanstack/react-router';
import { Library } from '../components/Library';
import { seo } from '../lib/site';
export const Route = createFileRoute('/articles/')({
  head: () =>
    seo(
      'Articles',
      'Firsthand stories and practical lessons from building software, exploring AI, and life along the way. Articles by Burhan Bharmal.',
      '/articles',
    ),
  component: () => <Library type="articles" />,
});
