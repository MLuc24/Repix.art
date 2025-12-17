
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

/**
 * EditorSlider
 * Neon styled range slider with numeric display
 */
interface EditorSliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}

export const EditorSlider = ({ label, value, min = 0, max = 100, onChange, disabled }: EditorSliderProps) => (
  <div className={`group ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
    <div className="flex justify-between items-center mb-2">
      <label className="text-xs font-medium text-slate-300 uppercase tracking-wider">{label}</label>
      <span className="text-xs font-mono text-violet-400 bg-violet-900/20 px-1.5 py-0.5 rounded border border-violet-500/20">
        {value}
      </span>
    </div>
    <div className="relative h-6 flex items-center">
      <input 
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="
          w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-4
          [&::-webkit-slider-thumb]:h-4
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-violet-500
          [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(139,92,246,0.5)]
          [&::-webkit-slider-thumb]:border-2
          [&::-webkit-slider-thumb]:border-white
          [&::-webkit-slider-thumb]:transition-all
          [&::-webkit-slider-thumb]:hover:scale-110
          hover:bg-slate-700
        "
      />
      {/* Progress Track Mock (visual only, requires JS for dynamic width if not using native accent-color) */}
      <div 
        className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full pointer-events-none"
        style={{ width: `${((value - min) / (max - min)) * 100}%` }}
      />
    </div>
  </div>
);

/**
 * FilterCard
 * Preview card for filters with lock/pro states
 */
interface FilterCardProps {
  name: string;
  src: string;
  isPro?: boolean;
  isActive?: boolean;
  onClick: () => void;
  key?: React.Key;
}

export const FilterCard = ({ name, src, isPro, isActive, onClick }: FilterCardProps) => (
  <button 
    onClick={onClick}
    className={`
      relative w-full aspect-[3/4] rounded-xl overflow-hidden group transition-all duration-300
      ${isActive ? 'ring-2 ring-violet-500 ring-offset-2 ring-offset-[#1a1b26] scale-[1.02]' : 'opacity-80 hover:opacity-100'}
    `}
  >
    <img src={src} alt={name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
    
    <span className={`
      absolute bottom-2 left-0 w-full text-center text-xs font-medium text-white
      ${isActive ? 'text-violet-300' : ''}
    `}>
      {name}
    </span>

    {isPro && (
      <div className="absolute top-2 right-2 w-5 h-5 bg-black/50 backdrop-blur rounded-full flex items-center justify-center border border-white/10">
        <Icons.Lock className="w-3 h-3 text-amber-400" />
      </div>
    )}
  </button>
);

/**
 * ToolButton
 * Main sidebar icon button
 */
interface ToolButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick: () => void;
  key?: React.Key;
  locked?: boolean;
}

export const ToolButton = ({ icon, label, isActive, onClick, locked }: ToolButtonProps) => (
  <button 
    onClick={onClick}
    className="group relative flex items-center justify-center p-1 transition-all duration-300"
    title={label}
  >
    <div className={`
      relative w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-300
      ${isActive 
        ? 'bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20 scale-100 rotate-0' 
        : locked 
          ? 'text-slate-600 bg-white/5 cursor-not-allowed'
          : 'text-slate-400 hover:text-white hover:bg-white/10'
      }
    `}>
      {React.cloneElement(icon as React.ReactElement, { className: `w-4 h-4 ${isActive ? 'text-black' : ''}` })}
      
      {locked && (
        <div className="absolute -top-1 -right-1 bg-black/80 rounded-full p-0.5 border border-white/20">
          <Icons.Lock className="w-2.5 h-2.5 text-amber-500" />
        </div>
      )}
    </div>
    
    {/* Tooltip Label */}
    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
      {label} {locked && '(Locked)'}
    </span>
  </button>
);
