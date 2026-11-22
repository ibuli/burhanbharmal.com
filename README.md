# Burhan Bharmal’s portfolio

A React portfolio with TanStack Start SSR, strict TypeScript, Tailwind CSS v4, Markdown articles, and Cloudflare Workers deployment. A cinematic homepage leads into immersive project galleries, a complete resume, full articles, and a searchable notebook.

## Develop

Use Bun 1.3.14 (pinned in `.bun-version` and `packageManager`). Node 24 remains the runtime for Vite/Wrangler CLI tools that use a Node shebang; package installation, project commands, TypeScript content scripts, and tests use Bun.

```sh
bun install --frozen-lockfile
bun run dev
```

Open http://localhost:4173. The Cloudflare Vite plugin runs server code in the local Workers runtime. Markdown edits regenerate the content index and reload the browser. React routes support typed navigation and scroll restoration.

```sh
bun run format       # Oxfmt
bun run lint         # Oxlint, including React/a11y/TypeScript rules
bun run test             # Content validation, sanitization, publishing boundaries
bun run check        # Formatting, lint, tests, production build, TypeScript
bun run preview      # Preview the production build in Workers
bun run test:ssr     # HTTP smoke checks against the running preview
```

Vite is intentional: Cloudflare’s current official TanStack Start integration does not support Rsbuild. This tradeoff was approved during setup. See the [Cloudflare framework guide](https://developers.cloudflare.com/workers/framework-guides/web-apps/tanstack-start/).

## Write an article

Copy `content/templates/post.md` to `content/blog/your-url-slug.md`. The filename becomes `/articles/your-url-slug`. Use quoted ISO dates in frontmatter:

```yaml
---
title: 'A concrete article title'
date: '2026-11-21'
description: 'A short description for the library, search, RSS, and social sharing.'
topic: 'Engineering'
status: 'draft'
---
```

Write the full article below frontmatter. Set `status: "published"` when ready. Drafts and future-dated posts are excluded from public output. Scheduled content appears after the first build on or after its publication date; it does not publish itself without a new build. Run `bun run content` to validate metadata and generate indexes, RSS, sitemap, and robots.txt.

The Markdown compiler supports GFM tables, lists, fenced code, images, and links. It strips raw HTML and sanitizes generated markup and unsafe URL protocols. It executes no MDX. Blog bodies are compiled at build time, bundled on the server, and fetched with a validated TanStack server function. Workers do not read the filesystem at runtime. Full bodies are absent from the client metadata index.

Eight complete articles and 154 retrievable public posts were migrated to local Markdown, including original article photos and available uploaded post images. The profile counter showed 156 posts; two entries were not recovered from the public archive. No fabricated replacement content was added. The former platform’s profile links, hosted-content links, preview labels, and promotional branding have been removed from the interface. Shared reading still links to its actual authors and sources. There is no runtime dependency on that platform and no automatic scraping or sync.

## Write a short post

Add `content/posts/your-url-slug.md` with `title`, `description` (240 characters maximum), `topic`, `status`, and numeric `order` frontmatter. Lower `order` appears first. An exact ISO `date` and `attribution` are optional; historical posts with only relative source dates intentionally omit an invented exact date. Set `status: published` to include it. Full bodies render at `/posts/your-url-slug`. Articles remain at `/articles/your-url-slug`.

Project narratives are Markdown in `content/work/`; project metadata and ordered screenshot galleries are in `data/portfolio.json`. Maintain both when adding a project. The compiler regenerates server-only HTML from all three content collections. The development watcher reloads changes in any collection.

The committed `bun.lock` is the only package lockfile. CI installs with `bun install --frozen-lockfile`. Tests run with Bun’s native test runner; no `tsx` loader is needed.

## Portfolio content and source

- `data/portfolio.json`: profile, five projects, six roles, education, certifications, and skills.
- `content/blog/*.md`: article source of truth.
- `src/routes/`: typed routes and route-specific metadata.
- `src/components/`: shared React components and isolated interactive controls.
- `src/styles.css`: cinematic design tokens and bespoke styling, with Tailwind v4 utilities.
- `src/server.ts`: SSR request handling and response security headers.
- `public/`: current images, font licenses, favicons, and generated feeds.
- `scripts/content.ts`: validated Markdown and feed generation.
- `src/generated/`: generated content, ignored by Git; run content generation before a standalone type check on a fresh checkout.
- `src/routeTree.gen.ts` and `worker-configuration.d.ts`: generated routing and Worker types. Regenerate Worker types with `bun run cf:typegen` after binding/configuration changes.

The retired PDF was removed for privacy; `/Burhan_Bharmal.pdf` returns 404. The current resume shows a disabled “Download resume” placeholder until the intended PDF is supplied; it does not offer a Print action. The retired 2018 archive, legacy HTML/CSS/JavaScript, static build tooling, and one-time content importers have been removed. `/2018/` returns 404; Markdown content is maintained directly.

## Business and reading journeys

`/work-with-me` explains three engagement types and the proposed collaboration process. `src/lib/services.ts` maintains that offer. The enquiry form validates required fields and prepares a `mailto:` draft for a visitor to review and send in their own email app. It does not submit to a server or send email automatically. Fields are disabled until hydration so an unhandled native form cannot put enquiry details into a URL. Direct email and copy-address remain available.

The Arkive and Profile Pilot narratives now include problem, role, scope, engineering considerations, and delivered capability. Original launch notes remain below the case studies. Compact case metadata is in `data/portfolio.json`; narrative source remains Markdown.

`src/lib/editorial.ts` maintains the curated starting articles and topic-based recommendations. Published article headings compile to unique anchors and outline metadata for an in-page contents list. Article footers include an author introduction, related reading, RSS, and a relevant project-enquiry link. No email subscription or analytics provider is configured by this implementation.

## Cloudflare deployment

```sh
bunx wrangler login
bun run deploy
```

`bun run deploy` runs the complete check, publishes the portfolio Worker, then publishes the small www redirect Worker. `bun run deploy:dry-run` validates packaging without publishing (build first). `wrangler.jsonc` configures the portfolio at `burhanbharmal.com`; `wrangler.redirect.jsonc` configures `www.burhanbharmal.com` as a permanent HTTPS redirect preserving paths and queries. The redirect Worker has no static assets so it redirects image and file URLs too. `wrangler.jsonc` is the application source configuration; the official Vite integration generates `dist/server/wrangler.json` and a deployment redirect automatically. Do not hand-edit generated configuration. Observability, source maps, and Node compatibility are enabled. No database, storage service, or account login is needed by the portfolio.

Production deployment requires a current Cloudflare login and an active `burhanbharmal.com` zone in that account. Both custom domains are configured in Wrangler, so deployment binds them and creates their Cloudflare DNS/certificates. Confirm the zone and remove conflicting website records before deployment. The independent `profile.burhanbharmal.com` Peerlist mapping is not managed by these Workers. See `docs/deployment.md` for the release procedure and current status.

GitHub Actions runs quality checks for pushes and pull requests. A separate, manual “Deploy to Cloudflare” workflow targets the `production` environment. Configure `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` as repository/environment secrets to use it; never commit credentials. Protect the production environment if deployment approval is desired.

## Verification

`bun run check`, Cloudflare deployment dry run, and production-runtime HTTP smoke checks passed locally. Browser checks cover hydration, typed client navigation, article loading, search, mobile layout, and themes. See `docs/verification.md` for current results and limitations. Initial static-site Lighthouse results in the design history do not represent this SSR implementation.

## Branding and sharing

`bun run content` also runs `scripts/brand-assets.ts`. It renders the custom B monogram as SVG, ICO, Apple and Android icons, and creates a 1200 × 630 JPEG social card for every published route. Article/project cards retain actual cover imagery. Lettering uses the self-hosted Syne and Public Sans fonts converted to paths. Cards use content-hashed filenames and are regenerated in `public/assets/social/` (ignored); route metadata is generated in `src/generated/social-images.json`. No runtime image service, credentials, or client JavaScript is required for sharing previews.

After deployment, existing posts may retain a platform-cached preview. LinkedIn Post Inspector or Facebook Sharing Debugger can request a fresh crawl; previously shared messages may keep their original card.
