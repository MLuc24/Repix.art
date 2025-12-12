
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../../shared/components/GlassUI';

interface ApplyBackgroundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ApplyBackgroundModal = ({ isOpen, onClose, onConfirm }: ApplyBackgroundModalProps) => {
  const [options, setOptions] = useState({
    scope: 'current',
    keepShadows: true,
    matchLighting: true,
    addGroundShadow: false
  });

  const toggle = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white max-w-sm">
      <div className="text-center mb-6">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-teal-600 to-emerald-600 flex items-center justify-center text-white shadow-xl shadow-teal-500/20 mb-4">
           <Icons.Image className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">Apply Background</h3>
        <p className="text-xs text-slate-400">Context-aware placement with AI.</p>
      </div>

      <div className="space-y-4 mb-8">
         {/* Scope */}
         <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button 
              onClick={() => setOptions(prev => ({...prev, scope: 'current'}))}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${options.scope === 'current' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Current Image
            </button>
            <button 
              onClick={() => setOptions(prev => ({...prev, scope: 'batch'}))}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${options.scope === 'batch' ? 'bg-white/10 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Batch Selected
            </button>
         </div>

         {/* Toggles */}
         <div className="space-y-2">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => toggle('keepShadows')}>
               <span className="text-sm text-slate-300">Keep Original Shadows</span>
               <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${options.keepShadows ? 'bg-green-500' : 'bg-slate-700'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${options.keepShadows ? 'translate-x-4' : 'translate-x-0'}`} />
               </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => toggle('matchLighting')}>
               <span className="text-sm text-slate-300">AI Match Lighting</span>
               <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${options.matchLighting ? 'bg-green-500' : 'bg-slate-700'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${options.matchLighting ? 'translate-x-4' : 'translate-x-0'}`} />
               </div>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors" onClick={() => toggle('addGroundShadow')}>
               <span className="text-sm text-slate-300">Add Soft Ground Shadow</span>
               <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${options.addGroundShadow ? 'bg-green-500' : 'bg-slate-700'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${options.addGroundShadow ? 'translate-x-4' : 'translate-x-0'}`} />
               </div>
            </div>
         </div>
      </div>

      <div className="space-y-3">
        <NeonButton onClick={onConfirm} className="w-full">
           Apply (1 Credit)
        </NeonButton>
        <button onClick={onClose} className="w-full py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </GlassModal>
  );
};
