
import React, { useState, useEffect, useRef } from 'react';
import { EditorLayout } from '../../../features/editor/components/EditorLayout';
import { Icons } from '../../../shared/components/Icons';
import { ToolButton } from '../../../features/editor/components/EditorUI';
import { ProAdjustPanel } from '../../../features/editor/components/ProAdjustPanel';
import { NeonButton, GlassModal } from '../../../shared/components/GlassUI';
import { ProFiltersPanel } from '../components/filters/ProFiltersPanel';
import { MaskLiteProPanel } from '../components/mask/MaskLiteProPanel';
import { PresetProPanel } from '../preset/PresetProPanel';
import { ExportProOptions } from '../../../features/editor/components/ExportProOptions';
import { ProCropPanel } from '../../../features/editor/components/ProCropPanel'; // Import Crop Panel
import { ProHistoryPanel } from '../../../features/history/components/HistoryProUI';
import { ExportSuccessToast } from '../../../features/export/components/ExportModals';
import { PRO_HISTORY_STEPS } from '../../../services/mock/editor_pro';
import { AIChatPanel } from '../../../features/editor/components/AIChatPanel'; 
import { FloatingToolPanel } from '../../../features/editor/components/FloatingToolPanel'; 

const EditorCanvas = ({ zoom, rotation = 0, currentImage, originalImage, filterStyle }: { zoom: number, rotation?: number, currentImage: string, originalImage: string, filterStyle?: React.CSSProperties }) => {
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
      style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
    >
      {/* Container for Comparison */}
      <div 
        ref={containerRef}
        className="relative max-h-[80vh] max-w-[90vw] overflow-hidden cursor-crosshair group"
        onMouseMove={(e) => isCompareMode && e.buttons === 1 && handleMouseMove(e)}
        onTouchMove={(e) => isCompareMode && handleMouseMove(e)}
        onClick={(e) => isCompareMode && handleMouseMove(e)}
      >
        {/* Base Image (After / Current) */}
        <img 
          src={isCompareMode ? currentImage : currentImage} 
          alt="After"
          className="max-h-[80vh] max-w-[90vw] object-contain block pointer-events-none transition-[filter] duration-200"
          style={!isCompareMode ? filterStyle : undefined}
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
            {/* Divider Line */}
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

type ProTool = 'adjust' | 'filters' | 'presets' | 'mask' | 'crop' | 'export' | 'history' | null;

export const EditorProLite = ({ onBack, onExport }: { onBack: () => void, onExport?: () => void }) => {
  const [activeTool, setActiveTool] = useState<ProTool>(null); 
  const [zoom, setZoom] = useState(100); // Zoom state
  const [rotation, setRotation] = useState(0);
  
  const [activeFilter, setActiveFilter] = useState('leica');
  const [historyIndex, setHistoryIndex] = useState(PRO_HISTORY_STEPS.length - 1);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true); // Default open
  const [isHistoryOpen, setIsHistoryOpen] = useState(true); // Left Panel (History)
  const [isShareOpen, setIsShareOpen] = useState(false);

  const [adjustments, setAdjustments] = useState({
    exposure: 0, contrast: 0, highlights: 0, shadows: 0,
    saturation: 0, vibrance: 0, temp: 0, tint: 0,
    sharpness: 0, noise: 0
  });

  const PRO_FILTERS: Record<string, string> = {
    leica: 'contrast(1.1) saturate(1.1) sepia(0.1)',
    bw: 'grayscale(100%) contrast(1.2)',
    vivid: 'saturate(1.3) contrast(1.1)',
    vintage: 'sepia(0.5) contrast(0.9) brightness(0.9)',
    cyber: 'hue-rotate(190deg) saturate(1.5) contrast(1.1)',
    movie: 'brightness(0.9) contrast(1.2) sepia(0.2)',
  };

  const getProFilterStyle = () => {
    const parts = [];
    
    // 0. Base Filter
    if (activeFilter && PRO_FILTERS[activeFilter]) {
      parts.push(PRO_FILTERS[activeFilter]);
    } else if (activeFilter && !['leica', 'bw', 'vivid', 'vintage', 'cyber', 'movie'].includes(activeFilter)) {
       // Fallback or verify if activeFilter is just an ID
    }

    // Exposure (-100 to 100) -> Brightness (0.5 to 1.5)
    if (adjustments.exposure !== 0) parts.push(`brightness(${1 + adjustments.exposure / 200})`);
    
    // Contrast (-100 to 100) -> Contrast (0.5 to 1.5)
    if (adjustments.contrast !== 0) parts.push(`contrast(${1 + adjustments.contrast / 200})`);

    // Saturation (-100 to 100) -> Saturate (0 to 2)
    if (adjustments.saturation !== 0) parts.push(`saturate(${1 + adjustments.saturation / 100})`);

    // Temp (-100 to 100) -> Sepia + Hue
    if (adjustments.temp !== 0) {
      if (adjustments.temp > 0) parts.push(`sepia(${adjustments.temp / 200})`);
      else parts.push(`hue-rotate(${adjustments.temp / 5}deg)`); // simple cool shift
    }

    return { filter: parts.join(' ') };
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 2000);
    }
  };

  const handleRedo = () => {
    if (historyIndex < PRO_HISTORY_STEPS.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 2000);
    }
  };

  const handleReset = () => {
    const confirmReset = window.confirm('Are you sure you want to revert to original?');
    if (confirmReset) {
      setHistoryIndex(0);
      setActiveFilter('leica');
      setShowSuccessToast(true); 
      setTimeout(() => setShowSuccessToast(false), 2000);
    }
  };

  // 1. Handle Header Export Button (Navigates to Export Page)
  useEffect(() => {
    const handleExportTrigger = () => {
      // If we want to show the floating export panel instead of navigating:
      // setActiveTool('export'); 
      // OR navigate to full page:
      if (onExport) onExport();
    };
    window.addEventListener('TRIGGER_EXPORT', handleExportTrigger);
    return () => window.removeEventListener('TRIGGER_EXPORT', handleExportTrigger);
  }, [onExport]);

  // 2. Handle In-Panel "Quick Export" (Shows Success Toast)
  useEffect(() => {
    const handleExportComplete = () => {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    };
    window.addEventListener('EXPORT_COMPLETE', handleExportComplete);
    return () => window.removeEventListener('EXPORT_COMPLETE', handleExportComplete);
  }, []);

  const handleToolClick = (tool: ProTool) => {
    setActiveTool(prev => prev === tool ? null : tool);
  };

  // --- TOOLS SIDEBAR ---
  const renderTools = () => (
    <>
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
      <ToolButton 
        icon={<Icons.Grid />}
        label="Presets" 
        isActive={activeTool === 'presets'} 
        onClick={() => handleToolClick('presets')} 
      />
      <ToolButton 
        icon={<Icons.Scissors />} 
        label="Mask" 
        isActive={activeTool === 'mask'} 
        onClick={() => handleToolClick('mask')} 
      />
      <ToolButton 
        icon={<Icons.Layout />} 
        label="Crop" 
        isActive={activeTool === 'crop'} 
        onClick={() => handleToolClick('crop')} 
      />
      {/* Export button removed from here, exists in Header */}

    </>
  );

  // --- FLOATING WINDOW CONTENT ---
  const renderFloatingContent = () => {
    switch (activeTool) {
      case 'adjust': 
        return (
          <FloatingToolPanel title="Pro Adjustments" onClose={() => setActiveTool(null)}>
            <ProAdjustPanel values={adjustments} onChange={setAdjustments} />
          </FloatingToolPanel>
        );
      case 'filters': 
        return (
          <FloatingToolPanel title="Pro Filters" onClose={() => setActiveTool(null)}>
            <ProFiltersPanel activeId={activeFilter} onSelect={setActiveFilter} />
          </FloatingToolPanel>
        );
      case 'presets': 
        return (
          <FloatingToolPanel title="My Presets" onClose={() => setActiveTool(null)}>
            <PresetProPanel onSelect={(preset: any) => {
              // Simulate applying a preset
              setAdjustments({
                 exposure: 5, contrast: 10, highlights: -5, shadows: 5,
                 saturation: 15, vibrance: 10, temp: 0, tint: 0,
                 sharpness: 0, noise: 0,
                 texture: 0, clarity: 0, brightness: 0
              });
              setActiveFilter('vivid');
            }} />
          </FloatingToolPanel>
        );
      case 'mask': 
        return (
          <FloatingToolPanel title="Masking Studio" onClose={() => setActiveTool(null)}>
            <MaskLiteProPanel />
          </FloatingToolPanel>
        );
      case 'crop': 
        return (
          <FloatingToolPanel title="Crop & Rotate" onClose={() => setActiveTool(null)}>
            <ProCropPanel rotation={rotation} onRotationChange={setRotation} />
          </FloatingToolPanel>
        );
      case 'export': 
        return (
          <FloatingToolPanel title="Quick Export" onClose={() => setActiveTool(null)}>
            <ExportProOptions />
          </FloatingToolPanel>
        );
      case 'history': 
        return (
          <FloatingToolPanel title="Time Travel" onClose={() => setActiveTool(null)}>
            <ProHistoryPanel 
              steps={PRO_HISTORY_STEPS}
              currentIndex={historyIndex} 
              onJump={(idx) => console.log('Preview Step', idx)}
              onCommit={setHistoryIndex}
              onSnapshot={(idx) => console.log('Save Snapshot', idx)}
            />
          </FloatingToolPanel>
        );
      default: 
        return null;
    }
  };

  // --- CANVAS AREA ---
  const CanvasArea = (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating Panel positioned absolute relative to canvas container */}
      {/* Floating Panel positioned absolute relative to canvas container */}
      {activeTool && (
        <div className="absolute top-0 left-0 h-full z-30">
            {renderFloatingContent()}
        </div>
      )}

      <EditorCanvas 
        zoom={zoom} 
        rotation={rotation}
        currentImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80" 
        originalImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80&sat=-100" 
        filterStyle={getProFilterStyle()}
      />
      {/* Simulated Mask Overlay */}
      {activeTool === 'mask' && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
             <div className="w-full h-full bg-red-500/10 mix-blend-overlay animate-pulse" />
             <div className="absolute top-20 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-xs font-bold shadow-xl">
               Mask Mode Active
             </div>
        </div>
      )}
      
      {/* Precision Zoom (Pro) */}
      <div className="absolute top-3 right-[340px] bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center p-1 gap-1 z-20 shadow-xl">
         <button 
           onClick={() => setZoom(Math.max(10, zoom - 10))}
           className="p-2 hover:bg-white/10 rounded-md text-white"
         >
           <Icons.ZoomOut className="w-4 h-4" />
         </button>
         <div className="w-12 text-center text-xs font-mono text-slate-300">{zoom}%</div>
         <button 
           onClick={() => setZoom(Math.min(300, zoom + 10))}
           className="p-2 hover:bg-white/10 rounded-md text-white"
         >
           <Icons.ZoomIn className="w-4 h-4" />
         </button>
      </div>
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
            repix.art/s/9k20d77x
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText('repix.art/s/9k20d77x');
              setShowSuccessToast(true);
              setTimeout(() => setShowSuccessToast(false), 2000);
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

  // --- HISTORY SIDEBAR CONTENT (High Fidelity) ---
  const renderHistorySidebar = () => (
    <div className="flex flex-col h-full w-full font-sans">
      
      {/* Header (Vertical Compact) */}
      <div className="flex-none flex flex-col items-center justify-center py-4 border-b border-white/5 bg-[#1a1b1e]/50 backdrop-blur-sm z-10 gap-1">
        <div className="flex items-center gap-1.5 text-slate-200">
           <Icons.Refresh className="w-3 h-3 text-violet-500" />
           <span className="text-[9px] font-black tracking-widest uppercase">History</span>
        </div>
        <div className="text-[9px] font-mono text-slate-500">
           {PRO_HISTORY_STEPS.length} VERSIONS
        </div>
      </div>

      {/* Grid List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 grid grid-cols-1 gap-3 content-start">
        {PRO_HISTORY_STEPS.slice().reverse().map((step, idx) => {
           const originalIdx = PRO_HISTORY_STEPS.length - 1 - idx;
           const actualStep = PRO_HISTORY_STEPS[originalIdx];
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
               title={`${actualStep.action} - ${actualStep.timestamp}`}
             >
                {/* Image */}
                <img 
                  src={`https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80`} 
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
                    {actualStep.action}
                  </p>
                </div>

                {/* Active Indicator Ring */}
                {isActive && <div className="absolute inset-0 ring-inset ring-2 ring-violet-500/0" />}
             </div>
           );
        })}
      </div>
    </div>
  );

  return (
    <>
      <EditorLayout 
        onBack={onBack}
        tools={renderTools()}
        // Condition panel rendering based on state
        panels={isSidePanelOpen ? <AIChatPanel onClose={() => setIsSidePanelOpen(false)} /> : null} 
        onTogglePanel={() => setIsSidePanelOpen(true)}
        
        isHistoryOpen={isHistoryOpen}
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}

        onUndo={handleUndo}
        onRedo={handleRedo}
        onReset={handleReset}
        onShare={() => setIsShareOpen(true)}
        canvas={CanvasArea}
        fileName="Portrait_Pro_Edit.psd"
        bottomDock={renderHistorySidebar()} 
      />
      {ShareModal}
      
      <ExportSuccessToast 
        show={showSuccessToast} 
        onClose={() => setShowSuccessToast(false)} 
      />
    </>
  );
};
