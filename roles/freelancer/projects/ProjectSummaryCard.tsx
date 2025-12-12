
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { ProjectStats } from '../../../services/mock/freelancer';

export const ProjectSummaryCard = ({ stats }: { stats: ProjectStats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* Rounds */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
         <div className="flex items-center gap-2 mb-2 text-blue-400">
            <Icons.Refresh className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Rounds</span>
         </div>
         <p className="text-2xl font-bold text-white">{stats.rounds}</p>
      </div>

      {/* Time to Approve */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
         <div className="flex items-center gap-2 mb-2 text-green-400">
            <Icons.Check className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Approval</span>
         </div>
         <p className="text-2xl font-bold text-white">{stats.timeToApprove}</p>
      </div>

      {/* Total Images */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
         <div className="flex items-center gap-2 mb-2 text-fuchsia-400">
            <Icons.Image className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Images</span>
         </div>
         <p className="text-2xl font-bold text-white">{stats.totalImages}</p>
      </div>

      {/* Credits */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
         <div className="flex items-center gap-2 mb-2 text-amber-400">
            <Icons.Bolt className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Credits</span>
         </div>
         <p className="text-2xl font-bold text-white">{stats.creditsUsed}</p>
      </div>
    </div>
  );
};
