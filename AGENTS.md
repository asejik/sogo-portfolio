# AGENTS.md — Repository Operating Guidelines

## Project Overview
- **Name**: Sogo Ayenigba Portfolio
- **Domain**: https://asejik.com
- **Tech Stack**: React 19, TypeScript (~5.9), Vite (Rolldown), Tailwind CSS v4, Framer Motion, react-router-dom.
- **Content Engine**: Local Markdown files in `src/articles/` parsed via `front-matter` and rendered with `@tailwindcss/typography`.
- **Deployment**: Vercel.

---

## Commands
- **Type Check**: `npx tsc -b`
- **Lint**: `npm run lint` (`eslint .`)
- **Build**: `npm run build` (`tsc -b && vite build && node generate-seo.js`)
- **Dev Server**: `npm run dev`
- **Preview**: `npm run preview`

---

## Operating Rules (P07 Protocol)
1. **One change at a time**: Change only what the task needs. No unrequested refactors, renames, reformatting, or dependency installs/upgrades without explicit user approval.
2. **Follow existing patterns**: Adhere to the conventions and structure of the codebase.
3. **No cheat fixes**:
   - Never use `@ts-ignore`, `@ts-expect-error`, `any`, or `eslint-disable` to suppress errors.
   - Never delete or skip tests.
   - Never delete "unused" code without listing it for the user.
   - Never fake variable reads or hardcode IDs/test data.
4. **Security & Secrets**:
   - Never commit secrets or expose sensitive keys in client variables (`VITE_`).
   - Keep `.env` strictly untracked and protected.
5. **Verification**:
   - Never open URLs in a browser; the user tests manually.
   - Never claim a check passed without running it. Show real terminal output.
6. **Stop and ask when**:
   - Checks were already failing before your change.
   - Code or structure differs from what was expected.
   - The same error survives two attempts.
   - A change would impact features outside the current task.
7. **Git Discipline**:
   - Always commit after every update.

---

## Architecture & Code Conventions
- **Tailwind CSS v4**: All custom tokens (colors, fonts, keyframes) must be defined inside `@theme` in `src/index.css`.
- **Navigation & Scrolling**: Use `<Link to="/#section">` for section links to allow `react-router-dom` and the custom `<ScrollHandler>` in `src/App.tsx` to handle hash navigation.
- **Strict Typing**: `tsconfig.app.json` has `noUnusedLocals: true` and `noUnusedParameters: true`. Keep all new code strictly typed without unused imports or variables.
- **SEO & Bot Previews**: Post-build script `generate-seo.js` parses Markdown articles and creates static HTML previews with `asejik.com` canonical and OG metadata.
