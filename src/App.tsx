import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import SEO from './components/ui/SEO';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Work from './components/sections/Work';
import Process from './components/sections/Process';
import About from './components/sections/About';
import Writing from './components/sections/Writing';
import Speaking from './components/sections/Speaking';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import ArticleView from './pages/ArticleView';
import AIUnlocked from './pages/AIUnlocked';
import ContactUs from './pages/ContactUs';
import LiveRoom from './pages/LiveRoom';

// NEW: Forces React Router to smoothly scroll to hash links like #about
const ScrollHandler = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        // Slight delay ensures the page has rendered before scrolling
        setTimeout(() => {
          element.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          });
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
      description="Civil engineer turned AI application developer. I design and ship web apps and AI tools for churches, businesses and organisations."
      url="/"
    />
    <main>
      <Hero />
      <Work />
      <Process />
      <About />
      <Writing />
      <Speaking />
      <Contact />
    </main>
  </>
);

function App() {
  return (
    <HelmetProvider>
      <MotionConfig reducedMotion="user">
      <Router>
        <ScrollHandler />
        {/* Added flex layout to ensure footer stays at the bottom */}
        <div className="bg-sanctum-900 min-h-screen text-sanctum-300 flex flex-col">

          {/* GLOBAL NAVBAR */}
          <Navbar />

          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/garden/:slug" element={<ArticleView />} />
              <Route path="/ai-unlocked" element={<AIUnlocked />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/live" element={<LiveRoom />} />
            </Routes>
          </div>

          {/* GLOBAL FOOTER */}
          <Footer />
          <ScrollToTop />

        </div>
      </Router>
      </MotionConfig>
    </HelmetProvider>
  );
}

export default App;