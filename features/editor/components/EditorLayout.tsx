
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
}

export const EditorLayout = ({ onBack, tools, panels, canvas, promptBar, bottomDock, fileName = "Untitled_Project.jpg", onTogglePanel }: EditorLayoutProps) => {
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
            <button className="p-1.5 text-slate-400 hover:text-white transition-colors" title="Undo"><Icons.Undo className="w-4 h-4" /></button>
            <button className="p-1.5 text-slate-400 hover:text-white transition-colors" title="Redo"><Icons.Redo className="w-4 h-4" /></button>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <button className="p-1.5 text-slate-400 hover:text-white transition-colors" title="Reset"><Icons.Trash className="w-4 h-4" /></button>
          </div>
          
          <button className="hidden md:flex px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10 transition-all">
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
        
        {/* LEFT TOOLBAR - Modified for scrolling without visible scrollbar */}
        <aside className="w-20 flex-none bg-[#0e0f13] border-r border-white/5 z-30 h-full">
          <div className="h-full w-full overflow-y-auto no-scrollbar flex flex-col items-center py-4 gap-2">
            {tools}
          </div>
        </aside>

        {/* CENTER CANVAS AREA */}
        <main className="flex-1 relative bg-[#15161b] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2128_0%,_#15161b_100%)]" />
          
          {/* Canvas Wrapper */}
          <div className="flex-1 w-full flex items-center justify-center relative z-10 p-4 pb-20">
             {canvas}
          </div>

          {/* FLOATING PROMPT BAR (Optional) */}
          {promptBar && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-lg z-20 pointer-events-auto">
              {promptBar}
            </div>
          )}

          {/* BOTTOM DOCK (History) */}
          {bottomDock && (
            <div className="absolute bottom-0 left-0 w-full z-30 pointer-events-auto">
              {bottomDock}
            </div>
          )}
        </main>

        {/* RIGHT PANELS - CONDITIONALLY RENDERED */}
        {panels && (
          <aside className="w-80 flex-none bg-[#0e0f13]/95 border-l border-white/5 flex flex-col z-30 shadow-2xl transition-all duration-300">
            {panels}
          </aside>
        )}

      </div>
    </div>
  );
};
