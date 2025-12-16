
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton, GlassModal } from '../../../shared/components/GlassUI';
import { AVATAR_STYLES, MOCK_AVATAR_RESULTS } from '../../../services/mock/avatar';
import { MOCK_ASSETS } from '../../../services/mock/my_images';
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

// --- NEW COMPONENT: AVATAR UPLOAD MODAL ---
interface AvatarUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComputer: () => void;
  onImportGallery: (photos: UploadedPhoto[]) => void;
}

const AvatarUploadModal = ({ isOpen, onClose, onUploadComputer, onImportGallery }: AvatarUploadModalProps) => {
  const [activeTab, setActiveTab] = useState<'computer' | 'gallery'>('computer');
  const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);

  const handleToggleSelect = (id: string) => {
    setSelectedAssetIds(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleImport = () => {
    const selected = MOCK_ASSETS.filter(a => selectedAssetIds.includes(a.id));
    const converted: UploadedPhoto[] = selected.map(a => ({
      id: `imported_${a.id}`,
      url: a.src
    }));
    onImportGallery(converted);
    setSelectedAssetIds([]);
    onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-3xl">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Upload Portraits</h2>
            <p className="text-slate-400 text-sm">Choose photos from your device or your Repix gallery.</p>
        </div>

        {/* TABS */}
        <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setActiveTab('computer')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border text-sm font-bold transition-all ${
                activeTab === 'computer' 
                ? 'bg-violet-500/10 border-violet-500 text-violet-400' 
                : 'bg-transparent border-transparent hover:bg-white/5 text-slate-500'
              }`}
            >
              <Icons.Smartphone className="w-4 h-4" /> Device
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full border text-sm font-bold transition-all ${
                activeTab === 'gallery' 
                ? 'bg-pink-500/10 border-pink-500 text-pink-400' 
                : 'bg-transparent border-transparent hover:bg-white/5 text-slate-500'
              }`}
            >
              <Icons.Image className="w-4 h-4" /> My Images
            </button>
        </div>

        {/* CONTENT */}
        <div className="min-h-[300px]">
           {activeTab === 'computer' && (
             <div className="animate-fade-in py-4">
                <UploadDropzone onUpload={() => { onUploadComputer(); onClose(); }} />
                <p className="text-center text-xs text-slate-500 mt-4">
                  Supported formats: JPG, PNG, WEBP. Max 5MB per file.
                </p>
             </div>
           )}

           {activeTab === 'gallery' && (
             <div className="animate-fade-in flex flex-col h-full">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                   {MOCK_ASSETS.map(asset => {
                     const isSelected = selectedAssetIds.includes(asset.id);
                     return (
                       <div 
                         key={asset.id} 
                         onClick={() => handleToggleSelect(asset.id)}
                         className={`
                           relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all group
                           ${isSelected ? 'border-pink-500 ring-2 ring-pink-500/20' : 'border-transparent hover:border-white/20'}
                         `}
                       >
                         <img src={asset.src} alt={asset.title} className="w-full h-full object-cover" loading="lazy" />
                         <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                            {isSelected ? <Icons.Check className="w-6 h-6 text-white" /> : <Icons.Plus className="w-6 h-6 text-white" />}
                         </div>
                       </div>
                     );
                   })}
                </div>
                
                {selectedAssetIds.length > 0 && (
                   <div className="mt-6 flex justify-center animate-fade-in-up">
                      <NeonButton onClick={handleImport} className="!w-auto px-8 bg-pink-600 hover:bg-pink-700">
                         Import Selected ({selectedAssetIds.length})
                      </NeonButton>
                   </div>
                )}
             </div>
           )}
        </div>
      </div>
    </GlassModal>
  );
};

