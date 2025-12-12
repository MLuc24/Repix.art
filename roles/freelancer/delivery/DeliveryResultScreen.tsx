
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';

interface DeliveryResultScreenProps {
  onBackToDashboard: () => void;
  projectName: string;
}

export const DeliveryResultScreen = ({ onBackToDashboard, projectName }: DeliveryResultScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up">
      
      <div className="relative mb-8">
         <div className="w-32 h-32 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 shadow-[0_0_60px_rgba(34,197,94,0.15)] animate-pulse-slow">
            <Icons.Check className="w-12 h-12 text-green-500" />
         </div>
         <div className="absolute -bottom-2 -right-2 p-3 bg-[#1a1b26] rounded-xl border border-white/10 shadow-xl">
            <Icons.Download className="w-6 h-6 text-white" />
         </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-2 text-center">Delivery Ready!</h2>
      <p className="text-slate-400 text-center max-w-md mb-10">
        Your assets for <span className="text-white font-medium">"{projectName}"</span> have been processed, packed, and are ready for the client.
      </p>

      <div className="w-full max-w-md space-y-4">
         <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
               <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400"><Icons.FileText className="w-5 h-5" /></div>
               <div className="text-left">
                  <p className="text-sm font-bold text-white">Download ZIP</p>
                  <p className="text-xs text-slate-500">245 MB • Package_v1.zip</p>
               </div>
            </div>
            <Icons.Download className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
         </div>

         <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
               <div className="p-2 rounded-lg bg-violet-500/20 text-violet-400"><Icons.ArrowRight className="w-5 h-5" /></div>
               <div className="text-left">
                  <p className="text-sm font-bold text-white">Copy Client Link</p>
                  <p className="text-xs text-slate-500">repix.art/d/x829m...</p>
               </div>
            </div>
            <Icons.Copy className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
         </div>
      </div>

      <div className="mt-12 flex gap-4">
         <NeonButton onClick={onBackToDashboard} className="!w-auto px-8">
            Back to Dashboard
         </NeonButton>
         <button className="px-6 py-3 rounded-xl border border-white/10 text-slate-400 font-bold text-sm hover:text-white hover:bg-white/5 transition-colors">
            View Project
         </button>
      </div>

    </div>
  );
};
