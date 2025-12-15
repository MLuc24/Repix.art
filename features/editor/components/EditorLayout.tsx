
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';

interface EditorLayoutProps {
  onBack: () => void;
  tools: React.ReactNode;      // Left Sidebar Content
  panels: React.ReactNode;     // Right Sidebar Content
  canvas: React.ReactNode;     // Center Content
  promptBar?: React.ReactNode; // Floating above bottom (Optional)
  bottomDock?: React.ReactNode; // Fixed at bottom center (New for History)
  fileName?: string;
  onTogglePanel?: () => void;   // Optional prop to toggle panel visibility if hidden
  onUndo?: () => void;
  onRedo?: () => void;
  onReset?: () => void;
  onShare?: () => void;
  isHistoryOpen?: boolean;
  onToggleHistory?: () => void;
}

export const EditorLayout = ({ 
  onBack, tools, panels, canvas, promptBar, bottomDock, fileName = "Untitled_Project.jpg", onTogglePanel,
  onUndo, onRedo, onReset, onShare, isHistoryOpen = true, onToggleHistory
}: EditorLayoutProps) => {
  return (
    <div className="h-screen w-full bg-[#0e0f13] flex flex-col overflow-hidden text-white font-sans">
      
      {/* --- 1. TOP TOOLBAR --- */}
      <header className="h-16 flex-none bg-[#0e0f13]/90 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 z-40 relative">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white"
          >
            <Icons.ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">R</div>
             <div className="h-6 w-px bg-white/10 mx-2" />
             <div className="text-sm">
                <span className="text-slate-500">My Projects / </span>
                <span className="text-slate-200 font-medium">{fileName}</span>
             </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-black/30 rounded-lg p-1 border border-white/5 mr-4">
            <button onClick={onUndo} className="p-1.5 text-slate-400 hover:text-white transition-colors" title="Undo"><Icons.Undo className="w-4 h-4" /></button>
            <button onClick={onRedo} className="p-1.5 text-slate-400 hover:text-white transition-colors" title="Redo"><Icons.Redo className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button onClick={onReset} className="p-1.5 text-slate-400 hover:text-white transition-colors" title="Reset"><Icons.Trash className="w-4 h-4" /></button>
          </div>
          
          <button 
            onClick={onShare}
            className="hidden md:flex px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all"
          >
            Share
          </button>
          <NeonButton 
            className="!w-auto px-6 !py-2 !text-sm !rounded-lg"
            onClick={() => (window as any).dispatchEvent(new CustomEvent('TRIGGER_EXPORT'))}
          >
            Export
          </NeonButton>
          
          {/* Show Toggle if Panel is hidden but onToggle exists */}
          {!panels && onTogglePanel && (
            <button 
              onClick={onTogglePanel}
              className="ml-2 p-2 bg-violet-600 text-white rounded-lg hover:bg-violet-500 transition-colors shadow-lg"
              title="Open Assistant"
            >
              <Icons.Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* --- 2. MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT SIDEBAR AREA (Fixed History) */}
        <aside 
          className={`flex-none z-30 h-full flex flex-col justify-start bg-[#0e0f13] border-r border-white/5 relative transition-all duration-300 ease-in-out
            ${isHistoryOpen ? 'w-28' : 'w-0 border-none'}
          `}
        >
          {/* HISTORY PANEL CONTAINER */}
          <div className={`w-28 h-full transition-opacity duration-300 ${isHistoryOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none absolute'}`}>
             {bottomDock}
          </div>

          {/* TOGGLE BUTTON (Integrated vertical bar) */}
          {onToggleHistory && (
            <button
               onClick={onToggleHistory}
               className={`absolute top-1/2 -translate-y-1/2 z-50 w-4 h-12 bg-[#0e0f13] border border-l-0 border-white/10 rounded-r-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all
                 ${isHistoryOpen ? 'right-0 translate-x-full' : '-right-4'}
               `}
               title={isHistoryOpen ? "Close History" : "Open History"}
            >
               {isHistoryOpen ? <Icons.ChevronLeft className="w-3 h-3" /> : <Icons.ChevronLeft className="w-3 h-3 rotate-180" />}
            </button>
          )}
        </aside>

        {/* CENTER CANVAS AREA */}
        <main className="flex-1 relative bg-[#15161b] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2128_0%,_#15161b_100%)]" />
          
          {/* Canvas Wrapper */}
          <div className="flex-1 w-full flex items-center justify-center relative z-10 p-4">
             {canvas}
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
            <div className="bg-[#1a1b1e]/90 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-2xl flex items-center gap-1.5 px-3">
              {tools}
            </div>
          </div>

          {/* FLOATING PROMPT BAR (Optional) - Moved slightly up to avoid collision if present */}
          {promptBar && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg z-20 pointer-events-auto">
              {promptBar}
            </div>
          )}
        </main>

        {/* RIGHT PANELS - CONDITIONALLY RENDERED */}
        {panels && (
          // Reduced height (bottom-24) to avoid overlapping the Switch Role button at the bottom right.
          <aside className="absolute right-0 top-0 bottom-20 w-80 z-30 pointer-events-none flex flex-col">
            {/* Content handles its own pointer-events and styling */}
            {panels}
          </aside>
        )}

      </div>
    </div>
  );
};
