import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-sanctum-900 overflow-hidden pt-20 md:pt-0">

      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#164e63 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left Column: The Pitch */}
        <div className="space-y-8">

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sanctum-800 border border-sanctum-300/10 text-cyan-400 text-sm font-mono"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Available for New Projects
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white leading-[1.1]"
          >
            Building intelligence <br />
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Code</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sanctum-300 text-lg md:text-xl max-w-lg leading-relaxed"
          >
            I am <strong className="text-white">Sogo Ayenigba</strong>. A Software Engineer bridging the gap between complex algorithms and human potential.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Primary Button -> Links to Projects Section */}
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-sanctum-900 font-bold rounded-lg transition-all transform hover:-translate-y-1"
            >
              View Proof of Work
              <ArrowRight size={20} />
            </a>

            {/* Secondary Button -> Links to Garden Section */}
            <a
              href="#garden"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-sanctum-300/20 hover:border-cyan-400 text-sanctum-300 hover:text-cyan-400 rounded-lg transition-all"
            >
              <Code2 size={20} />
              Read My Notes
            </a>
          </motion.div>
        </div>

        {/* Right Column: The "Digital Twin" (Placeholder for Headshot) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative hidden md:flex justify-center"
        >
            <div className="relative w-full max-w-md aspect-square bg-sanctum-800 rounded-2xl border border-sanctum-300/10 shadow-2xl p-8 rotate-3 hover:rotate-0 transition-transform duration-500 group">
                {/* Glow Effects */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl group-hover:bg-gold-500/20 transition-all"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>

                {/* Code Window UI */}
                <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>

                {/* The "Code" */}
                <div className="space-y-4 font-mono text-sm md:text-base text-sanctum-300">
                    <p><span className="text-purple-400">class</span> <span className="text-yellow-400">Architect</span> <span className="text-purple-400">extends</span> <span className="text-blue-400">Builder</span> {'{'}</p>
                    <div className="pl-6 space-y-2 border-l border-sanctum-300/10">
                      <p>name = <span className="text-green-400">"Sogo Ayenigba"</span>;</p>
                      <p>stack = [<span className="text-green-400">"React"</span>, <span className="text-green-400">"Go"</span>, <span className="text-green-400">"AI"</span>];</p>
                      <p>mission = <span className="text-green-400">"Empowerment"</span>;</p>
                    </div>
                    <p>{'}'}</p>

                    <div className="mt-8 p-4 bg-sanctum-900/50 rounded border border-sanctum-300/5">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">// Latest Commit</p>
                        <p className="text-cyan-400 truncate">feat: integrating gemini-2.5-flash...</p>
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;