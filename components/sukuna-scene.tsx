import type { CSSProperties } from 'react';
import { withBasePath } from '@/lib/base-path';

const embers = Array.from({ length: 56 }, (_, index) => ({
  x: `${(index * 37 + 11) % 101}%`,
  base: `${2 + ((index * 17) % 35)}%`,
  size: `${2 + (index % 4)}px`,
  delay: `${-((index % 14) * 0.29)}s`,
  duration: `${2.4 + (index % 7) * 0.34}s`,
  drift: `${(index % 2 === 0 ? 1 : -1) * (18 + (index % 5) * 11)}px`,
  rise: `${42 + (index % 6) * 9}vh`,
  color: ['#ff2f12', '#ff6a16', '#ff9d18', '#ffd34d'][index % 4],
}));

export function SukunaScene() {
  return (
    <>
      {/* The supplied SVG is the original full-screen artwork. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={withBasePath('/Sukuna-Domain-Expansion.svg')}
        width="1920"
        height="1080"
        alt=""
        aria-hidden="true"
      />
      <div className="sukuna-lights" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="sukuna-embers" aria-hidden="true">
        {embers.map((ember, index) => (
          <span
            key={index}
            style={
              {
                '--ember-x': ember.x,
                '--ember-base': ember.base,
                '--ember-size': ember.size,
                '--ember-delay': ember.delay,
                '--ember-duration': ember.duration,
                '--ember-drift': ember.drift,
                '--ember-rise': ember.rise,
                '--ember-color': ember.color,
              } as CSSProperties
            }
          />
        ))}
      </div>
      <div className="sukuna-reveal" aria-hidden="true" />
      <div className="sukuna-subtitles" aria-hidden="true">
        <p className="sukuna-subtitle sukuna-subtitle-domain">
          <span lang="en">Domain Expansion</span>
          <span lang="ja">領域展開</span>
        </p>
        <p className="sukuna-subtitle sukuna-subtitle-shrine">
          <span lang="en">Malevolent Shrine</span>
          <span lang="ja">伏魔御廚子</span>
        </p>
        <p className="sukuna-subtitle sukuna-subtitle-open">
          <span lang="en">Open!</span>
          <span lang="ja">開</span>
        </p>
      </div>
    </>
  );
}
