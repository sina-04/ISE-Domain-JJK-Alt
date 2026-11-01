import { Mail } from 'lucide-react';
import type { Locale } from '@/lib/domain-config';

const links = [
  {
    name: 'GitHub',
    href: 'https://github.com/sina-04',
    path: 'M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.99 10.99 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sina-rezaei-062a30416',
    path: 'M6.5 8.3H3.2V21h3.3V8.3ZM4.85 3A1.95 1.95 0 1 0 4.85 6.9 1.95 1.95 0 0 0 4.85 3ZM20.8 13.7c0-3.83-2.04-5.61-4.77-5.61-2.2 0-3.18 1.21-3.72 2.06V8.3H9.02V21h3.29v-6.29c0-1.66.31-3.27 2.37-3.27 2.03 0 2.06 1.9 2.06 3.38V21H20.8v-7.3Z',
  },
  {
    name: 'X',
    href: 'https://x.com/Sina_41148',
    path: 'M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z',
  },
  {
    name: 'Telegram',
    href: 'https://t.me/InfiniteSoA',
    path: 'M21.75 2.44 2.95 9.69c-1.28.51-1.27 1.22-.23 1.54l4.82 1.5 1.85 5.66c.23.64.11.9.78.9.52 0 .75-.24 1.04-.52l2.31-2.24 4.8 3.55c.88.49 1.52.24 1.74-.82l3.15-14.86c.32-1.29-.49-1.88-1.46-1.46ZM8.3 12.39 19.17 5.5c.54-.33 1.03-.15.63.2l-8.97 8.13-.35 3.75-2.18-5.19Z',
  },
];

export function SocialLinks({ locale }: { locale: Locale }) {
  return (
    <nav
      className="social-links"
      aria-label={locale === 'fa' ? 'پیوندهای سینا رضایی' : 'Sina Rezaei links'}
    >
      {links.map((link) => (
        <a
          key={link.name}
          className="social-link"
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.name}
          title={link.name}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d={link.path} />
          </svg>
        </a>
      ))}
      <a
        className="social-link"
        href="mailto:sina.rezaei.04@gmail.com"
        aria-label={locale === 'fa' ? 'ایمیل' : 'Email'}
        title="sina.rezaei.04@gmail.com"
      >
        <Mail className="social-mail" size={20} aria-hidden="true" />
      </a>
    </nav>
  );
}
