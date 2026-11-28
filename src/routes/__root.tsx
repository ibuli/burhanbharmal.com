import type { ReactNode } from 'react';
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { Layout, PendingView } from '../components/Layout';
import { NotFound } from '../components/NotFound';
import stylesheet from '../styles.css?url';
const themeScript = `try{const t=localStorage.getItem('portfolio-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch{}`;
export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'color-scheme', content: 'light dark' },
      { property: 'og:site_name', content: 'Burhan Bharmal' },
    ],
    links: [
      { rel: 'stylesheet', href: stylesheet },
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'preload',
        href: '/assets/fonts/public-sans-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'preload',
        href: '/assets/fonts/syne-latin.woff2',
        as: 'font',
        type: 'font/woff2',
        crossOrigin: 'anonymous',
      },
      { rel: 'alternate', type: 'application/rss+xml', title: 'Burhan Bharmal', href: '/rss.xml' },
    ],
  }),
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
  shellComponent: Document,
  notFoundComponent: NotFound,
  pendingComponent: PendingView,
  errorComponent: ({ reset }) => (
    <section className="wrap not-found">
      <h1>Something went wrong.</h1>
      <p>Please try loading this page again.</p>
      <button className="button primary" type="button" onClick={reset}>
        Try again
      </button>
    </section>
  ),
});
function Document({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
