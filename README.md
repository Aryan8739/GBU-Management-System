# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
# GBU-Management-System

## Demo deployment

The production build enables MSW demo mode through the checked-in `.env.production` setting. It provides sample login accounts and mock complaint data, so no backend is required for a walkthrough. Choose a role on the login screen to fill its demo account.

The demo accounts are public test identities. Do not use them for real authentication or sensitive data. Replace demo mode with a real API before production use; setting `VITE_DEMO_MODE=false` in the hosting environment disables the mock worker.

Build and deploy the generated `dist` directory. The static host must serve `public/mockServiceWorker.js` from the same origin and rewrite client-side routes such as `/login`, `/staff`, and `/admin` to `index.html`.
