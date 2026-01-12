import Hero from './components/sections/Hero';
import TechTicker from './components/sections/TechTicker';
import BentoGrid from './components/sections/BentoGrid';
import FeaturedProjects from './components/sections/FeaturedProjects'; // Import

function App() {
  return (
    <main className="bg-sanctum-900 min-h-screen text-sanctum-300 selection:bg-gold-500/30">
      <Hero />
      <TechTicker />
      <BentoGrid />
      <FeaturedProjects /> {/* Add here */}

      {/* Spacer */}
      <div className="h-40"></div>
    </main>
  );
}

export default App;