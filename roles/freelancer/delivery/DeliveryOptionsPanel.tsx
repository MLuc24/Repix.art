
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { DeliveryConfig } from './types';

interface DeliveryOptionsPanelProps {
  config: DeliveryConfig;
  onChange: (updates: Partial<DeliveryConfig>) => void;
}

export const DeliveryOptionsPanel = ({ config, onChange }: DeliveryOptionsPanelProps) => {
  return (
    <div className="space-y-4 pt-6 border-t border-white/10">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Package Options</h3>
      
      <div className="space-y-3">
        {/* Rename */}
        <div>
           <label className="text-xs text-slate-500 mb-1.5 block">File Naming</label>
           <div className="relative">
             <input 
               type="text" 
               value={config.customNaming}
               onChange={(e) => onChange({ customNaming: e.target.value })}
               placeholder="Project_Name_Sequence"
               className="w-full bg-[#0e0f13] border border-white/10 rounded-lg py-2 pl-3 pr-10 text-xs text-white focus:border-cyan-500 outline-none transition-colors"
             />
             <div className="absolute right-3 top-2 text-slate-500 text-xs font-mono">_01.ext</div>
           </div>
        </div>

        {/* Toggles */}
        <div 
          onClick={() => onChange({ removeWatermark: !config.removeWatermark })}
          className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
        >
           <span className="text-sm text-slate-300">Remove Watermark</span>
           <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${config.removeWatermark ? 'bg-cyan-500' : 'bg-slate-700'}`}>
              <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${config.removeWatermark ? 'translate-x-4' : 'translate-x-0'}`} />
           </div>
        </div>

        <div 
          onClick={() => onChange({ zipPackage: !config.zipPackage })}
          className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10 transition-colors"
        >
           <div className="flex items-center gap-2">
             <span className="text-sm text-slate-300">Create .ZIP Package</span>
             <span className="text-[9px] bg-slate-700 text-slate-300 px-1 rounded">Recommended</span>
           </div>
           <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${config.zipPackage ? 'bg-cyan-500' : 'bg-slate-700'}`}>
              <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${config.zipPackage ? 'translate-x-4' : 'translate-x-0'}`} />
           </div>
        </div>
      </div>
    </div>
  );
};
