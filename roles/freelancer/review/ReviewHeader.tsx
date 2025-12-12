
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { ReviewSession } from '../../../services/mock/review';

interface ReviewHeaderProps {
  session: ReviewSession;
  onApprove: () => void;
  onRequestChanges: () => void;
}

export const ReviewHeader = ({ session, onApprove, onRequestChanges }: ReviewHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0e0f14]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Project Info */}
        <div className="flex items-center gap-4 w-full md:w-auto">
           <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
             R
           </div>
           <div>
             <h1 className="text-lg font-bold text-white leading-tight">{session.projectName}</h1>
             <div className="flex items-center gap-2 text-xs text-slate-400">
               <span>by {session.freelancerName}</span>
               <span className="w-1 h-1 rounded-full bg-slate-600" />
               <span className={`font-bold ${session.status === 'Approved' ? 'text-green-400' : session.status === 'Changes Requested' ? 'text-orange-400' : 'text-blue-400'}`}>
                 {session.status}
               </span>
             </div>
           </div>
        </div>

        {/* Actions (Only show if not approved yet) */}
        {session.status !== 'Approved' && (
          <div className="flex items-center gap-3 w-full md:w-auto">
             <button 
               onClick={onRequestChanges}
               className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-sm transition-colors"
             >
               Request Changes
             </button>
             <NeonButton 
               onClick={onApprove}
               className="flex-1 md:flex-none !w-auto px-8 bg-gradient-to-r from-green-600 to-emerald-600"
             >
               <div className="flex items-center gap-2">
                 <Icons.Check className="w-4 h-4" /> Approve
               </div>
             </NeonButton>
          </div>
        )}

      </div>
    </header>
  );
};
