# SpaceTraders JavaScript Client

This package contains a fully generated TypeScript client for the [SpaceTraders.io](https://spacetraders.io) API. The client was produced directly from the repository's `openapi.json` definition using [`openapi-typescript-codegen`](https://www.npmjs.com/package/openapi-typescript-codegen) and targets modern fetch-compatible runtimes such as Ionic/Angular, React, or plain browser applications.

## Usage

```bash
npm install space-traders-client
```

```ts
import { OpenAPI, AgentsService } from 'space-traders-client';

OpenAPI.TOKEN = 'YOUR_TOKEN';

const agent = await AgentsService.getMyAgent();
console.log(agent.data.symbol);
```

The generated SDK exposes strongly typed models in `client/src/models` and service classes in `client/src/services` for each API tag. Each service mirrors the operations in `openapi.json`, providing complete coverage of the SpaceTraders API.

## Regenerating the client

If the OpenAPI schema changes, run:

```bash
npm run generate --prefix client
```

This command re-runs the generator against the bundled `openapi.json` file and updates the `client/src` directory.
