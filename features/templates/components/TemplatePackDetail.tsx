
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TemplatePack, Template } from '../types';
import { TemplateCard } from './TemplateUI';

interface TemplatePackDetailProps {
  pack: TemplatePack;
  onBack: () => void;
  onPreviewTemplate: (t: Template) => void;
  onUseTemplate: (t: Template) => void;
}

export const TemplatePackDetail = ({ pack, onBack, onPreviewTemplate, onUseTemplate }: TemplatePackDetailProps) => {
  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <Icons.ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-white">{pack.title}</h2>
          <p className="text-slate-400 text-sm">{pack.description}</p>
        </div>
        <div className="ml-auto">
           <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium">
             <Icons.Star className="w-4 h-4" /> Save Pack
           </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pack.items.map((template, idx) => (
          <TemplateCard 
            key={template.id} 
            template={template} 
            index={idx}
            onPreview={onPreviewTemplate}
            onUse={onUseTemplate}
          />
        ))}
      </div>
    </div>
  );
};
