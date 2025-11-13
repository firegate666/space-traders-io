# space-traders-io

Game that implements API form https://spacetraders.io/

Check https://spacetraders.io/quickstart/new-game

## Ionic client

The `client` folder contains an Ionic React implementation of a Space Traders command
center that interacts with the official REST API.

### Getting started

```bash
cd client
npm install
npm run dev
```

This launches the Vite development server at http://localhost:5173. Provide your agent
symbol, select a faction, and optionally enter an email address to register a new
commander. Your token is stored locally so the app can fetch your contracts, fleet, and
known systems.

### Production build

```bash
npm run build
```

This produces a production bundle in `client/dist` that can be wrapped with Capacitor or
other tooling to deploy on mobile platforms.
