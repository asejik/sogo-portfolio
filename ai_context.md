# Sogo Portfolio Website & Status
Last Updated: 2026-03-01

## 1. Tech Stack & Architecture
- **Core:** React 19 (Vite), TypeScript.
- **Routing:** React Router Dom (with custom SPA Hash ScrollHandler).
- **Styling:** Tailwind CSS v4, Framer Motion (State-based layout animations).
- **SEO:** `react-helmet-async` for dynamic browser tabs; static `index.html` tags for global bots; custom `generate-seo.js` post-build script for dynamic article link previews.
- **Content Engine:** Local Markdown files (`src/articles/*.md`) parsed with `front-matter`, `react-markdown` (with custom Tailwind component mapping), and `rehype-raw`.
- **Architecture Pattern:** Client-Side Single Page Application (SPA) with global Navbar/Footer layout.

## 2. Key Features & Rules
- **Completed Features:** Markdown blog engine with mapped Tailwind styling; 16:9 Hero Images; Ad-blocker resilient View Counter; AI Unlocked Masterclass registration; Global Contact form; Dynamic SEO handling; **Interactive Garden Tag Filtering.**
- **Strict Rule:** App must always be wrapped in `<BrowserRouter>` and `<HelmetProvider>`.
- **Strict Rule:** Mobile-First Design. Always verify `hidden` vs `flex` behavior on small screens.
- **Strict Rule:** Blog posts must reside in `src/articles/` as `.md` files containing frontmatter (`title`, `slug`, `date`, `readTime`, `excerpt`, `image`, `tags`).
- **Strict Rule (Frontmatter):** `tags` must be an array, e.g., `tags: ["React", "Life"]`.
- **Strict Rule (Tailwind v4):** All custom theme tokens (colors, fonts, animations) MUST be defined inside the `@theme` block in `src/index.css`, not `:root`.
- **Strict Rule (Navigation):** Always use `<Link to="/#section">` instead of `<a href="#section">` to ensure SPA routing and the custom `ScrollHandler` fire correctly.

## 3. Database Schema & Auth
- **Database:** None (File-System Based via Markdown).
- **Backend API 1:** Google Apps Script (`doPost` Web App) for AI Unlocked data.
- **Backend API 2:** Web3Forms API for Contact page.
- **Backend API 3:** CounterAPI (V2) proxied via `/api/views` for view tracking.

## 4. File Map
- `src/main.tsx`: App entry point. (React StrictMode enabled; causes double-counting of views locally).
- `src/App.tsx`: Global layout with `<Router>`, `<HelmetProvider>`, global `<Navbar>`, and custom `<ScrollHandler>`.
- `src/index.css`: Tailwind v4 theme configuration (`@theme`).
- `src/components/ui/SEO.tsx`: Reusable React Helmet component for dynamic page titles and meta descriptions.
- `src/pages/AIUnlocked.tsx`: Registration landing page for the AI Masterclass.
- `src/pages/ContactUs.tsx`: Dedicated contact page utilizing Web3Forms for direct email delivery.
- `src/pages/ArticleView.tsx`: Dynamic renderer mapping raw Markdown to custom Tailwind UI components, including the CounterAPI fetch logic.
- `src/components/sections/Garden.tsx`: Article list with `useState` tag filtering and Framer Motion layout animations.
- `src/components/layout/Navbar.tsx`: Global navigation header containing SPA `<Link>` routing.
- `src/utils/articleLoader.ts`: Scans and parses metadata from `src/articles/*.md` using `front-matter`. Interface includes `tags: string[]`.
- `public/`: Houses static assets (`headshot.png`, `ai-masterclass-flyer.jpeg`) for stable absolute URLs used by SEO bots.
- `public/blog/`: Houses 16:9 markdown hero images.
- `generate-seo.js`: Node script run post-build to generate physical HTML files for SEO bots to scrape article previews.
- `vite.config.ts`: Contains local development proxy routing `/api/views` to `api.counterapi.dev/v1/` to bypass ad-blockers.
- `vercel.json`: Contains production serverless rewrites mirroring the Vite proxy.
- `.env`: Stores environment variables. Ignored by Git.
- `.vscode/settings.json`: Suppresses false-positive CSS lint warnings for the `@theme` rule.

## 5. Roadmap & Next Steps
- [x] 2026-01-23: Fix critical crash by wrapping App in `BrowserRouter`.
- [x] 2026-01-24: Add Markdown support for images and YouTube embeds.
- [x] 2026-01-24: Fix Mobile Hero image visibility.
- [x] 2026-01-24: Migrate to file-based content system (`front-matter`).
- [x] 2026-02-23: Establish append-only strict documentation protocol.
- [x] 2026-02-26: Build AI Unlocked masterclass registration page with glassmorphism UI, inline CSS dropdown fixes, and success state routing.
- [x] 2026-02-26: Integrate Google Apps Script backend with `mode: 'no-cors'` fetch request to bypass browser security blocks.
- [x] 2026-02-26: Polish success state with global "Back to Home" routing and a "Register Another Person" form reset function.
- [x] 2026-02-26: Fix Tailwind v4 custom color resolution by migrating variables from `:root` to `@theme` in `index.css` and secure mobile navbar opacity.
- [x] 2026-02-26: Implement static Open Graph/Twitter SEO tags in `index.html` for social media bots.
- [x] 2026-02-26: Implement dynamic SEO using `react-helmet-async` and custom `<SEO>` component.
- [x] 2026-02-26: Refactor `App.tsx` to global SPA layout with custom `ScrollHandler` for hash links.
- [x] 2026-02-26: Build `/contact` page and integrate Web3Forms for direct email delivery.
- [x] 2026-02-26: Route global CTAs ("Let's Talk", "Hire Me") to the new Contact page using React Router.
- [x] 2026-02-28: Map raw `react-markdown` HTML elements to Tailwind CSS classes for proper typography.
- [x] 2026-02-28: Implement 16:9 Markdown hero image support via `public/blog/` directory.
- [x] 2026-02-28: Integrate CounterAPI for article view tracking.
- [x] 2026-02-28: Implement domain masking proxy (`vite.config.ts` & `vercel.json`) to bypass client-side ad-blockers throwing `ERR_BLOCKED_BY_CLIENT`.
- [x] 2026-03-01: Implement `generate-seo.js` post-build script to generate physical HTML files for WhatsApp/LinkedIn bot link previews.
- [x] 2026-03-01: Implement dynamic Tag Filtering in Garden section using React State and Framer Motion.
- [x] 2026-03-02: Refactored `FeaturedProjects.tsx` to a Bento Grid layout with category-based filtering.
- [x] 2026-03-02: Created S.T.A.R. Deep Dive modal component for technical project breakdowns.
- [ ] Add Search bar to Garden section for title-based filtering.
- [ ] Implement "Newsletter" footer signup with a simple external service

## 6. Known Issues & Technical Debt
- **Debt:** Ensure `slug` in frontmatter strictly matches the filename for consistency, though this is not currently enforced by the codebase.
- **Debt:** The OS-level dropdown styling required inline CSS overrides on `<option>` tags to maintain dark mode visibility.