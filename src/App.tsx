import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/ui/SEO';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import TechTicker from './components/sections/TechTicker';
import BentoGrid from './components/sections/BentoGrid';
import FeaturedProjects from './components/sections/FeaturedProjects';
import Garden from './components/sections/Garden';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import ArticleView from './pages/ArticleView';
import AIUnlocked from './pages/AIUnlocked';
import ContactUs from './pages/ContactUs';

// NEW: Forces React Router to smoothly scroll to hash links like #about
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Slight delay ensures the page has rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

// Removed Navbar and Footer from here so they don't render twice
const Home = () => (
  <>
    <SEO
      title="AI Application Developer"
      description="I turn ideas into deployed Apps & AI Agents fast."
      url="/"
    />
    <main>
      <Hero />
      <TechTicker />
      <BentoGrid />
      <FeaturedProjects />
      <Garden />
      <Contact />
    </main>
  </>
);

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollHandler />
        {/* Added flex layout to ensure footer stays at the bottom */}
        <div className="bg-sanctum-900 min-h-screen text-sanctum-300 selection:bg-gold-500/30 flex flex-col">

          {/* GLOBAL NAVBAR */}
          <Navbar />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/garden/:slug" element={<ArticleView />} />
              <Route path="/ai-unlocked" element={<AIUnlocked />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </div>

          {/* GLOBAL FOOTER */}
          <Footer />
          <ScrollToTop />

        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;