export const CasualAvatar = ({ onLogout, onNavigate, user }: { onLogout: () => void, onNavigate: (path: string) => void, user: any }) => {
  const [stage, setStage] = useState<Stage>('upload');
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // --- HANDLERS ---
  
  // Mock Upload from Computer
  const handleComputerUpload = () => {
    // Simulating file selection
    const newPhotos: UploadedPhoto[] = [
      { id: `u_${Date.now()}_1`, url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80' },
      { id: `u_${Date.now()}_2`, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80' },
    ];
    setUploadedPhotos(prev => [...prev, ...newPhotos].slice(0, 6));
  };

  const handleGalleryImport = (photos: UploadedPhoto[]) => {
    setUploadedPhotos(prev => [...prev, ...photos].slice(0, 6));
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

  // --- STEPS INDICATOR ---
  const steps = [
    { id: 'upload', label: 'Upload Photos', number: 1 },
    { id: 'style', label: 'Choose Style', number: 2 },
    { id: 'results', label: 'Results', number: 3 },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="avatar">
      
      {/* 1. PREMIUM AMBIENT BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20 rounded-full blur-[130px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-gradient-to-tr from-blue-600/20 to-cyan-400/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[20%] left-[30%] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[100px] animate-float opacity-50" />
      </div>

      <main className="relative z-10 min-h-[calc(100vh-100px)] flex flex-col items-center">
        
        {/* 2. HEADER & STEPS */}
        {stage !== 'generating' && stage !== 'results' && (
          <div className="w-full max-w-5xl mx-auto text-center mb-12 pt-8 animate-fade-in-up">
             
             {/* Badge */}
             <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-violet-300 shadow-xl shadow-violet-900/10 mb-8 hover:bg-white/10 transition-colors cursor-default">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
               <span className="text-xs font-bold uppercase tracking-wider">AI Avatar Engine 2.0</span>
             </div>

             <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-white drop-shadow-sm">
               Create Your <br className="md:hidden" />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">
                 Digital Twin
               </span>
             </h1>
             <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed mb-12">
               Upload reliable selfies and let our AI crafting engine generate 
               <span className="text-white font-medium"> photorealistic avatars</span> in styles you love.
             </p>

             {/* Steps Progress */}
             <div className="flex items-center justify-center gap-4 md:gap-12 relative max-w-2xl mx-auto">
                <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-white/10 -z-10" />
                {steps.map((s) => {
                  const isActive = s.id === stage || (stage === 'style' && s.id === 'upload'); // simple logic
                  const isCurrent = s.id === stage;
                  
                  return (
                    <div key={s.id} className={`flex flex-col items-center gap-3 transition-all duration-300 ${isCurrent ? 'scale-110' : 'opacity-60'}`}>
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all
                        ${isCurrent || isActive ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/40' : 'bg-[#1a1b26] border-white/10 text-slate-500'}
                      `}>
                        {isCurrent || isActive ? s.number : s.number}
                      </div>
                      <span className={`text-xs font-bold tracking-wider uppercase ${isCurrent ? 'text-white' : 'text-slate-500'}`}>{s.label}</span>
                    </div>
                  );
                })}
             </div>
          </div>
        )}

        {/* --- STAGE 1: UPLOAD --- */}
        {stage === 'upload' && (
          <div className="w-full max-w-5xl animate-fade-in-up pb-20">
             <div className="relative bg-[#0e0f14]/60 backdrop-blur-2xl rounded-[32px] p-1 border border-white/10 shadow-2xl">
               <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50" />
               
               <div className="bg-[#13141b]/80 rounded-[28px] p-8 md:p-12">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                   <div>
                      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Icons.Upload className="w-6 h-6 text-violet-400" /> Upload Portraits
                      </h2>
                      <p className="text-slate-400 text-sm">Select 3-6 clear photos of yourself for best results.</p>
                   </div>
                   <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-sm font-medium text-slate-300">
                     <span className={uploadedPhotos.length >= 3 ? 'text-emerald-400' : 'text-amber-400'}>{uploadedPhotos.length}</span> <span className="text-slate-500">/</span> 6 Selected
                   </div>
                 </div>
                 
                 {uploadedPhotos.length < 6 && (
                    <div className="mb-8">
                      {/* MODAL TRIGGER */}
                      <div 
                         onClick={() => setIsUploadModalOpen(true)}
                         className="cursor-pointer group relative border-2 border-dashed border-white/10 hover:border-violet-500/50 bg-[#0e0f14] hover:bg-white/5 rounded-3xl p-12 transition-all duration-300 flex flex-col items-center justify-center gap-4 animate-fade-in"
                      >
                          <div className="w-20 h-20 rounded-full bg-white/5 group-hover:bg-violet-500/20 flex items-center justify-center transition-all duration-300 shadow-xl shadow-black/20 group-hover:scale-110">
                              <Icons.Cloud className="w-8 h-8 text-slate-400 group-hover:text-violet-300 transition-colors" />
                          </div>
                          <div className="text-center z-10">
                              <h3 className="text-xl font-bold text-white mb-2 tracking-tight group-hover:text-violet-200 transition-colors">Click to Add Photos</h3>
                              <p className="text-slate-400 text-sm group-hover:text-slate-300 transition-colors">
                                Upload from Device or Import from Gallery
                              </p>
                          </div>
                          
                          {/* Decorative */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                      </div>
                    </div>
                 )}
                 
                 {uploadedPhotos.length > 0 && (
                   <div className="animate-fade-in">
                      <PhotoGrid photos={uploadedPhotos} onRemove={handleRemovePhoto} />
                   </div>
                 )}

                 {/* ACTION FOOTER */}
                 <div className="mt-10 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                   <div className="flex-1 flex items-start gap-4 p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                      <Icons.Info className="w-5 h-5 text-violet-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-400 leading-relaxed">
                        <strong className="text-violet-300">Pro Tip:</strong> Avoid photos with sunglasses, masks, or extreme angles. Good lighting is key!
                      </p>
                   </div>

                   <div className="w-full md:w-auto flex-none">
                     <NeonButton 
                       onClick={() => setStage('style')}
                       disabled={uploadedPhotos.length < 3}
                       className={`md:!w-64 transition-all ${uploadedPhotos.length < 3 ? 'opacity-50 grayscale' : ''}`}
                     >
                       <span className="flex items-center gap-2">Next Step <Icons.ChevronRight className="w-4 h-4" /></span>
                     </NeonButton>
                   </div>
                 </div>

               </div>
             </div>
          </div>
        )}

        {/* --- STAGE 2: STYLE SELECTION --- */}
        {stage === 'style' && (
          <div className="w-full max-w-7xl animate-fade-in-up pb-32 px-4">
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {AVATAR_STYLES.map((style) => (
                <StyleCard 
                  key={style.id}
                  style={style}
                  isSelected={selectedStyle === style.id}
                  onClick={() => setSelectedStyle(style.id)}
                />
              ))}
            </div>

            {/* Floating Bottom Bar */}
            <div className="fixed bottom-6 left-6 right-6 lg:left-[calc(16rem+1.5rem)] z-50 animate-fade-in-up">
               <div className="mx-auto max-w-4xl bg-[#1a1b26]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/50 flex items-center justify-between gap-6">
                  
                  <button 
                    onClick={() => setStage('upload')}
                    className="p-3 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <Icons.ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex-1 text-center md:text-left">
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-0.5">Selected Style</p>
                    <p className="text-lg font-bold text-white truncate">
                      {AVATAR_STYLES.find(s => s.id === selectedStyle)?.name || <span className="text-slate-600 italic">None selected</span>}
                    </p>
                  </div>

                  <NeonButton 
                    onClick={handleGenerate}
                    disabled={!selectedStyle}
                    className="!w-auto px-8 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600"
                  >
                    Generate (5 Credits) <Icons.Sparkles className="w-4 h-4 ml-2" />
                  </NeonButton>
               </div>
            </div>
          </div>
        )}

        {/* --- STAGE 3: GENERATING --- */}
        {stage === 'generating' && (
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 text-center">
             <div className="relative w-32 h-32 mb-8">
               <div className="absolute inset-0 rounded-full border-4 border-white/10" />
               <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
               <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl text-white">
                 {progress}%
               </div>
             </div>
             <h2 className="text-3xl font-bold text-white mb-4 animate-pulse">Dreaming up your avatars...</h2>
             <p className="text-slate-400 text-lg">
               Our AI is analyzing your facial features and applying the chosen artistic style. 
               This usually takes about a minute.
             </p>
          </div>
        )}

        {/* --- STAGE 4: RESULTS --- */}
        {stage === 'results' && (
          <div className="w-full max-w-7xl animate-fade-in-up px-6 pb-20">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider mb-4">
                     <Icons.Check className="w-3 h-3" /> Complete
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">Your Digital Twins are Ready!</h2>
                  <p className="text-slate-400">Generated with <span className="text-violet-400 font-bold">{AVATAR_STYLES.find(s => s.id === selectedStyle)?.name}</span> style.</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={resetFlow} className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 hover:text-white font-bold transition-colors">
                    Create New
                  </button>
                  <NeonButton className="px-8 !w-auto">
                    Download All <Icons.Download className="w-4 h-4 ml-2" />
                  </NeonButton>
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {MOCK_AVATAR_RESULTS.map((res, idx) => (
                  <div key={res.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                    <ResultCard result={res} />
                  </div>
                ))}
             </div>

             <div className="mt-16">
               <UpsellBanner />
             </div>
          </div>
        )}

      </main>

      {/* MODALS */}
      <AvatarUploadModal 
        isOpen={isUploadModalOpen} 
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComputer={handleComputerUpload}
        onImportGallery={handleGalleryImport}
      />

    </DashboardLayout>
  );
};
