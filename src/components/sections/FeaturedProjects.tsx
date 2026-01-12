import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { projects } from '../../data/projects';

const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-24 bg-sanctum-900 relative">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 md:flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Proof of <span className="text-gold-500">Work</span>.
            </h2>
            <p className="text-sanctum-300 max-w-xl text-lg">
              Selected projects demonstrating capability in AI integration,
              complex frontend state, and system architecture.
            </p>
          </motion.div>

          <motion.a
            href="https://github.com/asejik"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-mono text-sm group"
          >
            View all repositories <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-sanctum-800 rounded-2xl border border-sanctum-300/10 overflow-hidden hover:border-gold-500/30 transition-all duration-300 flex flex-col h-full"
            >
              {/* Top Bar (Icon & Category) */}
              <div className="p-6 pb-0 flex justify-between items-start">
                <div className={`p-3 rounded-xl bg-sanctum-900 border border-sanctum-300/10 ${project.color}`}>
                  <project.icon size={24} />
                </div>
                <span className="px-3 py-1 text-xs font-mono rounded-full bg-sanctum-900 text-sanctum-300 border border-sanctum-300/10">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sanctum-300 leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs text-cyan-400 bg-cyan-900/20 px-2 py-1 rounded">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-6 border-t border-sanctum-300/5">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-white hover:text-gold-500 transition-colors"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-sanctum-300 hover:text-white transition-colors"
                    >
                      <Github size={16} /> Source Code
                    </a>
                  )}
                </div>
              </div>

              {/* Decorative Gradient Blob */}
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl group-hover:from-gold-500/10 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;