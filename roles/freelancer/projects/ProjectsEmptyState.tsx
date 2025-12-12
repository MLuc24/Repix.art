
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';

export const ProjectsEmptyState = ({ onCreate }: { onCreate: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
      <div className="w-24 h-24 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-6">
        <Icons.Briefcase className="w-10 h-10 text-slate-600" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">No Projects Yet</h3>
      <p className="text-slate-400 max-w-xs mb-8 text-sm leading-relaxed">
        You haven't created any client projects yet. Start tracking your freelance work now.
      </p>
      <NeonButton onClick={onCreate} className="!w-auto px-8 bg-gradient-to-r from-cyan-600 to-blue-600">
        Create Your First Project
      </NeonButton>
    </div>
  );
};
