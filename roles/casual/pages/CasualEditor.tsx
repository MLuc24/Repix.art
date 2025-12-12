
import React, { useState, useEffect } from 'react';
import { EditorLayout } from '../../../features/editor/components/EditorLayout';
import { Icons } from '../../../shared/components/Icons';
import { ToolButton, EditorSlider, FilterCard } from '../../../features/editor/components/EditorUI';
import { NeonButton } from '../../../shared/components/GlassUI';
import { HistoryList } from '../../../features/history/components/HistoryLiteUI';
import { MOCK_HISTORY_STEPS } from '../../../services/mock/history';
import { HistoryStep } from '../../../features/history/types';
import { AIChatPanel } from '../../../features/editor/components/AIChatPanel'; // Import Chat
import { FloatingToolPanel } from '../../../features/editor/components/FloatingToolPanel'; // Import Floating Wrapper

// --- TYPES ---
type EditorTool = 'enhance' | 'remove_bg' | 'adjust' | 'filters' | 'remix' | 'history' | null;

// --- MOCK DATA ---
const FILTERS = [
  { id: 'f1', name: 'Vivid', src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=60' },
  { id: 'f2', name: 'Mono', src: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=150&q=60' },
  { id: 'f3', name: 'Warm', src: 'https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?auto=format&fit=crop&w=150&q=60' },
  { id: 'f4', name: 'Cyber', src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=150&q=60', isPro: true },
  { id: 'f5', name: 'Vintage', src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=60', isPro: true },
  { id: 'f6', name: 'Pastel', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=60', isPro: true },
];

// --- CANVAS COMPONENT ---
const EditorCanvas = ({ zoom, currentImage }: { zoom: number, currentImage: string }) => (
  <div 
    className="relative shadow-2xl transition-transform duration-200 ease-out border-4 border-white/5 rounded-sm"
    style={{ transform: `scale(${zoom / 100})` }}
  >
    <img 
      src={currentImage} 
      alt="Editing"
      className="max-h-[60vh] md:max-h-[70vh] max-w-[90vw] object-contain block"
    />
    
    {/* Mock Compare Button on Image */}
    <button className="absolute bottom-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-black/80 transition-colors">
      <Icons.Compare className="w-5 h-5" />
    </button>
  </div>
);

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
      <ToolButton 
        icon={<Icons.Refresh />} 
        label="History" 
        isActive={activeTool === 'history'} 
        onClick={() => handleToolClick('history')} 
      />
    </>
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
                <NeonButton>Remove Background</NeonButton>
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
                    isPro={f.isPro}
                    isActive={activeFilter === f.id}
                    onClick={() => setActiveFilter(f.id)}
                  />
                ))}
              </div>
            </div>
          </FloatingToolPanel>
        );

      case 'history':
        return (
          <FloatingToolPanel title="Edit History" onClose={() => setActiveTool(null)}>
            <div className="p-6">
              <HistoryList 
                steps={historySteps} 
                currentIndex={historyIndex} 
                onSelectStep={(idx) => setHistoryIndex(idx)} 
              />
            </div>
          </FloatingToolPanel>
        );

      default:
        return null;
    }
  };

  // --- ZOOM CONTROLS ---
  const ZoomControls = (
    <div className="absolute top-6 right-6 flex items-center bg-[#0e0f13]/80 backdrop-blur-md rounded-lg border border-white/10 p-1 shadow-xl z-20">
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

  return (
    <EditorLayout 
      onBack={onBack}
      tools={renderTools()}
      panels={isSidePanelOpen ? <AIChatPanel onClose={() => setIsSidePanelOpen(false)} /> : null}
      onTogglePanel={() => setIsSidePanelOpen(true)}
      canvas={
        <>
          <div className="relative w-full h-full flex items-center justify-center">
             {/* Floating Panel positioned absolute relative to canvas container */}
             {activeTool && (
                <div className="absolute top-0 left-0 h-full z-30">
                   {renderFloatingContent()}
                </div>
             )}
             <EditorCanvas zoom={zoom} currentImage={currentImage} />
          </div>
          {ZoomControls}
        </>
      }
    />
  );
};
