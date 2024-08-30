# <img src="./assets/icons/teams.png" width="50px" /> Teams SDK: Javascript

a suite of packages used to build on the Teams Platform.

[Documentation](./docs/README.md)

## Why?

Building agents and bots for Microsoft Teams can often involve a lot of boilerplate code and managing numerous dependencies, which can be time-consuming and complex. Our new SDK aims to simplify this process by minimizing the boilerplate and dependencies required, while also providing helpful AI/Teams native abstractions. This allows developers to focus more on creating intelligent and effective bots, rather than getting bogged down in setup and configuration. By streamlining the development process, we hope to make it easier and faster to build powerful, AI-driven bots for Microsoft Teams.

## Scripts

> all scripts can be run for a particular workspace by appending `--workspace=${name}`

### Build

```bash
$: npm run build
```

### Clean

```bash
$: npm run clean
```

### Format

```bash
$: npm run fmt
```

### Dev

> for apps/samples only

```bash
$: npm run dev
```

### Test

> for packages only

```bash
$: npm run test
```

## Packages

-   [`@teams.sdk/apps`](./packages/apps/README.md)
-   [`@teams.sdk/ai`](./packages/ai/README.md)
-   [`@teams.sdk/api`](./packages/api/README.md)
-   [`@teams.sdk/botbuilder`](./packages/botbuilder/README.md)
-   [`@teams.sdk/cards`](./packages/cards/README.md)
-   [`@teams.sdk/common`](./packages/common/README.md)
-   [`@teams.sdk/config`](./packages/config/README.md)
-   [`@teams.sdk/openai`](./packages/openai/README.md)

## Samples

-   [`@samples/echo`](./samples/echo/README.md)
-   [`@samples/botbuilder`](./samples/botbuilder/README.md)
-   [`@samples/auth`](./samples/auth/README.md)
-   **AI**
    -   [`@samples/lights`](./samples/lights/README.md)

## Apps

-   [`@apps/copilot`](./apps/copilot/README.md)
