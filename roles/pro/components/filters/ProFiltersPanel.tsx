
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { ProFilterCard, ProFilterType } from './ProFilterCard';
import { FilterDetailPopover } from './FilterDetailPopover';
import { QuickPresetSlots } from './QuickPresetSlots';
import { FilterCompareToggle } from './FilterCompareToggle';

const PRO_FILTERS_LIST: ProFilterType[] = [
  { id: 'leica', name: 'Leica Film', desc: 'Soft contrast + warm tone', src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=200&q=60' },
  { id: 'kodak', name: 'Kodak Gold', desc: 'Subtle film grain', src: 'https://images.unsplash.com/photo-1615184697985-c9bde1b07da7?auto=format&fit=crop&w=200&q=60' },
  { id: 'fuji', name: 'Fuji Classic', desc: 'Vintage color curve', src: 'https://images.unsplash.com/photo-1595856755676-e4136934c28f?auto=format&fit=crop&w=200&q=60' },
  { id: 'cine', name: 'Cine Punch', desc: 'High contrast + teal shadows', src: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=200&q=60' },
  { id: 'clean', name: 'Clean Portrait', desc: 'Light skin smoothing', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=60' },
  { id: 'hdr', name: 'HDR Micro', desc: 'Detail boost + local contrast', src: 'https://images.unsplash.com/photo-1478720568477-152d9b164e63?auto=format&fit=crop&w=200&q=60' },
  { id: 'matte', name: 'Matte Soft', desc: 'Low contrast matte finish', src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=200&q=60' },
  { id: 'ultra', name: 'Ultra Sharp', desc: 'High freq detail enhance', src: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=200&q=60' },
  { id: 'skin', name: 'Soft Skin Pro', desc: 'Advanced portrait smoothing', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60' },
  { id: 'noir', name: 'Film Noir', desc: 'High contrast B&W', src: 'https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?auto=format&fit=crop&w=200&q=60' },
  { id: 'pastel', name: 'Pastel Mood', desc: 'Muted saturation + lift', src: 'https://images.unsplash.com/photo-1614726365723-49cfa0566738?auto=format&fit=crop&w=200&q=60' },
  { id: 'pop', name: 'Product Pop', desc: 'Vibrance + shadow control', src: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=200&q=60' },
];

export const ProFiltersPanel = ({ activeId, onSelect }: { activeId: string, onSelect: (id: string) => void }) => {
  const [editingFilter, setEditingFilter] = useState<ProFilterType | null>(null);

  const handleSettingsClick = (e: React.MouseEvent, filter: ProFilterType) => {
    e.stopPropagation();
    setEditingFilter(filter);
  };

  const handleApplySettings = (settings: any) => {
    console.log("Applied settings:", settings);
    setEditingFilter(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#0e0f13] relative">
      
      {/* Header Area */}
      <div className="flex-none p-6 pb-2">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-fuchsia-500/10 rounded-lg">
              <Icons.Wand className="w-4 h-4 text-fuchsia-400" /> 
            </div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wide">Filters</h3>
          </div>
          <FilterCompareToggle />
        </div>

        {/* Quick Slots */}
        <QuickPresetSlots />
      </div>

      {/* Scrollable Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 pt-0 pb-6">
        <div className="grid grid-cols-2 gap-4">
          {PRO_FILTERS_LIST.map((filter) => (
            <ProFilterCard 
              key={filter.id}
              filter={filter}
              isActive={activeId === filter.id}
              onClick={() => onSelect(filter.id)}
              onSettingsClick={(e) => handleSettingsClick(e, filter)}
              onHoverStart={() => { /* Preview Logic: Dispatch event or set global state */ }}
              onHoverEnd={() => { /* Revert Preview */ }}
            />
          ))}
        </div>
      </div>

      {/* Popover Layer */}
      {editingFilter && (
        <>
          <div className="absolute inset-0 bg-black/50 z-40 backdrop-blur-[1px]" onClick={() => setEditingFilter(null)} />
          <FilterDetailPopover 
            filter={editingFilter} 
            onClose={() => setEditingFilter(null)} 
            onApply={handleApplySettings}
          />
        </>
      )}
    </div>
  );
};
