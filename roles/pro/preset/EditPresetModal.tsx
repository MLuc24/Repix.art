
import React, { useState, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';
import { Preset, PresetCategory } from '../../../features/presets/types';

interface EditPresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  preset: Preset | null;
  onUpdate: (id: string, updates: any) => void;
}

export const EditPresetModal = ({ isOpen, onClose, preset, onUpdate }: EditPresetModalProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<PresetCategory>('Custom');

  useEffect(() => {
    if (preset) {
      setName(preset.name);
      setCategory(preset.category);
    }
  }, [preset]);

  const handleSave = () => {
    if (preset) {
      onUpdate(preset.id, { name, category });
      onClose();
    }
  };

  if (!preset) return null;

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white max-w-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Edit Preset</h3>
        <button onClick={onClose}><Icons.Close className="w-5 h-5 text-slate-400 hover:text-white" /></button>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-500 uppercase">Preset Name</label>
           <input 
             value={name}
             onChange={(e) => setName(e.target.value)}
             className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-violet-500 outline-none"
           />
        </div>

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

        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
           <Icons.AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
           <p className="text-xs text-amber-200/80">
             Note: Editing the values (sliders) of this preset requires re-saving a new snapshot from the editor.
           </p>
        </div>

        <div className="flex gap-3">
           <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-slate-400 font-bold text-sm">Cancel</button>
           <NeonButton onClick={handleSave} className="flex-1">Save Changes</NeonButton>
        </div>
      </div>
    </GlassModal>
  );
};
