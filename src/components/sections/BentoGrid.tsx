import { motion } from 'framer-motion';
import {
  MapPin,
  Globe,
  ArrowUpRight,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Cpu,
  Instagram,
  Facebook
} from 'lucide-react';

const BentoGrid = () => {
  return (
    <section className="py-24 bg-sanctum-900 relative z-10" id="about">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Me at a <span className="text-gold-500">Glance</span>.
          </h2>
          <p className="text-sanctum-300 max-w-xl">
            Beyond the code, I am a mentor, a believer, and a community builder.
          </p>
        </motion.div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(180px,auto)]">

          {/* TILE 1: Main Bio (Large) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 row-span-2 bg-sanctum-800 rounded-2xl border border-sanctum-300/10 p-8 flex flex-col justify-between group hover:border-gold-500/30 transition-colors"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center mb-6 text-gold-500">
                <Globe size={20} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">The Mission</h3>
              <p className="text-sanctum-300 leading-relaxed text-lg">
                My goal is simple: <strong className="text-white">Impart Knowledge</strong>. Whether it's through building AI-powered tools for the church, optimizing systems for clients, or mentoring the next generation of engineers, I build for impact.
              </p>
              <p className="text-sanctum-300 mt-4">
                Currently bridging the gap between <span className="text-cyan-400">Civil Engineering logic</span> and <span className="text-cyan-400">Software Architecture</span>.
              </p>
            </div>
            <div className="mt-8 flex gap-3 flex-wrap">
               <span className="px-3 py-1 rounded-full bg-sanctum-900 border border-sanctum-300/10 text-xs font-mono text-cyan-400">#Builder</span>
               <span className="px-3 py-1 rounded-full bg-sanctum-900 border border-sanctum-300/10 text-xs font-mono text-cyan-400">#Mentor</span>
               <span className="px-3 py-1 rounded-full bg-sanctum-900 border border-sanctum-300/10 text-xs font-mono text-cyan-400">#Christian</span>
            </div>
          </motion.div>

          {/* TILE 2: Map / Location */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="bg-sanctum-800 rounded-2xl border border-sanctum-300/10 p-6 relative overflow-hidden group hover:border-cyan-400/30 transition-colors"
          >
             {/* Abstract Map Background */}
             <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity bg-gradient-to-br from-blue-900/40 to-sanctum-900/90 mix-blend-multiply" />

             <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="self-end p-2 bg-sanctum-900/80 backdrop-blur rounded-lg border border-sanctum-300/10">
                   <MapPin size={18} className="text-red-400" />
                </div>
                <div>
                   <p className="text-xs text-sanctum-300 uppercase tracking-wider mb-1">Based in</p>
                   <p className="text-xl font-bold text-white">Ilorin, Nigeria</p>
                   <p className="text-xs text-cyan-400 mt-1">UTC +1</p>
                </div>
             </div>
          </motion.div>

          {/* TILE 3: Socials / Connect */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="bg-gold-500 rounded-2xl p-6 flex flex-col justify-center items-center text-sanctum-900 text-center group relative overflow-hidden"
          >
             <div className="relative z-10 w-full">
                <h3 className="text-xl font-bold mb-4">Let's Connect</h3>
                <div className="flex flex-wrap gap-3 justify-center">
                   <a href="https://github.com/asejik" target="_blank" rel="noreferrer" title="GitHub" className="p-2 bg-sanctum-900/10 hover:bg-sanctum-900/20 rounded-full transition-colors"><Github size={20} /></a>
                   <a href="https://linkedin.com/in/sogoayenigba" target="_blank" rel="noreferrer" title="LinkedIn" className="p-2 bg-sanctum-900/10 hover:bg-sanctum-900/20 rounded-full transition-colors"><Linkedin size={20} /></a>
                   <a href="https://x.com/sogoayenigba" target="_blank" rel="noreferrer" title="X (Twitter)" className="p-2 bg-sanctum-900/10 hover:bg-sanctum-900/20 rounded-full transition-colors"><Twitter size={20} /></a>
                   <a href="https://instagram.com/sogoayenigba" target="_blank" rel="noreferrer" title="Instagram" className="p-2 bg-sanctum-900/10 hover:bg-sanctum-900/20 rounded-full transition-colors"><Instagram size={20} /></a>
                   <a href="https://facebook.com/asejik" target="_blank" rel="noreferrer" title="Facebook" className="p-2 bg-sanctum-900/10 hover:bg-sanctum-900/20 rounded-full transition-colors"><Facebook size={20} /></a>
                </div>
                <div className="mt-4 pt-4 border-t border-sanctum-900/10">
                    <a href="mailto:hello@sogoayenigba.site" className="text-sm font-mono hover:underline flex items-center justify-center gap-2">
                        <Mail size={14} /> hello@sogoayenigba.site
                    </a>
                </div>
             </div>
             {/* Hover shine effect */}
             <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.div>

          {/* TILE 4: "Now Building" (Status) */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="md:col-span-3 bg-sanctum-800 rounded-2xl border border-sanctum-300/10 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-gold-500/30 transition-colors"
          >
             <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-900/30 rounded-lg text-cyan-400">
                   <Cpu size={24} />
                </div>
                <div>
                   <p className="text-xs text-sanctum-300 uppercase tracking-widest">Currently Building</p>
                   <h3 className="text-xl font-bold text-white">Scripture Copilot (AI/RAG)</h3>
                </div>
             </div>

             <div className="flex items-center gap-6">
                <div className="hidden md:flex -space-x-2">
                   {/* Stack Icons (Placeholders) */}
                   <div className="w-8 h-8 rounded-full bg-sanctum-700 border-2 border-sanctum-800 flex items-center justify-center text-[10px] text-white">R</div>
                   <div className="w-8 h-8 rounded-full bg-sanctum-700 border-2 border-sanctum-800 flex items-center justify-center text-[10px] text-white">TS</div>
                   <div className="w-8 h-8 rounded-full bg-sanctum-700 border-2 border-sanctum-800 flex items-center justify-center text-[10px] text-white">AI</div>
                </div>
                <a href="#projects" className="flex items-center gap-2 text-gold-500 font-bold text-sm hover:underline">
                   View Progress <ArrowUpRight size={16} />
                </a>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;