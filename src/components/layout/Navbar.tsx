import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// RESTORED: Menu and X imports
import { Code2, Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Garden', href: '/#garden' },
  { name: 'AI Unlocked', href: '/ai-unlocked' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    scrolled || isOpen
      ? 'bg-sanctum-900/80 backdrop-blur-md border-b border-sanctum-300/10 py-4 shadow-lg'
      : 'bg-transparent py-6'
  }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-gold-500 rounded-lg group-hover:rotate-12 transition-transform">
            <Code2 size={20} className="text-sanctum-900" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Sogo<span className="text-gold-500">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-sm font-medium text-sanctum-300 hover:text-gold-500 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="px-5 py-2 bg-sanctum-800 hover:bg-sanctum-700 text-white text-sm font-bold rounded-full border border-sanctum-300/10 transition-colors"
          >
            Let's Talk
          </Link>
        </div>

        {/* RESTORED: Mobile Menu Button (Hamburger) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-sanctum-300 hover:text-white"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-sanctum-900 border-b border-sanctum-300/10 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-white hover:text-gold-500 transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              {/* CORRECTED: The Mobile Let's Talk button is now safely inside the dropdown */}
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 w-full py-3 bg-gold-500 hover:bg-gold-400 text-sanctum-900 font-bold rounded-lg text-center transition-colors"
              >
                Let's Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;