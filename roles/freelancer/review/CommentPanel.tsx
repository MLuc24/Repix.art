
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { ReviewComment } from '../../../services/mock/review';

interface CommentPanelProps {
  comments: ReviewComment[];
  onAddComment: (text: string) => void;
  readOnly?: boolean;
}

export const CommentPanel = ({ comments, onAddComment, readOnly }: CommentPanelProps) => {
  const [text, setText] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(text);
      setText('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#131418] border-l border-white/5">
      
      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {comments.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-60">
            <Icons.FileText className="w-8 h-8 mb-2" />
            <p className="text-sm">No comments yet</p>
          </div>
        ) : (
          comments.map((comment) => {
            const isClient = comment.author === 'Client';
            return (
              <div key={comment.id} className={`flex flex-col ${isClient ? 'items-end' : 'items-start'}`}>
                 <div className="flex items-end gap-2 mb-1">
                    {!isClient && (
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold border border-cyan-500/30">
                        F
                      </div>
                    )}
                    <div className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm leading-relaxed ${isClient ? 'bg-violet-600 text-white rounded-tr-sm' : 'bg-[#1a1b26] border border-white/10 text-slate-300 rounded-tl-sm'}`}>
                       {comment.text}
                    </div>
                 </div>
                 <span className="text-[10px] text-slate-600 px-1">{comment.timestamp}</span>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      {/* Input */}
      {!readOnly && (
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/5 bg-[#0e0f14]">
           <div className="relative">
             <input 
               type="text" 
               value={text}
               onChange={(e) => setText(e.target.value)}
               placeholder="Write a comment..."
               className="w-full bg-[#1a1b26] border border-white/10 rounded-xl pl-4 pr-12 py-3 text-sm text-white placeholder-slate-500 focus:border-violet-500 outline-none transition-colors"
             />
             <button 
               type="submit"
               disabled={!text.trim()}
               className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-violet-600 text-white disabled:opacity-50 disabled:bg-transparent disabled:text-slate-500 transition-all hover:bg-violet-500"
             >
               <Icons.ArrowRight className="w-4 h-4" />
             </button>
           </div>
        </form>
      )}
    </div>
  );
};
