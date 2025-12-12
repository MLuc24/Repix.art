
import React, { useState, useRef } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { ExportFormat, ExportResolution, ExportHistoryItem } from '../types';

// --- FORMAT SELECTOR ---
export const FormatSelector = ({ value, onChange }: { value: ExportFormat, onChange: (v: ExportFormat) => void }) => (
  <div className="flex bg-black/20 p-1 rounded-xl border border-white/5">
    {(['JPG', 'PNG', 'WEBP'] as ExportFormat[]).map((fmt) => (
      <button
        key={fmt}
        onClick={() => onChange(fmt)}
        className={`
          flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-300
          ${value === fmt 
            ? 'bg-white/10 text-white shadow-lg shadow-white/5' 
            : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
          }
        `}
      >
        {fmt}
      </button>
    ))}
  </div>
);

// --- SIZE SELECTOR ---
export const SizeSelector = ({ value, onChange, onProClick }: { value: ExportResolution, onChange: (v: ExportResolution) => void, onProClick: () => void }) => {
  const options: { label: string, val: ExportResolution, isPro: boolean }[] = [
    { label: 'Standard', val: '1x', isPro: false },
    { label: 'High (2x)', val: '2x', isPro: true },
    { label: 'Ultra (4x)', val: '4k', isPro: true },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {options.map((opt) => (
        <button
          key={opt.val}
          onClick={() => opt.isPro ? onProClick() : onChange(opt.val)}
          className={`
            relative py-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-1
            ${value === opt.val
              ? 'bg-violet-600/20 border-violet-500 text-violet-200'
              : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10'
            }
          `}
        >
          <span className="text-sm font-bold">{opt.label}</span>
          {opt.isPro && (
            <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold uppercase tracking-wide">
              <Icons.Lock className="w-3 h-3" /> Pro
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

// --- QUALITY SLIDER ---
export const QualitySlider = ({ value, onChange }: { value: number, onChange: (v: number) => void }) => (
  <div className="space-y-3">
    <div className="flex justify-between text-xs font-medium uppercase tracking-wider text-slate-400">
      <span>Compression</span>
      <span>{value}% Quality</span>
    </div>
    <div className="relative h-2 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-violet-600 to-fuchsia-500 transition-all duration-150"
        style={{ width: `${value}%` }}
      />
      <input 
        type="range" 
        min="1" 
        max="100" 
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  </div>
);

// --- COMPARISON SLIDER (Before/After) ---
export const ComparisonSlider = ({ beforeImage, afterImage }: { beforeImage: string, afterImage: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.min(100, Math.max(0, position)));
  };

  const startDrag = () => isDragging.current = true;
  const stopDrag = () => isDragging.current = false;

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl"
      onMouseDown={startDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onMouseMove={handleMove}
      onTouchStart={startDrag}
      onTouchEnd={stopDrag}
      onTouchMove={handleMove}
    >
      {/* After Image (Full Background) */}
      <img src={afterImage} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur rounded-lg border border-white/10 text-xs font-bold text-amber-400 border-amber-500/30">
        HD ENHANCED
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden border-r border-white/50"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img src={beforeImage} alt="Before" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur rounded-lg border border-white/10 text-xs font-bold text-slate-300">
          STANDARD
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_20px_rgba(255,255,255,0.5)] z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
          <Icons.Compare className="w-4 h-4 text-black rotate-90" />
        </div>
      </div>
    </div>
  );
};

// --- HISTORY LIST ---
export const ExportHistoryList = ({ items }: { items: ExportHistoryItem[] }) => (
  <div className="mt-8">
    <div className="flex items-center justify-between mb-4">
       <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Recent Exports</h3>
       <button className="text-xs text-violet-400 hover:text-white">View Gallery</button>
    </div>
    
    <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {items.map((item) => (
        <div key={item.id} className="group relative flex-none w-32 aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/5 hover:border-violet-500/30 transition-all">
          <img src={item.thumbnail} alt={item.filename} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] gap-2">
            <span className="text-[10px] font-mono text-slate-300 bg-black/50 px-1 rounded">{item.format}</span>
            <button className="p-1.5 rounded-full bg-white text-black hover:scale-110 transition-transform">
              <Icons.Download className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
