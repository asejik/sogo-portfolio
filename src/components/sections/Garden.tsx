import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { articles } from '../../data/articles';

const Garden = () => {
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
          {articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.link}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
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
                  <p className="text-sanctum-300 text-sm max-w-2xl">
                    {article.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-bold text-sanctum-300 group-hover:text-gold-500 transition-colors">
                  Read <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Garden;