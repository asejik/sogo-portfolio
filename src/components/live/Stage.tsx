import { motion, AnimatePresence } from 'framer-motion';
import { Radio } from 'lucide-react';

const YOUTUBE_VIDEO_ID = 'R0sOMUIaOL0'; // Replace with your Unlisted ID

interface StageProps {
  isLive: boolean;
  timeLeft: { days: number; hours: number; minutes: number; seconds: number };
}

export default function Stage({ isLive, timeLeft }: StageProps) {
  return (
    <div className="w-full lg:flex-1 shrink-0 flex flex-col relative">
      <AnimatePresence mode="wait">
        {!isLive ? (
          <motion.div
            key="waiting"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="w-full aspect-video bg-sanctum-800 rounded-2xl border border-sanctum-300/10 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,transparent_50%)] pointer-events-none" />

            <div className="relative z-10">
              <div className="w-16 h-16 bg-sanctum-900 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-sanctum-300/20 text-gold-500 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                <Radio size={32} className="animate-pulse" />
              </div>
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3">AI Unlocked Masterclass</h2>
              <p className="text-sanctum-300 mb-8 max-w-md mx-auto text-sm md:text-base">The broadcast will begin shortly. Grab your notepad and introduce yourself in the chat!</p>

              <div className="flex justify-center gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="flex flex-col items-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-sanctum-900 border border-sanctum-300/20 rounded-xl flex items-center justify-center text-xl md:text-2xl font-mono font-bold text-cyan-400 mb-1 shadow-inner">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <span className="text-[10px] text-sanctum-300 uppercase tracking-widest">{unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="live"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="w-full aspect-video bg-black rounded-2xl overflow-hidden border border-sanctum-300/10 relative shadow-2xl shadow-black/50"
          >
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1 bg-red-500/90 text-white text-xs font-bold rounded-full backdrop-blur-sm shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> LIVE
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&controls=0&modestbranding=1&rel=0`}
              title="Masterclass Livestream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full border-0 pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}