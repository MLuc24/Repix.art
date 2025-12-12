
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../../shared/components/GlassUI';
import { SyncConflict } from '../../../../features/sync/types';

interface ConflictResolveModalProps {
  isOpen: boolean;
  conflict: SyncConflict | null;
  onResolve: (decision: 'local' | 'cloud' | 'both') => void;
}

export const ConflictResolveModal = ({ isOpen, conflict, onResolve }: ConflictResolveModalProps) => {
  if (!conflict) return null;

  return (
    <GlassModal isOpen={isOpen} onClose={() => {}} className="!bg-[#1a1b26] !border-white/10 text-white max-w-3xl">
      
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
           <Icons.AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">Sync Conflict Detected</h3>
        <p className="text-sm text-slate-400">"{conflict.filename}" exists in both locations. Which version do you want to keep?</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
         
         {/* LOCAL */}
         <div className="relative group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all cursor-pointer" onClick={() => onResolve('local')}>
            <span className="absolute top-4 left-4 px-2 py-1 bg-black/60 rounded text-[10px] font-bold uppercase text-white backdrop-blur">Local Version</span>
            <img src={conflict.local.thumbnail} className="w-full aspect-video object-cover rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="space-y-1 text-xs text-slate-400">
               <div className="flex justify-between"><span className="text-slate-500">Size</span> <span className="text-white">{conflict.local.size}</span></div>
               <div className="flex justify-between"><span className="text-slate-500">Modified</span> <span className="text-white">{conflict.local.date}</span></div>
            </div>
            <div className="mt-4 w-full py-2 rounded-lg bg-white/5 text-center text-xs font-bold text-slate-300 group-hover:bg-violet-600 group-hover:text-white transition-colors">Keep Local</div>
         </div>

         {/* CLOUD */}
         <div className="relative group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer" onClick={() => onResolve('cloud')}>
            <span className="absolute top-4 left-4 px-2 py-1 bg-black/60 rounded text-[10px] font-bold uppercase text-white backdrop-blur">Cloud Version</span>
            <img src={conflict.cloud.thumbnail} className="w-full aspect-video object-cover rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <div className="space-y-1 text-xs text-slate-400">
               <div className="flex justify-between"><span className="text-slate-500">Size</span> <span className="text-white">{conflict.cloud.size}</span></div>
               <div className="flex justify-between"><span className="text-slate-500">Modified</span> <span className="text-white">{conflict.cloud.date}</span></div>
            </div>
            <div className="mt-4 w-full py-2 rounded-lg bg-white/5 text-center text-xs font-bold text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">Keep Cloud</div>
         </div>

      </div>

      <div className="flex justify-center">
         <button onClick={() => onResolve('both')} className="text-sm text-slate-500 hover:text-white transition-colors underline decoration-slate-700 underline-offset-4">
            Keep both (Rename local file)
         </button>
      </div>

    </GlassModal>
  );
};
