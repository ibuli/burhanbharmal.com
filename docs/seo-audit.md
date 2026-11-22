# SEO audit — 21 November 2026

Scope: local production build at localhost:4173, all 172 canonical sitemap URLs, and a read-only check of the current public homepage. The redesign has not been deployed. No Search Console account data or current field Core Web Vitals was available; rankings, index coverage, and rich-result eligibility were not certified.

## Implemented

- Replaced the header's `bb.` monogram with a recognizable full-name wordmark, also used in the footer. Home links retain an explicit accessible name.
- Fixed site-wide social previews previously showing an Arkive screenshot on unrelated pages. Project pages now use their own first screenshot; article pages use their own cover when supplied. Other pages use the personal avatar with a square summary card.
- Added explicit Twitter title, description, image, and image-alt metadata, Open Graph image-alt text, and article Open Graph types.
- Added available article covers to the existing BlogPosting schema. Publication dates remain original dates; no modification dates were invented.
- Converted project galleries into native scroll-snap carousels while retaining every original image, intrinsic dimensions, alt text, and full-size link in server-rendered HTML. First images load eagerly; later images load lazily.

## Verified locally

| Check                   | Result                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------ |
| Sitemap URLs            | 172 return HTTP 200                                                                        |
| Titles and descriptions | Present on every sitemap URL                                                               |
| Canonicals              | One HTTPS self-canonical on every sitemap URL                                              |
| Headings                | One H1 on every sitemap URL                                                                |
| Robots                  | No accidental noindex on sitemap pages; robots.txt permits crawling and references sitemap |
| Internal discovery      | All sitemap URLs reachable from homepage through rendered anchors                          |
| Article structured data | Eight valid BlogPosting JSON objects in SSR; representative rendered markup also inspected |
| Social images           | All 13 distinct image URLs return HTTP 200 locally                                         |
| Missing routes          | Existing SSR smoke suite confirms genuine HTTP 404s                                        |
| Mobile                  | Branding/carousel checked at 320px; no horizontal page overflow                            |

## Remaining priorities

### Before and after launch: public domain and indexing

The public homepage currently responds from the earlier Vercel-hosted profile, with its canonical pointing to `https://peerlist.io/iburhan`. This is a live-site observation, not the local redesign's canonical behavior. Deployment was explicitly deferred. Once the new site is deployed, verify HTTPS, preferred-host redirects, all important old URLs and their relevant permanent redirects, live robots/sitemap/canonicals, and then submit the sitemap in Search Console. Inspect important homepage, service, project, and article URLs there. A canonical is a signal; search engines choose their canonical after crawling.

### Medium: imported announcement titles and short posts

Five imported posts share the same generic announcement title. Give these descriptive titles that identify the article being announced, or decide whether they should remain standalone search landing pages. Preserve the original bodies and attribution. Many imported posts are short links or excerpts: assess their individual value before consolidating or changing indexing rules. No bulk deletion, noindex, or canonical changes were applied.

### Medium: search-result copy

Forty full page titles exceed 80 characters and 91 descriptions exceed 200 characters, mostly imported posts. These are editorial review candidates, not automatic technical failures. Front-load the subject and make descriptions specific. Google may generate a different snippet for each query; there is no fixed character count that guarantees display. Avoid truncating source titles or descriptions mechanically.

### After launch: performance and search evidence

Collect actual field Core Web Vitals and Search Console indexing/query data after deployment. The current local pass does not establish live LCP, INP, CLS, traffic, or rankings. Keep the business page focused on React product development and frontend engineering; grow original case studies and useful engineering articles rather than adding repetitive keyword pages.

## References

- [Google: canonical URL signals and best practices](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- [Google: writing useful descriptions and how snippets are chosen](https://developers.google.com/search/docs/appearance/snippet)
- [Google: Article structured data](https://developers.google.com/search/docs/appearance/structured-data/article)

Full local crawl evidence is retained in `.research/seo-audit.json`. The audit is an implementation and content review, not a promise of rankings.

## Image-viewer follow-up — 22 November

Original screenshot URLs remain real server-rendered anchors. With JavaScript, selecting one opens an in-page native modal viewer instead of a new page. The modal uses the View Transition API when supported, falls back to an immediate update, and skips transitions for reduced motion. This preserves discoverability of the original images.
