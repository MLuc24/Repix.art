
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { DeliveryPreset } from './types';

const PRESETS: DeliveryPreset[] = [
  {
    id: 'social',
    name: 'Social Bundle',
    description: 'Optimized for IG, Twitter & LinkedIn.',
    formats: ['JPG 1080p', 'WebP'],
    multiplier: 1,
    iconType: 'social'
  },
  {
    id: 'web',
    name: 'Web High-Res',
    description: 'Crisp 2K images for websites.',
    formats: ['JPG 2048px', 'Optimized'],
    multiplier: 1.5,
    iconType: 'web'
  },
  {
    id: 'print',
    name: 'Print Ready',
    description: 'Full resolution & DPI for physical print.',
    formats: ['TIFF', '300 DPI', 'CMYK'],
    multiplier: 3,
    iconType: 'print'
  },
  {
    id: 'source',
    name: 'Source Files',
    description: 'Original RAWs and project files.',
    formats: ['RAW', 'XMP', 'Original'],
    multiplier: 5,
    iconType: 'source'
  }
];

const getIcon = (type: string) => {
  switch (type) {
    case 'social': return <Icons.User className="w-5 h-5" />;
    case 'web': return <Icons.Grid className="w-5 h-5" />;
    case 'print': return <Icons.Image className="w-5 h-5" />;
    case 'source': return <Icons.FileText className="w-5 h-5" />;
    default: return <Icons.Star className="w-5 h-5" />;
  }
};

export const DeliveryPresetSelector = ({ selectedId, onSelect }: { selectedId: string, onSelect: (preset: DeliveryPreset) => void }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Export Preset</h3>
      <div className="grid grid-cols-1 gap-3">
        {PRESETS.map((preset) => {
          const isSelected = selectedId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelect(preset)}
              className={`
                relative flex items-center gap-4 p-4 rounded-xl border text-left transition-all
                ${isSelected 
                  ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)]' 
                  : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                }
              `}
            >
              <div className={`p-3 rounded-lg ${isSelected ? 'bg-cyan-500 text-black' : 'bg-white/5 text-slate-400'}`}>
                {getIcon(preset.iconType)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-300'}`}>{preset.name}</h4>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${isSelected ? 'bg-cyan-900/50 text-cyan-200' : 'bg-black/40 text-slate-500'}`}>
                    {preset.multiplier}x Credits
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{preset.description}</p>
                <div className="flex gap-2">
                  {preset.formats.map(fmt => (
                    <span key={fmt} className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5">
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-4 h-4 bg-cyan-500 rounded-full flex items-center justify-center">
                    <Icons.Check className="w-3 h-3 text-black" />
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
