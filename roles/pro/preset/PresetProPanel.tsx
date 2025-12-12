
import React, { useState, useMemo } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { MOCK_PRESETS } from '../../../services/mock/presets';
import { Preset, PresetCategory } from '../../../features/presets/types';
import { PresetCard } from './PresetCard';
import { SavePresetModal } from './SavePresetModal';
import { EditPresetModal } from './EditPresetModal';

export const PresetProPanel = () => {
  const [activeCategory, setActiveCategory] = useState<PresetCategory | 'All'>('All');
  const [presets, setPresets] = useState<Preset[]>(MOCK_PRESETS);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [editPreset, setEditPreset] = useState<Preset | null>(null);

  // --- FILTER ---
  const filteredPresets = useMemo(() => {
    if (activeCategory === 'All') return presets;
    return presets.filter(p => p.category === activeCategory);
  }, [activeCategory, presets]);

  // --- ACTIONS ---
  const handleSaveNew = (data: any) => {
    const newPreset: Preset = {
      id: `custom_${Date.now()}`,
      name: data.name,
      category: data.category,
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60', // Mock thumb
      isPro: true,
      isCustom: true,
      settings: data.settings,
      createdAt: new Date().toISOString()
    };
    setPresets([newPreset, ...presets]);
  };

  const handleUpdate = (id: string, updates: any) => {
    setPresets(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this preset?')) {
      setPresets(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleExport = (preset: Preset) => {
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${preset.name.replace(/\s+/g, '_')}.json`;
    a.click();
  };

  return (
    <div className="flex flex-col h-full bg-[#0e0f13] relative">
      
      {/* HEADER */}
      <div className="p-6 pb-4 flex-none">
        <div className="flex items-center justify-between mb-6">
           <div className="flex items-center gap-2">
             <div className="p-1.5 bg-violet-600/20 rounded-lg text-violet-400">
               <Icons.Sliders className="w-4 h-4" /> 
             </div>
             <div>
               <h3 className="text-sm font-bold text-white uppercase tracking-wide">Pro Presets</h3>
               <p className="text-[10px] text-slate-500">Fast workflows</p>
             </div>
           </div>
           <button 
             onClick={() => setShowSaveModal(true)}
             className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-white border border-white/5 transition-colors"
           >
             <Icons.Plus className="w-3 h-3" /> Save Preset
           </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
           {['All', 'Portrait', 'Product', 'Social', 'Cinematic', 'Custom'].map((cat) => (
             <button 
               key={cat}
               onClick={() => setActiveCategory(cat as any)}
               className={`
                 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap
                 ${activeCategory === cat 
                   ? 'bg-violet-600 border-violet-600 text-white' 
                   : 'bg-white/5 border-white/5 text-slate-500 hover:text-slate-300 hover:bg-white/10'
                 }
               `}
             >
               {cat}
             </button>
           ))}
        </div>
      </div>

      {/* GRID */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0 pb-20">
         <div className="grid grid-cols-2 gap-4">
            {filteredPresets.map((preset) => (
              <PresetCard 
                key={preset.id}
                preset={preset}
                onApply={() => console.log('Applying preset', preset.name)}
                onEdit={() => setEditPreset(preset)}
                onExport={() => handleExport(preset)}
                onDelete={() => handleDelete(preset.id)}
              />
            ))}
         </div>
      </div>

      {/* FOOTER */}
      <div className="p-4 border-t border-white/5 bg-[#131418] flex items-center justify-between text-xs font-medium text-slate-500">
         <button className="hover:text-white transition-colors flex items-center gap-2">
           <Icons.Upload className="w-3 h-3" /> Import JSON
         </button>
         <span>{filteredPresets.length} items</span>
      </div>

      {/* MODALS */}
      <SavePresetModal 
        isOpen={showSaveModal} 
        onClose={() => setShowSaveModal(false)}
        onSave={handleSaveNew}
      />

      <EditPresetModal 
        isOpen={!!editPreset}
        onClose={() => setEditPreset(null)}
        preset={editPreset}
        onUpdate={handleUpdate}
      />

    </div>
  );
};
