# Sogo Ayenigba | Portfolio

Personal site of Sogo Ayenigba, civil engineer turned AI application developer.

Live: [asejik.com](https://asejik.com)

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 (tokens live in `src/index.css`) + Typography plugin for articles
- Framer Motion (one entrance animation on the hero, respects reduced motion)
- React Router, React Helmet Async
- Deployed on Vercel

## Brand

Warm charcoal `#16140F`, ivory `#F4EFE6`, stone `#A89F91`, amber `#E8A33D`.
Fraunces for headings, DM Sans for text. Matches the social media graphics.

## Updating content

| What | Where |
| --- | --- |
| Projects and case studies | `src/data/projects.ts` |
| Project screenshots | `public/projects/` then set `image` in `projects.ts` |
| How I build steps | `src/components/sections/Process.tsx` |
| Background and facts | `src/components/sections/About.tsx` |
| Talks and training | `src/components/sections/Speaking.tsx` |
| Articles | `src/articles/*.md` (front-matter: title, date, readTime, excerpt, tags, slug, image) |
| Social preview image | `public/og-image.jpg` (1200 x 630) |

## Scripts

```bash
npm install
npm run dev      # local development
npm run build    # production build + per-article SEO pages
```

## Contact

- Site: [asejik.com](https://asejik.com)
- GitHub: [@asejik](https://github.com/asejik)
- LinkedIn: [sogoayenigba](https://linkedin.com/in/sogoayenigba)
