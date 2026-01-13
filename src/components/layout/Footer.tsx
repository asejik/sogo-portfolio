import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-sanctum-900 border-t border-sanctum-300/5 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-white mb-2">Sogo Ayenigba</h3>
          <p className="text-sanctum-300 text-sm">
            Building digital experiences that matter.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6">
          <a href="https://github.com/asejik" className="text-sanctum-300 hover:text-cyan-400 transition-colors"><Github size={20} /></a>
          <a href="https://twitter.com/sogoayenigba" className="text-sanctum-300 hover:text-cyan-400 transition-colors"><Twitter size={20} /></a>
          <a href="https://linkedin.com/in/sogoayenigba" className="text-sanctum-300 hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-sanctum-300/5 flex flex-col md:flex-row justify-between items-center text-xs text-sanctum-300/50">
        <p>&copy; {year} Sogo Ayenigba. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 md:mt-0">
          Built with React & Tailwind <Heart size={10} className="text-red-500 fill-red-500" />
        </p>
      </div>
    </footer>
  );
};

export default Footer;