
import React, { useState, useEffect, useRef } from 'react';
import { EditorLayout } from '../../../features/editor/components/EditorLayout';
import { Icons } from '../../../shared/components/Icons';
import { ToolButton, EditorSlider, FilterCard } from '../../../features/editor/components/EditorUI';
import { NeonButton, GlassModal } from '../../../shared/components/GlassUI';
import { HistoryList } from '../../../features/history/components/HistoryLiteUI';
import { MOCK_HISTORY_STEPS } from '../../../services/mock/history';
import { HistoryStep } from '../../../features/history/types';
import { AIChatPanel } from '../../../features/editor/components/AIChatPanel'; // Import Chat
import { FloatingToolPanel } from '../../../features/editor/components/FloatingToolPanel'; // Import Floating Wrapper

// --- TYPES ---
type EditorTool = 'enhance' | 'remove_bg' | 'adjust' | 'filters' | 'remix' | 'history' | null;

// --- MOCK DATA ---
// --- FILTER DEFINITIONS ---
// --- FILTER DEFINITIONS ---
const FILTERS = [
  { id: 'f1', name: 'Vivid', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=60' },
  { id: 'f2', name: 'Mono', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=60' },
  { id: 'f3', name: 'Warm', src: 'https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?auto=format&fit=crop&w=150&q=60' },
  { id: 'f4', name: 'Cyber', src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=150&q=60', isPro: true },
  { id: 'f5', name: 'Vintage', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=60', isPro: true },
  { id: 'f6', name: 'Pastel', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=60', isPro: true },
];

const FILTER_STYLES: Record<string, string> = {
  f1: '', // Vivid (none/default)
  f2: 'grayscale(100%)', // Mono
  f3: 'sepia(50%) contrast(110%)', // Warm
  f4: 'hue-rotate(180deg) saturate(150%)', // Cyber
  f5: 'sepia(80%) opacity(80%)', // Vintage
  f6: 'brightness(110%) saturate(80%) contrast(90%)', // Pastel
};

// --- CANVAS COMPONENT ---
const EditorCanvas = ({ zoom, currentImage, originalImage, filterStyle }: { zoom: number, currentImage: string, originalImage: string, filterStyle?: React.CSSProperties }) => {
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPos(percentage);
  };

  return (
    <div 
      className="relative shadow-2xl transition-transform duration-200 ease-out border-4 border-white/5 rounded-sm select-none"
      style={{ transform: `scale(${zoom / 100})` }}
    >
      {/* Container for Comparison */}
      <div 
        ref={containerRef}
        className="relative max-h-[60vh] md:max-h-[70vh] max-w-[90vw] overflow-hidden cursor-crosshair group"
        onMouseMove={(e) => isCompareMode && e.buttons === 1 && handleMouseMove(e)}
        onTouchMove={(e) => isCompareMode && handleMouseMove(e)}
        onClick={(e) => isCompareMode && handleMouseMove(e)}
      >
        {/* Base Image (After / Current) */}
        {/* Note: Using MOCK images for clear demonstration as requested */}
        <img 
          src={isCompareMode ? currentImage : currentImage} 
          alt="After"
          className="max-h-[60vh] md:max-h-[70vh] max-w-[90vw] object-contain block pointer-events-none transition-[filter] duration-200"
          style={!isCompareMode ? filterStyle : undefined} // Only apply filter when NOT comparing (or apply to "After" side if possible)
          // Actually, if comparing, the "After" image is the one visible on the right. 
          // So we SHOULD apply the filter to this image ALWAYS, because "After" = "Edited".
          // BUT, if `isCompareMode` is true, this img is visible? Yes.
          // Wait, the "After" image is the background layer. The "Before" image is the Overlay.
          // So applying style here is correct.
          // Let's refine:
          // style={filterStyle} 
          draggable={false}
        />

        {/* Overlay Image (Before / Original) - Clipped */}
        {isCompareMode && (
          <div 
            className="absolute inset-0 shadow-[0_0_20px_rgba(0,0,0,0.5)] bg-[#0e0f13] overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
             <img 
              src={originalImage} 
              alt="Before"
              className="h-full w-full object-cover object-left block pointer-events-none" 
              style={{ width: containerRef.current?.getBoundingClientRect().width, height: '100%', maxWidth: 'none' }} 
              draggable={false}
            />
            {/* Divider Line (Stick to Right Edge of this clipped container) */}
            <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white z-10" />

            {/* Dragger Handle */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize z-20 text-violet-600">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M17 7l5 5-5 5M7 17l-5-5 5-5" />
               </svg>
            </div>
            
            {/* Label: ORIGINAL */}
            <div className="absolute top-5 left-5 px-3 py-1.5 bg-[#1f1f1f] text-white text-[11px] font-bold rounded-full shadow-md z-10 tracking-wide">
              ORIGINAL
            </div>
          </div>
        )}

         {isCompareMode && (
           /* Label: EDITED */
           <div className="absolute top-5 right-5 px-3 py-1.5 bg-[#8b5cf6] text-white text-[11px] font-bold rounded-full shadow-md z-10 tracking-wide">
             EDITED
           </div>
         )}
      </div>
      
      {/* Compare Toggle Button */}
      <button 
        onClick={() => setIsCompareMode(!isCompareMode)}
        className={`absolute bottom-4 right-4 p-3 backdrop-blur-md rounded-full text-white border transition-all z-30 ${isCompareMode ? 'bg-violet-600 border-violet-400 shadow-lg shadow-violet-500/20' : 'bg-black/60 border-white/20 hover:bg-black/80'}`}
        title="Toggle Comparison Slider"
      >
        <Icons.Compare className="w-5 h-5" />
      </button>
    </div>
  );
};

// --- MAIN COMPONENT ---
export const CasualEditor = ({ onBack, onExport }: { onBack: () => void, onExport?: () => void }) => {
  const [activeTool, setActiveTool] = useState<EditorTool>(null); // Nullable for floating logic
  const [zoom, setZoom] = useState(100);
  const [adjustments, setAdjustments] = useState({ brightness: 50, contrast: 50, sat: 50, sharp: 0 });
  const [activeFilter, setActiveFilter] = useState('f1');
  const [isEnhancing, setIsEnhancing] = useState(false);
  
  // HISTORY STATE
  const [historySteps, setHistorySteps] = useState<HistoryStep[]>(MOCK_HISTORY_STEPS);
  const [historyIndex, setHistoryIndex] = useState(MOCK_HISTORY_STEPS.length - 1);

  // SIDEBAR STATE
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  // HEADER ACTIONS STATE
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [pendingProFeature, setPendingProFeature] = useState<{ id: string; name: string; type: 'filter' | 'enhance' | 'remove_bg'; cost: number } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // STATE
  const [unlockedFeatures, setUnlockedFeatures] = useState<string[]>([]);
  const [isBgRemoved, setIsBgRemoved] = useState(false);

  // --- FILTER LOGIC ---
  const getCombinedFilterStyle = () => {
    const parts = [];
    
    // 1. Adjustments (0-100 range)
    // Brightness: 0 -> 0.5, 50 -> 1.0, 100 -> 1.5
    const b = 0.5 + (adjustments.brightness / 100); 
    if (b !== 1) parts.push(`brightness(${b})`);

    // Contrast: 0 -> 0.5, 50 -> 1.0, 100 -> 1.5
    const c = 0.5 + (adjustments.contrast / 100);
    if (c !== 1) parts.push(`contrast(${c})`);

    // Saturation: 0 -> 0, 50 -> 1.0, 100 -> 2.0
    const s = (adjustments.sat / 50); 
    if (s !== 1) parts.push(`saturate(${s})`);

    // Sharpness: Use contrast hack or ignore (CSS doesn't support sharpen easily without SVG filters)
    // We'll mimic sharpen with a bit more contrast
    if (adjustments.sharp > 0) parts.push(`contrast(${1 + (adjustments.sharp / 200)})`); 

    // 2. Filters
    const filterCss = FILTER_STYLES[activeFilter];
    if (filterCss) parts.push(filterCss);

    // 3. Auto Enhance (Make it obvious)
    if (isEnhancing) {
      parts.push('contrast(1.25) saturate(1.4) brightness(1.1)'); // stronger effect
    }

    return { 
      filter: parts.join(' '),
      // Simulate BG Removal with clip-path (visual mock)
      // Actually simple circle/inset is safer for responsiveness:
      clipPath: isBgRemoved ? 'inset(10% 20% 0% 20% round 20% 20% 0 0)' : 'none' 
    };
  };

  const PRO_BG_CLIP = isBgRemoved ? { clipPath: 'inset(10% 20% 0% 20% round 20% 20% 0 0)' } : {}; 
  // Make a portrait cutout mock

  const handleProFeatureClick = (feature: { id: string, name: string, isPro?: boolean, cost?: number, type: 'filter' | 'tool' }) => {
    if (feature.isPro) {
       setPendingProFeature({ 
         id: feature.id, 
         name: feature.name, 
         cost: feature.cost || 1,
         type: feature.type 
       });
    } else {
       // Direct action if not pro
       if (feature.type === 'filter') setActiveFilter(feature.id);
    }
  };

  const handleUnlockFeature = () => {
    if (!pendingProFeature) return;
    
    // Simulate API call / interaction
    setTimeout(() => {
      setPendingProFeature(null);
      setUnlockedFeatures(prev => [...prev, pendingProFeature.id]); // Mark as unlocked
      showToast(`Unlocked ${pendingProFeature.name} for ${pendingProFeature.cost} credit!`);
      
      // Apply the feature
      if (pendingProFeature.type === 'filter') {
         setActiveFilter(pendingProFeature.id);
      }
    }, 500);
  };
   
  const handleRemoveBg = () => {
    // setActiveTool(null); // Keep tool open so they see result? Or close it.
    showToast('Process: Removing Background...');
    setTimeout(() => {
        setIsBgRemoved(true);
        showToast('Background Removed Successfully!');
    }, 1000);
  };



  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setToastMessage('Undid last action');
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const handleRedo = () => {
    if (historyIndex < historySteps.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setToastMessage('Redid action');
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const handleReset = () => {
    const confirmReset = window.confirm('Are you sure you want to revert to original?');
    if (confirmReset) {
      setHistoryIndex(0);
      setAdjustments({ brightness: 50, contrast: 50, sat: 50, sharp: 0 });
      setActiveFilter('f1');
      setToastMessage('Reset to original');
      setTimeout(() => setToastMessage(null), 2000);
    }
  };

  const currentImage = historySteps[historyIndex].thumbnail.replace('w=100', 'w=1200');

  useEffect(() => {
    const handleExportTrigger = () => {
      if (onExport) onExport();
    };
    window.addEventListener('TRIGGER_EXPORT', handleExportTrigger);
    return () => window.removeEventListener('TRIGGER_EXPORT', handleExportTrigger);
  }, [onExport]);

  const handleToolClick = (tool: EditorTool) => {
    // Toggle: if clicking active tool, close it. Else open new.
    setActiveTool(prev => prev === tool ? null : tool);
  };

  // --- TOOLS SIDEBAR ---
  const renderTools = () => (
    <>
      <ToolButton 
        icon={<Icons.Bolt />} 
        label="Enhance" 
        isActive={activeTool === 'enhance'} 
        onClick={() => handleToolClick('enhance')} 
      />
      <ToolButton 
        icon={<Icons.Scissors />} 
        label="Remove BG" 
        isActive={activeTool === 'remove_bg'} 
        onClick={() => handleToolClick('remove_bg')} 
      />
      <ToolButton 
        icon={<Icons.Sliders />} 
        label="Adjust" 
        isActive={activeTool === 'adjust'} 
        onClick={() => handleToolClick('adjust')} 
      />
      <ToolButton 
        icon={<Icons.Wand />} 
        label="Filters" 
        isActive={activeTool === 'filters'} 
        onClick={() => handleToolClick('filters')} 
      />
      <div className="flex-1" />
    </>
  );

  // --- HISTORY SIDEBAR (Like Pro) ---
  const renderHistorySidebar = () => (
    <div className="flex flex-col h-full w-full font-sans">
      
      {/* Header (Vertical Compact) */}
      <div className="flex-none flex flex-col items-center justify-center py-4 border-b border-white/5 bg-[#1a1b1e]/50 backdrop-blur-sm z-10 gap-1">
        <div className="flex items-center gap-1.5 text-slate-200">
           <Icons.Refresh className="w-3 h-3 text-violet-500" />
           <span className="text-[9px] font-black tracking-widest uppercase">History</span>
        </div>
        <div className="text-[9px] font-mono text-slate-500">
           {historySteps.length} VERSIONS
        </div>
      </div>

      {/* Grid List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 grid grid-cols-1 gap-3 content-start">
        {historySteps.slice().reverse().map((step, idx) => {
           const originalIdx = historySteps.length - 1 - idx;
           const actualStep = historySteps[originalIdx];
           const isActive = originalIdx === historyIndex;
           const version = originalIdx + 1;

           return (
             <div 
               key={actualStep.id}
               onClick={() => setHistoryIndex(originalIdx)}
               className={`group relative w-full aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-md
                 ${isActive 
                   ? 'ring-2 ring-violet-500 shadow-[0_0_15px_rgba(124,58,237,0.3)] z-10 scale-[1.02]' 
                   : 'ring-1 ring-white/10 hover:ring-white/30 hover:shadow-lg'
                 }
               `}
               title={`${actualStep.label} - ${actualStep.timestamp}`}
             >
                {/* Image */}
                <img 
                  src={actualStep.thumbnail}
                  alt="Thumbnail" 
                  className={`w-full h-full object-cover transition-transform duration-500 ${isActive ? 'scale-100' : 'scale-110 group-hover:scale-100 grayscale-[0.3]'}`}
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-90" />
                
                {/* Top Left: Version Badge */}
                <div className="absolute top-1.5 left-1.5">
                   <span className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold border backdrop-blur-sm shadow-sm
                     ${isActive ? 'bg-violet-600 text-white border-violet-500' : 'bg-black/40 text-slate-200 border-white/10'}
                   `}>
                     {version}
                   </span>
                </div>

                {/* Bottom Info: Action Name (Truncated) */}
                <div className="absolute bottom-0 left-0 right-0 p-1.5">
                  <p className="text-[9px] font-bold text-white shadow-black drop-shadow-md truncate text-center leading-tight">
                    {actualStep.label}
                  </p>
                </div>
             </div>
           );
        })}
      </div>
    </div>
  );

  // --- FLOATING WINDOW CONTENT ---
  const renderFloatingContent = () => {
    switch (activeTool) {
      case 'enhance':
        return (
          <FloatingToolPanel title="Auto Enhance" onClose={() => setActiveTool(null)}>
            <div className="p-6">
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Automatically correct lighting, color balance, and detail with our AI engine.
              </p>
              
              <button 
                onClick={() => setIsEnhancing(!isEnhancing)}
                className={`w-full py-12 rounded-2xl border-2 border-dashed transition-all mb-8 flex flex-col items-center justify-center gap-3
                  ${isEnhancing 
                    ? 'border-violet-500 bg-violet-500/10 text-violet-300' 
                    : 'border-white/10 hover:border-violet-500/50 hover:bg-white/5 text-slate-400'
                  }
                `}
              >
                 {isEnhancing ? (
                   <>
                    <Icons.Check className="w-8 h-8" />
                    <span className="font-bold">Enhanced</span>
                   </>
                 ) : (
                   <>
                    <Icons.Bolt className="w-8 h-8" />
                    <span className="font-medium">Click to Enhance</span>
                   </>
                 )}
              </button>

              <div className="p-4 rounded-xl bg-gradient-to-br from-[#1a1b26] to-[#0f0f12] border border-violet-500/20 shadow-lg relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-white">Pro Enhance +</span>
                  <Icons.Lock className="w-4 h-4 text-amber-400" />
                </div>
                <p className="text-xs text-slate-400 mb-3">Fix blurry faces and noise reduction.</p>
                <button className="text-xs font-bold text-violet-400 uppercase tracking-wide">Unlock for 1 credit</button>
              </div>
            </div>
          </FloatingToolPanel>
        );

      case 'remove_bg':
        return (
          <FloatingToolPanel title="Remove Background" onClose={() => setActiveTool(null)}>
            <div className="p-6">
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-violet-600/20 border border-violet-500/50 flex items-center justify-between cursor-pointer hover:bg-violet-600/30 transition-colors">
                  <div>
                    <p className="font-bold text-white text-sm">Standard Removal</p>
                    <p className="text-xs text-violet-200">Fast & precise for most photos</p>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-violet-400 flex items-center justify-center">
                     <div className="w-2.5 h-2.5 bg-violet-400 rounded-full" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between opacity-70 cursor-not-allowed">
                  <div>
                    <div className="flex items-center gap-2">
                       <p className="font-bold text-slate-300 text-sm">HD Removal</p>
                       <span className="text-[9px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1 rounded uppercase font-bold">Pro</span>
                    </div>
                    <p className="text-xs text-slate-500">For hair & transparent objects</p>
                  </div>
                  <Icons.Lock className="w-4 h-4 text-slate-500" />
                </div>
              </div>

              <div className="mt-8">
                <NeonButton onClick={handleRemoveBg}>Remove Background</NeonButton>
              </div>
            </div>
          </FloatingToolPanel>
        );

      case 'adjust':
        return (
          <FloatingToolPanel title="Adjustments" onClose={() => setActiveTool(null)}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs text-slate-400">Basic Corrections</span>
                <button className="text-xs text-violet-400 hover:text-white transition-colors">Reset</button>
              </div>

              <div className="space-y-8">
                <EditorSlider 
                  label="Brightness" 
                  value={adjustments.brightness} 
                  onChange={(v) => setAdjustments({...adjustments, brightness: v})} 
                />
                <EditorSlider 
                  label="Contrast" 
                  value={adjustments.contrast} 
                  onChange={(v) => setAdjustments({...adjustments, contrast: v})} 
                />
                <EditorSlider 
                  label="Saturation" 
                  value={adjustments.sat} 
                  onChange={(v) => setAdjustments({...adjustments, sat: v})} 
                />
                <EditorSlider 
                  label="Sharpness" 
                  value={adjustments.sharp} 
                  onChange={(v) => setAdjustments({...adjustments, sharp: v})} 
                />
                
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-300">Temperature</span>
                    <Icons.Lock className="w-3 h-3 text-slate-600" />
                  </div>
                   <EditorSlider 
                    label="Warmth" 
                    value={0} 
                    disabled 
                    onChange={() => {}} 
                  />
                </div>
              </div>
            </div>
          </FloatingToolPanel>
        );

      case 'filters':
        return (
          <FloatingToolPanel title="Filters" onClose={() => setActiveTool(null)}>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {FILTERS.map(f => (
                  <FilterCard 
                    key={f.id}
                    name={f.name}
                    src={f.src}
                    isPro={f.isPro && !unlockedFeatures.includes(f.id)}
                    isActive={activeFilter === f.id}
                    onClick={() => handleProFeatureClick({ id: f.id, name: f.name, isPro: f.isPro && !unlockedFeatures.includes(f.id), type: 'filter' })}
                  />
                ))}
              </div>
            </div>
          </FloatingToolPanel>
        );



      default:
        return null;
    }
  };

  // --- ZOOM CONTROLS ---
  const ZoomControls = (
    <div className="absolute top-3 right-[340px] flex items-center bg-[#0e0f13]/80 backdrop-blur-md rounded-lg border border-white/10 p-1 shadow-xl z-20">
      <button 
        onClick={() => setZoom(Math.max(10, zoom - 10))}
        className="p-2 hover:bg-white/10 rounded-md text-slate-400 hover:text-white"
      >
        <Icons.ZoomOut className="w-4 h-4" />
      </button>
      <span className="w-12 text-center text-xs font-mono text-slate-300">{zoom}%</span>
      <button 
        onClick={() => setZoom(Math.min(200, zoom + 10))}
        className="p-2 hover:bg-white/10 rounded-md text-slate-400 hover:text-white"
      >
        <Icons.ZoomIn className="w-4 h-4" />
      </button>
    </div>
  );



  // --- SHARE MODAL ---
  const ShareModal = (
    <GlassModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} className="max-w-md">
      <div className="p-2 max-w-sm mx-auto">
        <h3 className="text-xl font-bold text-white mb-2">Share Project</h3>
        <p className="text-slate-400 text-sm mb-6">Anyone with the link can view this project.</p>
        
        <div className="flex gap-2 mb-6">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 font-mono truncate select-all">
            repix.art/s/83j29d0s
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText('repix.art/s/83j29d0s');
              setToastMessage('Link copied!');
              setTimeout(() => setToastMessage(null), 2000);
            }}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm transition-colors"
          >
            Copy
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#1877f2]/10 hover:bg-[#1877f2]/20 border border-[#1877f2]/20 transition-all group">
            <Icons.Facebook className="w-6 h-6 text-[#1877f2]" />
            <span className="text-xs font-bold text-[#1877f2]">Facebook</span>
          </button>
          <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-[#1da1f2]/10 hover:bg-[#1da1f2]/20 border border-[#1da1f2]/20 transition-all group">
            <Icons.Share className="w-6 h-6 text-[#1da1f2]" />
            <span className="text-xs font-bold text-[#1da1f2]">Twitter</span>
          </button>
           <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/20 transition-all group">
            <Icons.Image className="w-6 h-6 text-pink-500" />
            <span className="text-xs font-bold text-pink-500">Instagram</span>
          </button>
        </div>
      </div>
    </GlassModal>
  );

  // --- PURCHASE MODAL ---
  const PurchaseModal = (
    <GlassModal isOpen={!!pendingProFeature} onClose={() => setPendingProFeature(null)} className="max-w-sm">
      <div className="p-4 text-center">
        <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
          <Icons.Lock className="w-8 h-8 text-amber-500" />
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">Unlock Pro Feature</h3>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          The <span className="font-bold text-white">{pendingProFeature?.name}</span> feature is available for Pro users or via credit purchase.
        </p>
        
        <div className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-xl p-4 mb-6 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600" />
           <p className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Cost</p>
           <div className="flex items-center justify-center gap-2">
             <Icons.Sparkles className="w-5 h-5 text-amber-400" />
             <span className="text-3xl font-bold text-white">{pendingProFeature?.cost}</span>
             <span className="text-sm font-medium text-slate-400">credit</span>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setPendingProFeature(null)}
            className="py-3 rounded-xl font-bold text-sm text-slate-400 hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <NeonButton 
            variant="warning" 
            onClick={handleUnlockFeature}
            className="w-full justify-center"
          >
            Unlock Now
          </NeonButton>
        </div>
      </div>
    </GlassModal>
  );

  return (
    <>
      <EditorLayout 
        onBack={onBack}
        tools={renderTools()}
        panels={isSidePanelOpen ? <AIChatPanel onClose={() => setIsSidePanelOpen(false)} /> : null}
        onTogglePanel={() => setIsSidePanelOpen(true)}
        
        isHistoryOpen={isHistoryOpen}
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}

        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onShare={() => setIsShareOpen(true)}
        bottomDock={renderHistorySidebar()}
        canvas={
          <>
            <div className="relative w-full h-full flex items-center justify-center">
               {/* Floating Panel positioned absolute relative to canvas container */}
               {activeTool && (
                  <div className="absolute top-0 left-0 h-full z-30">
                     {renderFloatingContent()}
                  </div>
               )}
               <EditorCanvas 
                 zoom={zoom} 
                 currentImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80" 
                 originalImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80&sat=-100" 
                 filterStyle={getCombinedFilterStyle()}
               />
            </div>
            {ZoomControls}
          </>
        }
      />
      {ShareModal}
      {PurchaseModal}
      
      {/* Custom Toast */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 text-white font-bold rounded-full shadow-2xl animate-fade-in-up z-[60] flex items-center gap-2">
           <Icons.Check className="w-4 h-4 text-green-400" />
           {toastMessage}
        </div>
      )}
    </>
  );
};
