<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## STARCK UI product rules

- Essentialism is a product constraint. Add a component only after a real
  STARCK product has proved it useful; do not add speculative primitives,
  placeholder catalogue sections, fake metrics, or decorative marketing filler.
- A component preview and its Usage code must always match. Treat this as a
  golden rule: drive both from the same canonical example data instead of
  maintaining two independent versions that can drift.
- Previews must expose the behavior that makes a component valuable. If motion,
  scrolling, hover, keyboard use, or responsive behavior matters, the preview
  must let a visitor exercise it directly.
- Controls that change a component's appearance or behavior belong inside the
  preview surface. Keep documentation controls such as Preview/Source and
  install actions outside it.
- The documentation app uses raw shadcn components from the configured preset.
  STARCK UI registry components remain source-owned and independent of the docs
  shell.
- Before every production deployment, run `pnpm provenance:update`, review and
  commit any generated provenance change, then deploy only through
  `pnpm run deploy`.
  The deploy lifecycle blocks stale provenance and any worktree drift.
