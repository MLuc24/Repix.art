
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { AVATAR_STYLES, MOCK_AVATAR_RESULTS } from '../../../services/mock/avatar';
import { AvatarStyle, UploadedPhoto } from '../../../features/avatar/types';
import { 
  UploadDropzone, 
  PhotoGrid, 
  TipsCard, 
  StyleCard, 
  GeneratingLoader, 
  ResultCard, 
  UpsellBanner 
} from '../../../features/avatar/components/AvatarUI';

// --- STAGE DEFINITIONS ---
type Stage = 'upload' | 'style' | 'generating' | 'results';

export const CasualAvatar = ({ onLogout, onNavigate, user }: { onLogout: () => void, onNavigate: (path: string) => void, user: any }) => {
  const [stage, setStage] = useState<Stage>('upload');
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  // --- HANDLERS ---
  
  // Mock Upload
  const handleUpload = () => {
    // Simulating file selection
    const newPhotos: UploadedPhoto[] = [
      { id: 'u1', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
      { id: 'u2', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
      { id: 'u3', url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80' },
    ];
    setUploadedPhotos([...uploadedPhotos, ...newPhotos].slice(0, 6));
  };

  const handleRemovePhoto = (id: string) => {
    setUploadedPhotos(prev => prev.filter(p => p.id !== id));
  };

  const handleGenerate = () => {
    setStage('generating');
    // Simulate progress
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStage('results');
      }
    }, 150); // ~3 seconds for demo
  };

  const resetFlow = () => {
    setStage('upload');
    setUploadedPhotos([]);
    setSelectedStyle(null);
    setProgress(0);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="avatar">
      
      {/* Background Ambience (Adaptive) */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-100/50 dark:bg-orange-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-100/50 dark:bg-fuchsia-900/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="relative z-10 pt-4">
        
        {/* HEADER SECTION (Hidden in Generating/Result to focus user) */}
        {stage !== 'generating' && stage !== 'results' && (
          <div className="text-center mb-12 animate-fade-in-up">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-300 text-xs font-bold uppercase tracking-wider mb-4">
               <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
               New Feature
             </div>
             <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-slate-900 dark:text-white">
               AI Avatar Generator
             </h1>
             <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-lg">
               Turn your selfies into stunning AI art. Choose from Anime, 3D, Cyberpunk, and more.
             </p>
          </div>
        )}

        {/* --- STAGE 1: UPLOAD --- */}
        {stage === 'upload' && (
          <div className="max-w-3xl mx-auto animate-fade-in-up">
             <div className="bg-white dark:bg-[#1a1b26] rounded-3xl p-1 border border-slate-200 dark:border-white/5 shadow-2xl">
               <div className="bg-slate-50 dark:bg-[#0e0f14] rounded-[22px] p-6 md:p-8">
                 <div className="flex justify-between items-center mb-6">
                   <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Upload Portraits</h2>
                   <span className={`text-sm font-medium ${uploadedPhotos.length >= 3 ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-500'}`}>
                     {uploadedPhotos.length} / 6 Uploaded
                   </span>
                 </div>
                 
                 {uploadedPhotos.length < 6 && <UploadDropzone onUpload={handleUpload} />}
                 
                 <PhotoGrid photos={uploadedPhotos} onRemove={handleRemovePhoto} />

                 {/* ACTION FOOTER */}
                 <div className="mt-8 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                   <TipsCard className="w-full md:w-auto flex-1 text-slate-600 dark:text-slate-400 bg-white dark:bg-white/5" />
                   <div className="w-full md:w-auto flex-none">
                     <NeonButton 
                       onClick={() => setStage('style')}
                       disabled={uploadedPhotos.length < 3}
                       className="!w-full md:!w-auto px-12"
                     >
                       Continue
                     </NeonButton>
                   </div>
                 </div>

               </div>
             </div>
          </div>
        )}

        {/* --- STAGE 2: STYLE SELECTION --- */}
        {stage === 'style' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setStage('upload')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-medium"
              >
                <Icons.ChevronLeft className="w-5 h-5" /> Back
              </button>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Choose your Style</h2>
              <div className="w-20" /> {/* Spacer */}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {AVATAR_STYLES.map((style) => (
                <StyleCard 
                  key={style.id}
                  style={style}
                  isSelected={selectedStyle === style.id}
                  onClick={() => setSelectedStyle(style.id)}
                />
              ))}
            </div>

            <div className="fixed bottom-0 left-0 lg:left-64 w-full bg-white/90 dark:bg-[#0e0f14]/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 p-4 z-50 transition-all duration-300">
               <div className="max-w-6xl mx-auto flex items-center justify-between px-6">
                  <div className="text-sm">
                    <span className="text-slate-500 dark:text-slate-400">Selected Style: </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {AVATAR_STYLES.find(s => s.id === selectedStyle)?.name || 'None'}
                    </span>
                  </div>
                  <NeonButton 
                    onClick={handleGenerate}
                    disabled={!selectedStyle}
                    className="!w-auto px-12"
                  >
                    Generate Avatars
                  </NeonButton>
               </div>
            </div>
          </div>
        )}

        {/* --- STAGE 3: GENERATING --- */}
        {stage === 'generating' && (
          <GeneratingLoader />
        )}

        {/* --- STAGE 4: RESULTS --- */}
        {stage === 'results' && (
          <div className="animate-fade-in-up">
             <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Your Avatars are Ready! 🎉</h2>
                  <p className="text-slate-500 dark:text-slate-400">Generated with <span className="text-violet-600 dark:text-violet-400 font-bold">{AVATAR_STYLES.find(s => s.id === selectedStyle)?.name}</span> style.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={resetFlow} className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-white/5 dark:border-transparent dark:text-white dark:hover:bg-white/10 font-medium transition-colors">
                    Try Another Style
                  </button>
                  <button className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold transition-colors shadow-lg shadow-violet-500/20">
                    Download All
                  </button>
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {MOCK_AVATAR_RESULTS.map((res, idx) => (
                  <div key={res.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <ResultCard result={res} />
                  </div>
                ))}
             </div>

             <UpsellBanner />
          </div>
        )}

      </main>
    </DashboardLayout>
  );
};
