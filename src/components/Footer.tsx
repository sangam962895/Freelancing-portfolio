import type { MouseEvent } from 'react';
import { profile } from '../data/portfolio';
import { SafeLink } from '../utils';

const gmailComposeUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=info.sangamgupta@gmail.com';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-name">{profile.name}</p>
          <p className="muted">AI training, data collection, and AI/ML engineering.</p>
        </div>
        <nav aria-label="Footer links">
          <ul className="footer-links">
            {profile.links.map((l) => (
              <li key={l.label}>
                <SafeLink className="footer-link-btn" href={l.url}>{l.label}</SafeLink>
              </li>
            ))}
            {!profile.email.startsWith('[') && (
              <li>
                <SafeLink className="footer-link-btn" href={gmailComposeUrl}>Email</SafeLink>
              </li>
            )}
            <li>
              <a className="footer-link-btn" href="#home" onClick={scrollToTop}>Back to top ↑</a>
            </li>
          </ul>
        </nav>
        <p className="muted copyright">© {year} {profile.name}</p>
      </div>
    </footer>
  );
}
