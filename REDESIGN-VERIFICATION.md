# Redesign verification

This is the initial redesign's historical report. See [REVISION-VERIFICATION.md](REVISION-VERIFICATION.md) for the subsequent user-requested purple palette, restored motion, and tree changes.

Verified 2026-11-01. Scope: the new overview, shared navigation/search/footer, theme tokens, and GitHub Pages export configuration. The underlying catalog and its source records are unchanged.

## Executed checks

- PASS: `npx tsc --noEmit`.
- PASS: scoped Oxlint on the authored application components and `lib`.
- PASS: `node scripts/validate-data.mjs`: 84 courses, 10 pathway groups, 77 tools, and 30 bilingual career profiles.
- PASS: production build with `GITHUB_PAGES=true` and `GITHUB_REPOSITORY=sina-04/ISE-Domain-JJK-Alt`; all 18 routes prerendered.
- PASS: `node scripts/prepare-github-pages.mjs`: 68 stylesheet references and 269 script references resolve in the built artifact.
- PASS: served the production artifact locally under `/ISE-Domain-JJK-Alt`, then tested the hydrated interface.

## Browser evidence

- English overview: no horizontal overflow at 320, 375, 768, 1024, and 1440px.
- Persian overview: no horizontal overflow at 375, 768, 1024, and 1440px; RTL layout and directional arrows inspected.
- All seven inner sections in both languages load with one H1 and no horizontal overflow at 375px, including the Data Science experience.
- Clicked every main navigation destination and all seven subject entries; each opens its corresponding URL.
- Global search: no-result message, filtered Differential Equations result, and course-dialog navigation verified.
- Curriculum: all three tabs, no-results/reset, course dialog, and Escape verified. Switching language retains content view and the search query.
- Tool search for Excel returns Microsoft Excel and Microsoft Excel Solver.
- Career guide for Data Analytics opens and closes with Escape.
- Mobile navigation opens, closes with Escape, and returns focus to its trigger.
- Theme controls switch and persist across document navigation. The final footer was inspected in both themes.
- Japanese industry previous/next controls change the principle. Content does not advance automatically.
- Effects are off by default. Opting in enables audio; Stop audio works. Mathematics opens a native modal with its skip button focused. Skip and Escape both open the mathematics catalog.
- No production console errors were recorded during the bilingual inner-route traversal. Earlier development-only errors from temporarily incomplete files were resolved before production verification.

## Design diagnostic

Final diagnostic: 0/10 for the authored overview. No generic tech gradient/hue, feature-tile grid, accent rails, unearned blur, monument statistics, icon toppers, center-stack composition, default font selection, or mismatched surface. The numbered subject directory is the primary browsing structure; its short introduction establishes the site's engineering/JJK context.

## Delivery gate

- R-02 PASS: new interface copy contains no em dashes; original catalog prose is retained as source content.
- R-03 PASS: viewport and bilingual route checks above found no horizontal overflow; mobile navigation and subject entries reflow.
- R-17 PASS: overview counts are derived from the catalog, and the 140-credit reference is the existing curriculum requirement.
- R-18 PASS: no testimonials or invented identities were added.
- R-23 PASS: artwork, identity, fonts, and destinations come from the existing site; no generated assets were introduced.
- R-24 PASS: every main navigation destination and subject entry was clicked successfully.
- R-25 PASS: new foreground/muted/accent token pairings were checked with the bundled contrast checker. Tested ratios: 6.88:1, 10.12:1, 5.09:1, 6.03:1, and 6.62:1. Dark/light layouts were inspected.
- R-26 PASS: changed controls have real links or handlers; navigation, search, tabs, themes, principle controls, audio stop, intro skip, and Escape were exercised.
- R-27 PASS: search/catalog empty states and reset were exercised; loading text and an audio-failure message are implemented.
- R-28 PASS: no FAQ was added.
- R-32 PASS: visible focus rules, a skip link, native links/buttons, existing accessible catalog dialogs, and a native modal are used; Escape and initial modal focus were tested.
- R-33 PASS: interface changes are authored in TSX and CSS; no runtime source-patching or generated CSS repair mechanism is used.
- R-34 PASS: dark and warm-paper light themes were visually checked, including the final corrected footer.
- R-35 PASS: production export was built, served, visually inspected, and exercised in the browser; detailed checks appear above.
- R-36 PASS: no new security, customer, market, or performance claims were introduced.
- R-37 PASS: `DESIGN.md` records the field-guide direction and ENERGY 2 / RHYTHM 3 / MOTION 1.
- R-38 PASS: original sourced catalog content is retained and no fictional product content was added.
- R-39 PASS: authored controls use semantic elements, names/state attributes, pointer and focus styles, visible search labels, and reduced-motion guards.
- R-40 PASS: authored images reserve space; the primary artwork is an HTML image with high fetch priority. No third-party scripts were added.
- R-01/R-07 PASS: no decorative page gradients or technical grid backgrounds. The artwork's local gradient exists only to keep its caption legible.
- R-04/R-06 PASS: existing fonts and utility icons are retained for the reasons recorded in `DESIGN.md`; decorative feature icons and emoji were removed from the new overview/chrome.
- R-08/R-09 PASS: arrows indicate drill-in navigation; there are no decorative pill badges or status dots.
- R-10/R-12/R-13 PASS: new content surfaces are solid and flat; shadows are reserved for overlay navigation/audio status. No decorative glow.
- R-14/R-19 PASS: subjects form a directory with a full-row core entry and peer rows; ordinary browsing has no automatic reveals or carousel motion.
- Liveliness PASS: the subject directory, next-step index, and industry note use distinct compositions; original JJK artwork, Japanese seals, and terracotta establish identity.
- C-1/C-2/C-3 PASS: major choices have written reasons, all new controls work, and sections map to existing content needs.
- C-4/C-5 PASS: responsive/theme states were exercised and new counts come from source data.
- R-05/R-11/R-15/R-16/R-20/R-21/R-29/R-30/R-31 PASS: directory-led structure, restrained control radii, specific actions, original site identity, supported themes, small token palette, and written decisions are recorded in `DESIGN.md` and visible in the saved screenshots.

## Limits

This is a scoped implementation review, not a comprehensive WCAG certification or field-performance measurement. Reduced-motion behavior was verified in CSS and the `matchMedia` branch in source; no physical phone, screen reader, browser zoom, or reduced-motion emulation session was run. Existing vendor components and the supplied artwork were not independently audited.

Local screenshots are under ignored `tmp/redesign/`; they are not needed for the deployed application.
