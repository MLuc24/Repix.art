
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

export const FreelancerBadge = () => {
  return (
    <div className="group relative inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
      <Icons.Briefcase className="w-3.5 h-3.5" />
      <span className="text-[10px] font-bold uppercase tracking-wider">Freelancer</span>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[#1a1b26] border border-white/10 rounded-lg text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl z-10">
        <p className="text-[10px] text-slate-300 leading-tight">
          You can now manage client projects and deliveries.
        </p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1a1b26]" />
      </div>
    </div>
  );
};
