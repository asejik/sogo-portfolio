const skills = [
  "React 19", "TypeScript", "Go (Golang)", "Python",
  "Tailwind CSS v4", "Google Gemini API", "Supabase",
  "PostgreSQL", "Framer Motion", "Docker", "Git",
  "System Architecture", "AI Integration", "Mentorship"
];

const TechTicker = () => {
  return (
    <section className="w-full py-10 bg-sanctum-900 border-y border-sanctum-300/5 overflow-hidden relative z-20">

      {/* Fade Gradients on Edges (to create the smooth fade-out effect) */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-sanctum-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-sanctum-900 to-transparent z-10 pointer-events-none" />

      {/* The Moving Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {/* We double the list to ensure seamless looping */}
        {[...skills, ...skills, ...skills].map((skill, index) => (
          <div
            key={index}
            className="flex items-center mx-6 group cursor-default"
          >
            <span className="text-2xl font-bold text-sanctum-300/40 group-hover:text-gold-500 transition-colors duration-300 uppercase tracking-wider font-mono">
              {skill}
            </span>
            <span className="ml-12 text-gold-500/20 text-xl">•</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechTicker;