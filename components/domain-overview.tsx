'use client';
/* Supplied SVG artwork is preserved without raster optimization. */
/* eslint-disable @next/next/no-img-element */

import {
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from '@/components/site-link';
import {
  undergraduate,
  pathways,
  tools,
  careers,
  formatNumber,
} from '@/lib/catalog';
import { categories, type Locale } from '@/lib/domain-config';
import { withBasePath } from '@/lib/base-path';

const principles = [
  {
    seal: '改善',
    name: ['Kaizen', 'کایزن'],
    title: ['Small improvements. Real impact.', 'بهبودهای کوچک؛ تأثیر واقعی.'],
    copy: [
      'Kaizen connects everyday observation to better systems and turns ideas from your courses into practical improvements.',
      'کایزن مشاهده روزمره را به سیستم‌های بهتر پیوند می‌دهد و ایده‌های درسی را به بهبودهای عملی تبدیل می‌کند.',
    ],
  },
  {
    seal: '適時',
    name: ['Just-in-Time', 'تولید به‌موقع'],
    title: [
      'The right work, at the right moment.',
      'کار درست، درست در زمان نیاز.',
    ],
    copy: [
      'Just-in-Time connects inventory, production planning and demand so material moves with less delay and waste.',
      'تولید به‌موقع، موجودی، برنامه‌ریزی تولید و تقاضا را به هم پیوند می‌دهد تا مواد با تأخیر و اتلاف کمتر جریان پیدا کنند.',
    ],
  },
  {
    seal: '自働化',
    name: ['Jidoka', 'جیدوکا'],
    title: ['Make problems visible early.', 'مسئله را زودتر آشکار کنید.'],
    copy: [
      'Jidoka combines human judgment with automation: stop when something is wrong, learn from it, and protect quality.',
      'جیدوکا قضاوت انسانی را با خودکارسازی ترکیب می‌کند: هنگام خطا توقف کنید، از آن بیاموزید و از کیفیت محافظت کنید.',
    ],
  },
] as const;

export function DomainOverview({
  locale,
  onDomainClick,
  effectsControl,
}: {
  locale: Locale;
  onDomainClick: (
    event: MouseEvent<HTMLAnchorElement>,
    category: (typeof categories)[number],
  ) => void;
  effectsControl: ReactNode;
}) {
  const fa = locale === 'fa';
  const t = (en: string, per: string) => (fa ? per : en);
  const [principle, setPrinciple] = useState(0);
  const current = principles[principle];
  const language = fa ? 1 : 0;
  const href = (id: string) => `/${locale}/${id}`;
  const graduateCount = pathways.filter(
    (pathway) => !pathway.supporting,
  ).length;
  const destinations = [
    {
      id: 'majors',
      title: t('Graduate pathways', 'گرایش‌های کارشناسی ارشد'),
      copy: t(
        'Connect your courses to a specialization.',
        'درس‌ها را به یک گرایش تخصصی پیوند دهید.',
      ),
      detail: t(
        `${graduateCount} pathways`,
        `${formatNumber(graduateCount, locale)} مسیر`,
      ),
    },
    {
      id: 'careers',
      title: t('Career guide', 'راهنمای شغلی'),
      copy: t(
        'Find the work behind the degree.',
        'کار و مهارت‌های پشت این رشته را بشناسید.',
      ),
      detail: t(
        `${careers.length} profiles`,
        `${formatNumber(careers.length, locale)} راهنما`,
      ),
    },
    {
      id: 'tools',
      title: t('Tools & software', 'ابزار و نرم‌افزار'),
      copy: t(
        'Put what you learn into practice.',
        'آموخته‌ها را به عمل تبدیل کنید.',
      ),
      detail: t(
        `${tools.length} tools`,
        `${formatNumber(tools.length, locale)} ابزار`,
      ),
    },
    {
      id: 'resources',
      title: t('Reading room', 'کتابخانه'),
      copy: t(
        'Books, official guides and further reading.',
        'کتاب‌ها، راهنماهای رسمی و مطالعه بیشتر.',
      ),
      detail: t('Books & guides', 'کتاب و راهنما'),
    },
    {
      id: 'wikipedia',
      title: t('Concept library', 'کتابخانه مفاهیم'),
      copy: t(
        'Follow the ideas behind each course.',
        'مفاهیم هر درس را عمیق‌تر بشناسید.',
      ),
      detail: t('EN / FA', 'انگلیسی / فارسی'),
    },
  ];

  return (
    <div className="domain-overview">
      <div className="edition-line">
        <span>{t('A student’s field guide', 'راهنمای دانشجویی')}</span>
        <span>{t('Jujutsu Kaisen edition', 'نسخه جوجوتسو کایسن')}</span>
      </div>
      <section className="field-introduction" aria-labelledby="overview-title">
        <div className="field-introduction-copy">
          <p className="field-kicker">
            {t('Industrial & Systems Engineering', 'مهندسی صنایع و سیستم‌ها')}
          </p>
          <h1 id="overview-title">
            {t('See the system.', 'سیستم را ببینید.')}
            <br />
            <span>{t('Find your domain.', 'قلمروتان را بیابید.')}</span>
          </h1>
          <p className="field-description">
            {t(
              'People, data, decisions. Understand how they connect, from your first course to the work you want to do.',
              'انسان‌ها، داده‌ها، تصمیم‌ها. ارتباطشان را بشناسید؛ از نخستین درس تا کاری که می‌خواهید انجام دهید.',
            )}
          </p>
          <div className="field-actions">
            <Link className="primary-button" href={href('chart')}>
              {t('Open the curriculum', 'مشاهده برنامه درسی')}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link className="quiet-link" href={href('careers')}>
              {t('Find a career path', 'یافتن مسیر شغلی')}
            </Link>
          </div>
          <p className="curriculum-reference">
            {t(
              'Based on the 1403 curriculum · 140 degree credits',
              'بر پایه برنامه درسی ۱۴۰۳ · ۱۴۰ واحد دوره',
            )}
          </p>
        </div>
        <figure className="field-artwork">
          <img
            src={withBasePath('/JJK-all-in-one.svg')}
            width="960"
            height="640"
            fetchPriority="high"
            alt=""
          />
          <figcaption>
            <span lang="ja" aria-hidden="true">
              領域
            </span>
            <span>
              {t(
                'Different strengths. One connected world.',
                'توانایی‌های گوناگون؛ جهانی به‌هم‌پیوسته.',
              )}
            </span>
          </figcaption>
        </figure>
      </section>
      <section className="field-directory" aria-labelledby="directory-title">
        <div className="directory-heading">
          <div>
            <p className="section-index">
              <span className="section-number">{t('01 / ', '۰۱ / ')}</span>
              {t('The subject directory', 'فهرست حوزه‌ها')}
            </p>
            <h2 id="directory-title">
              {t('Choose your domain', 'قلمروتان را انتخاب کنید')}
            </h2>
          </div>
          <div className="directory-settings">
            {effectsControl}
            <span>
              {t('Audio & intro are optional', 'صدا و مقدمه اختیاری است')}
            </span>
          </div>
        </div>
        <div className="field-list">
          {categories.map((category, index) => {
            const count = undergraduate.filter((course) =>
              course.categories.includes(category.id),
            ).length;
            return (
              <Link
                key={category.id}
                href={`${href('chart')}?view=content&category=${category.id}`}
                onClick={(event) => onDomainClick(event, category)}
                className={`field-entry${index === 0 ? ' field-entry-core' : ''}`}
                style={
                  {
                    '--field-position': category.position,
                    '--field-mobile-position': category.mobilePosition,
                  } as CSSProperties
                }
              >
                <div className="field-entry-image">
                  <img
                    src={withBasePath(category.asset)}
                    width="640"
                    height="400"
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div className="field-entry-content">
                  <div className="field-entry-meta">
                    <span>
                      {formatNumber(index + 1, locale).padStart(
                        2,
                        fa ? '۰' : '0',
                      )}
                    </span>
                    <span>
                      {formatNumber(count, locale)} {t('courses', 'درس')}
                    </span>
                  </div>
                  <h3>{category.title[locale]}</h3>
                  <p>{category.caption[locale]}</p>
                  <span className="field-entry-action">
                    {t('View courses', 'مشاهده درس‌ها')}
                    <ArrowRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
        <p className="directory-footnote">
          {t(
            'Subjects overlap. A course can belong to more than one domain.',
            'حوزه‌ها هم‌پوشانی دارند؛ هر درس می‌تواند به بیش از یک قلمرو تعلق داشته باشد.',
          )}
        </p>
      </section>
      <section className="next-directory" aria-labelledby="next-title">
        <div className="next-introduction">
          <p className="section-index">
            <span className="section-number">{t('02 / ', '۰۲ / ')}</span>
            {t('Beyond the curriculum', 'فراتر از برنامه درسی')}
          </p>
          <h2 id="next-title">
            {t('Build your ', 'مسیر بعدی ')}
            <br />
            {t('next chapter.', 'خود را بسازید.')}
          </h2>
          <p>
            {t(
              'Follow a subject into a specialization, a career, or a tool you can use today.',
              'از یک موضوع به یک گرایش، مسیر شغلی یا ابزاری برسید که همین امروز به کارتان می‌آید.',
            )}
          </p>
        </div>
        <div className="next-destinations">
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              href={href(destination.id)}
              className="next-destination"
            >
              <span className="destination-number" aria-hidden="true">
                {formatNumber(index + 1, locale).padStart(2, fa ? '۰' : '0')}
              </span>
              <div>
                <h3>{destination.title}</h3>
                <p>{destination.copy}</p>
              </div>
              <span className="destination-detail">{destination.detail}</span>
              <ArrowRight size={19} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>
      <section className="industry-note" aria-labelledby="industry-title">
        <div className="industry-seal" lang="ja" aria-hidden="true">
          {current.seal}
        </div>
        <div className="industry-copy" aria-live="polite" aria-atomic="true">
          <p className="section-index">
            <span className="section-number">{t('03 / ', '۰۳ / ')}</span>
            {t('Notes from Japanese industry', 'یادداشت‌هایی از صنعت ژاپن')} ·{' '}
            {current.name[language]}
          </p>
          <h2 id="industry-title">{current.title[language]}</h2>
          <p>{current.copy[language]}</p>
          <Link
            className="quiet-link"
            href={`${href('resources')}?topic=japan`}
          >
            {t('Read about Japanese industry', 'مطالعه درباره صنعت ژاپن')}
          </Link>
        </div>
        <div className="principle-controls">
          <button
            type="button"
            onClick={() =>
              setPrinciple(
                (principle + principles.length - 1) % principles.length,
              )
            }
            aria-label={t('Previous principle', 'اصل قبلی')}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <span
            aria-label={t(
              `Principle ${principle + 1} of ${principles.length}`,
              `اصل ${formatNumber(principle + 1, locale)} از ${formatNumber(principles.length, locale)}`,
            )}
          >
            {formatNumber(principle + 1, locale)} /{' '}
            {formatNumber(principles.length, locale)}
          </span>
          <button
            type="button"
            onClick={() => setPrinciple((principle + 1) % principles.length)}
            aria-label={t('Next principle', 'اصل بعدی')}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}
