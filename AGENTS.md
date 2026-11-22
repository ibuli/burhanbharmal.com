# Agent guidelines

## Project conventions

- Use Bun for dependencies and scripts. The maintained app uses React, TanStack Start, Vite, Tailwind CSS v4, and Cloudflare Workers.
- Maintain articles, posts, and project narratives directly in `content/` Markdown. Keep current site code in `src/` and published assets in `public/`.
- Do not restore the retired HTML/jQuery site, 2018 archive, or one-time import scripts.
- Use “Lead Engineer” as the current title. Keep resume download disabled until the intended PDF is supplied.
- Run `bun run check` for code changes and `bun run test:ssr` against a production preview when routes or public assets change.
- Preserve unrelated working changes. Do not commit, push, or rewrite Git history unless requested.

## Public repository security

- Never commit or print credentials, private keys, OAuth files, local environment values, deployment logs, or private audit data. Use provider secrets and placeholder values in examples.
- Review changed files, public assets, documents, and staged changes for sensitive data before publishing. Keep local research and audit output ignored.
- Cloudflare account IDs, zone IDs, Worker names, and public hostnames are identifiers, not authentication secrets.
- If a credential is found, report its location without exposing its value, remove it from current files, and flag provider-side revocation or rotation. Deleting code does not revoke credentials or remove historical copies.
- Security checks belong in agent review for this project. Do not add security CI workflows or scanner configuration unless explicitly requested.

<!-- agentmemory:start -->

## Agent memory (agentmemory)

You have persistent long-term memory via the agentmemory MCP server. Tools: `memory_recall`, `memory_smart_search`, `memory_save`, `memory_sessions`.

- At the START of a task, call `memory_recall` (or `memory_smart_search`) with the task context to load relevant past decisions, fixes, and preferences before asking the user to repeat anything.
- When you learn something durable (a decision, a fix, a gotcha, a user preference, a project convention), call `memory_save` to persist it.
- Prefer recalling over re-deriving, and save concise reusable facts rather than transcripts.

<!-- agentmemory:end -->
