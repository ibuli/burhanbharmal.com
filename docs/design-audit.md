> Superseded by the cinematic redesign. See [DESIGN.md](../DESIGN.md) and [verification.md](verification.md) for the current system and checks.

> Historical design/content audit from the initial static implementation. The current React SSR stack and asset paths are documented in [architecture.md](architecture.md) and the root README. Assets now live under `public/assets/`.

# Portfolio redesign audit

Audited on 21 November 2026.

## Sources and preservation

- Live domain: https://burhanbharmal.com, a Peerlist custom-domain profile.
- Profile: https://peerlist.io/iburhan
- Resume: https://burhanbharmal.com/resume and https://peerlist.io/iburhan/resume
- Posts: https://peerlist.io/iburhan/posts. Current profile shows 156 posts. This site imports six verified post previews and links to the complete live archive; it does not claim a complete or automatically synchronized feed.
- Articles: eight verified article titles, canonical links, dates, and previews from the public article index. The live profile no longer shows an Articles tab and the articles index currently redirects to Work. Individual published URLs remain the original reading destinations. An article library on this site preserves discoverability.
- Repository: legacy HTML/jQuery portfolio with yellow accent, Source Sans Pro/Roboto Slab, profile photo, contact details, downloadable PDF, and a 2018 archive. Live content is more current than the checkout.

The live site is a narrow single-column Peerlist layout with avatar, skills, Work / Resume / Posts navigation, five projects, and expandable experience. Green is an established accent. Existing SEO title identifies Burhan Bharmal and frontend engineering. The legacy OG links use HTTP.

Preserved current routes: /, /resume, /posts, and #about. The /2018/ archive was retired during the subsequent legacy cleanup. Work, Resume, and Posts nav labels are retained. Articles is additive. The legacy CV was originally retained; it was removed on 22 November 2026 for privacy, and /Burhan_Bharmal.pdf now returns 404. Contacts and social links come from existing public sources. No availability claims, testimonials, or invented performance metrics.

Six roles are included, including iFlair hidden behind Show All. The latest Lead role starts July 2026; the public headline still says Senior. Sequoia promotions have overlapping Present end dates. This site shows the verified start dates for earlier roles without inventing end dates. Current live resume says June 2021 for the first Sequoia role; cached search results say May. Current live source takes precedence. Three certifications are verified from the indexed resume; current custom-domain resume omits them.

## Direction

Redesign - overhaul. Audience: collaborators and hiring teams. A custom minimal engineering portfolio using native HTML/CSS and a small progressive-enhancement JavaScript layer. No runtime framework is needed for a content-led static site. DESIGN_VARIANCE 6, MOTION_INTENSITY 4, VISUAL_DENSITY 4. Geist is self-hosted under its SIL license. Graphite, off-white, and one forest-green accent; corresponding dark tokens. Soft 16px panels, 8px controls, circular avatar and theme switch under a consistent documented rule. Motion communicates entrance hierarchy and interaction feedback and respects reduced motion.

Real assets: existing Peerlist avatar, project logos, actual Arkive / Profile Pilot screenshots, SmartScout artwork. Images downloaded from public Peerlist CDN URLs observed on the corresponding project pages. Image file extensions were corrected to actual media formats.

Generated asset: assets/images/frontend-systems.jpg, made with the built-in image_gen tool and compressed for delivery. Prompt: “Refined conceptual 3D still life representing modular frontend systems: interlocking architectural forms, matte charcoal grooved slab, pale mint glass rectangular frame, polished dark green sphere, soft gray studio background, natural directional shadows, no text, no logos, no UI.” This is conceptual artwork, not a product screenshot.

## Publishing

This repository is the user's existing portfolio. No new Sites account/site or replacement custom-domain configuration is created. The changes are prepared for the existing hosting workflow. Deployment/DNS changes are outside the current implementation. Build output is dist; Vercel config serves preserved clean routes and a genuine 404.
