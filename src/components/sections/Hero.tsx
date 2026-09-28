import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import headshot from '../../assets/headshot.jpg';

const Hero = () => {
  const reduce = useReducedMotion();
  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 items-end">
        <div className="md:col-span-7">
          <motion.p {...rise(0)} className="text-stone text-lg mb-6">
            Sogo Ayenigba, AI Application Developer
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="font-display text-ivory font-medium text-[44px] leading-[1.02] sm:text-6xl md:text-[80px] tracking-[-0.02em]"
          >
            Trained as a civil engineer. Now I build software with AI.
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-8 text-lg md:text-xl leading-relaxed text-sanctum-300 max-w-[34rem]">
            I design and ship web apps and AI tools for churches, businesses and organisations. AI lets me move fast.
            Engineering discipline makes what I build hold up when real people use it.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              to="/#work"
              className="px-7 py-4 bg-gold-500 hover:bg-gold-400 text-ink font-semibold rounded-full text-center transition-colors"
            >
              See my work
            </Link>
            <Link
              to="/contact"
              className="px-7 py-4 border border-line hover:border-stone text-ivory font-semibold rounded-full text-center transition-colors"
            >
              Start a project
            </Link>
          </motion.div>
        </div>

        <motion.figure {...rise(0.12)} className="md:col-span-5">
          <div className="relative overflow-hidden rounded-[28px] bg-sanctum-800 aspect-[4/5]">
            <img
              src={headshot}
              alt="Sogo Ayenigba"
              className="w-full h-full object-cover object-top"
              width={1000}
              height={987}
            />
          </div>
          <figcaption className="mt-4 text-sm text-stone">
            Based in Ilorin, Nigeria. Working with clients anywhere.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default Hero;
