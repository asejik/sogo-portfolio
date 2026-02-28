import { useState } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { getArticles } from '../../utils/articleLoader';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Garden = () => {
  const articles = getArticles();

  // State to track the currently selected tag
  const [selectedTag, setSelectedTag] = useState<string>('All');

  // Extract all unique tags dynamically. (Using 'any' to bypass strict TS if the interface isn't updated yet)
  const allTags = ['All', ...Array.from(new Set(articles.flatMap((article: any) => article.tags || [])))];

  // Filter the articles based on the selected tag
  const filteredArticles = selectedTag === 'All'
    ? articles
    : articles.filter((article: any) => article.tags?.includes(selectedTag));

  return (
    <section id="garden" className="py-24 bg-sanctum-900 relative">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-sanctum-800 rounded-xl border border-sanctum-300/10 text-gold-500">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">The Garden</h2>
            <p className="text-sanctum-300">Notes on tech, engineering, growth, and faith.</p>
          </div>
        </div>

        {/* NEW: Dynamic Tag Filter Menu */}
        <div className="mb-12 flex flex-wrap gap-3">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                ${selectedTag === tag
                  ? 'bg-gold-500 text-sanctum-900 border-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                  : 'bg-sanctum-800 text-sanctum-300 border-sanctum-300/10 hover:border-gold-500/50 hover:text-white'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Articles List with Framer Motion Layout Animations */}
        <motion.div layout className="space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredArticles.map((article: any) => {
              const previewText = article.excerpt ||
                article.content.replace(/[#*`]/g, '').slice(0, 160) + '...';

              return (
                <motion.div
                  key={article.slug}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/garden/${article.slug}`}
                    className="block group bg-sanctum-800/50 hover:bg-sanctum-800 border border-sanctum-300/10 hover:border-gold-500/30 rounded-2xl p-6 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-2">

                        {/* Meta Info & Tags Inline */}
                        <div className="flex items-center flex-wrap gap-3 text-xs font-mono">
                          <span className="text-sanctum-300">{article.date}</span>
                          <span className="text-sanctum-300/50">•</span>
                          <span className="text-sanctum-300">{article.readTime}</span>

                          {/* Render Individual Tags */}
                          {article.tags && article.tags.length > 0 && (
                            <>
                              <span className="text-sanctum-300/50">•</span>
                              <div className="flex gap-2">
                                {article.tags.map((t: string) => (
                                  <span key={t} className="text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                                    #{t}
                                  </span>
                                ))}
                              </div>
                            </>
                          )}
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
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-sanctum-300"
          >
            No articles found for this category.
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Garden;