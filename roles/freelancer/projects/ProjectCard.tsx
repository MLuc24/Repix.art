
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { Project, Client } from '../../../services/mock/freelancer';

interface ProjectCardProps {
  project: Project;
  client?: Client;
  onOpen: () => void;
  onDeliver?: () => void;
  key?: React.Key;
}

const getStatusStyle = (status: string) => {
  switch (status) {
    case 'Draft': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    case 'In Review': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    case 'Approved': return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'Completed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
  }
};

export const ProjectCard = ({ project, client, onOpen, onDeliver }: ProjectCardProps) => {
  const statusStyle = getStatusStyle(project.status);

  return (
    <div 
      onClick={onOpen}
      className="group relative flex flex-col p-5 rounded-2xl bg-[#1a1b26] border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/10 cursor-pointer"
    >
      {/* Header: Status & Menu */}
      <div className="flex justify-between items-start mb-4">
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${statusStyle}`}>
          {project.status}
        </span>
        <button className="p-1 text-slate-500 hover:text-white transition-colors">
          <Icons.Grid className="w-4 h-4" />
        </button>
      </div>

      {/* Body: Thumbnail & Info */}
      <div className="flex-1 mb-4">
        <div className="flex items-start gap-4">
           {/* Simple Thumbnail/Placeholder */}
           <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-800 border border-white/5 flex-none">
             {project.thumbnail ? (
               <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-slate-600">
                 <Icons.Image className="w-6 h-6" />
               </div>
             )}
           </div>
           
           <div className="min-w-0">
             <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors truncate">
               {project.name}
             </h3>
             <div className="flex items-center gap-2 text-slate-400 text-xs">
                {client?.avatar ? (
                  <img src={client.avatar} className="w-4 h-4 rounded-full" alt="" />
                ) : (
                  <Icons.User className="w-3 h-3" />
                )}
                <span className="truncate">{client?.name || 'Unknown Client'}</span>
             </div>
           </div>
        </div>
      </div>

      {/* Footer: Date & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <span className="text-[10px] text-slate-500 font-mono">
          {new Date(project.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-2">
          {project.status === 'Approved' && onDeliver && (
            <button 
              onClick={(e) => { e.stopPropagation(); onDeliver(); }}
              className="px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-400 text-[10px] font-bold border border-green-500/20 transition-colors"
            >
              Deliver
            </button>
          )}
          <button className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors">
            <Icons.ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
