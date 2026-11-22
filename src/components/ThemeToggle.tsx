'use client';
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  useEffect(() => {
    const system = matchMedia('(prefers-color-scheme: dark)');
    const sync = () =>
      setTheme(
        document.documentElement.dataset.theme === 'dark'
          ? 'dark'
          : document.documentElement.dataset.theme === 'light'
            ? 'light'
            : system.matches
              ? 'dark'
              : 'light',
      );
    sync();
    system.addEventListener('change', sync);
    return () => system.removeEventListener('change', sync);
  }, []);
  function toggle() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('portfolio-theme', next);
    } catch {
      /* The theme still works for this page. */
    }
    setTheme(next);
  }
  const label = theme === null ? 'Theme' : theme === 'dark' ? 'Light' : 'Dark';
  return (
    <button
      className="theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${label.toLowerCase()} theme` : 'Change color theme'}
    >
      <Sun className="theme-sun" size={17} strokeWidth={1.5} aria-hidden="true" />
      <Moon className="theme-moon" size={17} strokeWidth={1.5} aria-hidden="true" />
    </button>
  );
}
