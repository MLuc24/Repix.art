
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

export const FreelancerDashboardCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-cyan-900/10 to-blue-900/10 border border-cyan-500/20 hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all group h-full w-full"
    >
      <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-cyan-500/20">
        <Icons.Briefcase className="w-6 h-6 text-cyan-400" />
      </div>
      <h3 className="text-sm font-bold text-white mb-1">Client Projects</h3>
      <p className="text-xs text-slate-400 mb-4 text-center">Manage your freelance jobs</p>
      
      <div className="px-4 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider group-hover:bg-cyan-500 group-hover:text-black transition-colors">
        Open
      </div>
    </button>
  );
};
