import fm from 'front-matter';

export interface Article {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  content: string;
  excerpt?: string; // Added this type definition
}

interface ArticleAttributes {
  slug?: string;
  title?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
}

export const getArticles = (): Article[] => {
  // FIXED: Use "query: '?raw'" and "import: 'default'" instead of "as: 'raw'"
  const modules = import.meta.glob('../articles/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });

  const articles = Object.keys(modules).map((path) => {
    // The module is now guaranteed to be the raw string content
    const rawContent = modules[path] as string;

    const { attributes, body } = fm<ArticleAttributes>(rawContent);

    return {
      slug: attributes.slug || path.split('/').pop()?.replace('.md', '') || 'unknown',
      title: attributes.title || 'Untitled',
      date: attributes.date || 'Unknown Date',
      readTime: attributes.readTime || '5 min read',
      content: body,
      excerpt: attributes.excerpt
    };
  });

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};