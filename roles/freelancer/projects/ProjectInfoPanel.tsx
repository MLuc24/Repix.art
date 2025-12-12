
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { Project } from '../../../services/mock/freelancer';

interface ProjectInfoPanelProps {
  project: Project;
  assetCount: number;
}

export const ProjectInfoPanel = ({ project, assetCount }: ProjectInfoPanelProps) => {
  return (
    <div className="w-full lg:w-80 border-l border-white/5 bg-[#131418] p-6 hidden lg:flex flex-col h-full overflow-y-auto">
      
      {/* Description */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">About Project</h3>
        <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
          {project.description || "No description provided."}
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Overview</h3>
        <div className="grid grid-cols-2 gap-3">
           <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-1 text-cyan-400">
                 <Icons.Image className="w-4 h-4" />
                 <span className="text-lg font-bold text-white">{assetCount}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Total Assets</span>
           </div>
           <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2 mb-1 text-amber-400">
                 <Icons.Bolt className="w-4 h-4" />
                 <span className="text-lg font-bold text-white">{project.creditsUsed || 0}</span>
              </div>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Credits Used</span>
           </div>
        </div>
      </div>

      {/* Notes */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Project Notes</h3>
           <span className="text-[9px] text-slate-500 bg-white/5 px-2 py-0.5 rounded">Auto-saved</span>
        </div>
        <textarea 
          className="flex-1 w-full bg-[#0e0f13] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:border-cyan-500/50 outline-none resize-none transition-colors"
          placeholder="Type client feedback, ideas, or to-dos here..."
          defaultValue="- Need to check color grading on the second batch."
        />
      </div>

    </div>
  );
};
