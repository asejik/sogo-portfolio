const facts: [string, string][] = [
  ['Education', 'B.Eng. and M.Eng. Civil Engineering, University of Ilorin'],
  ['Membership', 'Nigerian Society of Engineers (MNSE)'],
  ['Certifications', 'GitHub Copilot (Microsoft), Google AI Essentials'],
  ['Fellowship', 'Learn2Earn, AI-Native Full-Stack Engineer, 2026'],
  ['Languages', 'English and Yoruba'],
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 className="font-display text-ivory text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.05]">
            From site drawings to software
          </h2>
        </div>

        <div className="md:col-span-7">
          <div className="space-y-5 text-lg leading-relaxed text-sanctum-300 max-w-[38rem]">
            <p>
              I studied civil engineering, specialising in water resources, and worked as a civil engineer before
              moving into tech. Since 2014 I have also done freelance data work: data annotation, data and geospatial
              analysis, and design.
            </p>
            <p>
              Along the way I co-founded a startup, trained at MEST Africa in Ghana, and built websites the
              traditional way. When AI coding tools arrived, everything clicked. I now build full applications by
              directing AI, and I have shipped apps that organisations rely on.
            </p>
            <p>
              Right now I work on AI evaluation and training projects, helping make AI models better, and I take on a
              small number of client builds.
            </p>
          </div>

          <dl className="mt-12 border-t border-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-6 py-4 border-b border-line">
                <dt className="text-stone">{k}</dt>
                <dd className="sm:col-span-2 text-ivory">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default About;
