import { motion } from 'framer-motion';
import { Send, Trash2, ThumbsUp } from 'lucide-react';

interface QATabProps {
  questions: any[]; user: any; isAdmin: boolean;
  handleUpvote: (id: string, upvotes: string[]) => void;
  handleDeleteMessage: (id: string, table: any) => void;
  newQuestion: string; setNewQuestion: (val: string) => void;
  handleAskQuestion: (e: React.FormEvent) => void;
}

export default function QATab({ questions, user, isAdmin, handleUpvote, handleDeleteMessage, newQuestion, setNewQuestion, handleAskQuestion }: QATabProps) {
  const sortedQuestions = [...questions].sort((a, b) => {
    const aVotes = a.upvoted_by?.length || 0;
    const bVotes = b.upvoted_by?.length || 0;
    if (bVotes !== aVotes) return bVotes - aVotes;
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  return (
    <>
      <motion.div key="qa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 pb-20">
        {sortedQuestions.length === 0 ? <p className="text-sanctum-300 text-sm text-center italic mt-4">No questions yet. Ask the first one!</p> : (
          sortedQuestions.map((q) => {
            const upvotes = q.upvoted_by || [];
            const hasUpvoted = upvotes.includes(user.id);
            return (
              <div key={q.id} className="bg-sanctum-800 p-4 rounded-xl border border-sanctum-300/10 flex gap-4 group">
                <div className="flex flex-col items-center gap-1">
                  <button onClick={() => handleUpvote(q.id, upvotes)} className={`p-1.5 rounded-lg transition-colors ${hasUpvoted ? 'bg-cyan-400/20 text-cyan-400' : 'bg-sanctum-900 text-sanctum-300 hover:text-cyan-400'}`}><ThumbsUp size={16} className={hasUpvoted ? 'fill-cyan-400' : ''} /></button>
                  <span className={`text-xs font-bold ${hasUpvoted ? 'text-cyan-400' : 'text-sanctum-300'}`}>{upvotes.length}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-bold text-sanctum-300 truncate">{q.users?.full_name}</span>
                    {isAdmin && <button onClick={() => handleDeleteMessage(q.id, 'questions')} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 ml-2 shrink-0"><Trash2 size={12} /></button>}
                  </div>
                  <p className="text-sm text-white break-words">{q.question}</p>
                </div>
              </div>
            );
          })
        )}
      </motion.div>

      <form onSubmit={handleAskQuestion} className="absolute bottom-0 left-0 right-0 p-4 bg-sanctum-900/50 border-t border-sanctum-300/10 shrink-0 backdrop-blur-md">
        <div className="flex gap-2">
          <input type="text" value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} placeholder="Ask the hosts a question..." className="flex-1 px-4 py-2 bg-sanctum-900 border border-sanctum-300/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm" />
          <button type="submit" disabled={!newQuestion.trim()} className="p-2 rounded-lg disabled:opacity-50 transition-colors bg-cyan-500 hover:bg-cyan-400 text-sanctum-900"><Send size={18} /></button>
        </div>
      </form>
    </>
  );
}