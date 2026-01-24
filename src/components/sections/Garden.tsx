import { ArrowRight, BookOpen } from 'lucide-react';
import { getArticles } from '../../utils/articleLoader'; // NEW: Import the loader
import { Link } from 'react-router-dom';

const Garden = () => {
  // NEW: Fetch articles dynamically from your file system
  const articles = getArticles();

  return (
    <section id="garden" className="py-24 bg-sanctum-900 relative">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 flex items-center gap-4">
          <div className="p-3 bg-sanctum-800 rounded-xl border border-sanctum-300/10 text-gold-500">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">The Garden</h2>
            <p className="text-sanctum-300">Notes on engineering, growth, and theology.</p>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          {articles.map((article) => {
            // Helper: Create a fallback excerpt if one isn't provided in Frontmatter
            // It strips basic markdown (# and *) to make the text look cleaner
            const previewText = (article as any).excerpt ||
              article.content.replace(/[#*`]/g, '').slice(0, 160) + '...';

            return (
              <Link
                to={`/garden/${article.slug}`}
                key={article.slug} // CHANGED: Use slug as unique key
                className="block group bg-sanctum-800/50 hover:bg-sanctum-800 border border-sanctum-300/10 hover:border-gold-500/30 rounded-2xl p-6 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-mono text-cyan-400">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-gold-500 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sanctum-300 text-sm max-w-2xl leading-relaxed">
                      {previewText}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-sanctum-300 group-hover:text-gold-500 transition-colors shrink-0">
                    Read <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Garden;