import fs from 'fs';
import path from 'path';
import frontMatter from 'front-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, 'src', 'articles');
const distDir = path.join(__dirname, 'dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
  console.error('index.html not found. Run npm run build first.');
  process.exit(1);
}

// Read the raw compiled HTML
const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
const files = fs.readdirSync(articlesDir).filter(file => file.endsWith('.md'));

files.forEach(file => {
  const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
  const { attributes } = frontMatter(content);
  const { title, slug, excerpt, image } = attributes;

  if (!slug) return;

  // Create a physical folder for the route
  const targetDir = path.join(distDir, 'garden', slug);
  fs.mkdirSync(targetDir, { recursive: true });

  // Fallbacks just in case frontmatter is missing
  const metaTitle = title ? `${title} | Sogo's Garden` : "Sogo's Garden";
  const metaDesc = excerpt || "Read this article on Sogo Ayenigba's Portfolio.";
  const metaImage = image ? `https://www.sogoayenigba.site/blog/${image}` : "https://www.sogoayenigba.site/headshot.png";
  const metaUrl = `https://www.sogoayenigba.site/garden/${slug}`;

  // Find and replace the global tags with the article-specific tags
  let customHtml = baseHtml
    .replace(/<title>.*?<\/title>/g, `<title>${metaTitle}</title>`)
    .replace(/content="Portfolio of Sogo Ayenigba[^"]*"/g, `content="${metaDesc}"`)
    .replace(/content="Sogo Ayenigba \| AI Application Developer[^"]*"/g, `content="${metaTitle}"`)
    .replace(/content="https:\/\/www\.sogoayenigba\.site\/headshot\.png"/g, `content="${metaImage}"`)
    .replace(/content="https:\/\/www\.sogoayenigba\.site\/"/g, `content="${metaUrl}"`);

  // Save the custom file
  fs.writeFileSync(path.join(targetDir, 'index.html'), customHtml);
  console.log(`✅ SEO Preview generated for: ${slug}`);
});