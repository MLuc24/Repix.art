
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';

interface ProRefineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ProRefineModal = ({ isOpen, onClose, onConfirm }: ProRefineModalProps) => {
  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white max-w-md">
      <div className="text-center mb-6">
         <div className="w-16 h-16 mx-auto rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
            <Icons.Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
         </div>
         <h2 className="text-2xl font-bold text-white mb-2">Refine Album with AI</h2>
         <p className="text-sm text-slate-400">Transform your raw dump into a curated gallery instantly.</p>
      </div>

      <div className="space-y-4 mb-8">
         <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="p-2 rounded-lg bg-green-500/20 text-green-400"><Icons.Trash className="w-4 h-4" /></div>
            <div>
               <h4 className="text-sm font-bold text-white">Clean Up</h4>
               <p className="text-xs text-slate-400">Auto-remove blurry photos and near-duplicates.</p>
            </div>
         </div>
         <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400"><Icons.Star className="w-4 h-4" /></div>
            <div>
               <h4 className="text-sm font-bold text-white">Best Shot Selection</h4>
               <p className="text-xs text-slate-400">AI highlights the best smile and composition.</p>
            </div>
         </div>
         <div className="flex items-start gap-4 p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400"><Icons.Bolt className="w-4 h-4" /></div>
            <div>
               <h4 className="text-sm font-bold text-white">Auto Enhance</h4>
               <p className="text-xs text-slate-400">Apply light correction to all photos.</p>
            </div>
         </div>
      </div>

      <div className="space-y-3">
         <NeonButton onClick={onConfirm} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-900/20">
            Start Refinement (1 Credit)
         </NeonButton>
         <button onClick={onClose} className="w-full py-3 text-xs font-bold text-slate-500 hover:text-white transition-colors">
            Cancel
         </button>
      </div>
    </GlassModal>
  );
};
