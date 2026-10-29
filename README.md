# Portfolio Vue

Personal portfolio of Rofiqur Rohman, rebuilt from the legacy React site with **Nuxt 4 (Vue 3) + TypeScript + shadcn-vue + Tailwind CSS v4**. Content lives in **MongoDB Atlas** and is served through Nuxt server routes. The site deploys to **Vercel** with SSR + ISR, so it is SEO friendly and edits in MongoDB show up within about a minute.

## Stack

| Concern | Choice |
|---|---|
| Framework | Nuxt 4, Vue 3, TypeScript |
| UI | shadcn-vue (`shadcn-nuxt`), Tailwind CSS v4, `@nuxt/icon` (Iconify: simple-icons, lucide) |
| Animation | `motion-v` (scroll reveals), CSS keyframes (above-the-fold entrance, wave, cursor), tsParticles (lazy-loaded background) |
| Data | MongoDB official driver + Zod schemas in `shared/` |
| SEO | `@nuxtjs/seo` (sitemap, robots, schema.org), `useSeoMeta`, static OG image |
| Tests | Vitest + `@nuxt/test-utils` + `mongodb-memory-server` |

## Project structure

```
app/                  Vue app (pages, layout, components, composables, utils)
server/api/           Read-only JSON endpoints: profile, projects, experiences, educations, skills, github-contributions
server/utils/         Mongo client, repository, GitHub GraphQL client
shared/               Zod schemas + types shared by server, app and seed
scripts/              Seed data migrated from the legacy site + idempotent seed script
public/               CV PDF, favicon, og-image.png
```

## Local setup

Requirements: Node.js 20+ and npm.

```bash
npm install
cp .env.example .env   # then fill in the values
npm run db:seed        # once, to load the migrated content into MongoDB
npm run dev            # http://localhost:3000
```

### Environment variables

| Variable | Used by | Description |
|---|---|---|
| `NUXT_MONGODB_URI` | app (server only) | Connection string of the **read-only** user `portfolio-app` |
| `NUXT_MONGODB_DB_NAME` | app, seed | Database name, default `portfolio` |
| `NUXT_GITHUB_TOKEN` | app (server only) | Fine-grained GitHub token for the contribution calendar. Without it the calendar section is hidden. |
| `NUXT_PUBLIC_SITE_URL` | app | Public URL, e.g. `https://rofiqurrohman.vercel.app`. Used for canonical links, sitemap and Open Graph. |
| `SEED_MONGODB_URI` | `npm run db:seed` | Connection string of the user `portfolio-seed` that has write access |

None of these are exposed to the browser. Only the site URL is public.

## MongoDB Atlas setup

You already have a cluster. In Atlas:

1. **Database Access → Add New Database User**
   - `portfolio-app`, built-in role **read** on database `portfolio` (Specific Privileges → `read@portfolio`). Put its URI in `NUXT_MONGODB_URI`.
   - `portfolio-seed`, role **readWrite** on `portfolio` (`readWrite@portfolio`). Put its URI in `SEED_MONGODB_URI`. Keep this one local only, never in Vercel.
2. **Network Access → Add IP Address → `0.0.0.0/0`.** Vercel Functions have no fixed IPs. Alternatively, install the official *MongoDB Atlas* integration from the Vercel Marketplace, which configures access for you. Access still requires the users' passwords, so use long generated ones.
3. Run `npm run db:seed`. It creates the collections `profile`, `projects`, `experiences`, `educations`, `skills` and their indexes. It is safe to run again: records are upserted by their natural key (`slug`, `company`, `institution`, `name`).

### Editing content

Edit documents directly in Atlas Data Explorer or Compass. The shapes are defined in `shared/schemas/*.ts`. In short:

- **projects**: `title`, `slug` (kebab-case, unique), `summary`, `imageUrl`, `category` (`personal` | `professional`, the latter shows the "Company Project" badge), `liveUrl` (URL or `null` to hide "View Site"), `techStack[]`, `sortOrder`
- **experiences** (one document per company): `company`, `companyUrl` (URL or `null`), `logoUrl` (URL or `null`, a building icon is shown otherwise), `location { city?, country }`, `workMode` (`onsite` | `hybrid` | `remote` | `null`), `sortOrder`, and `positions[]`. Each position has `title`, `employmentType` (`full-time` | `part-time` | `internship` | `freelance` | `contract`), `startDate` / `endDate` (**Date** type, `endDate: null` means ongoing: shown as `∞`, marked with a dot and expanded by default), `highlights[]`, `projects[]` (`{ name, url | null, highlights[] }`, shown as "In-house Project") and `techStack[]` (chips). Duration is calculated automatically.
- **educations**: `institution`, `fieldOfStudy`, `graduationYear`, `highlights[]`, `sortOrder`
- **skills**: `name`, `icon` (Iconify name such as `simple-icons:vuedotjs`, browse at [icones.js.org](https://icones.js.org)), `category` (a row of the Stack table: `language` | `frontend` | `backend` | `web3` | `workflow` | `ai` | `design` | `analytics`; rows without skills are hidden), `sortOrder` (order inside the row)
- **profile** (single document): `fullName`, `roles[]` (typewriter words), `bio[]` (paragraphs), `location`, `activities[]`, `quote`, `socialLinks[]`, `githubUsername`, `resumeUrl`

Items are ordered by `sortOrder`. A document that does not match its schema (typo in an enum, a date stored as a string, and so on) is **skipped and logged** instead of breaking the page, so check the Vercel function logs if something does not show up. Changes appear on the live site within about 60 seconds (ISR).

> Icons: the app bundles the `simple-icons`, `lucide` and `devicon-plain` collections locally. If you use an icon from another collection, add the matching `@iconify-json/<collection>` dev dependency.

## GitHub token (contribution calendar)

GitHub → Settings → Developer settings → **Fine-grained tokens → Generate new token**. Pick "Public repositories (read-only)" and add no extra permissions. Put the value in `NUXT_GITHUB_TOKEN`. The calendar data is cached for 24 hours.

## Deploying to Vercel

1. Push this repository to GitHub, then on Vercel choose **Add New → Project → Import** this repo. The Nuxt preset is detected automatically.
2. **Settings → Environment Variables (Production):** `NUXT_MONGODB_URI`, `NUXT_MONGODB_DB_NAME`, `NUXT_GITHUB_TOKEN`, `NUXT_PUBLIC_SITE_URL`.
3. **Settings → Functions → Region:** pick the region closest to your Atlas cluster (e.g. Singapore `sin1` for an `ap-southeast-1` cluster).
4. Deploy. When everything looks right, move your domain from the old project to this one.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` / `npm run preview` | Production build / run it locally |
| `npm run test` | All tests (unit, component, e2e). e2e tests build the app and start an in-memory MongoDB. |
| `npm run test:watch` | Vitest in watch mode |
| `npm run typecheck` | `nuxt typecheck` (vue-tsc) |
| `npm run lint` / `npm run lint:fix` | ESLint (`@nuxt/eslint`, stylistic rules are the formatter) |
| `npm run db:seed` | Upsert the migrated legacy content into MongoDB |

## Quality checks (2026-10-28)

Lighthouse 12, mobile emulation, local production build (`node .output/server/index.mjs`, no compression):

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 53 | 100 | 100 | 100 |
| `/about` | 35 | 100 | 100 | 100 |
| `/project` | 31 | 100 | 100 | 100 |
| `/resume` | 40 | 100 | 100 | 100 |

Performance was measured without gzip/brotli and without a CDN, so expect better numbers on Vercel. Re-run Lighthouse against the deployed URL.
