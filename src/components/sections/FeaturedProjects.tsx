import { useState, type JSX } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Database,
  Users,
  Palette,
  ExternalLink,
  X,
  Code,
  Server,
  ArrowRight
} from 'lucide-react';

// 1. The Project Data Structure
type ProjectCategory = 'All' | 'AI & Web' | 'Systems & Automation' | 'Creative Tech';

interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  uiBadge: string;
  icon: JSX.Element;
  shortDesc: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  // S.T.A.R. Deep Dive Data for the Modal
  situation: string;
  action: string;
  result: string;
  isFeatured?: boolean; // Featured projects span 2 columns in the Bento Grid
}

const projectsData: Project[] = [
  {
    id: 'living-word-ai',
    title: 'Living Word AI',
    category: 'AI & Web',
    uiBadge: 'AI-Powered SaaS',
    icon: <Bot size={24} />,
    shortDesc: 'A personalized devotional app featuring AI-generated content and Text-to-Speech audio tailored to user streaks.',
    techStack: ['Gemini 2.5 Flash', 'React 19', 'Go', 'TTS Audio'],
    liveLink: '#',
    situation: 'Users wanted daily spiritual content that adapted to their specific life seasons rather than static, generic daily readings.',
    action: 'Architected a React frontend backed by a Go server that streams prompt-engineered context to Google Gemini. Integrated browser-native Web Speech API for immersive Text-to-Speech playback.',
    result: 'Delivers zero-latency personalized devotionals with dedicated Adult, Kids, and Testimony modes, driving higher daily user retention.',
    isFeatured: true,
  },
  {
    id: 'remote-staff',
    title: 'Remote Staff Attendance',
    category: 'Systems & Automation',
    uiBadge: 'Corporate Utility',
    icon: <Users size={24} />,
    shortDesc: 'An offline-first biometric PWA for verifying staff presence in remote, low-network locations.',
    techStack: ['React', 'Capacitor', 'Supabase', 'face-api.js'],
    liveLink: '#',
    situation: 'ABC Company needed a way to verify remote staff attendance in areas with zero internet connectivity, while preventing photo-spoofing.',
    action: 'Built an offline-first PWA using IndexedDB for local storage. Integrated face-api.js for on-device biometric liveness detection (smile verification) and GPS geolocation tagging.',
    result: 'Staff can clock in completely offline. The app automatically background-syncs to a Supabase PostgreSQL database the moment a network connection is detected.',
  },
  {
    id: 'aso-oke',
    title: 'Aso Oke Configurator',
    category: 'Creative Tech',
    uiBadge: 'Cultural Tech',
    icon: <Palette size={24} />,
    shortDesc: 'A complex digitization tool for drafting Nigerian fabric patterns using high-performance Canvas rendering.',
    techStack: ['HTML5 Canvas', 'Zustand', 'React', 'Tailwind'],
    liveLink: '#',
    situation: 'Weavers were facing high production error rates due to vague, text-based descriptions of complex, repeatable stripe patterns.',
    action: 'Engineered a visual blueprint generator. Utilized HTML5 Canvas to render massive arrays of repeatable weave structures without DOM lag, managed by Zustand for complex global state.',
    result: 'Produces high-resolution 9:16 image exports for precise WhatsApp sharing between designers and local weavers, entirely eliminating miscommunications.',
    isFeatured: true,
  },
  {
    id: 'n8n-server',
    title: 'n8n Automation Server',
    category: 'Systems & Automation',
    uiBadge: 'Infrastructure',
    icon: <Server size={24} />,
    shortDesc: 'Self-hosted automation infrastructure deployed on Google Cloud Platform for zero-cost API orchestration.',
    techStack: ['n8n', 'Docker', 'GCP', 'Cloudflare Tunnels'],
    liveLink: 'https://n8n.sogoayenigba.site',
    situation: 'Needed a robust way to handle complex data orchestration between disparate apps without paying high monthly SaaS fees (like Zapier).',
    action: 'Provisioned a GCP e2-micro instance. Configured a 2GB swap file to bypass RAM limits, containerized n8n with Docker, and secured the endpoint using a Cloudflare Zero Trust Tunnel.',
    result: 'Achieved a 100% free, highly secure, enterprise-grade automation server capable of running thousands of webhook executions per month.',
  },
  {
    id: 'sermon-assistant',
    title: 'Sermon Assistant',
    category: 'AI & Web',
    uiBadge: 'Search Engine',
    icon: <Database size={24} />,
    shortDesc: 'An AI-powered search engine allowing church members to retrieve archived sermons using natural language.',
    techStack: ['Python', 'Streamlit', 'Gemini API', 'thefuzz'],
    liveLink: '#',
    situation: 'Church members could not easily find specific past sermons buried in massive Google Sheet archives.',
    action: 'Developed a Python/Streamlit backend that uses Gemini to extract intent from plain English queries (e.g., "messages on hope by Pastor Seun") and applies fuzzy matching logic to handle name aliases.',
    result: 'Reduced sermon search time from minutes to milliseconds, presented in a highly responsive Midnight dark-mode UI.',
  }
];

