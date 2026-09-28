import { Link } from 'react-router-dom';
import flyerGraphic from '../assets/ai-masterclass-flyer.jpeg';
import SEO from '../components/ui/SEO';

/*
  AI Unlocked took place on 14 March 2026. Registration is closed, so this page
  now works as a record of the event. To run it again, restore the form from
  git history (commit before the Sept 2026 redesign).
*/

const topics = [
  'Prompting AI so it gives useful answers',
  'Automating everyday workflows',
  'Creating text, image and video content with AI',
  'Building simple apps without writing code',
  'What AI agents are and how to use them',
];

const AIUnlocked = () => {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <SEO
        title="AI Unlocked: The Everyday Creator's Masterclass"
        description="A free masterclass on practical AI for everyday creators, convened and facilitated by Sogo Ayenigba in March 2026."
        url="/ai-unlocked"
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-6">
          <p className="text-stone">Held on Saturday, 14 March 2026, in Ilorin and online</p>
          <h1 className="mt-3 font-display text-ivory text-5xl md:text-7xl font-medium tracking-[-0.02em] leading-[1.02]">
            AI Unlocked
          </h1>
          <p className="mt-3 text-2xl text-sanctum-300">The Everyday Creator's Masterclass</p>

          <p className="mt-8 text-lg leading-relaxed text-sanctum-300 max-w-[34rem]">
            A free masterclass for people with no coding background who wanted to use AI in their work and creative
            life. I convened and facilitated it. We covered:
          </p>
          <ul className="mt-6 border-t border-line max-w-[34rem]">
            {topics.map((t) => (
              <li key={t} className="py-3 border-b border-line text-ivory">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-10 p-6 rounded-2xl bg-sanctum-800 border border-line max-w-[34rem]">
            <p className="text-ivory font-semibold">Registration for this session is closed.</p>
            <p className="mt-2 text-sanctum-300">
              Want a session like this for your team, church or community? Get in touch and let's plan one.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-5 px-6 py-3 bg-gold-500 hover:bg-gold-400 text-ink font-semibold rounded-full transition-colors"
            >
              Book a session
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <img
            src={flyerGraphic}
            alt="AI Unlocked masterclass flyer"
            className="w-full h-auto rounded-3xl border border-line"
          />
        </div>
      </div>
    </div>
  );
};

export default AIUnlocked;
