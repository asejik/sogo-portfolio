import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <section id="contact" className="py-24 md:py-36 border-t border-line">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-display text-ivory font-medium text-5xl md:text-[88px] leading-[1] tracking-[-0.025em] max-w-4xl">
          Have an idea, or a PRD ready to go? Let's build it.
        </h2>
        <p className="mt-8 text-lg md:text-xl text-sanctum-300 max-w-xl leading-relaxed">
          Tell me what you want to build. I'll reply with honest thoughts on scope, timeline and cost.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            to="/contact"
            className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-ink font-semibold rounded-full text-center transition-colors"
          >
            Send me a message
          </Link>
          <a
            href="https://linkedin.com/in/sogoayenigba"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 border border-line hover:border-stone text-ivory font-semibold rounded-full text-center transition-colors"
          >
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
