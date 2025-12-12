
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { EditorSlider } from './EditorUI';

export const ProAdjustPanel = () => {
  const [values, setValues] = useState({
    // Basic
    brightness: 0, contrast: 10, saturation: 5, exposure: 0,
    // Pro
    texture: 20, clarity: 15, highlights: -10, shadows: 15,
    temp: 5, vibrance: 10
  });

  const handleChange = (key: string, val: number) => {
    setValues(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="p-6 animate-fade-in-up h-full overflow-y-auto custom-scrollbar pb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Icons.Sliders className="text-blue-400" /> Adjust
        </h3>
        <button className="text-xs text-slate-500 hover:text-white transition-colors">Reset All</button>
      </div>

      <div className="space-y-8">
        {/* LIGHT */}
        <section>
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Light & Color</h4>
          <div className="space-y-4">
            <EditorSlider label="Exposure" value={values.exposure} min={-100} max={100} onChange={(v) => handleChange('exposure', v)} />
            <EditorSlider label="Contrast" value={values.contrast} min={-100} max={100} onChange={(v) => handleChange('contrast', v)} />
            <EditorSlider label="Highlights" value={values.highlights} min={-100} max={100} onChange={(v) => handleChange('highlights', v)} />
            <EditorSlider label="Shadows" value={values.shadows} min={-100} max={100} onChange={(v) => handleChange('shadows', v)} />
          </div>
        </section>

        {/* PRO DETAILS */}
        <section className="pt-6 border-t border-white/10">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
            Detail
          </h4>
          <div className="space-y-4">
            <EditorSlider label="Texture" value={values.texture} min={0} max={100} onChange={(v) => handleChange('texture', v)} />
            <EditorSlider label="Clarity" value={values.clarity} min={0} max={100} onChange={(v) => handleChange('clarity', v)} />
          </div>
        </section>

        {/* PRO COLOR */}
        <section className="pt-6 border-t border-white/10">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider flex items-center gap-2">
            Color Grading
          </h4>
          <div className="space-y-4">
            <EditorSlider label="Temp" value={values.temp} min={-100} max={100} onChange={(v) => handleChange('temp', v)} />
            <EditorSlider label="Vibrance" value={values.vibrance} min={-100} max={100} onChange={(v) => handleChange('vibrance', v)} />
            <EditorSlider label="Saturation" value={values.saturation} min={-100} max={100} onChange={(v) => handleChange('saturation', v)} />
          </div>
        </section>
      </div>
    </div>
  );
};
