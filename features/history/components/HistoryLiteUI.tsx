
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { HistoryStep } from '../types';

// --- 1. HISTORY THUMBNAIL ---
interface HistoryThumbnailProps {
  step: HistoryStep;
  isActive: boolean;
  isFuture: boolean; // For redo steps
  onClick: () => void;
  key?: React.Key;
}

export const HistoryThumbnail = ({ step, isActive, isFuture, onClick }: HistoryThumbnailProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative group flex-none py-2">
      {/* Preview Popup (Tooltip) */}
      <div 
        className={`
          absolute -top-24 left-1/2 -translate-x-1/2 w-32 p-2 rounded-xl bg-[#1a1b26] border border-white/10 shadow-2xl z-50 pointer-events-none transition-all duration-300
          ${isHovered && !isFuture ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}
      >
        <img src={step.thumbnail} alt="Preview" className="w-full aspect-square rounded-lg object-cover mb-2 border border-white/5" />
        <p className="text-[10px] font-bold text-white text-center truncate">{step.label}</p>
        <p className="text-[9px] text-slate-400 text-center">{step.description}</p>
        {/* Arrow */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#1a1b26] border-b border-r border-white/10 rotate-45" />
      </div>

      {/* Thumbnail */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden transition-all duration-300 ease-out border-2
          ${isActive 
            ? 'border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.5)] scale-110 z-10 ring-2 ring-violet-500/20' 
            : 'border-transparent hover:border-white/20'
          }
          ${isFuture ? 'opacity-40 grayscale' : 'opacity-100'}
        `}
      >
        <img src={step.thumbnail} alt={step.label} className="w-full h-full object-cover" />
        
        {/* Active Indicator Overlay */}
        {isActive && <div className="absolute inset-0 bg-violet-500/10" />}
        
        {/* Label Overlay (Bottom) */}
        <div className={`
          absolute bottom-0 left-0 w-full p-1 text-[9px] font-bold text-center truncate transition-colors
          ${isActive ? 'bg-violet-600 text-white' : 'bg-black/60 text-slate-300'}
        `}>
          {step.label}
        </div>
      </button>

      {/* Connection Line (Visual only) */}
      <div className={`absolute top-1/2 right-[-8px] w-2 h-0.5 bg-white/10 -z-10 ${isActive ? 'bg-violet-500/50' : ''}`} />
    </div>
  );
};

// --- 2. HISTORY CONTROLS (UNDO/REDO) ---
interface HistoryControlsProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
}

export const HistoryControls = ({ canUndo, canRedo, onUndo, onRedo }: HistoryControlsProps) => (
  <div className="flex items-center gap-2 pr-4 border-r border-white/10 mr-4">
    <button 
      onClick={onUndo}
      disabled={!canUndo}
      className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 group"
      title="Undo"
    >
      <Icons.Undo className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
    </button>
    <button 
      onClick={onRedo}
      disabled={!canRedo}
      className="p-3 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 group"
      title="Redo"
    >
      <Icons.Redo className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    </button>
  </div>
);

