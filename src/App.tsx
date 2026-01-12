import Hero from './components/sections/Hero';
import TechTicker from './components/sections/TechTicker'; // Import it

function App() {
  return (
    <main className="bg-sanctum-900 min-h-screen text-sanctum-300 selection:bg-gold-500/30">
      <Hero />
      <TechTicker />

      {/* Next up: Bento Grid */}
      <div className="h-screen"></div> {/* Spacer to test scrolling */}
    </main>
  );
}

export default App;