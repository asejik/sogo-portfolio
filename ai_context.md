# Sogo Portfolio Website & Status
Last Updated: 2026-02-26

## 1. Tech Stack & Architecture
- **Core:** React (Vite), TypeScript.
- **Routing:** React Router Dom.
- **Styling:** Tailwind CSS, Framer Motion.
- **Content Engine:** Local Markdown files (`src/articles/*.md`) parsed with `front-matter`, `react-markdown`, and `rehype-raw`.
- **Architecture Pattern:** Client-Side Single Page Application (SPA) with a file-based Content Collection system.

## 2. Key Features & Rules
- **Completed Features:** Markdown blog engine with YouTube and Image support; mobile-responsive holographic Hero section; AI Unlocked Masterclass registration landing page.
- **Strict Rule:** App must always be wrapped in `<BrowserRouter>`.
- **Strict Rule:** Mobile-First Design. Always verify `hidden` vs `flex` behavior on small screens.
- **Strict Rule:** Blog posts must reside in `src/articles/` as `.md` files containing frontmatter (`title`, `slug`, `date`, `readTime`).

## 3. Database Schema & Auth (If applicable)
- **Database:** None (File-System Based via Markdown).
- **Backend API:** Google Apps Script (`doPost` Web App) used for form data collection and automated email dispatch.
- **Auth Strategy:** None (Public Portfolio).

## 4. File Map
- `src/main.tsx`: App entry point and Router provider.
- `src/App.tsx`: Main application layout and primary Route definitions.
- `src/components/sections/Hero.tsx`: Landing section handling intro and headshot.
- `src/pages/ArticleView.tsx`: Dynamic renderer for individual markdown files.
- `src/components/sections/Garden.tsx`: Blog list interface utilizing `articleLoader`.
- `src/pages/AIUnlocked.tsx`: Registration landing page for the AI Masterclass. Features glassmorphism UI, inline CSS dropdown fixes, and a `mode: 'no-cors'` fetch pipeline to Google Sheets.
- `src/utils/articleLoader.ts`: Scans and parses metadata from `src/articles/*.md` using `front-matter`.
- `src/types/front-matter.d.ts`: Critical custom type definitions for the browser-safe parser.

## 5. Roadmap & Next Steps
- [x] 2026-01-23: Fix critical crash by wrapping App in `BrowserRouter`.
- [x] 2026-01-24: Add Markdown support for images and YouTube embeds.
- [x] 2026-01-24: Fix Mobile Hero image visibility.
- [x] 2026-01-24: Migrate to file-based content system (`front-matter`).
- [x] 2026-02-23: Establish append-only strict documentation protocol.
- [x] 2026-02-26: Build AI Unlocked masterclass registration page with glassmorphism UI, inline CSS dropdown fixes, and success state routing.
- [x] 2026-02-26: Integrate Google Apps Script backend with `mode: 'no-cors'` fetch request to bypass browser security blocks.
- [x] 2026-02-26: Polish success state with global "Back to Home" routing and a "Register Another Person" form reset function.
- [ ] Add "Tags" support to the Garden section (e.g., filter by #React, #Life).
- [ ] Add SEO meta tags (Helmet) for individual articles.

## 6. Known Issues & Technical Debt
- **Debt:** Ensure `slug` in frontmatter strictly matches the filename for consistency, though this is not currently enforced by the codebase.
- **Debt:** The OS-level dropdown styling required inline CSS overrides on `<option>` tags to maintain dark mode visibility.