const FeaturedProjects = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories: ProjectCategory[] = ['All', 'AI & Web', 'Systems & Automation', 'Creative Tech'];

  const filteredProjects = selectedCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === selectedCategory);

  return (
    <section className="py-24 bg-sanctum-900 relative z-10" id="projects">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header & Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Proof of <span className="text-gold-500">Work.</span>
              </h2>
              <p className="text-sanctum-300 max-w-xl text-lg">
                Selected projects demonstrating capability in AI integration, complex frontend state, and system architecture.
              </p>
            </motion.div>

            <motion.a
              href="https://github.com/asejik"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 text-sm font-mono transition-colors group"
            >
              View all repositories <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
                  ${selectedCategory === cat
                    ? 'bg-gold-500 text-sanctum-900 border-gold-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                    : 'bg-sanctum-800 text-sanctum-300 border-sanctum-300/10 hover:border-gold-500/50 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* The Bento Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-min">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                onClick={() => setActiveProject(project)}
                className={`bg-sanctum-800/50 rounded-2xl border border-sanctum-300/10 p-6 flex flex-col justify-between group hover:border-gold-500/30 transition-all cursor-pointer hover:bg-sanctum-800 ${
                  project.isFeatured ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-sanctum-900 border border-sanctum-300/10 flex items-center justify-center text-cyan-400 group-hover:text-gold-500 transition-colors">
                      {project.icon}
                    </div>
                    <span className="px-3 py-1 rounded-full bg-sanctum-900 border border-sanctum-300/10 text-xs font-mono text-sanctum-300">
                      {project.uiBadge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sanctum-300 text-sm md:text-base leading-relaxed mb-8">
                    {project.shortDesc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-sanctum-300/10">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map(tech => (
                      <span key={tech} className="text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="text-sm font-bold text-white flex items-center gap-2 group-hover:text-gold-500 transition-colors">
                    Deep Dive <ExternalLink size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* The S.T.A.R. Case Study Modal Overlay */}
        <AnimatePresence>
          {activeProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="absolute inset-0 bg-sanctum-900/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-sanctum-800 rounded-2xl border border-sanctum-300/20 shadow-2xl custom-scrollbar"
              >
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 p-2 bg-sanctum-900/50 hover:bg-sanctum-900 rounded-full text-sanctum-300 hover:text-white transition-colors z-10"
                >
                  <X size={20} />
                </button>

                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-cyan-400">{activeProject.icon}</span>
                    <h3 className="text-3xl font-bold text-white">{activeProject.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-sanctum-300/10">
                    {activeProject.techStack.map(tech => (
                      <span key={tech} className="text-sm font-mono text-gold-500 bg-gold-500/10 px-3 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-8">
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400" /> The Situation
                      </h4>
                      <p className="text-sanctum-300 leading-relaxed">{activeProject.situation}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" /> The Action
                      </h4>
                      <p className="text-sanctum-300 leading-relaxed">{activeProject.action}</p>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400" /> The Result
                      </h4>
                      <p className="text-sanctum-300 leading-relaxed">{activeProject.result}</p>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-sanctum-300/10 flex flex-wrap gap-4">
                    {activeProject.liveLink && (
                      <a
                        href={activeProject.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-gold-500 text-sanctum-900 font-bold rounded-lg hover:bg-gold-400 transition-colors flex items-center gap-2"
                      >
                        View Live Demo <ExternalLink size={16} />
                      </a>
                    )}
                    {activeProject.githubLink && (
                      <a
                        href={activeProject.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 bg-sanctum-900 text-white font-bold rounded-lg hover:bg-sanctum-900/80 border border-sanctum-300/20 transition-colors flex items-center gap-2"
                      >
                        View Source Code <Code size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default FeaturedProjects;