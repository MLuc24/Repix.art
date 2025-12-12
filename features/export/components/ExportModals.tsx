
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';
import { ComparisonSlider } from './ExportUI';

// --- HD PAYWALL MODAL ---
export const HDPaywallModal = ({ isOpen, onClose, userCredits }: { isOpen: boolean, onClose: () => void, userCredits: number }) => {
  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: VISUAL */}
        <div className="lg:w-3/5">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
             <ComparisonSlider 
                beforeImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=50" // Low quality mock
                afterImage="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=100" // High quality mock
             />
             <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-slate-300">1080p</div>
             <div className="absolute top-4 right-4 bg-amber-500/90 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-black font-bold border border-amber-300">4K ULTRA</div>
          </div>
          <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-2">
            <Icons.Compare className="w-3 h-3" /> Compare Standard vs. Pro Quality
          </p>
        </div>

        {/* RIGHT: CONTENT */}
        <div className="lg:w-2/5 flex flex-col justify-center">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Icons.Star className="w-3 h-3" /> Pro Export
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Maximum Quality</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your image deserves the best. Unlock professional formats and resolution.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400"><Icons.Maximize className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-bold text-white">4K Resolution</h4>
                <p className="text-xs text-slate-500">3840 x 2160 pixels</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400"><Icons.Image className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-bold text-white">Lossless Formats</h4>
                <p className="text-xs text-slate-500">TIFF & PNG Compression</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400"><Icons.Shield className="w-4 h-4" /></div>
              <div>
                <h4 className="text-sm font-bold text-white">Metadata</h4>
                <p className="text-xs text-slate-500">Preserve Camera & Copyright info</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
             <NeonButton className="w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-900/20 text-black font-bold">
               Export for 1 Credit
             </NeonButton>
             <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                <Icons.Wallet className="w-3 h-3" />
                <span>Balance: <span className="text-white font-bold">{userCredits} credits</span></span>
             </div>
             <button 
               onClick={onClose}
               className="w-full py-2 text-xs font-medium text-slate-500 hover:text-white transition-colors"
             >
               Return to settings
             </button>
          </div>
        </div>
      </div>
    </GlassModal>
  );
};

// --- SUCCESS TOAST ---
export const ExportSuccessToast = ({ show, onClose }: { show: boolean, onClose: () => void }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] animate-fade-in-up">
      <div className="bg-[#0f0f12] border border-green-500/30 shadow-[0_0_40px_rgba(34,197,94,0.2)] rounded-2xl p-4 flex items-center gap-4 pr-6">
        <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 flex items-center justify-center">
           <Icons.Check className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-white">Export Complete</h4>
          <p className="text-xs text-slate-400">High-res file saved to downloads.</p>
        </div>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <button onClick={onClose} className="text-xs font-bold text-slate-400 hover:text-white transition-colors">
          OPEN
        </button>
      </div>
    </div>
  );
};
