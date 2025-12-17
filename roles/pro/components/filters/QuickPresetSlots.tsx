
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
            relative h-16 rounded-xl border-2 border-dashed transition-all cursor-pointer group flex items-center justify-center text-center overflow-hidden
            ${slot 
              ? 'bg-amber-500/10 border-amber-500 text-amber-300 shadow-lg shadow-amber-900/20' 
              : 'bg-white/5 border-white/10 text-slate-500 hover:border-white/20 hover:text-slate-300'
            }
          `}
        >
          {slot ? (
            <div className="flex flex-col items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-0.5">Saved</span>
              <span className="text-[10px] font-mono font-bold text-amber-200/80">{slot.split('-')[1]}</span>
              
              <button 
                onClick={(e) => handleClear(idx, e)}
                className="absolute top-1 right-1 p-1 text-amber-500/50 hover:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Icons.Close className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center opacity-60 group-hover:opacity-100 transition-opacity">
              <Icons.Plus className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold uppercase tracking-wider">Empty Slot</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
