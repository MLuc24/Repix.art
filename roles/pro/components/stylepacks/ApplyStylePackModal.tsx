
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../../shared/components/GlassUI';
import { StylePack } from '../../../../features/style-packs/types';

interface ApplyStylePackModalProps {
  isOpen: boolean;
  onClose: () => void;
  pack: StylePack | null;
  onConfirm: () => void;
}

export const ApplyStylePackModal = ({ isOpen, onClose, pack, onConfirm }: ApplyStylePackModalProps) => {
  const [applyMode, setApplyMode] = useState<'current' | 'all'>('current');

  if (!pack) return null;

  return (
    <GlassModal 
      isOpen={isOpen} 
      onClose={onClose} 
      className="!bg-[#1a1b26] !border-white/10 text-white max-w-sm"
    >
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-violet-500/20 mb-4">
           <Icons.Wand className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">Apply {pack.name}</h3>
        <p className="text-xs text-slate-400">Select how you want to apply this style.</p>
      </div>

      <div className="space-y-3 mb-8">
         <button 
           onClick={() => setApplyMode('current')}
           className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${applyMode === 'current' ? 'bg-violet-600/20 border-violet-500 text-white' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
         >
            <div className="flex items-center gap-3">
               <Icons.Image className="w-4 h-4" />
               <span className="text-sm font-bold">Current Image</span>
            </div>
            {applyMode === 'current' && <Icons.Check className="w-4 h-4 text-violet-400" />}
         </button>

         <button 
           onClick={() => setApplyMode('all')}
           className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${applyMode === 'all' ? 'bg-violet-600/20 border-violet-500 text-white' : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'}`}
         >
            <div className="flex items-center gap-3">
               <Icons.Layout className="w-4 h-4" />
               <span className="text-sm font-bold">Entire Project</span>
            </div>
            {applyMode === 'all' && <Icons.Check className="w-4 h-4 text-violet-400" />}
         </button>
      </div>

      <div className="space-y-3">
        <NeonButton onClick={onConfirm} className="w-full">
           Apply ({pack.price} Credits)
        </NeonButton>
        <button onClick={onClose} className="w-full py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </GlassModal>
  );
};
