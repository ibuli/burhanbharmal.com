# Portfolio architecture

Bun 1.3.14 manages packages, scripts, and native tests. React and TanStack Start provide SSR, typed file routes, client navigation, and validated GET server functions. Vite uses the official Cloudflare Workers integration; the user explicitly approved Vite in place of Rsbuild. Tailwind CSS v4, semantic CSS, Oxfmt, and Oxlint complete the build tools.

## Content

`data/portfolio.json` holds the profile, career, education, certifications, skills, and project metadata/galleries. `content/blog/`, `content/posts/`, and `content/work/` hold complete Markdown articles, short posts, and project narratives. Articles require exact publication dates. Short posts allow omitted dates when the source supplied only relative dates; their explicit numeric order controls the archive.

At build time, Zod validates metadata and publication boundaries; unified renders GFM and sanitized HTML. Local image dimensions are added to the compiled markup to reserve layout space. Raw HTML and executable MDX are disabled. Drafts and future dates do not enter public output. Metadata is bundled for libraries and search; complete bodies remain server-only. Three validated server functions retrieve article, post, and project bodies without runtime filesystem access. RSS contains articles; sitemap contains all public content routes.

The migration recovered eight full articles, 154 public posts, and five project narratives, with original photos and project galleries. The old profile counter reported 156 posts; two were not recovered. There is no runtime feed or dependency on the former publishing platform. References to shared reading retain real source links and attribution.

## Presentation

Syne display type and Public Sans body type are self-hosted. The homepage combines real screenshots, an oversized identity, varied project stages, and isolated Motion scroll transforms. CSS handles entrances and control feedback. Mobile and reduced-motion styles remove screenshot transforms. Native scrolling and normal links remain in control. Articles and posts render as still reading surfaces; libraries use local search/filter state. Both themes share the same hierarchy. See the current DESIGN.md for extracted tokens.

## Runtime and delivery

Cloudflare Workers serves SSR; static files live in `public/`. SSR documents use no-store and response security headers. Static responses use `_headers`. Route errors, missing content, pending navigation, and empty searches have dedicated states. The current resume groups career history by employer and shows a disabled download placeholder pending the intended PDF. It has no Print action. The legacy site, 2018 archive, and one-time import tooling have been removed. Markdown files are the maintained content source. The retired PDF has been removed for privacy, and its old URL returns 404.

No database, account system, global state store, or CMS is needed. Content is versioned in Git. CI installs the frozen Bun lockfile and runs checks; deployment is a separate manual workflow. Credentials are not committed. The user deferred Cloudflare login, deployment, and domain reconnection.