// --- 3. REUSABLE HISTORY LIST (Vertical) ---
export const HistoryList = ({ steps, currentIndex, onSelectStep }: { steps: HistoryStep[], currentIndex: number, onSelectStep: (idx: number) => void }) => (
  <div className="space-y-2">
    {[...steps].reverse().map((step, revIndex) => {
      const originalIndex = steps.length - 1 - revIndex;
      const isActive = originalIndex === currentIndex;
      const isFuture = originalIndex > currentIndex;

      return (
        <button
          key={step.id}
          onClick={() => onSelectStep(originalIndex)}
          className={`
            w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left group
            ${isActive 
              ? 'bg-violet-600/10 border-violet-500/50' 
              : 'bg-transparent border-transparent hover:bg-white/5 hover:border-white/10'
            }
            ${isFuture ? 'opacity-50' : 'opacity-100'}
          `}
        >
          <div className="relative">
            <img src={step.thumbnail} className="w-12 h-12 rounded-lg object-cover bg-black/50" />
            {isActive && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-violet-600 rounded-full border-2 border-[#0e0f13] flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <p className={`text-sm font-bold ${isActive ? 'text-violet-300' : 'text-slate-300 group-hover:text-white'}`}>{step.label}</p>
                <span className="text-[10px] text-slate-600">{step.timestamp}</span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">{step.description}</p>
          </div>
        </button>
      );
    })}
  </div>
);

// --- 4. EXPANDED PANEL (Legacy / Floating) ---
interface HistoryExpandedPanelProps {
  isOpen: boolean;
  onClose: () => void;
  steps: HistoryStep[];
  currentIndex: number;
  onSelectStep: (index: number) => void;
}

export const HistoryExpandedPanel = ({ isOpen, onClose, steps, currentIndex, onSelectStep }: HistoryExpandedPanelProps) => (
  <div 
    className={`
      absolute top-0 right-0 h-full w-72 bg-[#0e0f14]/95 backdrop-blur-xl border-l border-white/10 z-40 shadow-2xl
      transition-transform duration-300 ease-in-out flex flex-col
      ${isOpen ? 'translate-x-0' : 'translate-x-full'}
    `}
  >
    <div className="p-4 border-b border-white/10 flex items-center justify-between">
      <h3 className="font-bold text-white flex items-center gap-2">
        <Icons.Refresh className="w-4 h-4 text-slate-400" /> Edit History
      </h3>
      <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white">
        <Icons.Close className="w-4 h-4" />
      </button>
    </div>

    <div className="flex-1 overflow-y-auto p-4">
      <HistoryList steps={steps} currentIndex={currentIndex} onSelectStep={onSelectStep} />
    </div>
  </div>
);

// --- 5. MAIN HISTORY BAR (Horizontal Dock) ---
interface HistoryBarProps {
  steps: HistoryStep[];
  currentIndex: number;
  onUndo: () => void;
  onRedo: () => void;
  onSelectStep: (index: number) => void;
}

export const HistoryBar = ({ steps, currentIndex, onUndo, onRedo, onSelectStep }: HistoryBarProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll to active item
  useEffect(() => {
    if (scrollRef.current) {
      const activeEl = scrollRef.current.children[currentIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  return (
    <>
      <div className="w-full max-w-4xl mx-auto px-4 pb-4">
        <div className="bg-[#0e0f14]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-3 flex items-center shadow-2xl">
          
          {/* Controls */}
          <HistoryControls 
            canUndo={currentIndex > 0} 
            canRedo={currentIndex < steps.length - 1} 
            onUndo={onUndo} 
            onRedo={onRedo} 
          />

          {/* Timeline Scroll */}
          <div className="flex-1 overflow-x-auto no-scrollbar mask-gradient-x relative">
             <div ref={scrollRef} className="flex gap-3 px-4 min-w-min">
               {steps.map((step, idx) => (
                 <HistoryThumbnail 
                   key={step.id} 
                   step={step} 
                   isActive={idx === currentIndex}
                   isFuture={idx > currentIndex}
                   onClick={() => onSelectStep(idx)} 
                 />
               ))}
             </div>
          </div>

          {/* Expand Toggle */}
          <div className="pl-4 border-l border-white/10 ml-4">
            <button 
              onClick={() => setIsPanelOpen(true)}
              className="flex flex-col items-center justify-center gap-1 p-2 text-slate-500 hover:text-white transition-colors group"
            >
              <Icons.Grid className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-[9px] font-bold uppercase">All</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Side Panel */}
      <HistoryExpandedPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        steps={steps} 
        currentIndex={currentIndex} 
        onSelectStep={(idx) => {
          onSelectStep(idx);
          setIsPanelOpen(false); // Optional: close on select
        }} 
      />
    </>
  );
};
