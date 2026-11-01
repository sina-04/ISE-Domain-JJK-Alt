# ISE Domain: JJK field guide

Primary surface: Explore. Students browse a bilingual engineering catalog, then inspect a course, pathway, tool, or career. Inner detail pages use an Inspect surface.

Direction: a Japanese-inspired JJK field guide using the user's palette: #10002b, #240046, #3c096c, #5a189a, #7b2cbf, #9d4edd, #c77dff, #e0aaff. Retain citations, local fonts, English/Persian support, URL filters, and theme preference. Dark layers use the deeper purples; pale neutral surfaces and deeper purple text support light-mode reading.

ENERGY 2 / RHYTHM 3 / MOTION 2. The full Sukuna sequence is an explicitly requested cinematic exception to ordinary interface timing.

## Decisions

- Composition: an introduction with a separate artwork plate leads into a numbered subject directory; visitors get context without burying the browsing task.
- Subject hierarchy: Industrial Engineering Core occupies a full row because it anchors the discipline; the remaining peer subjects use a two-column directory with readable image-and-text entries.
- Supporting navigation: graduate, career, tool, and reading destinations form compact editorial rows because their value is a destination, not an icon or a statistic.
- Color: the eight supplied purples define surfaces, borders, text, and active controls; contrast-checked pale neutrals support long reading. Original illustration and cinematic fire colors remain intact.
- Type: retain Barlow Condensed for compact engineering headings, Manrope for Latin reading, and Sahel with Vazirmatn Persian digits for Persian legibility; no new font families.
- Spacing: 4/8px scale, mobile gutters, and larger section breaks distinguish the subject directory from supporting material.
- Shape: small radii distinguish controls; 14px anime-image corners soften the artwork without changing its layout. Each career domain has a filled 16px-radius box enclosing its local tree and role guides.
- Imagery: use only supplied JJK artwork, with reserved image space and no blur; illustrations identify the user's established subject domains.
- Icons: use the requested Twemoji factory SVG as the website logo and favicon, restore the original SVG social marks, and retain Lucide glyphs for utility controls. The factory graphic is attributed in README and its license is bundled.
- Arrows: use horizontal arrows for the directory's drill-in destinations, not beside every label.
- Theme: retain the dark default with a pale-purple light theme. The new theme expands radially from the clicked toggle; rapid clicks are guarded until the 520ms transition finishes.
- Motion: offscreen sections fade in once over 420ms with a 16px lift to establish scroll progression. Existing visible content is immediate, keyboard focus reveals its section, and reduced motion bypasses these effects. Japanese principles stay manually controlled.
- Sukuna: restore the full 23-second wallpaper, fire, subtitle, and circular-reveal sequence with its original audio. Effects default on for the revised experience, can be switched off, and have a focused skip control and Escape support. Reduced motion bypasses the cinematic sequence.
- Trees: Mathematics uses the user's four branches and 14 existing course IDs; Industrial/Manufacturing contains Maintenance and Repair and Production Planning. The new maintenance guide has an explicit unrated AI-exposure state.
- Japanese seal: a 136px square desktop frame accommodates the three-character principle; smaller layouts use a larger frame than the original mobile design.
- Data: counts come directly from the typed catalog. Subject counts overlap and are labeled accordingly. The 140-credit reference comes from the existing curriculum.

## Responsive behavior

- Small screens: compact brand/actions, full-width labeled search, expandable text-labeled navigation, stacked introduction, single-column subjects and destinations.
- Intermediate widths: split introduction only once text and image can fit; subjects use two columns at their readable minimum width.
- Large screens: persistent seven-destination navigation, text/art composition, full-width core subject, split next-step section.
- Both locales use logical spacing and RTL-aware directional controls. Links remain real document destinations.

## Design audit

Baseline diagnostic: 4/10. Tells: repeated feature tiles, unearned blur, monument statistics, and a landing-page composition used for a browsing surface.

The revised composition removes these four patterns. Final evidence is recorded in the verification report after browser checks.
