
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton, AuthInput } from '../../../shared/components/GlassUI';
import { PresetCategory } from '../../../features/presets/types';

interface SavePresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

export const SavePresetModal = ({ isOpen, onClose, onSave }: SavePresetModalProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<PresetCategory>('Custom');
  const [settings, setSettings] = useState({
    adjustments: true,
    filters: true,
    masks: false,
    remix: false
  });

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    onSave({ name, category, settings });
    onClose();
    setName('');
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white max-w-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Save Preset</h3>
        <button onClick={onClose}><Icons.Close className="w-5 h-5 text-slate-400 hover:text-white" /></button>
      </div>

      <div className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-500 uppercase">Preset Name</label>
           <input 
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-violet-500 outline-none"
             placeholder="e.g., Dark Portrait V2"
           />
        </div>

        {/* Category */}
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
           <div className="flex flex-wrap gap-2">
              {['Portrait', 'Product', 'Social', 'Cinematic', 'Custom'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat as PresetCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${category === cat ? 'bg-violet-600 border-violet-600 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                >
                  {cat}
                </button>
              ))}
           </div>
        </div>

        {/* Include Settings */}
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-500 uppercase">Include Settings</label>
           <div className="space-y-2">
              {[
                { id: 'adjustments', label: 'Adjustments (Light/Color)' },
                { id: 'filters', label: 'Active Filters' },
                { id: 'masks', label: 'Masks & Layers' },
                { id: 'remix', label: 'AI Remix Style' },
              ].map((opt) => (
                <div 
                  key={opt.id} 
                  onClick={() => handleToggle(opt.id as any)}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:bg-white/10"
                >
                   <span className="text-sm text-slate-300">{opt.label}</span>
                   <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${settings[opt.id as keyof typeof settings] ? 'bg-violet-500 border-violet-500' : 'border-slate-500'}`}>
                      {settings[opt.id as keyof typeof settings] && <Icons.Check className="w-3 h-3 text-white" />}
                   </div>
                </div>
              ))}
           </div>
        </div>

        <NeonButton onClick={handleSave} disabled={!name} className="w-full">
           Save Preset
        </NeonButton>
      </div>
    </GlassModal>
  );
};
