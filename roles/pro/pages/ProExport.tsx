
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton, AuthInput } from '../../../shared/components/GlassUI';
import { ExportConfigPro, ExportFormat, ExportResolution } from '../../../features/export/types';
import { ComparisonSlider } from '../../../features/export/components/ExportUI';

export const ProExport = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (path: string) => void }) => {
  const [activeTab, setActiveTab] = useState<'single' | 'batch'>('single');
  
  const [config, setConfig] = useState<ExportConfigPro>({
    format: 'JPG',
    resolution: '1x',
    quality: 100,
    keepMetadata: true,
    removeWatermark: true,
    colorProfile: 'sRGB'
  });

  const [filename, setFilename] = useState('Project_Final_v1');
  const [dpi, setDpi] = useState('72');
  const [isExporting, setIsExporting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Helper to estimate size
  const estimatedSize = () => {
    let base = 2.4;
    if (config.format === 'PNG') base *= 3;
    if (config.format === 'TIFF') base *= 10;
    if (config.resolution === '2x') base *= 4;
    if (config.resolution === '4k') base *= 8;
    return base.toFixed(1);
  };

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-teal-500/30">
      
      {/* --- PRO HEADER --- */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-white/5 bg-[#0e0f13] z-20">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <Icons.ChevronLeft className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-white/10" />
          <h1 className="font-bold text-sm text-slate-200">Export Studio</h1>
          <span className="px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold uppercase tracking-wider">
            Pro Unlocked
          </span>
        </div>
        
        <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
           <span>{config.resolution === '1x' ? '2048x2048' : config.resolution === '2x' ? '4096x4096' : '8192x8192'} px</span>
           <span>•</span>
           <span>{config.colorProfile}</span>
           <span>•</span>
           <span>{dpi} DPI</span>
        </div>
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT: PREVIEW (Detailed) */}
        <div className="flex-1 bg-[#050507] relative flex items-center justify-center p-8 overflow-hidden group">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2128_0%,_#050507_100%)] opacity-50" />
           
           {/* Grid Pattern */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

           <div className="relative z-10 max-h-[80vh] max-w-[90%] shadow-2xl border border-white/10 rounded-sm overflow-hidden">
             {config.resolution === '4k' ? (
                <ComparisonSlider 
                  beforeImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=50"
                  afterImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=100"
                />
             ) : (
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=100" 
                  className="max-h-[80vh] object-contain block"
                />
             )}
             
             {/* Technical Info Overlay */}
             <div className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/10 px-3 py-2 rounded text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
               <p>ISO: 100</p>
               <p>f/2.8</p>
               <p>1/200s</p>
             </div>
           </div>
        </div>

        {/* RIGHT: PRO SETTINGS PANEL */}
        <div className="w-[420px] bg-[#0e0f13] border-l border-white/5 flex flex-col z-20 shadow-2xl">
          
          {/* Tabs */}
          <div className="flex border-b border-white/5">
            <button 
              onClick={() => setActiveTab('single')}
              className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'single' ? 'text-white border-teal-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              Single Asset
            </button>
            <button 
              onClick={() => setActiveTab('batch')}
              className={`flex-1 py-4 text-sm font-bold border-b-2 transition-colors ${activeTab === 'batch' ? 'text-white border-teal-500' : 'text-slate-500 border-transparent hover:text-slate-300'}`}
            >
              Batch (4)
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            
            {/* 1. FILENAME */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Output Name</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="flex-1 bg-[#1a1b20] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-teal-500 outline-none transition-colors"
                />
                <div className="px-3 py-2 bg-white/5 rounded-lg border border-white/5 text-sm text-slate-400">
                  .{config.format.toLowerCase()}
                </div>
              </div>
            </div>

            {/* 2. FORMAT GRID */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Format</label>
              <div className="grid grid-cols-4 gap-2">
                {(['JPG', 'PNG', 'WEBP', 'TIFF'] as ExportFormat[]).map(fmt => (
                  <button
                    key={fmt}
                    onClick={() => setConfig({ ...config, format: fmt })}
                    className={`
                      py-2 rounded-lg text-xs font-bold transition-all border
                      ${config.format === fmt 
                        ? 'bg-teal-500/20 border-teal-500 text-teal-300' 
                        : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
                      }
                    `}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. RESOLUTION & DPI */}
            <div className="space-y-3">
              <div className="flex justify-between">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scale & Density</label>
                 <span className="text-xs font-mono text-teal-400">{config.resolution === '1x' ? '100%' : config.resolution === '2x' ? '200%' : '400%'}</span>
              </div>
              
              <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
                {(['1x', '2x', '4k'] as ExportResolution[]).map((res) => (
                  <button
                    key={res}
                    onClick={() => setConfig({ ...config, resolution: res })}
                    className={`
                      flex-1 py-2 text-xs font-bold rounded-lg transition-all
                      ${config.resolution === res 
                        ? 'bg-white/10 text-white shadow-lg' 
                        : 'text-slate-500 hover:text-slate-300'
                      }
                    `}
                  >
                    {res.toUpperCase()}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                 <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase">DPI</span>
                    <select 
                      value={dpi}
                      onChange={(e) => setDpi(e.target.value)}
                      className="w-full bg-[#1a1b20] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                    >
                      <option value="72">72 (Screen)</option>
                      <option value="150">150 (Print)</option>
                      <option value="300">300 (High-Res)</option>
                    </select>
                 </div>
                 <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase">Color Profile</span>
                    <select 
                      value={config.colorProfile}
                      onChange={(e) => setConfig({...config, colorProfile: e.target.value as any})}
                      className="w-full bg-[#1a1b20] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                    >
                      <option value="sRGB">sRGB (Web)</option>
                      <option value="AdobeRGB">Adobe RGB</option>
                      <option value="P3">Display P3</option>
                    </select>
                 </div>
              </div>
            </div>

            {/* 4. QUALITY SLIDER */}
            {config.format === 'JPG' && (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quality</label>
                  <span className="text-xs font-mono text-white">{config.quality}%</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="100" 
                  value={config.quality}
                  onChange={(e) => setConfig({ ...config, quality: Number(e.target.value) })}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-500"
                />
              </div>
            )}

            {/* 5. SWITCHES */}
            <div className="space-y-4 pt-4 border-t border-white/5">
               <div className="flex items-center justify-between cursor-pointer" onClick={() => setConfig({...config, removeWatermark: !config.removeWatermark})}>
                  <span className="text-sm text-slate-300">Remove Watermark</span>
                  <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${config.removeWatermark ? 'bg-teal-600' : 'bg-slate-700'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.removeWatermark ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
               </div>
               <div className="flex items-center justify-between cursor-pointer" onClick={() => setConfig({...config, keepMetadata: !config.keepMetadata})}>
                  <span className="text-sm text-slate-300">Preserve Metadata (EXIF)</span>
                  <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${config.keepMetadata ? 'bg-teal-600' : 'bg-slate-700'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${config.keepMetadata ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
               </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="p-6 bg-[#0f0f12] border-t border-white/5 space-y-4">
             <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Estimated Size</span>
                <span className="text-white font-mono font-bold">{estimatedSize()} MB</span>
             </div>
             
             <NeonButton 
               onClick={handleExport}
               isLoading={isExporting}
               className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:shadow-teal-900/20"
             >
                {isExporting ? 'Processing...' : activeTab === 'batch' ? 'Export 4 Files' : 'Export Image'}
             </NeonButton>
          </div>

        </div>
      </div>

      {/* Success Notification */}
      {showSuccess && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
           <div className="bg-[#1a1b20] border border-teal-500/30 px-6 py-3 rounded-full shadow-2xl flex items-center gap-3">
              <div className="p-1 rounded-full bg-teal-500/20 text-teal-400"><Icons.Check className="w-4 h-4" /></div>
              <span className="text-sm font-bold text-white">Export Successful</span>
              <span className="text-xs text-slate-500 pl-2 border-l border-white/10">{filename}.{config.format.toLowerCase()}</span>
           </div>
        </div>
      )}

    </div>
  );
};
