# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**Read `AGENTS.md` first.** It holds the binding operating rules for this repo (P07 protocol): one change at a time, no `@ts-ignore`/`any`/`eslint-disable`, never open URLs in a browser, stop and ask on pre-existing failures, and **commit after every update**. Those rules are not repeated here.

## Commands

- `npm run dev` — Vite dev server (Vite is aliased to `rolldown-vite` via `overrides`)
- `npm run build` — `tsc -b && vite build && node generate-seo.js`
- `npx tsc -b` — type check only
- `npm run lint` — ESLint
- `npm run preview` — serve `dist/`

There is no test suite. Verification means `npx tsc -b`, `npm run lint`, and `npm run build`.

## Architecture

Client-side SPA deployed on Vercel. `vercel.json` rewrites every path to `/index.html`, plus a proxy `/api/views/*` → CounterAPI (used for article view counts in `src/pages/ArticleView.tsx`).

**Routing (`src/App.tsx`)**: the home page `/` is a stack of section components (`src/components/sections/*`), each with an `id` used for hash links. Other routes are `/garden/:slug` (article), `/ai-unlocked`, `/contact`, `/live`. `Navbar`/`Footer` render once globally in `App`, not inside pages. `ScrollHandler` in `App.tsx` scrolls to `#hash` targets after navigation, which is why section links must be `<Link to="/#section">`. The app must stay wrapped in `HelmetProvider` + `MotionConfig reducedMotion="user"` + `BrowserRouter`.

**Articles ("the garden")** — two independent parsers read the same files, so keep front-matter compatible with both:
1. Runtime: `src/utils/articleLoader.ts` loads `src/articles/*.md` via `import.meta.glob(..., { query: '?raw', eager: true })`, parses with `front-matter`, sorts by date. `ArticleView.tsx` renders with `react-markdown` + `rehype-raw` and custom Tailwind component mappings.
2. Build-time: `generate-seo.js` writes `dist/garden/<slug>/index.html` for each article by regex-replacing title/description/OG/canonical tags in the built `index.html`. **These regexes match literal strings in `index.html`** (e.g. `content="Civil engineer turned...`, `Sogo Ayenigba | AI Application Developer`, `https://asejik.com/`). Changing the global meta tags in `index.html` can silently break article previews.

Front-matter fields: `title`, `slug` (required for SEO page generation), `date`, `readTime`, `excerpt`, `image` (filename in `public/blog/`), `tags` (must be an array, e.g. `["AI", "Growth"]`).

**Content locations** (from README): projects/case studies in `src/data/projects.ts` (screenshots in `public/projects/`); other home-page copy lives directly in the section components. Social preview image is `public/og-image.jpg` (1200×630).

**External services**:
- Contact form (`src/pages/ContactUs.tsx`) posts to Web3Forms.
- `/ai-unlocked` is now a static record of the March 2026 event; its old registration form (Google Apps Script) lives only in git history.
- `/live` (`src/pages/LiveRoom.tsx` + `src/components/live/*`) uses Supabase (`src/utils/supabase.ts`, env `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`) with 3-second polling, not realtime subscriptions. Tables: `users`, `chat_messages`, `questions`, `polls`, `poll_votes`, `room_settings`. Login is email lookup against `users`; admin is a hardcoded email.

## Styling

Tailwind v4 with no config file: all tokens (the `sanctum-*` colour scale, fonts, keyframes) live in the `@theme` block of `src/index.css`. Brand: charcoal `#16140F`, ivory `#F4EFE6`, stone `#A89F91`, amber `#E8A33D`; Fraunces for headings, DM Sans for body. Article prose uses `@tailwindcss/typography`.

## Notes

- `ai_context.md` is an older context doc and is partly stale (e.g. it references `sections/Garden.tsx`, now `sections/Writing.tsx`). Prefer the code and `AGENTS.md`.
- `LiveRoom.tsx` contains pre-existing `any[]` state types; don't copy that pattern into new code.
- React StrictMode is on in `main.tsx`, so the view counter double-increments in local dev.
