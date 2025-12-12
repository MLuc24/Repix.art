
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { EditorSlider } from './EditorUI';

export const ProMaskPanel = () => {
  const [settings, setSettings] = useState({ size: 30, feather: 10, hardness: 80, autoEdge: true });

  const handleChange = (k: string, v: any) => setSettings(prev => ({ ...prev, [k]: v }));

  return (
    <div className="p-6 animate-fade-in-up h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Icons.Scissors className="text-teal-400" /> Pro Mask
        </h3>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-1 mb-8 flex">
        <button className="flex-1 py-2 text-xs font-bold text-white bg-white/10 rounded-xl shadow-sm">Brush</button>
        <button className="flex-1 py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">Radial</button>
        <button className="flex-1 py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">Linear</button>
      </div>

      <div className="space-y-8">
        <EditorSlider label="Brush Size" value={settings.size} min={1} max={100} onChange={(v) => handleChange('size', v)} />
        
        {/* Pro Settings */}
        <section className="pt-4 border-t border-white/10">
           <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Refine</h4>
           <div className="space-y-4">
             <EditorSlider label="Feather" value={settings.feather} min={0} max={50} onChange={(v) => handleChange('feather', v)} />
             <EditorSlider label="Hardness" value={settings.hardness} min={0} max={100} onChange={(v) => handleChange('hardness', v)} />
           </div>
        </section>

        {/* Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
           <div className="flex items-center gap-3">
             <div className="p-1.5 rounded-lg bg-teal-500 text-black">
               <Icons.Zap className="w-4 h-4" />
             </div>
             <div>
               <p className="text-xs font-bold text-white">Auto-Edge Refine</p>
               <p className="text-[10px] text-teal-300">Smart boundary detection</p>
             </div>
           </div>
           <div 
             onClick={() => handleChange('autoEdge', !settings.autoEdge)}
             className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${settings.autoEdge ? 'bg-teal-500' : 'bg-slate-700'}`}
           >
             <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${settings.autoEdge ? 'translate-x-5' : 'translate-x-0'}`} />
           </div>
        </div>
      </div>
    </div>
  );
};
