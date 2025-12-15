
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { EditorSlider } from './EditorUI';

export const ProAdjustPanel = ({ values, onChange }: { values: any, onChange: (val: any) => void }) => {
  /* Remove local state, use props */
  /* If values are not provided (standalone), fallback? But we know usage. */
  /* Actually, to be safe, I should allow it to be optional or just force it. */
  
  const handleChange = (key: string, val: number) => {
    if (onChange) {
       onChange({ ...values, [key]: val });
    }
  };

  /* Ensure values exists to avoid crash if parent doesn't pass it yet (rare during refactor) */
  const safeValues = values || { 
    brightness: 0, contrast: 0, saturation: 0, exposure: 0,
    texture: 0, clarity: 0, highlights: 0, shadows: 0,
    temp: 0, vibrance: 0 
  };
  
  return (
    <div className="p-6 animate-fade-in-up h-full overflow-y-auto custom-scrollbar pb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Icons.Sliders className="text-blue-400" /> Adjust
        </h3>
        <button 
          className="text-xs text-slate-500 hover:text-white transition-colors"
          onClick={() => onChange && onChange({
            brightness: 0, contrast: 0, saturation: 0, exposure: 0,
            texture: 0, clarity: 0, highlights: 0, shadows: 0,
            temp: 0, vibrance: 0, tint: 0, sharpness: 0, noise: 0
          })}
        >
          Reset All
        </button>
      </div>

      <div className="space-y-8">
        {/* LIGHT */}
        <section>
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Light & Color</h4>
          <div className="space-y-4">
            <EditorSlider label="Exposure" value={safeValues.exposure || 0} min={-100} max={100} onChange={(v) => handleChange('exposure', v)} />
            <EditorSlider label="Contrast" value={safeValues.contrast || 0} min={-100} max={100} onChange={(v) => handleChange('contrast', v)} />
            <EditorSlider label="Highlights" value={safeValues.highlights || 0} min={-100} max={100} onChange={(v) => handleChange('highlights', v)} />
            <EditorSlider label="Shadows" value={safeValues.shadows || 0} min={-100} max={100} onChange={(v) => handleChange('shadows', v)} />
          </div>
        </section>

        {/* PRO DETAILS */}
        <section className="pt-6 border-t border-white/10">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
            Detail
          </h4>
          <div className="space-y-4">
            <EditorSlider label="Texture" value={safeValues.texture || 0} min={0} max={100} onChange={(v) => handleChange('texture', v)} />
            <EditorSlider label="Clarity" value={safeValues.clarity || 0} min={0} max={100} onChange={(v) => handleChange('clarity', v)} />
          </div>
        </section>

        {/* PRO COLOR */}
        <section className="pt-6 border-t border-white/10">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
            Color Grading
          </h4>
          <div className="space-y-4">
            <EditorSlider label="Temp" value={safeValues.temp || 0} min={-100} max={100} onChange={(v) => handleChange('temp', v)} />
            <EditorSlider label="Vibrance" value={safeValues.vibrance || 0} min={-100} max={100} onChange={(v) => handleChange('vibrance', v)} />
            <EditorSlider label="Saturation" value={safeValues.saturation || 0} min={-100} max={100} onChange={(v) => handleChange('saturation', v)} />
          </div>
        </section>
      </div>
    </div>
  );
};
