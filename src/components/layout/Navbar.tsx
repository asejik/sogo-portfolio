import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Work', href: '/#work' },
  { name: 'How I build', href: '/#process' },
  { name: 'Background', href: '/#about' },
  { name: 'Writing', href: '/#writing' },
  { name: 'Speaking', href: '/#speaking' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || isOpen ? 'bg-ink/95 border-b border-line' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 flex justify-between items-center">
        <Link to="/" className="font-display text-xl font-semibold text-ivory tracking-tight">
          Sogo Ayenigba
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[15px] text-stone hover:text-ivory transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="ml-2 px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-ink text-[15px] font-semibold rounded-full transition-colors"
          >
            Start a project
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 -mr-2 text-ivory"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-line bg-ink">
          <div className="flex flex-col px-6 py-6 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className="py-3 text-lg text-ivory"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-4 py-3.5 bg-gold-500 text-ink font-semibold rounded-full text-center"
            >
              Start a project
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
