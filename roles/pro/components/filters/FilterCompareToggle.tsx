
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';

export const FilterCompareToggle = () => {
  return (
    <button 
      className="
        group relative flex items-center justify-center w-8 h-8 rounded-lg 
        bg-white/5 border border-white/10 hover:bg-white/10 transition-all
        active:scale-95 active:bg-amber-500/20 active:border-amber-500/50
      "
      title="Press & Hold to Compare"
      onMouseDown={() => document.body.classList.add('compare-active')}
      onMouseUp={() => document.body.classList.remove('compare-active')}
      onTouchStart={() => document.body.classList.add('compare-active')}
      onTouchEnd={() => document.body.classList.remove('compare-active')}
    >
      <Icons.Compare className="w-4 h-4 text-slate-400 group-hover:text-white group-active:text-amber-400 transition-colors" />
    </button>
  );
};
