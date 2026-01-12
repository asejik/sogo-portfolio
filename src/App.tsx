import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import TechTicker from './components/sections/TechTicker';
import BentoGrid from './components/sections/BentoGrid';
import FeaturedProjects from './components/sections/FeaturedProjects';
import Footer from './components/layout/Footer';

function App() {
  return (
    <div className="bg-sanctum-900 min-h-screen text-sanctum-300 selection:bg-gold-500/30">
      <Navbar />

      <main>
        <Hero />
        <TechTicker />
        <BentoGrid />
        <FeaturedProjects />
        {/* We will add the Garden section later if you decide to write articles */}
      </main>

      <Footer />
    </div>
  );
}

export default App;