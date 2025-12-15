import React, { useState, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';

interface SyncLiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const SyncLiteModal = ({ isOpen, onClose, onNavigate }: SyncLiteModalProps) => {
  const [sessionCode, setSessionCode] = useState(['L', 'U', 'H', 'I', '7', '1']);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connecting' | 'connected' | 'scanning' | 'selecting'>('idle');
  const [progress, setProgress] = useState(0);
  const [selectedPhotos, setSelectedPhotos] = useState<Set<number>>(new Set());

  const simulateConnection = () => {
     setConnectionStatus('connecting');
     setTimeout(() => {
        setConnectionStatus('connected');
     }, 2000);
  };

  const startScanSimulation = () => {
    setConnectionStatus('scanning');
    setProgress(0);
    const interval = setInterval(() => {
        setProgress(prev => {
            if (prev >= 100) {
                clearInterval(interval);
                setConnectionStatus('selecting');
                return 100;
            }
            return prev + 2;
        });
    }, 30);
  };

  const toggleSelection = (index: number) => {
      const newSelected = new Set(selectedPhotos);
      if (newSelected.has(index)) {
          newSelected.delete(index);
      } else {
          newSelected.add(index);
      }
      setSelectedPhotos(newSelected);
  };

  useEffect(() => {
    if (connectionStatus === 'connected') {
        setTimeout(() => {
            startScanSimulation();
        }, 1000);
    }
  }, [connectionStatus]);
  
  useEffect(() => {
    if (isOpen) {
        setConnectionStatus('idle');
        setProgress(0);
        setSelectedPhotos(new Set());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-fade-in font-sans text-slate-100">
      
      {/* 1. Dynamic Backdrop with Mesh Gradient */}
      <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/30 rounded-full blur-[100px] animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/30 rounded-full blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      {/* 2. Main "Floating Island" Container */}
      <div className="relative w-full max-w-5xl bg-[#0e0f14]/80 border border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:h-[650px]">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all"
        >
          <Icons.Close className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Portal/Status */}
        <div className="md:w-5/12 p-8 md:p-12 flex flex-col items-center justify-center text-center relative bg-gradient-to-b from-white/5 to-transparent border-b md:border-b-0 md:border-r border-white/5">
           
           <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">
             {connectionStatus === 'idle' ? 'Sync Portal' : connectionStatus === 'connecting' ? 'Verifying...' : 'Connected'}
           </h2>
           <p className="text-slate-400 text-sm mb-8">
             {connectionStatus === 'idle' 
                ? 'Scan to instantly bridge your devices' 
                : connectionStatus === 'connecting' 
                ? 'Establishing secure handshake...' 
                : 'iPhone 15 Pro • Connected via Local Network'}
           </p>

           {/* Glowing QR / Status Icon */}
           <div className={`relative group cursor-pointer mb-8 transition-all duration-700 ${connectionStatus !== 'idle' ? 'scale-110' : ''}`}>
              <div className={`absolute -inset-1 bg-gradient-to-r ${['connected', 'scanning', 'selecting'].includes(connectionStatus) ? 'from-green-500 to-emerald-500' : 'from-violet-600 to-fuchsia-600'} rounded-2xl opacity-75 group-hover:opacity-100 blur transition duration-500`} />
              <div className="relative w-64 h-64 bg-[#020617] rounded-xl flex items-center justify-center overflow-hidden">
                 
                 {connectionStatus === 'idle' || connectionStatus === 'connecting' ? (
                     <>
                        <div className="w-56 h-56 grid grid-cols-7 grid-rows-7 gap-1 opacity-80">
                            {[...Array(49)].map((_, i) => (
                            <div key={i} className={`rounded-[2px] transition-colors duration-700 ${Math.random() > 0.3 ? 'bg-white' : 'bg-white/10'}`} />
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-[#020617] rounded-2xl flex items-center justify-center ring-4 ring-[#020617]">
                            <Icons.Smartphone className={`w-8 h-8 ${connectionStatus === 'connecting' ? 'text-yellow-400 animate-pulse' : 'text-fuchsia-500'}`} />
                            </div>
                        </div>
                        <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_2px_rgba(34,211,238,0.6)] animate-scan-vertical" />
                     </>
                 ) : (
                     <div className="flex flex-col items-center animate-fade-in-up">
                         <div className="relative mb-4">
                             <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse" />
                             <Icons.Check className="w-16 h-16 text-green-500" />
                         </div>
                         <div className="text-green-400 font-bold uppercase tracking-widest text-sm">SECURE LINK</div>
                     </div>
                 )}
              </div>

              {/* Status Badge */}
              <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#0e0f14] border ${['connected', 'scanning', 'selecting'].includes(connectionStatus) ? 'border-green-500/50' : 'border-green-500/30'} rounded-full shadow-lg flex items-center gap-2 transition-all`}>
                 <div className={`w-2 h-2 rounded-full ${connectionStatus === 'idle' ? 'bg-green-500 animate-pulse' : connectionStatus === 'connecting' ? 'bg-yellow-400 animate-ping' : 'bg-green-500'}`} />
                 <span className={`text-[10px] font-bold uppercase tracking-wider ${['connected', 'scanning', 'selecting'].includes(connectionStatus) ? 'text-green-400' : 'text-green-400'}`}>
                    {connectionStatus === 'idle' ? 'Ready to connect' : connectionStatus === 'connecting' ? 'Scanning...' : 'Device Linked'}
                 </span>
              </div>
           </div>

           {/* Code / Device Info */}
           <div className="flex flex-col items-center gap-3">
              {connectionStatus === 'idle' || connectionStatus === 'connecting' ? (
                  <>
                    <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Session ID</div>
                    <div className="flex gap-1.5 bg-black/40 p-2 rounded-xl border border-white/5">
                        {sessionCode.map((char, idx) => (
                        <div key={idx} className="w-8 h-10 flex items-center justify-center bg-white/5 rounded text-lg font-mono font-bold text-white shadow-inner">
                            {char}
                        </div>
                        ))}
                    </div>
                  </>
              ) : (
                  <div className="animate-fade-in-up">
                      <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-xs">
                          IP: 192.168.1.42 • Speed: 500Mbps
                      </div>
                  </div>
              )}
           </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="md:w-7/12 p-8 md:p-12 flex flex-col bg-[#0e0f14]/50 relative transition-all duration-500">
           
           {(connectionStatus === 'idle' || connectionStatus === 'connecting') ? (
               // --- GUIDE MODE ---
               <>
                    <div className="mb-auto">
                        <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
                            <Icons.Zap className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">How it works</h3>
                            <p className="text-xs text-slate-500">Secure, encrypted, instant.</p>
                        </div>
                        </div>

                        <div className="space-y-8 relative pl-2">
                        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-violet-600/50 to-transparent" />
                        {['Get the Mobile App', 'Scan the Portal', 'Select & Transfer'].map((step, i) => (
                            <div key={i} className="relative flex gap-5 group">
                                <div className={`w-10 h-10 rounded-full bg-[#1a1b26] border flex items-center justify-center z-10 shadow-lg transition-all duration-300 ${i === 1 && connectionStatus === 'connecting' ? 'border-yellow-400 text-yellow-500 scale-110' : 'border-white/10 text-white'}`}>
                                    {i === 0 ? <Icons.Smartphone className="w-5 h-5" /> : i === 1 ? <Icons.Maximize className="w-5 h-5" /> : <Icons.Image className="w-5 h-5" />}
                                </div>
                                <div className={connectionStatus === 'connecting' && i === 1 ? 'opacity-100' : 'opacity-80'}>
                                    <h4 className={`text-sm font-bold transition-colors ${i === 1 && connectionStatus === 'connecting' ? 'text-yellow-400' : 'text-white'}`}>{step}</h4>
                                    <p className="text-xs text-slate-400 mt-1 max-w-xs">{i === 1 && connectionStatus === 'connecting' ? 'Waiting for camera scan...' : 'Simple steps to connect.'}</p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-3 transition-all">
                                <Icons.Apple className="w-5 h-5" />
                                <span className="text-xs font-bold">App Store</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-3 transition-all">
                                <Icons.Google className="w-5 h-5" />
                                <span className="text-xs font-bold">Google Play</span>
                            </button>
                        </div>
                        
                        <button 
                            onClick={simulateConnection}
                            disabled={connectionStatus === 'connecting'}
                            className={`w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all font-bold text-white shadow-lg flex items-center justify-center gap-2 ${connectionStatus === 'connecting' ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:scale-[0.98]'}`}
                        >
                            {connectionStatus === 'connecting' ? <Icons.Refresh className="w-5 h-5 animate-spin" /> : <Icons.Zap className="w-5 h-5" />}
                            {connectionStatus === 'connecting' ? 'Simulating Scan...' : 'Demo Connect (Simulate)'}
                        </button>
                    </div>
               </>
           ) : (
               // --- SELECT & IMPORT MODE ---
               <div className="h-full flex flex-col animate-fade-in-up">
                   <div className="flex items-center justify-between mb-6">
                       <h3 className="text-xl font-bold text-white">Select from iPhone</h3>
                       <span className="text-xs font-mono text-fuchsia-400 bg-fuchsia-400/10 px-2 py-1 rounded">53 Photos Found</span>
                   </div>

                   {/* Photo Grid */}
                   <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-3 pr-2 mb-6 custom-scrollbar content-start">
                       {[...Array(12)].map((_, i) => (
                           <div 
                              key={i} 
                              onClick={() => connectionStatus === 'selecting' && toggleSelection(i)}
                              className={`aspect-square rounded-xl bg-white/5 border border-white/5 relative group cursor-pointer overflow-hidden transition-all duration-300 ${i < (progress / 8) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} ${selectedPhotos.has(i) ? 'ring-2 ring-fuchsia-500 bg-fuchsia-500/10' : 'hover:bg-white/10'}`}
                           >
                               <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/20 to-transparent pointer-events-none" />
                               {/* Mock Image Placeholder */}
                               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                   <Icons.Image className={`w-6 h-6 transition-colors ${selectedPhotos.has(i) ? 'text-fuchsia-400' : 'text-white/20'}`} />
                               </div>
                               {/* Selection Check */}
                               <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-all ${selectedPhotos.has(i) ? 'bg-fuchsia-500 scale-100' : 'bg-white/10 scale-0 group-hover:scale-100'}`}>
                                   <Icons.Check className="w-3 h-3 text-white" />
                               </div>
                           </div>
                       ))}
                   </div>

                   {/* Footer Panel */}
                   <div className="bg-[#020617] rounded-2xl p-4 border border-white/10">
                       <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-bold text-slate-300">
                               {connectionStatus === 'scanning' ? 'Scanning Library...' : 'Ready to Import'}
                           </span>
                           <span className="text-xs font-mono text-fuchsia-400">
                               {connectionStatus === 'scanning' ? `${progress}%` : `${selectedPhotos.size} selected`}
                           </span>
                       </div>
                       
                       {/* Progress Bar (Visible during scanning) */}
                       {connectionStatus === 'scanning' && (
                           <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden mb-4">
                               <div 
                                   className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-100 ease-out" 
                                   style={{ width: `${progress}%` }}
                               />
                           </div>
                       )}

                       <div className="mt-2 flex gap-3">
                           <button 
                               onClick={() => {
                                   setConnectionStatus('idle');
                                   setProgress(0);
                                   setSelectedPhotos(new Set());
                               }}
                               className="flex-1 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-bold text-slate-300 transition-colors"
                           >
                               Cancel
                           </button>
                           <button 
                               onClick={() => {
                                   onNavigate('my-images');
                                   onClose();
                               }}
                               disabled={selectedPhotos.size === 0}
                               className={`flex-1 py-3 rounded-lg text-xs font-bold text-white shadow-lg transition-all ${selectedPhotos.size > 0 ? 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-fuchsia-600/20 hover:scale-[1.02] active:scale-[0.98]' : 'bg-white/5 text-slate-500 cursor-not-allowed'}`}
                           >
                               Import {selectedPhotos.size > 0 ? selectedPhotos.size : ''} Photos
                           </button>
                       </div>
                   </div>
               </div>
           )}

        </div>
      </div>
      
      {/* Styles for Custom Animations */}
      <style>{`
        @keyframes scan-vertical {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 100%; }
        }
        .animate-scan-vertical {
          animation: scan-vertical 3s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
      `}</style>
    </div>
  );
};
