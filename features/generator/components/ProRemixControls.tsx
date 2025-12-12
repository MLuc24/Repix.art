
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';

export interface RemixSettings {
  influence: number; // 0-100 (How much to change)
  controlMode: 'structure' | 'balanced' | 'style';
  negativePrompt: string;
  seed: number | '';
}

interface ProRemixControlsProps {
  settings: RemixSettings;
  onChange: (key: keyof RemixSettings, value: any) => void;
  mode: 'text-to-image' | 'image-to-image';
}

export const ProRemixControls = ({ settings, onChange, mode }: ProRemixControlsProps) => {
  const [showNegative, setShowNegative] = useState(!!settings.negativePrompt);

  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-5 animate-fade-in-up">
      
      {/* HEADER */}
      <div className="flex items-center gap-2 text-violet-400">
        <Icons.Sliders className="w-4 h-4" />
        <span className="text-xs font-bold uppercase tracking-wider">
          {mode === 'image-to-image' ? 'Remix Controls' : 'Generation Controls'}
        </span>
      </div>

      {/* --- I2I SPECIFIC CONTROLS --- */}
      {mode === 'image-to-image' && (
        <>
          {/* 1. INFLUENCE SLIDER */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <span>Transformation Strength</span>
              <span className="text-white">{settings.influence}%</span>
            </div>
            <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all"
                style={{ width: `${settings.influence}%` }}
              />
              <input 
                type="range"
                min="0"
                max="100"
                value={settings.influence}
                onChange={(e) => onChange('influence', Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[9px] text-slate-500">
              <span>Subtle</span>
              <span>Creative</span>
            </div>
          </div>

          {/* 2. CONTROL MODE */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Preservation Mode</label>
            <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
              {[
                { id: 'structure', label: 'Shape' },
                { id: 'balanced', label: 'Balanced' },
                { id: 'style', label: 'Style' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => onChange('controlMode', m.id)}
                  className={`
                    flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all
                    ${settings.controlMode === m.id 
                      ? 'bg-white/10 text-white shadow-sm border border-white/10' 
                      : 'text-slate-500 hover:text-slate-300'
                    }
                  `}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* --- GLOBAL PRO CONTROLS (Negative & Seed) --- */}
      
      {/* 3. NEGATIVE PROMPT */}
      <div className="space-y-2">
        <button 
          onClick={() => setShowNegative(!showNegative)}
          className="flex items-center gap-2 text-[10px] font-bold text-slate-400 hover:text-white transition-colors w-full"
        >
          {showNegative ? <Icons.ChevronLeft className="w-3 h-3 -rotate-90" /> : <Icons.Plus className="w-3 h-3" />}
          NEGATIVE PROMPT
        </button>
        
        {showNegative && (
          <textarea 
            value={settings.negativePrompt}
            onChange={(e) => onChange('negativePrompt', e.target.value)}
            placeholder="What to exclude? (e.g. blurry, text, distortion, bad hands)..."
            className="w-full h-20 bg-black/30 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none resize-none transition-colors"
          />
        )}
      </div>

      {/* 4. SEED */}
      <div className="flex items-center justify-between gap-4 pt-2 border-t border-white/5">
         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Seed</label>
         <div className="flex items-center gap-2 bg-black/30 border border-white/10 rounded-lg px-2 py-1 flex-1">
            <span className="text-slate-500 text-xs">#</span>
            <input 
              type="number" 
              placeholder="Random"
              value={settings.seed}
              onChange={(e) => onChange('seed', e.target.value === '' ? '' : Number(e.target.value))}
              className="bg-transparent border-none outline-none text-xs text-white w-full placeholder-slate-600"
            />
            <button 
              onClick={() => onChange('seed', Math.floor(Math.random() * 999999))} 
              className="text-slate-500 hover:text-white"
              title="Randomize"
            >
              <Icons.Refresh className="w-3 h-3" />
            </button>
         </div>
      </div>

    </div>
  );
};
