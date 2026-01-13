import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <section className="py-24 bg-sanctum-900 border-t border-sanctum-300/5">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-sanctum-800 to-sanctum-900 border border-sanctum-300/10 rounded-3xl p-12 relative overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-gold-500/10 blur-3xl rounded-full pointer-events-none" />

          <h2 className="text-4xl font-bold text-white mb-6 relative z-10">
            Ready to build something <span className="text-gold-500">impactful</span>?
          </h2>
          <p className="text-sanctum-300 text-lg mb-8 max-w-xl mx-auto relative z-10">
            Whether you need a full-stack engineer, an AI integration specialist, or just a consultation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <a
              href="mailto:hello@sogoayenigba.site"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-sanctum-900 font-bold rounded-xl transition-transform hover:-translate-y-1"
            >
              <Mail size={20} /> Send an Email
            </a>
            <a
              href="https://x.com/sogoayenigba"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-sanctum-800 hover:bg-sanctum-700 border border-sanctum-300/10 text-white font-bold rounded-xl transition-colors"
            >
              <MessageSquare size={20} /> DM on X
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;