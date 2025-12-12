
import React, { useState, useEffect } from 'react';
import { Icons } from '../../../../shared/components/Icons';

export const QuickPresetSlots = () => {
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null]);

  useEffect(() => {
    // Load saved slots from local storage (mock logic)
    const saved = localStorage.getItem('pro_filter_slots');
    if (saved) {
      setSlots(JSON.parse(saved));
    }
  }, []);

  const handleSave = (index: number) => {
    const newSlots = [...slots];
    // Mock saving the "current" state
    newSlots[index] = `Preset ${index + 1} - ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    setSlots(newSlots);
    localStorage.setItem('pro_filter_slots', JSON.stringify(newSlots));
  };

  const handleClear = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    localStorage.setItem('pro_filter_slots', JSON.stringify(newSlots));
  };

  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      {slots.map((slot, idx) => (
        <div
          key={idx}
          onClick={() => handleSave(idx)}
          className={`
            relative h-12 rounded-xl border border-dashed transition-all cursor-pointer group flex items-center justify-center text-center overflow-hidden
            ${slot 
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-200' 
              : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
            }
          `}
        >
          {slot ? (
            <>
              <div className="px-1">
                <p className="text-[9px] font-bold uppercase tracking-wide">Saved</p>
                <p className="text-[8px] opacity-70 truncate max-w-[60px]">{slot.split('-')[1]}</p>
              </div>
              <button 
                onClick={(e) => handleClear(idx, e)}
                className="absolute top-1 right-1 text-amber-500/50 hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icons.Close className="w-3 h-3" />
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <Icons.Plus className="w-4 h-4 opacity-50 mb-0.5" />
              <span className="text-[8px] font-bold uppercase">Save</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
