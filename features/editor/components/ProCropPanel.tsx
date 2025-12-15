
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { EditorSlider } from './EditorUI';
import { NeonButton } from '../../../shared/components/GlassUI';

export const ProCropPanel = ({ rotation, onRotationChange }: { rotation: number, onRotationChange: (val: number) => void }) => {
  // Lifted rotation state to parent
  const setRotation = onRotationChange; // Alias for compatibility
  const [activeRatio, setActiveRatio] = useState('original');

  const ratios = [
    { id: 'original', label: 'Original', icon: <Icons.Image className="w-3 h-3" /> },
    { id: '1:1', label: 'Square', icon: <div className="w-3 h-3 border-2 border-current rounded-sm" /> },
    { id: '4:5', label: 'Portrait', icon: <div className="w-2.5 h-3 border-2 border-current rounded-sm" /> },
    { id: '16:9', label: 'Landscape', icon: <div className="w-4 h-2.5 border-2 border-current rounded-sm" /> },
    { id: '9:16', label: 'Story', icon: <div className="w-2.5 h-4 border-2 border-current rounded-sm" /> },
  ];

  return (
    <div className="p-6 animate-fade-in-up h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Icons.Layout className="text-blue-400" /> Crop & Rotate
        </h3>
        <button 
          onClick={() => { setRotation(0); setActiveRatio('original'); }}
          className="text-xs text-slate-500 hover:text-white transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8">
        
        {/* Aspect Ratios */}
        <section>
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">Aspect Ratio</h4>
          <div className="grid grid-cols-3 gap-2">
            {ratios.map((r) => (
              <button
                key={r.id}
                onClick={() => setActiveRatio(r.id)}
                className={`
                  flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all
                  ${activeRatio === r.id 
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {r.icon}
                <span className="text-[10px] font-bold">{r.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Rotate & Flip */}
        <section>
           <h4 className="text-xs font-bold text-slate-500 uppercase mb-3 tracking-wider">Transform</h4>
           
           <div className="mb-6">
             <EditorSlider 
               label={`Rotate ${rotation}°`} 
               value={rotation} 
               min={-45} 
               max={45} 
               onChange={setRotation} 
             />
           </div>

           <div className="flex gap-3">
             <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2">
               <Icons.Refresh className="w-4 h-4 scale-x-[-1]" /> Flip H
             </button>
             <button className="flex-1 py-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2">
               <Icons.Refresh className="w-4 h-4 rotate-90" /> Flip V
             </button>
           </div>
        </section>

      </div>

      <div className="pt-6 mt-auto border-t border-white/10">
        <NeonButton className="w-full">Apply Crop</NeonButton>
      </div>
    </div>
  );
};
