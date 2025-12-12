
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { Project, Client } from '../../../services/mock/freelancer';
import { NeonButton } from '../../../shared/components/GlassUI';

interface ProjectHeaderProps {
  project: Project;
  client?: Client;
  onStatusChange: (status: Project['status']) => void;
  onBack: () => void;
  onDeliver: () => void;
  onOpenReview?: () => void; // Add this prop
}

const STATUS_CONFIG = {
  'Draft': { color: 'text-slate-400 border-slate-500/30 bg-slate-500/10', icon: <Icons.FileText className="w-3 h-3" /> },
  'In Review': { color: 'text-orange-400 border-orange-500/30 bg-orange-500/10', icon: <Icons.Eye className="w-3 h-3" /> },
  'Approved': { color: 'text-green-400 border-green-500/30 bg-green-500/10', icon: <Icons.Check className="w-3 h-3" /> },
  'Completed': { color: 'text-blue-400 border-blue-500/30 bg-blue-500/10', icon: <Icons.Check className="w-3 h-3" /> }
};

export const ProjectHeader = ({ project, client, onStatusChange, onBack, onDeliver, onOpenReview }: ProjectHeaderProps) => {
  const statusCfg = STATUS_CONFIG[project.status];

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5 animate-fade-in-up">
      <div className="flex-1">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors mb-3"
        >
          <Icons.ChevronLeft className="w-4 h-4" /> Back to Projects
        </button>
        
        <div className="flex items-start gap-4">
           {/* Thumbnail/Icon */}
           <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/20 flex items-center justify-center shrink-0">
              <Icons.Briefcase className="w-8 h-8 text-cyan-500" />
           </div>

           <div>
              <div className="flex items-center gap-3 mb-1">
                 <h1 className="text-2xl font-bold text-white tracking-tight">{project.name}</h1>
                 {/* Status Dropdown Trigger (Mock) */}
                 <button 
                   onClick={() => {
                      // Cycle status for demo
                      const states: Project['status'][] = ['Draft', 'In Review', 'Approved'];
                      const next = states[(states.indexOf(project.status) + 1) % states.length];
                      onStatusChange(next);
                   }}
                   className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${statusCfg.color} hover:opacity-80 transition-opacity`}
                 >
                    {statusCfg.icon}
                    {project.status}
                 </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                 {client && (
                   <div className="flex items-center gap-2">
                      <img src={client.avatar} className="w-5 h-5 rounded-full border border-white/10" alt="" />
                      <span className="text-slate-300">{client.name}</span>
                   </div>
                 )}
                 <span className="w-1 h-1 rounded-full bg-slate-600" />
                 <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
           </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
         {/* Share / Review Button */}
         <button 
           onClick={onOpenReview}
           className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-sm font-bold hover:bg-white/10 transition-all flex items-center gap-2"
         >
           <Icons.ArrowRight className="w-4 h-4" /> Client View
         </button>
         
         {project.status === 'Approved' && (
           <NeonButton onClick={onDeliver} className="!w-auto px-6 bg-gradient-to-r from-green-600 to-emerald-600">
             <div className="flex items-center gap-2">
               <Icons.Download className="w-4 h-4" /> Deliver Files
             </div>
           </NeonButton>
         )}
      </div>
    </div>
  );
};
