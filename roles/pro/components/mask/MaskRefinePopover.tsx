
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { EditorSlider } from '../../../../features/editor/components/EditorUI';

interface MaskRefinePopoverProps {
  onClose: () => void;
  onApply: (strength: number) => void;
}

export const MaskRefinePopover = ({ onClose, onApply }: MaskRefinePopoverProps) => {
  const [strength, setStrength] = useState(50);

  return (
    <div className="absolute top-[-180px] left-0 right-0 bg-[#1a1b26]/95 backdrop-blur-xl border border-teal-500/30 rounded-2xl p-4 shadow-2xl z-50 animate-fade-in-up">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-2">
          <Icons.Zap className="w-3 h-3" /> Edge Refine
        </h4>
        <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
          <Icons.Close className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-4 mb-4">
        {/* Tiny preview */}
        <div className="w-16 h-16 rounded-lg bg-black/50 overflow-hidden border border-white/10 shrink-0">
           <div className="w-full h-full bg-gradient-to-tr from-white/20 to-transparent flex items-center justify-center">
             <div className="w-8 h-8 rounded-full border-2 border-white/50 border-dashed" />
           </div>
        </div>
        <div className="flex-1 pt-2">
           <EditorSlider label="Strength" value={strength} onChange={setStrength} max={100} />
        </div>
      </div>

      <div className="flex gap-2">
        <button onClick={onClose} className="flex-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[10px] font-bold text-slate-400 transition-colors">
          Cancel
        </button>
        <button onClick={() => onApply(strength)} className="flex-1 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-[10px] font-bold text-white transition-colors shadow-lg shadow-teal-500/20">
          Apply Refine
        </button>
      </div>
      
      {/* Pointer arrow */}
      <div className="absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1b26] border-b border-r border-teal-500/30 rotate-45" />
    </div>
  );
};
