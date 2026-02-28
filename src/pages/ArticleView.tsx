import { useState, useEffect } from 'react'; // NEW IMPORTS
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { ArrowLeft, Calendar, Clock, Eye } from 'lucide-react'; // ADDED EYE ICON
import { getArticles } from '../utils/articleLoader';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

// Helper to convert {{ youtube: ID }} into a responsive iframe
const preprocessContent = (content: string) => {
  if (!content) return '';

  const youtubeRegex = /{{\s*youtube:\s*([a-zA-Z0-9_-]+)\s*}}/g;

  return content.replace(youtubeRegex, (_, id) => {
    return `
      <div class="aspect-video w-full my-8 rounded-lg overflow-hidden shadow-lg">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/${id}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe>
      </div>
    `;
  });
};

const ArticleView = () => {
  const { slug } = useParams();

  // NEW: State to hold the view count
  const [viewCount, setViewCount] = useState<number | null>(null);

  const articles = getArticles();
  const article = articles.find((a) => a.slug === slug);

  // NEW: Fetch and increment the view count when the article loads
  useEffect(() => {
    if (!slug) return;

    // Hitting our custom proxy route. No headers or API keys needed!
    fetch(`/api/views/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error(`API Error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // V1 safely returns { count: X }
        setViewCount(data.count ?? 0);
      })
      .catch((err) => {
        console.error('Failed to fetch view count:', err);
      });
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-sanctum-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="mb-8 text-sanctum-300">Article not found.</p>
          <Link to="/" className="text-gold-500 hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-sanctum-900 min-h-screen text-sanctum-300 selection:bg-gold-500/30">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <Link to="/#garden" className="inline-flex items-center gap-2 text-cyan-400 mb-8 hover:underline">
            <ArrowLeft size={16} /> Back to Garden
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex gap-6 text-sm font-mono text-sanctum-300/60 mb-12 border-b border-sanctum-300/10 pb-8">
            <span className="flex items-center gap-2"><Calendar size={14} /> {article.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} /> {article.readTime}</span>
          </div>

          {/* Markdown Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-gold-500 prose-code:text-cyan-400 prose-pre:bg-sanctum-800 prose-pre:border prose-pre:border-sanctum-300/10">
            <ReactMarkdown
              rehypePlugins={[rehypeRaw]}
              components={{
                // Images
                img: ({ node, ...props }) => (
                  <img
                    className="w-full aspect-video object-cover rounded-2xl shadow-xl mb-10 border border-sanctum-300/10"
                    {...props}
                  />
                ),
                // Paragraphs
                p: ({ node, ...props }) => <p className="mb-6 leading-relaxed text-sanctum-300" {...props} />,
                // Headings
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-white mt-10 mb-6" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold text-white mt-10 mb-4" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold text-white mt-8 mb-4" {...props} />,
                // Blockquotes
                blockquote: ({ node, ...props }) => (
                  <blockquote className="border-l-4 border-sanctum-300/30 pl-5 py-1 my-6 text-sanctum-300/80 italic" {...props} />
                ),
                // Lists
                ul: ({ node, ...props }) => <ul className="list-disc list-outside ml-5 mb-6 text-sanctum-300 space-y-2" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-outside ml-5 mb-6 text-sanctum-300 space-y-2" {...props} />,
                // Links & Bold text
                a: ({ node, ...props }) => <a className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
              }}
            >
              {preprocessContent(article.content)}
            </ReactMarkdown>
          </div>

          {/* NEW: View Count Footer Bar */}
          <div className="mt-16 pt-8 border-t border-sanctum-300/10 flex items-center text-sanctum-300">
            <div className="flex items-center gap-2 font-mono text-sm bg-sanctum-800/50 px-4 py-2 rounded-full border border-sanctum-300/10 shadow-sm">
              <Eye size={16} className="text-cyan-400" />
              <span>{viewCount !== null ? viewCount : '...'} Views</span>
            </div>
          </div>

        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleView;