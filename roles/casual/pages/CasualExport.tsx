
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { ExportSettings } from '../../../features/export/types';
import { 
  FormatSelector, 
  SizeSelector, 
  QualitySlider, 
  ExportHistoryList 
} from '../../../features/export/components/ExportUI';
import { HDPaywallModal, ExportSuccessToast } from '../../../features/export/components/ExportModals';
import { MOCK_EXPORT_HISTORY } from '../../../services/mock/export';
import { MOCK_USER } from '../../../services/mock/dashboard';

export const CasualExport = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (path: string) => void }) => {
  const [settings, setSettings] = useState<ExportSettings>({
    format: 'JPG',
    size: '1x', // Matches ExportResolution type
    quality: 90
  });
  
  const [showPaywall, setShowPaywall] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setShowSuccess(true);
      // Auto hide success after 4s
      setTimeout(() => setShowSuccess(false), 4000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-violet-500/30 flex flex-col font-sans">
      
      {/* --- TOP NAV --- */}
      <header className="h-16 px-6 flex items-center justify-between border-b border-white/5 bg-[#0e0f14]/80 backdrop-blur-xl z-20">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <Icons.ChevronLeft className="w-5 h-5" />
          <span className="font-medium">Back to Editor</span>
        </button>
        <div className="text-sm font-medium text-slate-200">Export Image</div>
        <div className="w-20" /> {/* Spacer */}
      </header>

      {/* --- MAIN WORKSPACE --- */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT: IMAGE PREVIEW (HERO) */}
        <div className="flex-1 bg-[#09090b] relative flex items-center justify-center p-8 overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2128_0%,_#09090b_100%)]" />
           
           {/* The Image */}
           <div className="relative z-10 shadow-2xl rounded-sm border-4 border-white/5 max-h-[80vh] max-w-[90%] transition-all duration-500 animate-fade-in-up">
             <img 
               src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=90" 
               alt="Export Preview"
               className="max-h-[75vh] object-contain block"
             />
             
             {/* Info overlay */}
             <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur rounded-lg border border-white/10 text-xs font-mono text-slate-300">
               {settings.format} • {settings.size === '1x' ? '1080x1350' : settings.size === '2x' ? '2160x2700' : '4320x5400'} px
             </div>
           </div>
        </div>

        {/* RIGHT: SETTINGS PANEL */}
        <div className="w-full lg:w-[400px] bg-[#0e0f14] border-l border-white/5 flex flex-col z-20 shadow-2xl">
          
          <div className="flex-1 p-8 overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-1">Export Settings</h2>
            <p className="text-slate-400 text-sm mb-8">Configure your file format and quality.</p>

            {/* SETTINGS FORM */}
            <div className="space-y-8">
              
              <section>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">File Format</label>
                <FormatSelector 
                  value={settings.format} 
                  onChange={(f) => setSettings({...settings, format: f})} 
                />
              </section>

              <section>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Resolution</label>
                <SizeSelector 
                  value={settings.size} 
                  onChange={(s) => setSettings({...settings, size: s})} 
                  onProClick={() => setShowPaywall(true)}
                />
              </section>

              <section>
                <QualitySlider 
                  value={settings.quality} 
                  onChange={(q) => setSettings({...settings, quality: q})} 
                />
              </section>

            </div>

            {/* HISTORY */}
            <ExportHistoryList items={MOCK_EXPORT_HISTORY} />

          </div>

          {/* BOTTOM ACTIONS */}
          <div className="p-6 bg-[#0f0f12] border-t border-white/5 space-y-3">
             {settings.size !== '1x' ? (
                // PRO ACTION
                <NeonButton 
                   onClick={() => setShowPaywall(true)}
                   className="w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-900/20"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Icons.Lock className="w-4 h-4" /> Unlock HD Export
                  </div>
                </NeonButton>
             ) : (
                // FREE ACTION
                <NeonButton 
                  onClick={handleExport}
                  isLoading={isExporting}
                >
                  Export Image (Free)
                </NeonButton>
             )}

             <p className="text-center text-xs text-slate-500">
               {settings.size !== '1x' ? '1 credit required' : 'Standard quality included in free plan'}
             </p>
          </div>

        </div>

      </div>

      {/* --- MODALS --- */}
      <HDPaywallModal 
        isOpen={showPaywall}
        onClose={() => setShowPaywall(false)}
        userCredits={MOCK_USER.credits}
      />

      <ExportSuccessToast 
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

    </div>
  );
};
