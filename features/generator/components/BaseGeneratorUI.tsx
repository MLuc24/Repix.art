
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icons } from '../../../shared/components/Icons';
import { GenModel, AspectRatio } from '../types';

// --- PROMPT INPUT BASE ---
interface GenPromptInputProps {
  value: string;
  onChange: (val: string) => void;
  onInspire: () => void;
  onEnhance?: () => void;
  className?: string;
}

export const GenPromptInput = ({ value, onChange, onInspire, onEnhance, className = "" }: GenPromptInputProps) => (
  <div className={`relative group ${className}`}>
    <textarea 
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Describe what you want to create..."
      className="w-full h-32 bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl p-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 outline-none resize-none transition-all shadow-sm dark:shadow-inner text-sm leading-relaxed"
    />
    <div className="absolute bottom-3 right-3 flex items-center gap-2">
      {onEnhance && (
        <button 
          onClick={onEnhance}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-lg hover:shadow-violet-500/20 text-xs font-bold text-white transition-all flex items-center gap-1.5"
        >
          <Icons.Wand className="w-3 h-3" /> Pro Enhance
        </button>
      )}
      <button 
        onClick={onInspire}
        className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-violet-100 dark:hover:bg-violet-500/20 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-300 transition-colors border border-slate-200 dark:border-white/5 flex items-center gap-1.5"
      >
        <Icons.Sparkles className="w-3 h-3" /> Inspire Me
      </button>
    </div>
  </div>
);

// --- ASPECT RATIO SELECTOR BASE ---
interface GenAspectRatioProps {
  value: AspectRatio;
  onChange: (val: AspectRatio) => void;
  disabled?: boolean;
}

