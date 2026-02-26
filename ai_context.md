# Sogo Portfolio Website & Status
Last Updated: 2026-02-26

## 1. Tech Stack & Architecture
- **Core:** React 19 (Vite), TypeScript.
- **Routing:** React Router Dom (with custom SPA Hash ScrollHandler).
- **Styling:** Tailwind CSS v4, Framer Motion.
- **SEO:** `react-helmet-async` for dynamic browser tabs; static `index.html` tags for social media bots.
- **Content Engine:** Local Markdown files (`src/articles/*.md`) parsed with `front-matter`, `react-markdown`, and `rehype-raw`.
- **Architecture Pattern:** Client-Side Single Page Application (SPA) with global Navbar/Footer layout.

## 2. Key Features & Rules
- **Completed Features:** Markdown blog engine; AI Unlocked Masterclass registration; Global Contact form; Dynamic SEO handling.
- **Strict Rule:** App must always be wrapped in `<BrowserRouter>` and `<HelmetProvider>`.
- **Strict Rule:** Mobile-First Design. Always verify `hidden` vs `flex` behavior on small screens.
- **Strict Rule:** Blog posts must reside in `src/articles/` as `.md` files containing frontmatter (`title`, `slug`, `date`, `readTime`).
- **Strict Rule (Tailwind v4):** All custom theme tokens (colors, fonts, animations) MUST be defined inside the `@theme` block in `src/index.css`, not `:root`.
- **Strict Rule (Navigation):** Always use `<Link to="/#section">` instead of `<a href="#section">` to ensure SPA routing and the custom `ScrollHandler` fire correctly.

## 3. Database Schema & Auth
- **Database:** None (File-System Based via Markdown).
- **Backend API 1:** Google Apps Script (`doPost` Web App) used for AI Unlocked form data collection and automated email dispatch.
- **Backend API 2:** Web3Forms API used for the `/contact` page to securely forward client inquiries directly to Gmail.
- **Auth Strategy:** None (Public Portfolio).

## 4. File Map
- `src/main.tsx`: App entry point.
- `src/App.tsx`: Global application layout containing `<Router>`, `<HelmetProvider>`, global `<Navbar>`, and custom `<ScrollHandler>`.
- `src/index.css`: Tailwind v4 theme configuration (`@theme`).
- `src/components/ui/SEO.tsx`: Reusable React Helmet component for dynamic page titles and meta descriptions.
- `src/pages/AIUnlocked.tsx`: Registration landing page for the AI Masterclass.
- `src/pages/ContactUs.tsx`: Dedicated contact page utilizing Web3Forms for direct email delivery.
- `src/pages/ArticleView.tsx`: Dynamic renderer for individual markdown files.
- `src/components/layout/Navbar.tsx`: Global navigation header containing SPA `<Link>` routing.
- `src/utils/articleLoader.ts`: Scans and parses metadata from `src/articles/*.md` using `front-matter`.
- `public/`: Houses static assets (`headshot.png`, `ai-masterclass-flyer.jpeg`) for stable absolute URLs used by SEO bots.
- `.vscode/settings.json`: Suppresses false-positive CSS lint warnings for the `@theme` rule.

## 5. Roadmap & Next Steps
- [x] 2026-01-23: Fix critical crash by wrapping App in `BrowserRouter`.
- [x] 2026-01-24: Add Markdown support for images and YouTube embeds.
- [x] 2026-01-24: Migrate to file-based content system (`front-matter`).
- [x] 2026-02-23: Establish append-only strict documentation protocol.
- [x] 2026-02-26: Build AI Unlocked masterclass registration page with glassmorphism UI and success state routing.
- [x] 2026-02-26: Integrate Google Apps Script backend with `mode: 'no-cors'` fetch request to bypass browser security blocks.
- [x] 2026-02-26: Fix Tailwind v4 custom color resolution by migrating variables from `:root` to `@theme` in `index.css`.
- [x] 2026-02-26: Implement static Open Graph/Twitter SEO tags in `index.html` for social media bots.
- [x] 2026-02-26: Implement dynamic SEO using `react-helmet-async` and custom `<SEO>` component.
- [x] 2026-02-26: Refactor `App.tsx` to global SPA layout with custom `ScrollHandler` for hash links.
- [x] 2026-02-26: Build `/contact` page and integrate Web3Forms for direct email delivery.
- [x] 2026-02-26: Route global CTAs ("Let's Talk", "Hire Me") to the new Contact page using React Router.
- [ ] Add "Tags" support to the Garden section (e.g., filter by #React, #Life).

## 6. Known Issues & Technical Debt
- **Debt:** Ensure `slug` in frontmatter strictly matches the filename for consistency, though this is not currently enforced by the codebase.
- **Debt:** The OS-level dropdown styling required inline CSS overrides on `<option>` tags to maintain dark mode visibility.