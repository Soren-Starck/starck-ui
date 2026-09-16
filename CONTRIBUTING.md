# Contributing

STARCK UI stays intentionally small. Components belong here only when they have
already solved a real problem in a shipped product and are useful outside that
product.

## Before proposing a component

Open an issue with:

- the product and page where the component is already used;
- the reusable behavior it provides;
- screenshots or a short recording;
- any accessibility, responsive, browser, or reduced-motion considerations.

Generic components added only to make the library look complete are out of
scope.

## Pull requests

- Keep the public API small and typed.
- Preserve keyboard access, focus behavior, mobile layouts, and reduced motion.
- Make the preview demonstrate the exact configuration shown in its usage code.
- Put controls that change a component's appearance or behavior inside its
  preview surface.
- Avoid app-specific dependencies and private assets.
- Update generated registry files with `pnpm registry:build`.

Run the checks before opening a pull request:

```sh
pnpm typecheck
pnpm lint
pnpm build
```

Maintainers update product provenance and perform the release checks before a
deployment.
