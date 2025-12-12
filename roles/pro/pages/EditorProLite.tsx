
import React, { useState, useEffect } from 'react';
import { EditorLayout } from '../../../features/editor/components/EditorLayout';
import { Icons } from '../../../shared/components/Icons';
import { ToolButton } from '../../../features/editor/components/EditorUI';
import { ProAdjustPanel } from '../../../features/editor/components/ProAdjustPanel';
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

type ProTool = 'adjust' | 'filters' | 'presets' | 'mask' | 'layers' | 'crop' | 'history' | 'export' | null;

export const EditorProLite = ({ onBack, onExport }: { onBack: () => void, onExport?: () => void }) => {
  const [activeTool, setActiveTool] = useState<ProTool>(null); 
  const [activeFilter, setActiveFilter] = useState('leica');
  const [historyIndex, setHistoryIndex] = useState(PRO_HISTORY_STEPS.length - 1);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(true); // Default open

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
      <div className="h-px w-8 bg-white/10 my-2" />
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
      <div className="flex-1" />
      {/* Export button removed from here, exists in Header */}
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
      case 'adjust': 
        return (
          <FloatingToolPanel title="Pro Adjustments" onClose={() => setActiveTool(null)}>
            <ProAdjustPanel />
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
            <PresetProPanel />
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
            <ProCropPanel />
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
      {activeTool && (
        <div className="absolute top-0 left-0 h-full z-30">
            {renderFloatingContent()}
        </div>
      )}

      <img 
        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=100" 
        className="max-h-[80vh] max-w-[90vw] object-contain shadow-2xl rounded-sm border-2 border-white/5 transition-all duration-300" 
      />
      
      {/* Precision Zoom (Pro) */}
      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex flex-col p-1 gap-1 z-20">
         <button className="p-2 hover:bg-white/10 rounded text-white"><Icons.ZoomIn className="w-4 h-4" /></button>
         <div className="h-px bg-white/10 mx-1" />
         <button className="p-2 hover:bg-white/10 rounded text-white"><Icons.ZoomOut className="w-4 h-4" /></button>
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
        canvas={CanvasArea}
        fileName="Portrait_Pro_Edit.psd"
      />
      
      <ExportSuccessToast 
        show={showSuccessToast} 
        onClose={() => setShowSuccessToast(false)} 
      />
    </>
  );
};
