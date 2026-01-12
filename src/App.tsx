import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import TechTicker from './components/sections/TechTicker';
import BentoGrid from './components/sections/BentoGrid';
import FeaturedProjects from './components/sections/FeaturedProjects';
import Garden from './components/sections/Garden';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <div className="bg-sanctum-900 min-h-screen text-sanctum-300 selection:bg-gold-500/30">
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
    </div>
  );
}

export default App;