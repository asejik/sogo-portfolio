import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

// The Main Landing Page Component
const Home = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <TechTicker />
      <BentoGrid />
      <FeaturedProjects />
      <Garden />
      <Contact />
    </main>
    <Footer />
    <ScrollToTop />
  </>
);

function App() {
  return (
    <Router>
      <div className="bg-sanctum-900 min-h-screen text-sanctum-300 selection:bg-gold-500/30">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/garden/:slug" element={<ArticleView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;