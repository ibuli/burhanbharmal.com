import type { ReactNode } from 'react';
import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
export function PendingView() {
  return (
    <output className="wrap block min-h-80 py-16" aria-label="Loading page">
      <div className="skeleton h-12 w-2/3 rounded-lg" />
      <div className="skeleton mt-8 h-40 rounded-2xl" />
      <span className="sr-only">Loading content…</span>
    </output>
  );
}
