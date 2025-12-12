
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { EditorSlider } from '../../../../features/editor/components/EditorUI';

export interface BrushSettings {
  size: number;
  feather: number;
  hardness: number;
  mode: 'paint' | 'erase' | 'smart';
}

interface MaskBrushControlProps {
  settings: BrushSettings;
  onChange: (key: keyof BrushSettings, value: any) => void;
}

export const MaskBrushControl = ({ settings, onChange }: MaskBrushControlProps) => {
  return (
    <div className="space-y-6">
      {/* Mode Switcher */}
      <div className="flex bg-white/5 border border-white/10 rounded-xl p-1">
        {[
          { id: 'paint', label: 'Paint', icon: <Icons.Wand className="w-3 h-3" /> }, // Using Wand as generic brush-like
          { id: 'erase', label: 'Erase', icon: <Icons.Scissors className="w-3 h-3" /> }, // Scissors as erase
          { id: 'smart', label: 'Smart', icon: <Icons.Sparkles className="w-3 h-3" /> },
        ].map((mode) => (
          <button
            key={mode.id}
            onClick={() => onChange('mode', mode.id)}
            className={`
              flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all
              ${settings.mode === mode.id 
                ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' 
                : 'text-slate-500 hover:text-white hover:bg-white/5'
              }
            `}
          >
            {mode.icon}
            {mode.label}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        <EditorSlider 
          label="Brush Size" 
          value={settings.size} 
          min={1} 
          max={100} 
          onChange={(v) => onChange('size', v)} 
        />
        <EditorSlider 
          label="Feather" 
          value={settings.feather} 
          min={0} 
          max={50} 
          onChange={(v) => onChange('feather', v)} 
        />
        <EditorSlider 
          label="Hardness" 
          value={settings.hardness} 
          min={0} 
          max={100} 
          onChange={(v) => onChange('hardness', v)} 
        />
      </div>
    </div>
  );
};
