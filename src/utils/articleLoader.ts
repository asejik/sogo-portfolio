import matter from 'gray-matter';

export interface Article {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  content: string;
}

export const getArticles = (): Article[] => {
  // 1. Load all .md files from the /src/articles folder
  const modules = import.meta.glob('../articles/*.md', { as: 'raw', eager: true });

  // 2. Parse them into objects
  const articles = Object.keys(modules).map((path) => {
    const rawContent = modules[path] as string;
    const { data, content } = matter(rawContent);

    return {
      slug: data.slug || path.split('/').pop()?.replace('.md', '') || 'unknown',
      title: data.title || 'Untitled',
      date: data.date || 'Unknown Date',
      readTime: data.readTime || '5 min read',
      content: content,
    };
  });

  // 3. Sort by Date (Newest First)
  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};