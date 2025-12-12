
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { PRO_FILTERS } from '../../../services/mock/editor_pro';

export const ProFiltersPanel = ({ activeId, onSelect }: { activeId: string, onSelect: (id: string) => void }) => {
  return (
    <div className="p-6 animate-fade-in-up h-full overflow-y-auto custom-scrollbar pb-24">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Icons.Wand className="text-fuchsia-400" /> Pro Filters
        </h3>
        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/20">UNLOCKED</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {PRO_FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => onSelect(filter.id)}
            className={`
              group relative w-full aspect-[4/5] rounded-xl overflow-hidden transition-all duration-300
              ${activeId === filter.id 
                ? 'ring-2 ring-fuchsia-500 ring-offset-2 ring-offset-[#0e0f13] scale-[1.02]' 
                : 'opacity-90 hover:opacity-100 hover:scale-[1.02]'
              }
            `}
          >
            <img src={filter.src} alt={filter.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-3 left-3">
              <span className={`text-xs font-bold ${activeId === filter.id ? 'text-fuchsia-300' : 'text-white'}`}>
                {filter.name}
              </span>
            </div>
            
            {/* Quick Preview Peek on Hover */}
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay" />
          </button>
        ))}
      </div>
    </div>
  );
};
