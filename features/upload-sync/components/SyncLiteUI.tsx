import React, { useState, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton, GlassModal } from '../../../shared/components/GlassUI';
import { SyncSession } from '../types';

// --- DASHBOARD: SCANNER CARD ---
export const ScannerCard = ({ onScan }: { onScan: () => void }) => (
  <div className="relative w-full rounded-[32px] overflow-hidden bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 shadow-2xl group transition-colors">
    {/* Animated Radar Background */}
    <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-violet-600/20 to-transparent rounded-full animate-spin [animation-duration:4s]" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-slate-300 dark:border-white/5 rounded-full" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] border border-slate-300 dark:border-white/10 rounded-full" />
    </div>

    <div className="relative z-10 p-10 md:p-14 text-center flex flex-col items-center">
       <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 backdrop-blur-xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(139,92,246,0.2)]">
         <Icons.Refresh className="w-8 h-8 text-violet-500 dark:text-violet-400" />
       </div>
       
       <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Sync Lite</h2>
       <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8 leading-relaxed">
         Select local folders to instantly organize and edit without full cloud upload. We scan, you choose.
       </p>

       <NeonButton onClick={onScan} className="!w-auto px-10 py-4 shadow-violet-900/30">
         Start Local Scan
       </NeonButton>
       <p className="mt-4 text-xs text-slate-500 flex items-center gap-2">
         <Icons.Check className="w-3 h-3" /> No app installation required
       </p>
    </div>
  </div>
);

// --- SESSION CARD ---
export const SyncSessionCard = ({ session }: { session: SyncSession; key?: React.Key }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-violet-300 dark:hover:border-white/20 hover:shadow-md dark:hover:bg-white/10 transition-all cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors">
        <span className="font-bold text-xs">DIR</span>
      </div>
      <div>
        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{session.folderName}</h4>
        <p className="text-xs text-slate-500">{session.photoCount} photos • {session.date}</p>
      </div>
    </div>
    <button className="text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
      Re-sync
    </button>
  </div>
);

// --- FOLDER PICKER MODAL (SIMULATED) ---
export const FolderPickerModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean, onClose: () => void, onConfirm: () => void }) => {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const folders = [
    { name: 'DCIM/Camera', count: 450 },
    { name: 'Downloads/Wallpapers', count: 12 },
    { name: 'Pictures/Trip_2024', count: 85 },
  ];

  return (
    <GlassModal isOpen={isOpen} onClose={onClose}>
      <div className="text-center mb-6">
         <h3 className="text-xl font-bold text-slate-900 dark:text-white">Select Folder to Sync</h3>
         <p className="text-sm text-slate-500 dark:text-slate-400">Repix will scan for images in this location.</p>
      </div>

      <div className="space-y-2 mb-8 max-h-60 overflow-y-auto pr-2">
         {folders.map((f) => (
           <div 
             key={f.name}
             onClick={() => setSelectedFolder(f.name)}
             className={`
               flex items-center justify-between p-4 rounded-xl cursor-pointer border transition-all
               ${selectedFolder === f.name 
                 ? 'bg-violet-100 dark:bg-violet-600/20 border-violet-500 text-violet-800 dark:text-white' 
                 : 'bg-slate-50 dark:bg-black/20 border-transparent hover:bg-slate-100 dark:hover:bg-black/40 text-slate-600 dark:text-slate-300'
               }
             `}
           >
              <div className="flex items-center gap-3">
                 <Icons.Image className="w-5 h-5 opacity-70" />
                 <span className="text-sm font-medium">{f.name}</span>
              </div>
              <span className="text-xs opacity-50">{f.count} items</span>
           </div>
         ))}
      </div>

      <NeonButton 
        onClick={onConfirm}
        disabled={!selectedFolder}
        className="w-full"
      >
        Sync Selected Folder
      </NeonButton>
    </GlassModal>
  );
};

// --- SYNC PROGRESS SCREEN ---
export const SyncProgressView = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          onComplete();
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in-up">
       {/* Progress Circle with Fixed viewBox */}
       <div className="relative w-40 h-40 flex items-center justify-center mb-8">
         <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-white/5" />
            <circle 
              cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" 
              className="text-violet-500 transition-all duration-100 ease-linear"
              strokeDasharray={440}
              strokeDashoffset={440 - (440 * progress) / 100}
              strokeLinecap="round"
            />
         </svg>
         <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">{progress}%</span>
            <span className="text-xs text-violet-500 dark:text-violet-400 font-bold uppercase tracking-widest">Scanning</span>
         </div>
         {/* Glow */}
         <div className="absolute inset-0 bg-violet-500/20 blur-3xl rounded-full -z-10" />
       </div>

       <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Analyzing Photos...</h3>
       <p className="text-slate-500 dark:text-slate-400">Grouping by faces, places, and quality.</p>
       
       <div className="mt-8 flex gap-4 text-xs font-mono text-slate-500">
          <span>Found: {Math.floor(progress * 1.2)} photos</span>
          <span>|</span>
          <span>Albums: {Math.floor(progress * 0.05)}</span>
       </div>
    </div>
  );
};