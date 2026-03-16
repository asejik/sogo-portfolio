import { motion } from 'framer-motion';
import { Trash2, BarChart2, Plus, X as CloseIcon } from 'lucide-react';

interface PollsTabProps {
  polls: any[]; pollVotes: any[]; user: any; isAdmin: boolean;
  handleCreatePoll: (e: React.FormEvent) => void;
  handleVote: (pollId: string, optionIndex: number) => void;
  handleEndPoll: (pollId: string) => void;
  handleDeleteMessage: (id: string, table: any) => void;
  newPollQuestion: string; setNewPollQuestion: (val: string) => void;
  newPollOptions: string[]; setNewPollOptions: (val: string[]) => void;
}

export default function PollsTab({ polls, pollVotes, user, isAdmin, handleCreatePoll, handleVote, handleEndPoll, handleDeleteMessage, newPollQuestion, setNewPollQuestion, newPollOptions, setNewPollOptions }: PollsTabProps) {
  return (
    <motion.div key="polls" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      {isAdmin && (
        <div className="bg-sanctum-900/50 p-4 rounded-xl border border-gold-500/30 mb-6">
          <h4 className="text-sm font-bold text-gold-500 mb-3 flex items-center gap-2"><BarChart2 size={16}/> Create New Poll</h4>
          <form onSubmit={handleCreatePoll} className="space-y-3">
            <input type="text" placeholder="Poll Question" value={newPollQuestion} onChange={e => setNewPollQuestion(e.target.value)} className="w-full px-3 py-2 bg-sanctum-800 border border-sanctum-300/20 rounded-lg text-white text-sm" />
            {newPollOptions.map((opt, i) => (
              <div key={i} className="flex gap-2">
                <input type="text" placeholder={`Option ${i + 1}`} value={opt} onChange={e => { const newOpts = [...newPollOptions]; newOpts[i] = e.target.value; setNewPollOptions(newOpts); }} className="flex-1 px-3 py-2 bg-sanctum-800 border border-sanctum-300/20 rounded-lg text-white text-sm" />
                {i >= 2 && <button type="button" onClick={() => setNewPollOptions(newPollOptions.filter((_, idx) => idx !== i))} className="p-2 text-red-400 hover:bg-sanctum-800 rounded-lg"><CloseIcon size={16}/></button>}
              </div>
            ))}
            <button type="button" onClick={() => setNewPollOptions([...newPollOptions, ''])} className="text-xs text-cyan-400 flex items-center gap-1 hover:text-cyan-300"><Plus size={12}/> Add Option</button>
            <button type="submit" className="w-full py-2 bg-gold-500 text-sanctum-900 font-bold rounded-lg text-sm hover:bg-gold-400">Launch Poll</button>
          </form>
        </div>
      )}

      {polls.length === 0 ? <p className="text-sanctum-300 text-sm text-center italic mt-4">No polls available right now.</p> : (
        polls.map((poll) => {
          const pollTotalVotes = pollVotes.filter(v => v.poll_id === poll.id);
          const hasVoted = pollTotalVotes.some(v => v.user_id === user.id);
          const showResults = hasVoted || !poll.is_active;

          return (
            <div key={poll.id} className="bg-sanctum-800 p-5 rounded-xl border border-sanctum-300/10 group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${poll.is_active ? 'bg-red-500/20 text-red-400' : 'bg-sanctum-900 text-sanctum-300'}`}>{poll.is_active ? 'Live' : 'Ended'}</span>
                  <h4 className="text-white font-bold mt-2 leading-snug">{poll.question}</h4>
                </div>
                <div className="flex gap-2">
                  {isAdmin && poll.is_active && <button onClick={() => handleEndPoll(poll.id)} className="text-xs bg-sanctum-900 border border-sanctum-300/20 text-sanctum-300 px-2 py-1 rounded hover:text-white">End</button>}
                  {isAdmin && <button onClick={() => handleDeleteMessage(poll.id, 'polls')} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300"><Trash2 size={14}/></button>}
                </div>
              </div>

              <div className="space-y-2 mt-4">
                {poll.options.map((option: string, index: number) => {
                  const optionVotes = pollTotalVotes.filter(v => v.option_index === index).length;
                  const percent = pollTotalVotes.length === 0 ? 0 : Math.round((optionVotes / pollTotalVotes.length) * 100);
                  const isMyVote = pollTotalVotes.some(v => v.user_id === user.id && v.option_index === index);

                  if (showResults) {
                    return (
                      <div key={index} className="relative w-full bg-sanctum-900 rounded-lg overflow-hidden border border-sanctum-300/5 p-3 flex justify-between items-center z-0">
                        <div className={`absolute top-0 left-0 h-full -z-10 transition-all duration-1000 ${isMyVote ? 'bg-cyan-500/30' : 'bg-sanctum-700/50'}`} style={{ width: `${percent}%` }} />
                        <span className={`text-sm z-10 ${isMyVote ? 'text-cyan-400 font-bold' : 'text-sanctum-100'}`}>{option}</span>
                        <span className="text-xs font-mono text-sanctum-300 z-10">{percent}%</span>
                      </div>
                    );
                  }

                  return (
                    <button key={index} onClick={() => handleVote(poll.id, index)} disabled={!poll.is_active} className="w-full text-left p-3 rounded-lg border border-sanctum-300/10 hover:border-cyan-400 hover:bg-cyan-400/10 text-sanctum-100 text-sm transition-colors">
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="mt-3 text-right"><span className="text-[10px] text-sanctum-300 font-mono">{pollTotalVotes.length} votes</span></div>
            </div>
          );
        })
      )}
    </motion.div>
  );
}