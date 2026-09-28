import { Link } from 'react-router-dom';

type Talk = { when: string; role: string; event: string; about: string; link?: string };

const talks: Talk[] = [
  {
    when: 'Sept 2026',
    role: 'Facilitator',
    event: 'AI, My Growth Partner, eXee Media Q3 Webinar',
    about: 'Practical AI for small business owners and founders: workflows, content, sales follow-up and operations.',
  },
  {
    when: 'May 2026',
    role: 'Invited speaker',
    event: 'NICESA Civil Engineering Conference, University of Ilorin',
    about: 'AI-assisted engineering practice, geospatial AI, offline-first site tools and automated estimation for Nigerian infrastructure.',
  },
  {
    when: 'April 2026',
    role: 'Panelist',
    event: 'Lid to Lead Conference, Citizens of Light Church Business Fest',
    about: 'AI, productivity and sustainable business growth.',
  },
  {
    when: 'March 2026',
    role: 'Convener and facilitator',
    event: "AI Unlocked: The Everyday Creator's Masterclass",
    about: 'Prompting, workflow automation, content creation, no-code app building and AI agents.',
    link: '/ai-unlocked',
  },
];

const Speaking = () => {
  return (
    <section id="speaking" className="py-24 md:py-32 border-t border-line">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 className="font-display text-ivory text-4xl md:text-6xl font-medium tracking-[-0.02em] leading-[1.05]">
            Speaking and training
          </h2>
          <p className="mt-5 text-lg text-stone max-w-sm">
            I teach engineers, business owners and creators how to put AI to work. Want me at your event?
          </p>
          <Link
            to="/contact"
            className="inline-block mt-7 px-6 py-3 border border-line hover:border-stone text-ivory font-semibold rounded-full transition-colors"
          >
            Invite me to speak
          </Link>
        </div>

        <ol className="md:col-span-7 border-t border-line">
          {talks.map((t) => (
            <li key={t.event} className="grid grid-cols-1 sm:grid-cols-4 gap-2 sm:gap-6 py-7 border-b border-line">
              <p className="text-stone">{t.when}</p>
              <div className="sm:col-span-3">
                <h3 className="text-ivory text-xl font-semibold leading-snug">{t.event}</h3>
                <p className="mt-1 text-gold-500">{t.role}</p>
                <p className="mt-3 text-sanctum-300 leading-relaxed">{t.about}</p>
                {t.link && (
                  <Link to={t.link} className="inline-block mt-3 text-ivory underline underline-offset-4 hover:text-gold-400">
                    See the masterclass page
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Speaking;
