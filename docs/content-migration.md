# Content and asset provenance

The owner requested full local copies of their publicly published portfolio, articles, and posts, plus removal of links and branding for the former hosting platform. The source profile was https://peerlist.io/iburhan, observed on 21 November 2026. Source provenance belongs in this maintenance document, not the public interface.

Eight article bodies and original photos were captured from their rendered public article pages. Five project narratives and eight original gallery assets were captured from their public project pages. The UI Interaction Studies announcement graphic carried platform branding, so it was replaced with a native screenshot of the owner’s actual day-five demo at https://peerlist-ui-animation-challenge.pages.dev/day-5. That screenshot shows the working layout switcher and preserves the real product pixels.

154 complete public post bodies were recovered, including posts without upvotes/permalink links in the feed. The profile counter was156; two entries were not recovered. Third-party reading links and quoted-author credit remain. Exact post dates are included only where the public detail page supplied an absolute calendar date. Relative dates inform archive ordering without fabricated publication dates.

All production content is now editable Markdown. Raw source captures are local research files under ignored `.research/import/`; they are not runtime dependencies. `scripts/import-*.ts` are one-time migration helpers requiring those research captures. Do not rerun them over edited Markdown: the maintained content and refined galleries are now authoritative.

The previous generated abstract hero image and branded challenge artwork were removed. No synthetic product screenshot or portrait is used. Syne and Public Sans are self-hosted with their font licenses in `public/assets/fonts/`.