export const GenAspectRatio = ({ value, onChange, disabled }: GenAspectRatioProps) => {
  const ratios: { label: string, val: AspectRatio, shape: string }[] = [
    { label: 'Square', val: '1:1', shape: 'w-5 h-5' },
    { label: 'Portrait', val: '3:4', shape: 'w-4 h-6' },
    { label: 'Story', val: '9:16', shape: 'w-3 h-6' },
    { label: 'Wide', val: '16:9', shape: 'w-6 h-3' },
  ];

  return (
    <div className={`grid grid-cols-4 gap-2 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {ratios.map((r) => (
        <button
          key={r.val}
          onClick={() => onChange(r.val)}
          className={`
            flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all duration-300
            ${value === r.val 
              ? 'bg-violet-50 dark:bg-violet-600/20 border-violet-500 text-violet-700 dark:text-violet-200 shadow-sm' 
              : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-500 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/10 hover:text-slate-700 dark:hover:text-slate-300'
            }
          `}
        >
          <div className={`border-2 rounded-[2px] ${value === r.val ? 'border-violet-500 dark:border-violet-400 bg-violet-500/20 dark:bg-violet-400/20' : 'border-current'} ${r.shape}`} />
          <span className="text-[9px] font-bold uppercase tracking-wide">{r.val}</span>
        </button>
      ))}
    </div>
  );
};

// --- OUTPUT SELECTOR LITE (New) ---
interface GenOutputSelectorProps {
  value: number;
  onChange: (val: number) => void;
}

export const GenOutputSelector = ({ value, onChange }: GenOutputSelectorProps) => {
  const options = [
    { count: 1, label: '1 Image', pro: false },
    { count: 2, label: '2 Images', pro: false },
    { count: 4, label: '4 Images', pro: true },
  ];

  return (
    <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-xl border border-slate-200 dark:border-white/5">
      {options.map((opt) => (
        <button
          key={opt.count}
          onClick={() => onChange(opt.count)}
          className={`
            flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5
            ${value === opt.count 
              ? 'bg-white dark:bg-[#1a1b26] text-slate-900 dark:text-white shadow-sm' 
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }
          `}
        >
          {opt.label}
          {opt.pro && value !== opt.count && <Icons.Lock className="w-2.5 h-2.5 text-amber-500" />}
        </button>
      ))}
    </div>
  );
};

// --- ADVANCED SETTINGS LITE (New) ---
interface GenAdvancedSettingsProps {
  values: { detail: number, creativity: number, sharpness: number };
  onChange: (key: string, val: number) => void;
}

export const GenAdvancedSettings = ({ values, onChange }: GenAdvancedSettingsProps) => {
  const Slider = ({ label, val, k }: { label: string, val: number, k: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
        <span>{label}</span>
        <span>{val}%</span>
      </div>
      <div className="relative h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
        <div 
          className="absolute top-0 left-0 h-full bg-violet-500 transition-all"
          style={{ width: `${val}%` }}
        />
        <input 
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => onChange(k, Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );

  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 space-y-4">
      <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-2">Advanced Settings</h4>
      <Slider label="Detail Boost" val={values.detail} k="detail" />
      <Slider label="Creativity" val={values.creativity} k="creativity" />
      <Slider label="Sharpness" val={values.sharpness} k="sharpness" />
    </div>
  );
};

// --- DROPDOWN MODEL SELECTOR ---
interface GenModelSelectorProps {
  models: GenModel[];
  selectedId: string;
  onSelect: (model: GenModel) => void;
}

export const GenModelSelector = ({ models, selectedId, onSelect }: GenModelSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null); // Added ref for the portal content
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  
  const selectedModel = models.find(m => m.id === selectedId) || models[0];

  const toggleDropdown = () => {
    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuStyle({
        position: 'fixed',
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
        width: `${rect.width}px`,
        zIndex: 9999,
        maxHeight: '300px',
      });
    }
    setIsOpen(!isOpen);
  };

  // Close on scroll (WINDOW scroll only, not internal scroll) / resize
  useEffect(() => {
    if (isOpen) {
      const handleScroll = (event: Event) => {
        // If scrolling inside the menu, don't close.
        // Check if event target is the menu or inside the menu.
        if (menuRef.current && (event.target === menuRef.current || menuRef.current.contains(event.target as Node))) {
          return;
        }
        setIsOpen(false);
      };
      
      // Use capture to detect all scroll events
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', () => setIsOpen(false));
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', () => setIsOpen(false));
      };
    }
  }, [isOpen]);

  // Handle Outside Click (including Portal logic)
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      // Check if click is inside the button OR inside the menu (which is in a Portal)
      if (
        buttonRef.current && 
        (buttonRef.current.contains(event.target as Node))
      ) {
        return; 
      }
      if (
        menuRef.current &&
        (menuRef.current.contains(event.target as Node))
      ) {
        return;
      }
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <button 
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`
          w-full flex items-center justify-between p-3 
          bg-white dark:bg-[#1a1b26] 
          border transition-all text-left group shadow-sm rounded-xl
          ${isOpen 
            ? 'border-violet-500 ring-2 ring-violet-500/20' 
            : 'border-slate-200 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-500/50'
          }
        `}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <img 
            src={selectedModel.thumbnail} 
            alt={selectedModel.name} 
            className="w-10 h-10 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-white/5"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate leading-tight">{selectedModel.name}</p>
              {selectedModel.isPro && (
                <span className="text-[9px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded-sm uppercase tracking-wide">PRO</span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
              <Icons.Zap className="w-2.5 h-2.5 text-amber-500" />
              {selectedModel.cost} Credits
            </p>
          </div>
        </div>
        <Icons.ChevronLeft className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform ${isOpen ? 'rotate-90 text-violet-500' : '-rotate-90'}`} />
      </button>

      {/* Render Dropdown via Portal */}
      {isOpen && createPortal(
        <div 
          ref={menuRef} // Attach Ref here
          className="fixed flex flex-col bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up"
          style={menuStyle}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="p-2 space-y-1 overflow-y-auto custom-scrollbar">
            {models.map((model) => {
              const isSelected = model.id === selectedId;
              return (
                <button
                  key={model.id}
                  onClick={() => { onSelect(model); setIsOpen(false); }}
                  className={`
                    w-full flex items-center gap-3 p-2 rounded-lg transition-all border
                    ${isSelected 
                      ? 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/30' 
                      : 'border-transparent hover:bg-slate-50 dark:hover:bg-white/5'
                    }
                  `}
                >
                  <img src={model.thumbnail} className="w-9 h-9 rounded-md object-cover" alt={model.name} />
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold truncate ${isSelected ? 'text-violet-700 dark:text-violet-300' : 'text-slate-800 dark:text-slate-200'}`}>
                        {model.name}
                      </span>
                      {model.isPro && (
                        <div className="flex items-center gap-1">
                          <span className="text-[8px] font-bold bg-amber-500/20 text-amber-500 px-1 rounded uppercase">PRO</span>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-500">{model.cost} Credits</span>
                  </div>
                  {isSelected && <Icons.Check className="w-4 h-4 text-violet-600 dark:text-violet-400" />}
                </button>
              );
            })}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// --- HERO MODEL GRID ---
interface HeroModelGridProps {
  models: GenModel[];
  onSelect: (model: GenModel) => void;
}

export const HeroModelGrid = ({ models, onSelect }: HeroModelGridProps) => {
  return (
    <div className="animate-fade-in-up w-full">
      {/* Header */}
      <div className="text-center mb-10 mt-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-2xl">🚀</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Try to make crazy image & video</h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Create any video or image with any AI model</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-20">
        {models.map((model, idx) => (
          <div 
            key={model.id}
            onClick={() => onSelect(model)}
            className="group relative w-full aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-slate-200 dark:border-white/5 hover:border-violet-500 dark:hover:border-violet-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white dark:bg-[#1a1b26]"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            {/* Image */}
            <img 
              src={model.thumbnail} 
              alt={model.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col gap-1">
              <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors shadow-sm">
                {model.name}
              </h3>
              <p className="text-[10px] text-slate-300 dark:text-slate-400 leading-snug line-clamp-3 group-hover:text-slate-200">
                {model.description}
              </p>
            </div>

            {/* Pro Badge */}
            {model.isPro && (
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur rounded p-1 shadow-sm">
                <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/30">PRO</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- UPLOADER BASE ---
export const GenUploader = ({ onUpload, previewUrl }: { onUpload: () => void, previewUrl?: string }) => (
  <div 
    onClick={onUpload}
    className="relative w-full aspect-[2/1] rounded-2xl border-2 border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 hover:border-violet-500 dark:hover:border-violet-500/50 transition-all cursor-pointer overflow-hidden flex flex-col items-center justify-center gap-3 group"
  >
    {previewUrl ? (
      <>
        <img src={previewUrl} alt="Upload" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur text-white text-sm font-bold border border-white/10">
             Change Image
           </div>
        </div>
      </>
    ) : (
      <>
        <div className="p-3 rounded-full bg-white dark:bg-white/5 text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors shadow-sm dark:shadow-none">
          <Icons.Upload className="w-6 h-6" />
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Click to upload reference image</p>
      </>
    )}
  </div>
);

// --- RESULT CARD BASE ---
interface GenResultCardProps {
  src: string;
  onDownload: () => void;
  onEdit: () => void;
  onUpscale?: () => void; // Optional/Locked
  key?: React.Key;
}

export const GenResultCard = ({ src, onDownload, onEdit, onUpscale }: GenResultCardProps) => (
  <div className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1b26] animate-fade-in-up shadow-sm">
    <img src={src} alt="Generated" className="w-full h-auto object-cover" />
    
    {/* Overlay Actions */}
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-4">
      <div className="flex gap-2">
        <button onClick={onEdit} className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:scale-105 transition-transform shadow-lg">
          Open in Editor
        </button>
        <button onClick={onDownload} className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/10">
          <Icons.Download className="w-4 h-4" />
        </button>
      </div>

      {onUpscale && (
        <button onClick={onUpscale} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/60 border border-white/10 hover:border-violet-500 text-xs text-slate-300 hover:text-white transition-all">
          <Icons.Lock className="w-3 h-3 text-amber-400" /> Upscale HD
        </button>
      )}
    </div>
  </div>
);
