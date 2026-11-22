import { Link } from '@tanstack/react-router';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { profile, external } from '../lib/site';
import { CopyEmail } from './CopyEmail';
import { Wordmark } from './Wordmark';
const socials = [
  [profile.github, 'GitHub'],
  [profile.linkedin, 'LinkedIn'],
  ['https://twitter.com/Burhan_Bharmal', 'X'],
  ['https://instagram.com/iburhaan', 'Instagram'],
  ['https://www.producthunt.com/@burhan_bharmal', 'Product Hunt'],
] as const;
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-art" aria-hidden="true" />
      <div className="footer-inner wrap">
        <div className="footer-contact">
          <div className="footer-invitation">
            <h2>
              Let’s build
              <br />
              <span>something useful.</span>
            </h2>
            <p>
              A project, a collaboration, or a good conversation. I’d love to hear what you have in
              mind.
            </p>
          </div>
          <div className="footer-contact-actions">
            <Link className="footer-email" to="/work-with-me">
              <span>Let’s talk</span>
              <span className="footer-email-arrow">
                <ArrowUpRight size={26} strokeWidth={1.5} aria-hidden="true" />
              </span>
            </Link>
            <div className="footer-email-address">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <CopyEmail email={profile.email} />
            </div>
          </div>
        </div>
        <div className="footer-directory">
          <div className="footer-signature">
            <Link className="footer-identity" to="/" aria-label="Burhan Bharmal home">
              <Wordmark />
            </Link>
            <p>
              Frontend engineering.
              <br />
              Bengaluru, India.
            </p>
          </div>
          <nav className="footer-links" aria-labelledby="footer-explore">
            <h3 id="footer-explore">Explore</h3>
            <ul>
              {(
                [
                  ['/', 'Work'],
                  ['/work-with-me', 'Work with me'],
                  ['/resume', 'Resume'],
                  ['/articles', 'Articles'],
                  ['/posts', 'Posts'],
                ] as const
              ).map(([to, label]) => (
                <li key={to}>
                  <Link to={to}>{label}</Link>
                </li>
              ))}
              <li>
                <a href="/#about">About me</a>
              </li>
              <li>
                <a href="/rss.xml">
                  RSS feed
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </nav>
          <nav className="footer-links" aria-labelledby="footer-elsewhere">
            <h3 id="footer-elsewhere">Elsewhere</h3>
            <ul>
              {socials.map(([href, label]) => (
                <li key={label}>
                  <a href={href} {...external}>
                    <span>{label}</span>
                    <ArrowUpRight size={13} aria-hidden="true" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="footer-meta">
          <span>© {new Date(profile.updated).getUTCFullYear()} Burhan Bharmal</span>
          <span className="footer-credit">Built with care, for the web.</span>
          <a className="back-to-top" href="#top">
            Back to top
            <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
