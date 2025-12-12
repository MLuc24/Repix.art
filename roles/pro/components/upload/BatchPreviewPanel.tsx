
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { NeonButton } from '../../../../shared/components/GlassUI';
import { ProUploadItem } from '../../../../services/mock/upload_pro';

interface BatchPreviewPanelProps {
  item: ProUploadItem | null;
  onNavigate: (path: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const BatchPreviewPanel = ({ item, onNavigate, onNext, onPrev }: BatchPreviewPanelProps) => {
  if (!item) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500 p-8 text-center bg-[#0e0f13]">
        <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center mb-4">
          <Icons.Image className="w-8 h-8 opacity-50" />
        </div>
        <p className="text-sm font-medium">Select an image to preview</p>
        <p className="text-xs opacity-50 mt-1">Or use Shift+Click to select multiple</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#0e0f13] border-l border-white/5">
      
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider truncate max-w-[200px]">{item.name}</h3>
        <div className="flex gap-1">
           <button onClick={onPrev} className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"><Icons.ChevronLeft className="w-4 h-4" /></button>
           <button onClick={onNext} className="p-1.5 hover:bg-white/10 rounded text-slate-400 hover:text-white"><Icons.ArrowRight className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1 bg-black/50 relative flex items-center justify-center p-4 overflow-hidden group">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2128_0%,_#000_100%)] -z-10" />
         <img src={item.previewUrl} className="max-w-full max-h-full object-contain shadow-2xl rounded-sm border border-white/10" alt="Preview" />
         
         {/* Quick Actions Overlay */}
         <div className="absolute bottom-6 flex gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
            <button className="px-4 py-2 bg-black/60 backdrop-blur rounded-xl border border-white/10 text-white text-xs font-bold hover:bg-black/80 flex items-center gap-2">
               <Icons.Scissors className="w-3.5 h-3.5 text-fuchsia-400" /> Remove BG (1)
            </button>
            <button className="px-4 py-2 bg-black/60 backdrop-blur rounded-xl border border-white/10 text-white text-xs font-bold hover:bg-black/80 flex items-center gap-2">
               <Icons.Wand className="w-3.5 h-3.5 text-violet-400" /> Apply Filter
            </button>
         </div>
      </div>

      {/* Inspector / Meta */}
      <div className="p-6 border-t border-white/5 bg-[#131418]">
         <div className="grid grid-cols-2 gap-4 mb-6 text-xs text-slate-400">
            <div>
               <p className="font-bold text-slate-500 uppercase text-[10px] mb-1">Dimensions</p>
               <p className="text-slate-300 font-mono">{item.dimensions}</p>
            </div>
            <div>
               <p className="font-bold text-slate-500 uppercase text-[10px] mb-1">Size</p>
               <p className="text-slate-300 font-mono">{item.size}</p>
            </div>
            <div>
               <p className="font-bold text-slate-500 uppercase text-[10px] mb-1">Type</p>
               <p className="text-slate-300 font-mono">{item.type}</p>
            </div>
            <div>
               <p className="font-bold text-slate-500 uppercase text-[10px] mb-1">Camera</p>
               <p className="text-slate-300 font-mono">{item.camera || 'Unknown'}</p>
            </div>
         </div>

         <div className="space-y-3">
            <NeonButton onClick={() => onNavigate('editor')} className="w-full">
               Open in Editor
            </NeonButton>
            <button className="w-full py-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 text-xs font-bold hover:bg-white/10 transition-colors">
               Add to Project...
            </button>
         </div>
      </div>

    </div>
  );
};
