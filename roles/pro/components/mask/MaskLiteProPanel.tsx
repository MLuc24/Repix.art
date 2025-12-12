
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { MaskBrushControl, BrushSettings } from './MaskBrushControl';
import { MaskQuickActions } from './MaskQuickActions';
import { MaskRefinePopover } from './MaskRefinePopover';

export const MaskLiteProPanel = () => {
  const [brushSettings, setBrushSettings] = useState<BrushSettings>({
    size: 30,
    feather: 10,
    hardness: 80,
    mode: 'paint'
  });
  
  const [autoEdge, setAutoEdge] = useState(false);
  const [overlayColor, setOverlayColor] = useState<'red' | 'green' | 'blue'>('red');
  const [showRefine, setShowRefine] = useState(false);
  const [previewMode, setPreviewMode] = useState<'overlay' | 'split' | 'hold'>('overlay');

  const handleBrushChange = (key: keyof BrushSettings, value: any) => {
    setBrushSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick mask action:', action);
    // Mock action feedback
  };

  const handleRefineToggle = () => {
    const newState = !autoEdge;
    setAutoEdge(newState);
    if (newState) setShowRefine(true);
    else setShowRefine(false);
  };

  return (
    <div className="p-6 h-full flex flex-col relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Icons.Scissors className="text-teal-400" /> Mask
        </h3>
        <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5 border border-white/5">
           <button 
             onClick={() => setPreviewMode('overlay')}
             className={`p-1.5 rounded transition-all ${previewMode === 'overlay' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
             title="Overlay"
           >
             <Icons.Image className="w-3 h-3" />
           </button>
           <button 
             onClick={() => setPreviewMode('split')}
             className={`p-1.5 rounded transition-all ${previewMode === 'split' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
             title="Side by Side"
           >
             <Icons.Compare className="w-3 h-3" />
           </button>
           <button 
             onClick={() => setPreviewMode('hold')}
             className={`p-1.5 rounded transition-all ${previewMode === 'hold' ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300'}`}
             title="Hold to View"
           >
             <Icons.Eye className="w-3 h-3" />
           </button>
        </div>
      </div>

      {/* Main Controls */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pb-6 space-y-8">
        
        {/* Brush Controls */}
        <MaskBrushControl settings={brushSettings} onChange={handleBrushChange} />

        {/* Quick Actions */}
        <div className="pt-4 border-t border-white/10">
           <h4 className="text-xs font-bold text-slate-500 uppercase mb-4 tracking-wider">Quick Actions</h4>
           <MaskQuickActions onAction={handleQuickAction} />
        </div>

        {/* Refine / Auto Edge (Relative Container for Popover) */}
        <div className="pt-4 border-t border-white/10 relative">
           {showRefine && (
             <MaskRefinePopover 
               onClose={() => setShowRefine(false)} 
               onApply={(str) => { console.log('Refine', str); setShowRefine(false); }}
             />
           )}
           
           <div className="flex items-center justify-between p-4 rounded-xl bg-teal-500/10 border border-teal-500/20">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-teal-500 text-black">
                  <Icons.Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Auto-Edge Refine</p>
                  <p className="text-[10px] text-teal-300">Smart boundary detection</p>
                </div>
              </div>
              <div 
                onClick={handleRefineToggle}
                className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${autoEdge ? 'bg-teal-500' : 'bg-slate-700'}`}
              >
                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${autoEdge ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
           </div>
        </div>

        {/* Overlay Color */}
        <div className="flex items-center justify-between">
           <span className="text-xs font-bold text-slate-500 uppercase">Overlay Color</span>
           <div className="flex gap-2">
              {['red', 'green', 'blue'].map((c) => (
                <button
                  key={c}
                  onClick={() => setOverlayColor(c as any)}
                  className={`
                    w-5 h-5 rounded-full border-2 transition-all
                    ${c === 'red' ? 'bg-red-500/50 border-red-500' : c === 'green' ? 'bg-green-500/50 border-green-500' : 'bg-blue-500/50 border-blue-500'}
                    ${overlayColor === c ? 'scale-110 shadow-lg shadow-white/10 ring-1 ring-white' : 'opacity-50 hover:opacity-100'}
                  `}
                />
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};
