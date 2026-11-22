# Responsive review

Reviewed locally on 22 November 2026 using the in-app browser and the production SSR build.

## Coverage

The homepage was checked at 320, 360, 390, 430, 650, 768, 900, 1024, 1280, 1440, 1920, and 2560 CSS pixels, with an additional 3840 × 2160 wide-desktop check. Its content remains bounded at 1320px on the widest viewport.

After the email-layout fix, all eight page templates were checked at 320, 390, 768, 1024, and 1440px: 40 route/width combinations with no horizontal document overflow or internally clipped heading/paragraph containers. The results are in `.impeccable/review/responsive/layout-checks.json`.

| Template       | Representative route                                  |
| -------------- | ----------------------------------------------------- |
| Homepage       | `/`                                                   |
| Resume         | `/resume`                                             |
| Enquiry        | `/work-with-me`                                       |
| Articles index | `/articles`                                           |
| Posts index    | `/posts`                                              |
| Project detail | `/work/arkive`                                        |
| Article detail | `/articles/my-journey-with-cursor-ai`                 |
| Post detail    | `/posts/why-is-ai-slop-so-frustrating-to-read-pql8ln` |

The checks cover representative templates, not a visual inspection of every individual article, post, or project.

## Findings and fixes

At 320px, the email address in the footer and enquiry section lost its final character to a separate line because the copy button consumed the remaining width. Both flex rows now wrap; the copy button moves to a new row when necessary and stays aligned to the right. The complete address remains on one line at the default text size. Longer text can still wrap instead of overflowing.

## Interaction checks

- The smallest-phone header navigation and action controls retained at least 44px target heights.
- Enquiry inputs and selection controls at 320px use 16px text and 48–52px minimum heights. The textarea remains larger. Keyboard focus stays visible.
- The image viewer was checked at 320 × 568, 844 × 390, and 1024 × 768. All viewer controls stayed inside the viewport. Next-image navigation, zoom, Escape dismissal, and focus restoration to the last-viewed screenshot worked.
- The enquiry form was also checked at 844 × 390; controls remained within the viewport with no document overflow.
- Homepage portrait/landscape checks retain the shared navigation and content in normal document flow.

## Verification and limits

Bun lint, formatting, eight tests, production build, TypeScript, and SSR smoke checks passed. The design detector reported advisory token-documentation findings; no blocking findings were reported.

These are browser viewport and keyboard/pointer checks. They do not establish physical-device touch/swipe behavior, mobile keyboard behavior, browser zoom/text-spacing overrides, slow-device performance, or compatibility across physical iOS/Android devices and every browser engine. Existing reduced-motion styling remains unchanged. No additional claim of WCAG conformance is made.

Screenshots are saved in `.impeccable/review/responsive/`.
