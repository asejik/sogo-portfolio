import { motion } from 'framer-motion';
import { Send, Trash2 } from 'lucide-react';

interface ChatTabProps {
  messages: any[]; user: any; isAdmin: boolean;
  handleDeleteMessage: (id: string, table: any) => void;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  newMessage: string; setNewMessage: (val: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
}

export default function ChatTab({ messages, user, isAdmin, handleDeleteMessage, chatEndRef, newMessage, setNewMessage, handleSendMessage }: ChatTabProps) {
  const formatTime = (isoString: string) => new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
        {messages.length === 0 ? <p className="text-sanctum-300 text-sm text-center italic mt-4">Say hello to the room!</p> : (
          messages.map((msg) => {
            const isMe = msg.user_id === user.id || msg.users?.full_name === user.full_name;
            return (
              <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} mb-4 group`}>
                <div className="flex items-baseline gap-2 mb-1 px-1">
                  <span className={`text-xs font-bold ${isMe ? 'text-gold-500' : 'text-cyan-400'}`}>{isMe ? 'You' : msg.users?.full_name}</span>
                  <span className="text-[10px] text-sanctum-300/50 font-mono">{formatTime(msg.created_at)}</span>
                  {isAdmin && <button onClick={() => handleDeleteMessage(msg.id, 'chat_messages')} className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 ml-2"><Trash2 size={12} /></button>}
                </div>
                <div className={`px-4 py-2 rounded-2xl text-sm max-w-[85%] shadow-sm ${isMe ? 'bg-gold-500/10 text-white rounded-tr-sm border border-gold-500/20' : 'bg-sanctum-800 text-sanctum-100 rounded-tl-sm border border-sanctum-300/10'}`}>{msg.message}</div>
              </div>
            );
          })
        )}
        <div ref={chatEndRef} className="h-1" />
      </motion.div>

      <form onSubmit={handleSendMessage} className="absolute bottom-0 left-0 right-0 p-4 bg-sanctum-900/50 border-t border-sanctum-300/10 shrink-0 backdrop-blur-md">
        <div className="flex gap-2">
          <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-1 px-4 py-2 bg-sanctum-900 border border-sanctum-300/20 rounded-lg text-white focus:outline-none focus:border-cyan-400 text-sm" />
          <button type="submit" disabled={!newMessage.trim()} className="p-2 rounded-lg disabled:opacity-50 transition-colors bg-gold-500 hover:bg-gold-400 text-sanctum-900"><Send size={18} /></button>
        </div>
      </form>
    </>
  );
}