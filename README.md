# Space Traders Ionic Client

This project provides a full-featured Ionic React interface for playing the [SpaceTraders.io](https://spacetraders.io) game usin
 g their v2 API.

## Getting Started

```bash
npm install
npm run generate:api  # regenerate the TypeScript client from openapi.json if needed
npm run dev
```

The app expects a valid SpaceTraders API token. You can paste an existing token or register a new agent directly from the login 
view. All requests are proxied directly to `https://api.spacetraders.io/v2` through the generated Axios client.

## Available Views

- **Command Console** – overview of your agent, credits, fleet summary, global announcements, and leaderboards.
- **Contracts** – manage active contracts, deliver goods, accept new tasks, and mark contracts as fulfilled.
- **Fleet Operations** – inspect every owned ship and execute actions such as navigation, refueling, mining, market operations, s
canning, refining, and more.
- **Systems Explorer** – browse systems and waypoints, inspect markets, shipyards, jump gates, and construction requirements.
- **Galactic Intel** – review factions, personal reputation, error codes, and trading supply chain information.

## Building

```bash
npm run build
```

The production bundle is emitted to the `dist/` directory via Vite.

## OpenAPI Client

The generated client in `src/api` uses `openapi-typescript-codegen`. If the upstream `openapi.json` changes, regenerate the clien
t:

```bash
npm run generate:api
```

> **Note:** Some generated enums require PascalCase names. The repository includes manual fixes to avoid the reserved `symbol`
> enum name emitted by the generator.
