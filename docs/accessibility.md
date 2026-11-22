# Readability and accessibility checks

Checked locally on 21 November 2026. This is a focused manual review, not a full WCAG conformance audit or assistive-technology certification.

## Changes

- Supporting text, navigation, labels, metadata, skills, and footer links use a 1rem (16px at the default root size) minimum. Narrow breakpoints retain these sizes.
- Body copy and article prose use 1.125rem (18px), with generous line height. Font sizes remain relative to the visitor's root size.
- Footer text uses the primary foreground over the continuous artwork.
- Form field boundaries use the muted foreground token instead of the faint divider token.
- Footer navigation and the mobile signature reflow to accommodate larger text.

## Evidence

Browser inspection at 320px found no horizontal document overflow, sampled text below 16px, or missing image alt attributes on the homepage, contact page, resume, article index, post index, Arkive case study, and Cursor AI article. Homepage reflow was also checked at 768px and 1440px. Light and dark themes were inspected.

The keyboard skip link becomes visible on Tab; Enter transfers focus to the main landmark. Tabbing between name and email fields produces the existing solid 2px focus outline. Navigation and footer links retain 44px minimum heights; form fields retain 48px minimum heights. Existing reduced-motion styles remain in place.

Computed palette contrast ratios (WCAG relative-luminance calculation):

| Pair                      | Light   | Dark    |
| ------------------------- | ------- | ------- |
| Primary text / background | 13.50:1 | 15.16:1 |
| Muted text / background   | 5.24:1  | 8.15:1  |
| Muted text / surface      | 4.73:1  | 6.98:1  |
| Accent / background       | 5.76:1  | 8.96:1  |
| Accent / surface          | 5.20:1  | 7.67:1  |

For the replacement pencil sketch (22 November), footer primary text remains at least 4.54:1 in light mode and 5.59:1 in dark mode even using a conservative pure-black / pure-white artwork bound at the configured 42% / 30% opacity. These calculations cover site text, not text inside original product screenshots or third-party content.

Screenshots are under `.impeccable/review/readability/`. Automated validation: Bun checks (lint, formatting, eight tests, build, TypeScript) and local SSR smoke test passed. No screen-reader session or browser zoom/text-spacing override test was performed in this pass.
