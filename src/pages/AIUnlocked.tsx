import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, UserPlus, Calendar } from 'lucide-react';
import flyerGraphic from '../assets/ai-masterclass-flyer.jpeg'; // Ensure this matches your file extension

const AIUnlocked = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    goal: '',
    whatsapp: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace with your exact Google Web App URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxV-CtHHEx2pXSLNB4fhGXc2gNebQNNjpJwp_O8MaC6OegSS4_CHvhDvQdSPm3NNE7B/exec";

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(formData)
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was a network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to reset the form
  const handleRegisterAgain = () => {
    setFormData({
      firstName: '',
      email: '',
      goal: '',
      whatsapp: ''
    });
    setIsSubmitted(false);
  };

  const calendarLink = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20260314T170000Z%2F20260314T180000Z&details=The%20Everyday%20Creator%27s%20Masterclass.%20Check%20your%20email%20for%20the%20event%20link.&location=Online&text=AI%20Unlocked%3A%20The%20Everyday%20Creator%27s%20Masterclass";

  return (
    <div className="relative min-h-screen bg-sanctum-900 text-white flex items-center justify-center p-4 lg:p-12">

      {/* Global Back to Home Button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-lg bg-sanctum-800/50 hover:bg-sanctum-800 border border-white/5 text-sanctum-300 hover:text-cyan-400 transition-all z-50 backdrop-blur-md"
      >
        <ArrowLeft size={18} />
        <span className="hidden md:inline font-medium text-sm">Back to Home</span>
      </Link>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-12 lg:mt-0">

        {/* Left Column: Flyer & Info */}
        <div className="relative flex justify-center w-full h-auto">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/30 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>

          <div className="relative z-10 w-full max-w-md h-auto bg-sanctum-800/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 text-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
              AI Unlocked
            </h2>
            <p className="text-sanctum-300 font-mono text-sm mb-8">The Everyday Creator's Masterclass</p>

            <div className="w-full rounded-xl overflow-hidden shadow-lg border border-sanctum-300/20">
              <img
                src={flyerGraphic}
                alt="AI Unlocked Masterclass Flyer"
                className="w-full h-auto aspect-[3/2] object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="mt-8 text-left w-full space-y-3">
              <p className="flex items-center gap-2"><strong className="text-cyan-400">Date:</strong> Saturday, March 14</p>
              <p className="flex items-center gap-2"><strong className="text-cyan-400">Time:</strong> 6:00 PM (WAT)</p>
              <p className="flex items-center gap-2"><strong className="text-cyan-400">Cost:</strong> Free</p>
            </div>
          </div>
        </div>

        {/* Right Column: Registration Form or Success State */}
        <div className="w-full max-w-md mx-auto lg:mx-0 bg-sanctum-800/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-xl">

          {!isSubmitted ? (
            <>
              <h3 className="text-2xl font-bold mb-2">Secure Your Spot</h3>
              <p className="text-sanctum-300 text-sm mb-6">Join the masterclass and discover the possibilities of AI.</p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-sanctum-300 mb-1">First Name *</label>
                  <input
                    type="text" id="firstName" name="firstName" required
                    value={formData.firstName} onChange={handleChange}
                    className="w-full bg-sanctum-900/50 border border-sanctum-300/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-sanctum-300 mb-1">Email Address *</label>
                  <input
                    type="email" id="email" name="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full bg-sanctum-900/50 border border-sanctum-300/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="you@example.com"
                  />
                  <p className="text-xs text-sanctum-300/60 mt-1">Event link will be sent via email.</p>
                </div>

                <div>
                  <label htmlFor="goal" className="block text-sm font-medium text-sanctum-300 mb-1">What is your primary goal with AI? *</label>
                  <select
                    id="goal" name="goal" required
                    value={formData.goal} onChange={handleChange}
                    className="w-full bg-sanctum-900/50 border border-sanctum-300/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors [color-scheme:dark]"
                  >
                    <option value="" disabled style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Select an option</option>
                    <option value="Speed up content creation" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Speed up content creation</option>
                    <option value="Automate my daily tasks" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Automate my daily tasks</option>
                    <option value="Boost my career/business" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Boost my career/business</option>
                    <option value="I am just curious" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>I am just curious</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-sanctum-300 mb-1">WhatsApp Number <span className="text-sanctum-300/60">(Optional)</span></label>
                  <input
                    type="tel" id="whatsapp" name="whatsapp"
                    value={formData.whatsapp} onChange={handleChange}
                    className="w-full bg-sanctum-900/50 border border-sanctum-300/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    placeholder="+234..."
                  />
                  <p className="text-xs text-sanctum-300/60 mt-1">For a 10-minute reminder before we start.</p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full mt-8 py-4 rounded-xl font-bold text-white transition-all transform shadow-[0_0_20px_rgba(6,182,212,0.3)]
                    ${isSubmitting
                      ? 'bg-sanctum-700 cursor-not-allowed opacity-80'
                      : 'bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 hover:-translate-y-1'
                    }`}
                >
                  {isSubmitting ? 'Securing Spot...' : 'Secure Your Spot'}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8 animate-in fade-in zoom-in duration-500 flex flex-col items-center">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-3xl font-bold mb-4 text-white">You are In!</h3>
              <p className="text-sanctum-300 mb-8">
                Thank you, <span className="text-cyan-400 font-semibold">{formData.firstName}</span>. Your spot for the masterclass has been secured. We will send the event link to your email shortly.
              </p>

              <div className="w-full flex flex-col gap-3">
                <a
                  href={calendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sanctum-900 bg-gold-500 hover:bg-gold-400 transition-all transform hover:-translate-y-1 shadow-lg"
                >
                  <Calendar size={20} />
                  Add to Google Calendar
                </a>

                {/* New Register Again Button */}
                <button
                  onClick={handleRegisterAgain}
                  className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold text-sanctum-300 bg-sanctum-800 border border-sanctum-300/20 hover:bg-sanctum-700 hover:text-white transition-all"
                >
                  <UserPlus size={20} />
                  Register Another Person
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AIUnlocked;