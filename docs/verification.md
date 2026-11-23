# Cinematic portfolio verification

## Current status — 23 November 2026

The portfolio has been deployed to Cloudflare Workers. The earlier login/deployment deferrals below describe historical review passes. The current sharing update passes 13 tests, lint, formatting, the production build, type checking, deployment packaging, and representative live SSR/crawler checks. The homepage title is “Burhan Bharmal”; original article dates and author metadata are present without inventing homepage publication dates. All 172 social cards are generated at build time.

## Earlier verification record

Checked 21 November 2026 against the local production Workers preview at http://localhost:4173.

- `bun run check` passed: Markdown generation, Oxlint with zero warnings, Oxfmt, four native Bun content tests, production React/Workers build, and strict TypeScript.
- The content tests cover invalid dates and covers, GFM/code support, script and unsafe-link sanitization, draft/future publication boundaries, server-only full bodies, post attribution, and sitemap inclusion.
- Exact complete-body SSR comparisons passed for all 167 content routes: eight articles, 154 posts, and five projects. Local-link and asset validation passed across 171 route destinations with no broken references.
- Production HTTP smoke checks passed for main pages, full article and post bodies, a project narrative, RSS/sitemap/robots, fonts, and genuine 404s (including the retired archive and PDF URLs) for unknown routes and missing content.
- Browser checks covered direct and hydrated client navigation, project galleries, full articles and posts, article/post search, empty-state recovery, light/dark switching, and screenshot scrolling. No browser console errors were observed.
- At a 320px CSS viewport, home, posts, resume, and project pages had no horizontal overflow or failed loaded images. Article and post reading were checked at 390px. The native screenshot API omits browser gutters, so image canvas widths are narrower than CSS viewport widths; no screenshot was rescaled.
- Cloudflare packaging dry run passed. No authentication, publication, DNS, or domain change occurred.

The imported archive contains the complete text of 154 retrievable public posts; two entries from the source counter were not recovered. Dates supplied only relatively were not converted into invented exact publication dates. Shared writing retains attribution.

Earlier Lighthouse scores describe the superseded minimal design. They are not claimed for this redesign. Actual printer output, hosted CI, and production field performance were not exercised. The reduced-motion path is implemented in both Motion and CSS; OS-level reduced-motion preference emulation was not available in the browser test harness.

No commit or push was performed. Existing staging was preserved. Deployment remains deferred until the user refreshes their Cloudflare login.

The independent visual review scored both requested hierarchy/documentation fixes resolved, with a ship disposition for that correction pass. DESIGN.md and .impeccable/design.json describe the implemented system.

## Header and footer refinement

The shared header now stays available during scrolling, tracks project/article/post parent sections, and provides a 240ms shared navigation highlight. Keyboard focus and reduced-motion use immediate positioning. The footer adds a direct mail action, visible email with copy feedback, grouped internal/social navigation, and a working return-to-top anchor.

Browser checks confirmed clipboard success feedback, return-to-top at scrollY0, sticky header at top0 while scrolled, parent-section state, Tab/Enter navigation and visible focus, light/dark icon switching, and no horizontal overflow at320/768/1440 CSS pixels. Console errors were absent. Navigation and icon controls have44px touch targets. The clipboard-denial message is implemented but permission denial was not simulated. Independent visual review approved the local extension; DESIGN.md and its sidecar were refreshed for the new controls.

## Business enquiries and reading journeys

The accepted cinematic identity now includes explicit React/product positioning, a Work with me page with three engagement types and a proposed process, stronger Arkive and Profile Pilot case studies, and curated/related reading. Original launch notes remain in Markdown. The enquiry flow prepares a local email draft for explicit opening and sending in the visitor’s own email app; no automatic submission or delivery is claimed.

Eight tests pass, including query-safe mailto construction, topic-ranked recommendations, unique safe heading anchors, and disabled server-rendered enquiry controls before hydration. Production build, lint, formatting, strict types, SSR smoke tests, and Cloudflare packaging dry run passed. All 167 content routes passed complete-body SSR comparisons; 172 local destinations and asset references passed link checks.

Browser checks verified the homepage-to-enquiry flow, native required-field validation, draft invalidation after editing, focus handoff to Open email draft, empty URL query, article contents anchors, author/related-reading paths, and no horizontal overflow on home, enquiry, case-study, and article routes at320px. Mobile form controls use16px text. Final production checks found zero browser console errors. No email was sent by the test.

A misnamed SVG project overview asset was corrected to its real file type and gallery images now carry intrinsic dimensions. Static design detection exited0 with advisory literal-type/local-stage-color documentation drift; it was not claimed as advisory-free. The independent visual review approved this scoped extension with no material fixes. DESIGN.md and the sidecar record the new form and editorial patterns. Deployment remains deferred.
