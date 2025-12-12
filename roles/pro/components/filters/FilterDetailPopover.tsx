
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { EditorSlider } from '../../../../features/editor/components/EditorUI';
import { ProFilterType } from './ProFilterCard';

interface FilterDetailPopoverProps {
  filter: ProFilterType;
  onClose: () => void;
  onApply: (settings: { intensity: number, warmth: number }) => void;
}

export const FilterDetailPopover = ({ filter, onClose, onApply }: FilterDetailPopoverProps) => {
  const [intensity, setIntensity] = useState(80);
  const [warmth, setWarmth] = useState(50);

  return (
    <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-[#1a1b26]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-xs font-bold text-white uppercase tracking-wider">{filter.name} Settings</h4>
        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
          <Icons.Close className="w-4 h-4" />
        </button>
      </div>

      {/* Mini Preview */}
      <div className="w-full aspect-[2/1] rounded-lg overflow-hidden mb-4 border border-white/5 relative">
        <img src={filter.src} className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-[10px] font-mono text-white/50 bg-black/50 px-2 py-1 rounded">Preview</span>
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-4 mb-4">
        <EditorSlider 
          label="Intensity" 
          value={intensity} 
          onChange={setIntensity} 
          max={100}
        />
        <EditorSlider 
          label="Warmth" 
          value={warmth} 
          onChange={setWarmth} 
          max={100} 
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button 
          onClick={onClose}
          className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={() => onApply({ intensity, warmth })}
          className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-xs font-bold text-black transition-colors shadow-lg shadow-amber-900/20"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
