
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { MOCK_ALBUM_SUGGESTIONS } from '../../../../services/mock/upload_pro';

export const AutoAlbumSuggestionBar = () => {
  return (
    <div className="bg-gradient-to-r from-violet-900/20 to-blue-900/20 border-y border-white/5 p-3 flex items-center justify-between animate-fade-in-up">
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-lg bg-violet-500/20 text-violet-300">
          <Icons.Sparkles className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold text-violet-200">AI Suggestions:</span>
        <div className="flex gap-2">
           {MOCK_ALBUM_SUGGESTIONS.map(s => (
             <button key={s.id} className="flex items-center gap-2 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group">
                <span className="text-xs text-slate-300 group-hover:text-white">{s.name} ({s.count})</span>
                <span className="text-[9px] text-green-400 font-mono">{s.confidence}%</span>
             </button>
           ))}
        </div>
      </div>
      <button className="text-xs text-slate-500 hover:text-white transition-colors">Dismiss</button>
    </div>
  );
};
