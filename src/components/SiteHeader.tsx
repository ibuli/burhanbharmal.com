'use client';
import { useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Wordmark } from './Wordmark';
const navigation = [
  ['/', 'Work'],
  ['/resume', 'Resume'],
  ['/articles', 'Articles'],
  ['/posts', 'Posts'],
] as const;
export function SiteHeader() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const current =
    pathname === '/' || pathname.startsWith('/work/')
      ? '/'
      : navigation.find(
          ([to]) => to !== '/' && (pathname === to || pathname.startsWith(`${to}/`)),
        )?.[0] || null;
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const indicator = focused || hovered || current;
  return (
    <>
      <div id="top" className="page-top" aria-hidden="true" />
      <header className="site-header">
        <div className="header-inner wrap">
          <Link className="identity" to="/" aria-label="Burhan Bharmal home">
            <Wordmark />
          </Link>
          <LayoutGroup id="header-navigation">
            <nav className="primary-navigation" aria-label="Main navigation">
              {navigation.map(([to, label]) => (
                <Link
                  key={to}
                  to={to}
                  className="navigation-link"
                  activeOptions={{ exact: true }}
                  aria-current={current === to ? (pathname === to ? 'page' : 'true') : undefined}
                  data-active={current === to || undefined}
                  onPointerEnter={(event) => {
                    if (event.pointerType === 'mouse') setHovered(to);
                  }}
                  onPointerLeave={() => setHovered(null)}
                  onBlur={() => setFocused(null)}
                  onFocus={() => setFocused(to)}
                  onClick={() => {
                    setHovered(null);
                    setFocused(null);
                  }}
                >
                  <span>{label}</span>
                  {indicator === to && (
                    <motion.span
                      className="navigation-indicator"
                      layoutId="navigation-indicator"
                      aria-hidden="true"
                      transition={{
                        duration: reduced || focused ? 0 : 0.24,
                        ease: [0.23, 1, 0.32, 1],
                      }}
                    />
                  )}
                </Link>
              ))}
            </nav>
          </LayoutGroup>
          <div className="header-actions">
            <Link
              className="header-contact"
              to="/work-with-me"
              aria-label="Work with me"
              aria-current={pathname === '/work-with-me' ? 'page' : undefined}
            >
              <span>Work with me</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
