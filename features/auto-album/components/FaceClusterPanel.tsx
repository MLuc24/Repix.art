
import React from 'react';
import { FaceGroup } from '../types';
import { Icons } from '../../../shared/components/Icons';

interface FaceClusterPanelProps {
  faces: FaceGroup[];
  activeFaceId: string | null;
  onSelectFace: (id: string | null) => void;
}

export const FaceClusterPanel = ({ faces, activeFaceId, onSelectFace }: FaceClusterPanelProps) => {
  return (
    <div className="py-6 border-b border-white/5 animate-fade-in-up">
      <div className="flex items-center justify-between px-6 mb-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Icons.User className="w-4 h-4" /> Detected People
        </h3>
        <button className="text-xs text-violet-400 hover:text-white transition-colors">Merge Duplicates</button>
      </div>

      <div className="flex gap-4 overflow-x-auto no-scrollbar px-6 pb-2">
        <button
          onClick={() => onSelectFace(null)}
          className={`
            flex flex-col items-center gap-2 min-w-[70px] group
            ${activeFaceId === null ? 'opacity-100' : 'opacity-60 hover:opacity-100'}
          `}
        >
          <div className={`w-16 h-16 rounded-full border-2 flex items-center justify-center bg-white/5 transition-all ${activeFaceId === null ? 'border-violet-500' : 'border-white/10 group-hover:border-white/30'}`}>
             <Icons.Grid className="w-6 h-6 text-white" />
          </div>
          <span className={`text-xs font-bold ${activeFaceId === null ? 'text-violet-400' : 'text-slate-500'}`}>All</span>
        </button>

        {faces.map((face) => (
          <button
            key={face.id}
            onClick={() => onSelectFace(face.id)}
            className={`
              flex flex-col items-center gap-2 min-w-[70px] group transition-all
              ${activeFaceId === face.id ? 'scale-105' : 'opacity-80 hover:opacity-100'}
            `}
          >
            <div className="relative">
              <img 
                src={face.avatar} 
                className={`w-16 h-16 rounded-full object-cover border-2 transition-all ${activeFaceId === face.id ? 'border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.4)]' : 'border-transparent group-hover:border-white/20'}`} 
              />
              <div className="absolute -bottom-1 -right-1 bg-[#1a1b26] text-white text-[9px] font-bold px-1.5 rounded-full border border-white/10">
                {face.count}
              </div>
            </div>
            <span className={`text-xs font-medium truncate w-full text-center ${activeFaceId === face.id ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
              {face.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
