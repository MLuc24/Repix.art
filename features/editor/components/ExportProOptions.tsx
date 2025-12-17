
import React, { useState, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { ExportConfigPro, ExportResolution, ExportFormat } from '../../export/types';

export const ExportProOptions = ({ 
  isUnlocked = true, 
  onUpgradeClick,
  config: propConfig,
  onChange
}: { 
  isUnlocked?: boolean; 
  onUpgradeClick?: () => void;
  config?: ExportConfigPro;
  onChange?: (cfg: ExportConfigPro) => void;
}) => {
  const [localConfig, setLocalConfig] = useState<ExportConfigPro>({
    format: 'JPG',
    resolution: '2x',
    quality: 90,
    keepMetadata: true,
    removeWatermark: true, // Default to true (No Watermark)
    colorProfile: 'sRGB'
  });

  const config = propConfig || localConfig;
  
  const setConfig = (newConfig: ExportConfigPro) => {
      if (onChange) {
          onChange(newConfig);
      } else {
          setLocalConfig(newConfig);
      }
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [estimatedSize, setEstimatedSize] = useState('4.2 MB');
  const [creditCost, setCreditCost] = useState(0);

  // Calculate cost and size based on config
  useEffect(() => {
    let cost = 0;
    let sizeBase = 2.5;

    if (config.resolution === '4k') {
      cost += 1;
      sizeBase *= 3.5;
    }
    if (config.format === 'TIFF') {
      cost += 1;
      sizeBase *= 5;
    } else if (config.format === 'PNG') {
      sizeBase *= 1.8;
    }

    setCreditCost(cost);
    setEstimatedSize(`~${sizeBase.toFixed(1)} MB`);
  }, [config]);

  const handleExport = () => {
    setIsProcessing(true);
    // Mock API
    setTimeout(() => {
      setIsProcessing(false);
      const event = new CustomEvent('EXPORT_COMPLETE', { detail: { filename: 'Pro_Edit_4k.jpg' } });
      window.dispatchEvent(event);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0e0f13] animate-fade-in-up">
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/5 flex-none">
        <h3 className="text-xl font-bold flex items-center gap-2 text-white">
          <Icons.Download className="text-teal-400" /> Quick Export
        </h3>
        <span className="text-[10px] font-mono text-slate-500">{estimatedSize}</span>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-5">
        
        {/* ROW 1: Resolution */}
        <div>
          <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Resolution</label>
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
            {(['1x', '2x', '4k'] as ExportResolution[]).map((res) => (
              <button
                key={res}
                onClick={() => setConfig({ ...config, resolution: res })}
                className={`
                  flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1
                  ${config.resolution === res 
                    ? 'bg-white/10 text-white shadow-lg border border-white/10' 
                    : 'text-slate-500 hover:text-slate-300'
                  }
                `}
              >
                {res === '4k' && <Icons.Sparkles className="w-2.5 h-2.5 text-amber-400" />}
                {res.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* ROW 2: Format & Profile */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Format</label>
            <div className="grid grid-cols-2 gap-1 bg-black/40 p-1 rounded-xl border border-white/5">
               {(['JPG', 'PNG', 'WEBP', 'TIFF'] as ExportFormat[]).map(fmt => (
                 <button 
                   key={fmt}
                   onClick={() => setConfig({...config, format: fmt})}
                   className={`text-[10px] font-bold py-1.5 rounded transition-colors ${config.format === fmt ? 'bg-violet-600 text-white' : 'text-slate-500 hover:text-white'} `}
                 >
                   {fmt}
                 </button>
               ))}
            </div>
          </div>
          <div>
             <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Color Profile</label>
             <button 
               onClick={() => setConfig({...config, colorProfile: config.colorProfile === 'sRGB' ? 'AdobeRGB' : 'sRGB'})}
               className="w-full h-[68px] flex flex-col items-center justify-center rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/50 transition-all text-xs font-mono text-slate-300"
             >
               {config.colorProfile}
               <span className="text-[9px] text-slate-500 mt-1">Click to toggle</span>
             </button>
          </div>
        </div>

        {/* ROW 3: Toggles */}
        <div className="space-y-3 pt-2">
          {/* Remove Watermark Toggle */}
          <div 
            onClick={() => {
                if (!isUnlocked) {
                  onUpgradeClick?.();
                  return;
                }
                setConfig({...config, removeWatermark: !config.removeWatermark});
            }}
            className={`flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 transition-colors ${!isUnlocked ? 'cursor-pointer hover:bg-white/10' : 'cursor-pointer hover:bg-white/10'}`}
          >
            <span className="text-xs text-slate-300 flex items-center gap-2">
                Remove Watermark
            </span>
            {isUnlocked ? (
              <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${config.removeWatermark ? 'bg-green-500' : 'bg-slate-700'}`}>
                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${config.removeWatermark ? 'translate-x-4' : 'translate-x-0'}`} />
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20 text-[10px] font-bold uppercase tracking-wide">
                <Icons.Lock className="w-3 h-3" />
                <span>Plus</span>
              </div>
            )}
          </div>

          {/* Preserve EXIF Toggle */}
          <div 
            onClick={() => {
                if (!isUnlocked) {
                  onUpgradeClick?.();
                  return;
                }
                setConfig({...config, keepMetadata: !config.keepMetadata});
            }}
            className={`flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 transition-colors ${!isUnlocked ? 'cursor-pointer hover:bg-white/10' : 'cursor-pointer hover:bg-white/10'}`}
          >
             <span className="text-xs text-slate-300 flex items-center gap-2">
                Preserve EXIF Data
            </span>
             {isUnlocked ? (
               <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${config.keepMetadata ? 'bg-violet-600' : 'bg-slate-700'}`}>
                 <div className={`w-3 h-3 bg-white rounded-full shadow-sm transition-transform ${config.keepMetadata ? 'translate-x-4' : 'translate-x-0'}`} />
               </div>
             ) : (
               <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-lg border border-amber-500/20 text-[10px] font-bold uppercase tracking-wide">
                 <Icons.Lock className="w-3 h-3" />
                 <span>Plus</span>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Footer / Action */}
      <div className="p-6 bg-[#131418] border-t border-white/5 flex-none">
        <NeonButton 
          onClick={handleExport}
          isLoading={isProcessing}
          className={`
            w-full py-4 text-sm
            ${creditCost > 0 
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-amber-900/20' 
              : 'bg-gradient-to-r from-violet-600 to-indigo-600'
            }
          `}
        >
          <div className="flex items-center justify-center gap-2">
            {creditCost > 0 ? (
              <>
                <Icons.Lock className="w-4 h-4" /> 
                <span>Export ({creditCost} Credit)</span>
              </>
            ) : (
              <span>Export Image</span>
            )}
          </div>
        </NeonButton>
      </div>

    </div>
  );
};
