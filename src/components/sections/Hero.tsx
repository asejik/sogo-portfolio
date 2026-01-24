import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2 } from 'lucide-react';
// 1. Import the image
import headshot from '../../assets/headshot.png';

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
            className="text-4xl md:text-6xl font-bold text-white leading-[1.1]"
          >
            I turn ideas into <br />
            deployed <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Apps</span> & <span className="text-gold-500">AI Agents</span> fast.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sanctum-300 text-lg md:text-xl max-w-lg leading-relaxed"
          >
            I am <strong className="text-white">Sogo Ayenigba</strong>, an AI Application Developer & Automation Specialist.
            <br /><br />
            I build functional, beautiful web applications faster than traditional cycles allow—moving you from "Concept" to "Deployed" efficiently.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#projects"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-sanctum-900 font-bold rounded-lg transition-all transform hover:-translate-y-1"
            >
              View Proof of Work
              <ArrowRight size={20} />
            </a>

            <a
              href="#garden"
              className="flex items-center justify-center gap-2 px-8 py-4 border border-sanctum-300/20 hover:border-cyan-400 text-sanctum-300 hover:text-cyan-400 rounded-lg transition-all"
            >
              <Code2 size={20} />
              Read My Notes
            </a>
          </motion.div>
        </div>

        {/* Right Column: The "Holographic" Headshot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          /* CHANGED: Removed 'hidden' and added 'flex' and 'mt-12' for mobile spacing */
          className="relative flex justify-center mt-12 md:mt-0"
        >
            {/* The Container (Keeps the glow and rotation) */}
            <div className="relative w-full max-w-md aspect-square bg-sanctum-800/50 rounded-2xl border border-sanctum-300/10 shadow-2xl p-3 rotate-3 hover:rotate-0 transition-transform duration-500 group backdrop-blur-sm">

                {/* Glow Effects */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl group-hover:bg-gold-500/20 transition-all z-0"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all z-0"></div>

                {/* The Image */}
                <div className="relative z-10 w-full h-full rounded-xl overflow-hidden border border-sanctum-300/10">
                  <img
                    src={headshot}
                    alt="Sogo Ayenigba"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                  />
                  {/* Subtle scanline overlay for tech feel */}
                  <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWgAAAAD0lEQVQYV2NkYGBgYLC3vwcABW4BR6a0n54AAAAASUVORK5CYII=')] opacity-10 mix-blend-overlay pointer-events-none"></div>
                </div>

            </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;