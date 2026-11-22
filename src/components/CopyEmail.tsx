'use client';
import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  async function copy() {
    window.clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(email);
      setStatus('copied');
    } catch {
      setStatus('error');
    }
    timer.current = window.setTimeout(() => setStatus('idle'), 3000);
  }
  return (
    <div className="copy-email">
      <button
        type="button"
        className="copy-email-button"
        onClick={copy}
        aria-label="Copy email address"
        title="Copy email address"
        data-copied={status === 'copied' || undefined}
      >
        <Copy className="copy-icon" size={16} aria-hidden="true" />
        <Check className="copied-icon" size={16} aria-hidden="true" />
      </button>
      <output className="copy-email-status" aria-live="polite">
        {status === 'copied'
          ? 'Email copied'
          : status === 'error'
            ? 'Select the address to copy it.'
            : ''}
      </output>
    </div>
  );
}
