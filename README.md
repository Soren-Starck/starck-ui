# STARCK UI

The components STARCK uses to ship software. This repository contains the
documentation site and public shadcn registry served at
[`ui.starck.studio`](https://ui.starck.studio).

## Development

```sh
pnpm install
pnpm dev
```

## Registry

Registry source lives in `registry/default`. Build the public item JSON after
changing a component:

```sh
pnpm registry:build
```

Components are added only after they have proved useful in a shipped STARCK
product.
