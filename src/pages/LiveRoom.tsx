import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, AlertCircle, MessageCircleQuestion, MessageSquare, BarChart2, Radio, Video } from 'lucide-react';
import { supabase } from '../utils/supabase';

// Component Imports
import Stage from '../components/live/Stage';
import ChatTab from '../components/live/ChatTab';
import QATab from '../components/live/QATab';
import PollsTab from '../components/live/PollsTab';

const ADMIN_EMAIL = 'sogoayenigba@gmail.com';

export default function LiveRoom() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState<{ id: string; full_name: string; email: string } | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isLive, setIsLive] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'qa' | 'polls'>('chat');

  // Data States
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [polls, setPolls] = useState<any[]>([]);
  const [pollVotes, setPollVotes] = useState<any[]>([]);

  // Admin Poll State
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '']);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const isAdmin = user?.email === ADMIN_EMAIL;

  // 1. Countdown Timer
  useEffect(() => {
    const target = new Date('2026-03-14T17:00:00Z').getTime();
    const interval = setInterval(() => {
      const difference = target - new Date().getTime();
      if (difference <= 0) clearInterval(interval);
      else setTimeLeft({ days: Math.floor(difference / (1000 * 60 * 60 * 24)), hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)), seconds: Math.floor((difference % (1000 * 60)) / 1000) });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Smart Auto-scroll (Chat Tab)
  useEffect(() => {
    if (activeTab !== 'chat' || !chatContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    if (scrollHeight - scrollTop - clientHeight < 100) chatContainerRef.current.scrollTop = scrollHeight;
  }, [messages, activeTab]);

  // 3. Centralized 3-Second Polling
  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { data: settings } = await supabase.from('room_settings').select('is_live').eq('id', 'masterclass').single();
      if (settings) setIsLive(settings.is_live);

      const { data: chatData } = await supabase.from('chat_messages').select('id, user_id, message, created_at, users(full_name)').order('created_at', { ascending: true });
      if (chatData) setMessages(chatData);

      const { data: qaData } = await supabase.from('questions').select('id, user_id, question, upvoted_by, created_at, users(full_name)').order('created_at', { ascending: true });
      if (qaData) setQuestions(qaData);

      const { data: pollsData } = await supabase.from('polls').select('*').order('created_at', { ascending: false });
      if (pollsData) setPolls(pollsData);

      const { data: votesData } = await supabase.from('poll_votes').select('*');
      if (votesData) setPollVotes(votesData);
    };
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, [user]);

  // --- LOGIC HANDLERS ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setIsLoading(true); setError('');
    const { data, error } = await supabase.from('users').select('id, full_name, email').eq('email', email.trim().toLowerCase()).single();
    if (error || !data) { setError('Email not found on the guest list.'); setIsLoading(false); return; }
    setUser(data); setIsLoading(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault(); if (!newMessage.trim() || !user) return;
    const temp = newMessage; setNewMessage('');
    await supabase.from('chat_messages').insert({ user_id: user.id, message: temp });
  };

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault(); if (!newQuestion.trim() || !user) return;
    const temp = newQuestion; setNewQuestion('');
    await supabase.from('questions').insert({ user_id: user.id, question: temp });
  };

  const handleUpvote = async (questionId: string, currentUpvotes: string[] = []) => {
    if (!user) return;
    const newUpvotes = currentUpvotes.includes(user.id) ? currentUpvotes.filter(id => id !== user.id) : [...currentUpvotes, user.id];
    setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, upvoted_by: newUpvotes } : q));
    await supabase.from('questions').update({ upvoted_by: newUpvotes }).eq('id', questionId);
  };

  const handleCreatePoll = async (e: React.FormEvent) => {
    e.preventDefault(); const valid = newPollOptions.filter(o => o.trim() !== '');
    if (!newPollQuestion.trim() || valid.length < 2) return;
    await supabase.from('polls').insert({ question: newPollQuestion, options: valid });
    setNewPollQuestion(''); setNewPollOptions(['', '']);
  };

  const handleVote = async (pollId: string, optionIndex: number) => {
    if (!user) return;
    setPollVotes(prev => [...prev, { poll_id: pollId, user_id: user.id, option_index: optionIndex }]);
    await supabase.from('poll_votes').insert({ poll_id: pollId, user_id: user.id, option_index: optionIndex });
  };

  const handleEndPoll = async (pollId: string) => {
    if (!window.confirm("End this poll?")) return;
    setPolls(prev => prev.map(p => p.id === pollId ? { ...p, is_active: false } : p));
    await supabase.from('polls').update({ is_active: false }).eq('id', pollId);
  };

  const handleToggleLive = async () => {
    const newStatus = !isLive;
    if (!window.confirm(newStatus ? "Go live to all users?" : "Take the stream offline?")) return;
    setIsLive(newStatus);
    await supabase.from('room_settings').update({ is_live: newStatus }).eq('id', 'masterclass');
  };

  const handleDeleteMessage = async (id: string, table: 'chat_messages' | 'questions' | 'polls') => {
    if (!window.confirm("Delete this item?")) return;
    if (table === 'chat_messages') setMessages(prev => prev.filter(m => m.id !== id));
    if (table === 'questions') setQuestions(prev => prev.filter(q => q.id !== id));
    if (table === 'polls') setPolls(prev => prev.filter(p => p.id !== id));
    await supabase.from(table).delete().eq('id', id);
  };

  const handleClearAll = async (table: 'chat_messages' | 'questions' | 'polls') => {
    if (!window.confirm(`Clear entire ${table}? Cannot be undone.`)) return;
    if (table === 'chat_messages') setMessages([]);
    if (table === 'questions') setQuestions([]);
    if (table === 'polls') setPolls([]);
    await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
  };

  // --- UI RENDERING ---
  if (!user) {
    return (
      <div className="min-h-screen bg-sanctum-900 flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-sanctum-800 p-8 rounded-2xl border border-sanctum-300/10 max-w-md w-full shadow-2xl">
          <div className="flex justify-center mb-6"><div className="p-4 bg-gold-500/10 rounded-full text-gold-500"><Lock size={32} /></div></div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Private Masterclass</h1>
          <p className="text-sanctum-300 text-center mb-8">Enter your registered email to join the live session.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" className="w-full px-4 py-3 bg-sanctum-900 border border-sanctum-300/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors" />
            {error && <div className="flex items-center gap-2 text-red-400 text-sm"><AlertCircle size={16} /> {error}</div>}
            <button type="submit" disabled={isLoading} className="w-full py-3 bg-gold-500 hover:bg-gold-400 text-sanctum-900 font-bold rounded-lg transition-colors disabled:opacity-50">{isLoading ? 'Verifying...' : 'Join Masterclass'}</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-sanctum-900 flex flex-col pt-16 md:pt-20">
      <div className="flex-1 max-w-[1600px] w-full mx-auto p-4 flex flex-col lg:flex-row gap-4 lg:gap-6 h-[calc(100dvh-80px)]">

        {/* Left Column: Handled by Stage Component */}
        <Stage isLive={isLive} timeLeft={timeLeft} />

        {/* Right Column: Interaction Hub - FIX: Removed flex-1 to keep strict width */}
        <div className="w-full lg:w-[400px] flex flex-col bg-sanctum-800 rounded-2xl border border-sanctum-300/10 overflow-hidden shrink-0 min-h-[400px] lg:min-h-0 relative">

          <div className="p-4 border-b border-sanctum-300/10 bg-sanctum-900/50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs text-sanctum-300 flex items-center gap-1 truncate max-w-[150px]">
                <User size={12} className="shrink-0" /> Logged in as {user.full_name.split(' ')[0]}
              </span>
              {isAdmin && (
                <div className="flex items-center gap-2">
                  <button onClick={handleToggleLive} className={`text-[10px] px-3 py-1.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${isLive ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-green-500 text-sanctum-900 hover:bg-green-400'}`}>
                    {isLive ? <><Video size={12}/> End Stream</> : <><Radio size={12}/> Go Live</>}
                  </button>
                  <button onClick={() => handleClearAll(activeTab === 'chat' ? 'chat_messages' : activeTab === 'qa' ? 'questions' : 'polls')} className="text-[10px] px-2 py-1.5 bg-sanctum-900 border border-sanctum-300/20 text-sanctum-300 rounded hover:text-white transition-colors uppercase tracking-wider">
                    Clear {activeTab}
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-1 bg-sanctum-900 p-1 rounded-lg">
              <button onClick={() => setActiveTab('chat')} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'chat' ? 'bg-sanctum-800 text-gold-500 shadow-sm' : 'text-sanctum-300 hover:text-white'}`}><MessageSquare size={16} /> Chat</button>
              <button onClick={() => setActiveTab('qa')} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'qa' ? 'bg-sanctum-800 text-cyan-400 shadow-sm' : 'text-sanctum-300 hover:text-white'}`}><MessageCircleQuestion size={16} /> Q&A</button>
              <button onClick={() => setActiveTab('polls')} className={`flex-1 py-2 text-sm font-bold rounded-md flex items-center justify-center gap-2 transition-all ${activeTab === 'polls' ? 'bg-sanctum-800 text-purple-400 shadow-sm' : 'text-sanctum-300 hover:text-white'}`}><BarChart2 size={16} /> Polls</button>
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-sanctum-900/20 pb-20">
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && <ChatTab messages={messages} user={user} isAdmin={isAdmin} handleDeleteMessage={handleDeleteMessage} chatEndRef={chatEndRef} newMessage={newMessage} setNewMessage={setNewMessage} handleSendMessage={handleSendMessage} />}
              {activeTab === 'qa' && <QATab questions={questions} user={user} isAdmin={isAdmin} handleUpvote={handleUpvote} handleDeleteMessage={handleDeleteMessage} newQuestion={newQuestion} setNewQuestion={setNewQuestion} handleAskQuestion={handleAskQuestion} />}
              {activeTab === 'polls' && <PollsTab polls={polls} pollVotes={pollVotes} user={user} isAdmin={isAdmin} handleCreatePoll={handleCreatePoll} handleVote={handleVote} handleEndPoll={handleEndPoll} handleDeleteMessage={handleDeleteMessage} newPollQuestion={newPollQuestion} setNewPollQuestion={setNewPollQuestion} newPollOptions={newPollOptions} setNewPollOptions={setNewPollOptions} />}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}