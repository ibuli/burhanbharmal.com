# Production deployment

## Hosts

- `burhanbharmal.com`: the React/TanStack Start portfolio Worker, `burhanbharmal-portfolio`.
- `www.burhanbharmal.com`: `burhanbharmal-www-redirect`, a small asset-free Worker that issues HTTP 308 redirects to the HTTPS apex, preserving the path and query string.
- `profile.burhanbharmal.com`: independent Peerlist hosting. This hostname and its verification records are not managed by the portfolio Workers.

GoDaddy remains the domain registrar. The domain delegates DNS to `lloyd.ns.cloudflare.com` and `marlowe.ns.cloudflare.com`.

## Release

Use a Cloudflare account that owns the active `burhanbharmal.com` zone. Authenticate without sharing credentials in chat:

```sh
bunx wrangler login
bunx wrangler whoami
```

Review existing DNS for the apex and www before deployment; do not remove unrelated subdomain, email, or verification records. Custom Domains create their DNS records and certificates. Cloudflare will reject conflicting CNAMEs; review any existing target before replacing it.

```sh
bun run deploy
```

The script runs all checks, deploys the portfolio through the Vite-generated configuration, and deploys the separate www redirect from `wrangler.redirect.jsonc`. Both hosts are declared as exact Custom Domains, with no wildcard that could intercept `profile`.

To check packaging without publishing, first build, then run:

```sh
bun run build
bun run deploy:dry-run
```

## Post-deployment verification

```sh
PORTFOLIO_ORIGIN=https://burhanbharmal.com bun run test:ssr
curl -I 'https://www.burhanbharmal.com/articles/my-journey-with-cursor-ai?ref=profile'
curl -I 'https://www.burhanbharmal.com/assets/images/avatar.jpg'
```

The two www requests should return 308 and preserve the path/query in the Location header. Check the root, resume, articles, posts, project detail, static assets, robots, RSS, sitemap, and genuine 404s. Inspect the public homepage in a browser after DNS and TLS are ready. Never report a dry run as a deployed site.

## Current status

Deployed on 22 November 2026 to the Cloudflare account owning the active domain zone.

- Portfolio version: `0ee5a8e8-b766-436b-9cae-7c61af7568d1`.
- WWW redirect version: `3dc1aa4b-a3a5-4361-98ec-1405e021cf32`.
- Working deployment URL: `https://burhanbharmal-portfolio.iburhan.workers.dev`.
- Both exact Custom Domain bindings were deployed successfully. The portfolio does not intercept `profile.burhanbharmal.com`.

Local checks (9 tests, lint, formatting, build, TypeScript), both packaging dry runs, and local Workers-runtime redirect checks passed. The complete SSR smoke suite passed against the public workers.dev URL. It also passed for the apex using curl's DNS override to the authoritative Cloudflare address, retaining normal TLS certificate validation. Live www checks for the root, an article/query string, and an image URL returned the correct HTTP 308 redirects.

At release verification, the .com registry and authoritative Cloudflare DNS showed the new delegation/records, while the local recursive resolver and browser still reached Vercel's old `76.76.21.21` target and returned `DEPLOYMENT_NOT_FOUND`. This is a nameserver/DNS cache propagation limitation, not a failed Cloudflare deployment. Use the workers.dev URL while caches refresh. No OS DNS configuration was changed to hide the propagation state.

## Privacy follow-up

On 22 November 2026 the retired `/Burhan_Bharmal.pdf` asset was removed with user approval because it contained a phone number. Portfolio version `9f66e95b-08fb-482b-9f00-1a11b603fc41` was deployed. The updated SSR smoke checks passed on the public Worker URL, and the retired URL returned 404 through the Cloudflare edge.
