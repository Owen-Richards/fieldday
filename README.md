# fieldday — Monorepo Starter

Opinionated starter monorepo for the fieldday platform. This bootstraps a multi-workspace TypeScript repo with:

- Expo mobile app (apps/mobile)
- Marketing & Console web apps (apps/web, apps/console) using Next.js
- Node TypeScript API (packages/api)
- Shared types (packages/shared)

This starter includes minimal runnable code: a health endpoint and a Next.js landing page. It is focused on developer ergonomics; you'll add auth, DB, payments, and integrations next.

Getting started

1. Install dependencies (uses pnpm, but npm/yarn also work):

```bash
# from repo root
npm install -g pnpm
pnpm install
```

2. Run the API server (development):

```bash
pnpm --filter @fieldday/api dev
```

3. Run the web marketing site:

```bash
pnpm --filter @fieldday/web dev
```

4. Run the console admin app:

```bash
pnpm --filter @fieldday/console dev
```

5. Run the Expo mobile app (requires Expo CLI):

```bash
pnpm --filter @fieldday/mobile dev
```

What I added

- Monorepo layout with package.json workspaces
- Minimal TypeScript Node API with health endpoint
- Next.js marketing app with a simple landing page
- Next.js console app placeholder
- Shared types package with a Session type

Next steps

- Add authentication (Auth0/Clerk/Firebase)
- Integrate Stripe Connect and payments
- Add Postgres DB (Prisma) and migrations
- Implement search & conditions engine
- Add tests, CI, and deployment pipelines
