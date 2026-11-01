'use client';
/* Supplied SVG artwork is preserved without raster optimization. */
/* eslint-disable @next/next/no-img-element */

import {
  Suspense,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from 'react';
import {
  ArrowUp,
  Globe2,
  Menu,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import Link from '@/components/site-link';
import { DomainOverview } from '@/components/domain-overview';
import { Explorer } from '@/components/explorer';
import { DataSciencePage } from '@/components/data-science-page';
import { SiteSearch } from '@/components/site-search';
import { categories, type Locale } from '@/lib/domain-config';
import { withBasePath } from '@/lib/base-path';

const navigation = [
  ['home', 'Overview', 'نمای کلی'],
  ['chart', 'Curriculum', 'برنامه درسی'],
  ['majors', 'Graduate pathways', 'گرایش‌های ارشد'],
  ['careers', 'Careers', 'مسیرهای شغلی'],
  ['tools', 'Tools & software', 'ابزار و نرم‌افزار'],
  ['resources', 'Reading room', 'کتابخانه'],
  ['wikipedia', 'Wikipedia', 'ویکی‌پدیا'],
] as const;

const subscribeTheme = (listener: () => void) => {
  window.addEventListener('ise-themechange', listener);
  return () => window.removeEventListener('ise-themechange', listener);
};
const readTheme = () => document.documentElement.dataset.theme || 'dark';
const subscribeEffects = (listener: () => void) => {
  window.addEventListener('ise-effectschange', listener);
  return () => window.removeEventListener('ise-effectschange', listener);
};
const readEffects = () => {
  if (document.documentElement.dataset.domainEffects !== undefined) {
    return document.documentElement.dataset.domainEffects === 'true';
  }
  try {
    return localStorage.getItem('ise-domain-effects') === 'true';
  } catch {
    return false;
  }
};

function GitHubMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="currentColor"
    >
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.74.4-1.25.73-1.54-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.99 10.99 0 0 1 5.76 0c2.19-1.49 3.15-1.18 3.15-1.18.63 1.58.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

export function DomainApp({
  locale,
  section,
}: {
  locale: Locale;
  section: string;
}) {
  const fa = locale === 'fa';
  const t = (en: string, per: string) => (fa ? per : en);
  const href = (id: string) => `/${locale}${id === 'home' ? '' : `/${id}`}`;
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => 'dark');
  const [activeSection, setActiveSection] = useState(section);
  const [menu, setMenu] = useState(false);
  const effects = useSyncExternalStore(
    subscribeEffects,
    readEffects,
    () => false,
  );
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [intro, setIntro] = useState(false);
  const audio = useRef<HTMLAudioElement | null>(null);
  const introTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipButton = useRef<HTMLButtonElement | null>(null);
  const introDialog = useRef<HTMLDialogElement | null>(null);
  const menuButton = useRef<HTMLButtonElement | null>(null);
  const pendingCategory = useRef<string | null>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = fa ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('ise-language', locale);
    } catch {}
  }, [locale, fa]);

  useEffect(() => {
    const syncSection = () => {
      const parts = window.location.pathname.split('/').filter(Boolean);
      const localeIndex = parts.lastIndexOf(locale);
      setActiveSection(parts[localeIndex + 1] || 'home');
      setMenu(false);
    };
    window.addEventListener('popstate', syncSection);
    return () => window.removeEventListener('popstate', syncSection);
  }, [locale]);

  useEffect(
    () => () => {
      audio.current?.pause();
      if (introTimer.current) clearTimeout(introTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [menu]);

  useEffect(() => {
    if (!intro) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    introDialog.current?.showModal();
    skipButton.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [intro]);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    window.dispatchEvent(new Event('ise-themechange'));
    try {
      localStorage.setItem('ise-theme', next);
    } catch {}
  }

  function stopAudio() {
    audio.current?.pause();
    audio.current = null;
    setAudioPlaying(false);
  }

  function toggleEffects() {
    const next = !effects;
    document.documentElement.dataset.domainEffects = String(next);
    window.dispatchEvent(new Event('ise-effectschange'));
    setAudioError(false);
    if (!next) stopAudio();
    try {
      localStorage.setItem('ise-domain-effects', String(next));
    } catch {}
  }

  function showDomain(category: string) {
    window.history.pushState(
      window.history.state,
      '',
      withBasePath(`${href('chart')}?view=content&category=${category}`),
    );
    window.dispatchEvent(new Event('ise-querychange'));
    setActiveSection('chart');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function finishIntro() {
    if (introTimer.current) clearTimeout(introTimer.current);
    introTimer.current = null;
    introDialog.current?.close();
    setIntro(false);
    stopAudio();
    const category = pendingCategory.current;
    pendingCategory.current = null;
    if (category) {
      showDomain(category);
      requestAnimationFrame(() => document.getElementById('main')?.focus());
    }
  }

  function handleDomainClick(
    event: MouseEvent<HTMLAnchorElement>,
    category: (typeof categories)[number],
  ) {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    if (!effects || !category.audio) return;
    event.preventDefault();
    stopAudio();
    setAudioError(false);
    const playback = new Audio(withBasePath(category.audio));
    audio.current = playback;
    setAudioPlaying(true);
    playback.addEventListener(
      'ended',
      () => {
        if (audio.current === playback) {
          audio.current = null;
          setAudioPlaying(false);
        }
      },
      { once: true },
    );
    const playbackFailed = () => {
      if (audio.current === playback) {
        stopAudio();
        setAudioError(true);
      }
    };
    playback.addEventListener('error', playbackFailed, { once: true });
    void playback.play().catch(playbackFailed);
    if (
      category.id === 'math' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      pendingCategory.current = category.id;
      setIntro(true);
      introTimer.current = setTimeout(finishIntro, 5000);
    } else showDomain(category.id);
  }

  return (
    <div
      id="top"
      className="site-shell editorial-shell"
      dir={fa ? 'rtl' : 'ltr'}
    >
      <a href="#main" className="skip-link">
        {t('Skip to content', 'رفتن به محتوا')}
      </a>
      <header className="site-header" inert={intro || undefined}>
        <div className="header-topline">
          <Link
            href={href('home')}
            className="brand"
            aria-label={t('ISE Domain overview', 'نمای کلی قلمرو صنایع')}
          >
            <span className="brand-symbol" lang="ja" aria-hidden="true">
              領域
            </span>
            <span>
              ISE<span className="brand-thin">DOMAIN</span>
              <small>INDUSTRIAL & SYSTEMS ENGINEERING</small>
            </span>
          </Link>
          <SiteSearch locale={locale} />
          <div className="header-actions">
            <a
              className="repository-link"
              href="https://github.com/sina-04/ISE-Domain-JJK-Alt"
              target="_blank"
              rel="noreferrer"
              aria-label={t(
                'Project repository on GitHub',
                'مخزن پروژه در گیت‌هاب',
              )}
            >
              <GitHubMark />
            </a>
            <a
              className="language-button"
              href={withBasePath(
                `/${fa ? 'en' : 'fa'}${activeSection === 'home' ? '' : `/${activeSection}`}`,
              )}
              onClick={(event) => {
                event.preventDefault();
                window.location.href = withBasePath(
                  `/${fa ? 'en' : 'fa'}${activeSection === 'home' ? '' : `/${activeSection}`}${window.location.search}`,
                );
              }}
              lang={fa ? 'en' : 'fa'}
              aria-label={t('Switch to Persian', 'تغییر زبان به انگلیسی')}
            >
              <Globe2 size={17} aria-hidden="true" />
              {fa ? 'EN' : 'فا'}
            </a>
            <button
              type="button"
              className="icon-button"
              onClick={toggleTheme}
              aria-label={t(
                theme === 'dark' ? 'Use light theme' : 'Use dark theme',
                theme === 'dark' ? 'حالت روشن' : 'حالت تیره',
              )}
            >
              {theme === 'dark' ? (
                <Sun size={19} aria-hidden="true" />
              ) : (
                <Moon size={19} aria-hidden="true" />
              )}
            </button>
            <button
              type="button"
              ref={menuButton}
              className="icon-button menu-button"
              onClick={() => setMenu(!menu)}
              aria-expanded={menu}
              aria-controls="primary-navigation"
              aria-label={t('Toggle navigation', 'باز کردن فهرست')}
            >
              {menu ? (
                <X size={20} aria-hidden="true" />
              ) : (
                <Menu size={20} aria-hidden="true" />
              )}
              <span>{t('Menu', 'فهرست')}</span>
            </button>
          </div>
        </div>
        <nav
          id="primary-navigation"
          aria-label={t('Main navigation', 'ناوبری اصلی')}
          className={menu ? 'main-nav open' : 'main-nav'}
        >
          {navigation.map(([id, en, per], index) => (
            <Link
              key={id}
              href={href(id)}
              onClick={() => setMenu(false)}
              aria-current={activeSection === id ? 'page' : undefined}
              className={activeSection === id ? 'active' : ''}
            >
              <span className="nav-index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              {t(en, per)}
            </Link>
          ))}
        </nav>
      </header>
      <main
        id="main"
        className="main-content"
        tabIndex={-1}
        inert={intro || undefined}
      >
        {activeSection === 'home' ? (
          <DomainOverview
            locale={locale}
            onDomainClick={handleDomainClick}
            effectsControl={
              <button
                type="button"
                className="effects-toggle"
                aria-pressed={effects}
                onClick={toggleEffects}
              >
                {effects ? (
                  <Volume2 size={17} aria-hidden="true" />
                ) : (
                  <VolumeX size={17} aria-hidden="true" />
                )}
                {t(
                  `JJK effects ${effects ? 'on' : 'off'}`,
                  `جلوه‌های انیمه: ${effects ? 'روشن' : 'خاموش'}`,
                )}
              </button>
            }
          />
        ) : activeSection === 'data-science' ? (
          <DataSciencePage locale={locale} />
        ) : (
          <Suspense
            fallback={
              <output className="loading-state">
                {t('Loading the catalog…', 'در حال بارگذاری فهرست…')}
              </output>
            }
          >
            <Explorer locale={locale} section={activeSection} />
          </Suspense>
        )}
      </main>
      {audioPlaying && !intro && (
        <output className="domain-audio-status">
          <Volume2 size={17} aria-hidden="true" />
          {t('Domain audio playing', 'صدای قلمرو در حال پخش است')}
          <button type="button" onClick={stopAudio}>
            {t('Stop audio', 'توقف صدا')}
          </button>
        </output>
      )}
      {audioError && (
        <output className="domain-audio-status">
          {t(
            'Audio unavailable. You can keep browsing.',
            'صدا در دسترس نیست. به کاوش ادامه دهید.',
          )}
          <button
            type="button"
            onClick={() => setAudioError(false)}
            aria-label={t('Dismiss audio message', 'بستن پیام صدا')}
          >
            <X size={16} aria-hidden="true" />
          </button>
        </output>
      )}
      {intro && (
        <dialog
          ref={introDialog}
          className="domain-intro"
          aria-labelledby="domain-intro-title"
          onCancel={(event) => {
            event.preventDefault();
            finishIntro();
          }}
        >
          <img
            src={withBasePath('/Sukuna-Domain-Expansion.svg')}
            width="1920"
            height="1080"
            alt=""
          />
          <div className="domain-intro-caption">
            <p lang="ja" aria-hidden="true">
              領域展開
            </p>
            <h2 id="domain-intro-title">
              {t('Domain Expansion', 'گسترش قلمرو')}
            </h2>
            <button type="button" ref={skipButton} onClick={finishIntro}>
              {t('Skip to mathematics', 'رفتن به ریاضیات')}
              <X size={18} aria-hidden="true" />
            </button>
          </div>
        </dialog>
      )}
      <footer className="site-footer" inert={intro || undefined}>
        <div className="footer-main">
          <Link className="footer-brand" href={href('home')}>
            ISE DOMAIN
            <span lang="ja" aria-hidden="true">
              領域
            </span>
          </Link>
          <p>
            {t(
              'Engineering, anime & Japanese industry. A personal field guide.',
              'مهندسی، انیمه و صنعت ژاپن؛ یک راهنمای شخصی.',
            )}
          </p>
          <a className="back-to-top" href="#top">
            {t('Back to top', 'بازگشت به بالا')}
            <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
        <div className="footer-meta">
          <p className="footer-credit">
            {t(
              'By Sina Rezaei · Industrial & Systems Engineering student',
              'اثر سینا رضایی · دانشجوی مهندسی صنایع و سیستم‌ها',
            )}
          </p>
          <nav
            className="footer-links"
            aria-label={t('Sina Rezaei links', 'پیوندهای سینا رضایی')}
          >
            <a
              href="https://github.com/sina-04"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sina-rezaei-062a30416"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a href="https://x.com/Sina_41148" target="_blank" rel="noreferrer">
              X
            </a>
            <a href="https://t.me/InfiniteSoA" target="_blank" rel="noreferrer">
              Telegram
            </a>
            <a href="mailto:sina.rezaei.04@gmail.com">{t('Email', 'ایمیل')}</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
