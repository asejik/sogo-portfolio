import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/ui/SEO';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // We are using Web3Forms. It securely forwards POST requests directly to your Gmail.
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY, // We will get this key next
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-sanctum-900 text-white flex items-center justify-center px-4 pt-28 pb-12 lg:px-12 lg:pt-32">
      <SEO
        title="Contact Us"
        description="Get in touch with Sogo Ayenigba for AI application development and automation projects."
        url="/contact"
      />

      <div className="max-w-3xl w-full mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 to-gold-600 mb-4">
            Let's Build Something.
          </h1>
          <p className="text-sanctum-300">Fill out the form below and I'll get back to you shortly.</p>
        </div>

        <div className="bg-sanctum-800/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-sanctum-300 mb-1">Name *</label>
                  <input
                    type="text" id="name" name="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full bg-sanctum-900/50 border border-sanctum-300/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sanctum-300 mb-1">Email Address *</label>
                  <input
                    type="email" id="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full bg-sanctum-900/50 border border-sanctum-300/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-sanctum-300 mb-1">Subject *</label>
                <input
                  type="text" id="subject" name="subject" required
                  value={formData.subject} onChange={handleChange}
                  className="w-full bg-sanctum-900/50 border border-sanctum-300/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors"
                  placeholder="Project Inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-sanctum-300 mb-1">Message *</label>
                <textarea
                  id="message" name="message" required rows={5}
                  value={formData.message} onChange={handleChange}
                  className="w-full bg-sanctum-900/50 border border-sanctum-300/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sanctum-900 transition-all transform shadow-[0_0_20px_rgba(245,158,11,0.2)]
                  ${isSubmitting
                    ? 'bg-gold-600 cursor-not-allowed opacity-80'
                    : 'bg-gold-500 hover:bg-gold-400 hover:-translate-y-1'
                  }`}
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-12 animate-in fade-in zoom-in duration-500 flex flex-col items-center">
              <CheckCircle size={64} className="text-green-400 mb-6" />
              <h3 className="text-3xl font-bold mb-4 text-white">Message Sent!</h3>
              <p className="text-sanctum-300 mb-8 max-w-md">
                Thank you for reaching out, <span className="text-gold-400 font-semibold">{formData.name}</span>. I have received your message and will reply to your email shortly.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-sanctum-800 border border-sanctum-300/20 hover:bg-sanctum-700 transition-all"
              >
                <ArrowLeft size={18} />
                Return to Home
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;