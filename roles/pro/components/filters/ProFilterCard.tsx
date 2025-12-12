
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';

export interface ProFilterType {
  id: string;
  name: string;
  desc: string;
  src: string;
  intensity?: number;
}

export interface ProFilterCardProps {
  filter: ProFilterType;
  isActive: boolean;
  onClick: () => void;
  onSettingsClick: (e: React.MouseEvent) => void;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}

export const ProFilterCard: React.FC<ProFilterCardProps> = ({ 
  filter, 
  isActive, 
  onClick, 
  onSettingsClick,
  onHoverStart,
  onHoverEnd
}) => {
  return (
    <div 
      className="relative group w-full aspect-[3/4] cursor-pointer"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onClick={onClick}
    >
      {/* Main Card Container */}
      <div className={`
        relative w-full h-full rounded-xl overflow-hidden transition-all duration-300
        ${isActive 
          ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-[#0e0f13] scale-[1.02]' 
          : 'opacity-90 hover:opacity-100 hover:scale-[1.02]'
        }
      `}>
        {/* Thumbnail */}
        <img 
          src={filter.src} 
          alt={filter.name} 
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
        
        {/* Pro Badge */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-sm">
             <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
           </div>
        </div>

        {/* Label & Details Trigger */}
        <div className="absolute bottom-0 left-0 w-full p-2 flex items-end justify-between">
          <div className="min-w-0 flex-1">
            <p className={`text-[10px] font-bold truncate ${isActive ? 'text-amber-300' : 'text-slate-200'}`}>
              {filter.name}
            </p>
            <p className="text-[8px] text-slate-400 truncate opacity-0 group-hover:opacity-100 transition-opacity delay-100">
              {filter.desc}
            </p>
          </div>
          
          <button 
            onClick={onSettingsClick}
            className={`
              p-1.5 rounded-lg hover:bg-white/20 transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
              ${isActive ? 'text-amber-400' : 'text-white'}
            `}
          >
            <Icons.Settings className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
