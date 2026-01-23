import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { articles } from '../data/articles';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ArticleView = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

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
            <ReactMarkdown>{article.content || 'Content coming soon...'}</ReactMarkdown>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleView;