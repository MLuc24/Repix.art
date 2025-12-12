
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';

export const UploadControlsPro = () => {
  const [compress, setCompress] = useState(true);
  const [paused, setPaused] = useState(false);

  return (
    <div className="bg-[#0e0f13] border-t border-white/5 p-2 flex items-center justify-between px-4">
       <div className="flex items-center gap-4">
          <button 
            onClick={() => setPaused(!paused)}
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            {paused ? <Icons.ArrowRight className="w-3 h-3" /> : <Icons.Close className="w-3 h-3" />}
            {paused ? 'Resume Queue' : 'Pause Queue'}
          </button>
          <div className="h-4 w-px bg-white/10" />
          <button 
            onClick={() => setCompress(!compress)}
            className={`flex items-center gap-2 text-xs font-bold transition-colors ${compress ? 'text-green-400' : 'text-slate-500'}`}
          >
            <div className={`w-3 h-3 rounded-full border ${compress ? 'bg-green-400 border-green-400' : 'border-slate-500'}`} />
            Smart Compress
          </button>
       </div>
       
       <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono uppercase tracking-wider">
          <Icons.Zap className="w-3 h-3" />
          <span>Chunked Upload Active</span>
       </div>
    </div>
  );
};
