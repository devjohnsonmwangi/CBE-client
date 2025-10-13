Welcome to your new TanStack app! 

# Getting Started

To run this application:

```bash
npm install
npm run start
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Testing
# CBE-client (Frontend)

This is the frontend application for the CBE school management system. It's built with React + Vite and uses TanStack Router and TanStack Query for routing and data fetching. The UI is lightweight and designed to consume the NestJS backend in `../school-app-api`.

## Quick start

From the `CBE-client` folder:

```powershell
pnpm install
pnpm dev
```

The dev server runs with Vite and opens at http://localhost:5173 by default.

## Available scripts

Common scripts in `package.json` (run from the `CBE-client` folder):

- `pnpm dev` - Start the Vite dev server
- `pnpm build` - Build production assets
- `pnpm preview` - Preview the production build locally
- `pnpm tsc` or `pnpm -s tsc --noEmit` - Run TypeScript check
- `pnpm lint` - Run ESLint
- `pnpm test` - Run tests (Vitest)
- `pnpm codegen` - (project) generate route tree / other codegen tasks

Check `package.json` for the exact script names in this repo.

## Environment / API base

The frontend expects the backend API to be available. By default the HTTP wrapper reads the base URL from `src/api/http.ts` where you can point the client to your backend (for example `http://localhost:3000` for local development).

If you need to override the API host in development, set the environment variable in a `.env` file. Example:

```properties
VITE_API_BASE_URL=http://localhost:3000
```

Vite exposes `import.meta.env.VITE_API_BASE_URL` to the app.

## TypeScript notes (deprecation / baseUrl)

This project uses TypeScript with `baseUrl` and a `paths` mapping for `@/*` -> `src/*`. TypeScript 7 will eventually remove `baseUrl`. The TypeScript language server may show a deprecation diagnostic that suggests adding `"ignoreDeprecations": "6.0"` to `tsconfig.json` (this is a TS 6+ feature). Options to resolve the diagnostic:

- Upgrade TypeScript to 6.x and set `"ignoreDeprecations": "6.0"` in `tsconfig.json` (recommended, minimal code changes). This may reveal new type-check errors that you'll need to fix.
- Or remove `baseUrl` and replace `@/*` imports with relative imports or adjust your build tooling (more invasive).

At present the project keeps `baseUrl` and the `@/*` alias for convenience. If you'd like, I can upgrade the client to TS 6 and apply the recommended `ignoreDeprecations` setting — tell me and I will update `package.json` and run checks.

## Routing

Routes are file-based in `src/routes`. The codegen script (`pnpm codegen`) will scan `src/routes` and produce a `src/routeTree.gen.ts` helper used by the router. If you add or remove files under `src/routes`, run the codegen script to update the route tree.

Root route: `src/routes/__root.tsx` contains the application layout and shared providers.

## Data fetching

This app uses a central HTTP wrapper at `src/api/http.ts` and per-resource API modules under `src/api/*`. TanStack Query (React Query) hooks live in `src/hooks/*` and call the API wrappers.

Prefer using the provided hooks (in `src/hooks`) instead of calling `fetch` directly so caching, invalidation, and auth handling follow the app conventions.

## Codegen and DTO types

To keep frontend DTOs in sync with the NestJS backend, the repository includes generated TypeScript types under `src/types/` that are derived from backend DTOs. If you change backend DTOs you should re-run the generation workflow (or let me update the generator to automate this).

## Contributing

- Use feature branches and open PRs against `main`.
- Keep changes small and add tests where appropriate (Vitest).
- Update `src/types` when backend DTO shapes change and run `pnpm -s tsc --noEmit` before opening a PR.

## Troubleshooting

- If imports fail (module not found for `@/...`) make sure your editor is using the workspace TypeScript version installed by the repo (VS Code: Command Palette → "TypeScript: Select TypeScript Version" → "Use Workspace Version").
- If you see TypeScript deprecation diagnostics about `baseUrl`, either upgrade TypeScript to 6.x or ignore the warning temporarily (see TypeScript notes above).

## Useful files

- `src/api/http.ts` — central HTTP client and base URL
- `src/api/*` — per-resource API wrappers (CRUD functions)
- `src/hooks/*` — TanStack Query hooks used by UI components
- `src/types/*` — generated frontend DTO types and enums
- `scripts/generate-route-tree.mjs` — route-tree generator

If you want, I can:
- upgrade TypeScript and add the recommended `ignoreDeprecations` entry,
- or remove `baseUrl` and convert imports to be relative (I recommend the TS upgrade path).

---

If you'd like the README adjusted further (add screenshots, specific developer workflow, or CI commands), tell me what you'd like included and I will update it.

