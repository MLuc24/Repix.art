
import React, { useState, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { 
  StylePill, 
  OriginalPhotoCard, 
  RemixCard, 
  RemixActionBar 
} from '../../../features/remix/components/RemixUI';
import { REMIX_STYLES, MOCK_RESULTS } from '../../../services/mock/remix';

// Pool of mock input images to cycle through
const MOCK_INPUTS = [
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80"
];

export const CasualRemix = ({ onLogout, onNavigate, user }: { onLogout: () => void, onNavigate: (path: string) => void, user: any }) => {
  const [selectedStyle, setSelectedStyle] = useState('cyberpunk');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  
  // State for the interactive image
  const [currentInputImage, setCurrentInputImage] = useState(MOCK_INPUTS[0]);
  const [displayResults, setDisplayResults] = useState(MOCK_RESULTS);

  // Initial load simulation
  useEffect(() => {
    simulateGeneration();
  }, []);

  // --- HANDLERS ---

  const simulateGeneration = () => {
    setIsGenerating(true);
    // Shuffle results slightly to look dynamic
    setTimeout(() => {
      const shuffled = [...MOCK_RESULTS].sort(() => 0.5 - Math.random());
      setDisplayResults(shuffled);
      setIsGenerating(false);
    }, 1500); 
  };

  const handleChangePhoto = () => {
    // Cycle to next image in pool
    const currentIndex = MOCK_INPUTS.indexOf(currentInputImage);
    const nextIndex = (currentIndex + 1) % MOCK_INPUTS.length;
    setCurrentInputImage(MOCK_INPUTS[nextIndex]);
    
    // Trigger regeneration for new photo
    simulateGeneration();
  };

  const handleStyleSelect = (styleId: string) => {
    if (selectedStyle === styleId) return;
    setSelectedStyle(styleId);
    simulateGeneration();
  };

  const handleRandomStyle = () => {
    const randomStyle = REMIX_STYLES[Math.floor(Math.random() * REMIX_STYLES.length)];
    setSelectedStyle(randomStyle.id);
    simulateGeneration();
  };

  const handleApply = (src: string) => {
    // Save selected image to session so Editor can pick it up (Simulated)
    sessionStorage.setItem('editor_image', src);
    onNavigate('editor');
  };

  const handleMarketplaceNav = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('marketplace');
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="remix">
      {/* Background Ambience (Adaptive) */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-violet-100/50 dark:bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-100/50 dark:bg-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="relative z-10 pt-8 pb-32">
        
        {/* --- 1. HEADER & STYLE PICKER --- */}
        <section className="mb-10 text-center space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2">
              AI Style Remix
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Choose a style to instantly transform your photo.</p>
          </div>

          <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 px-4 no-scrollbar">
            {REMIX_STYLES.map((style) => (
              <StylePill 
                key={style.id}
                id={style.id}
                label={style.label}
                color={style.color}
                isSelected={selectedStyle === style.id}
                onClick={() => handleStyleSelect(style.id)}
              />
            ))}
          </div>
          
          <a 
            href="#" 
            onClick={handleMarketplaceNav}
            className="inline-block text-xs font-bold text-violet-600 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 transition-colors border-b border-violet-200 dark:border-violet-500/30 pb-0.5 hover:border-violet-600"
          >
            Want more styles? Explore Remix Packs →
          </a>
        </section>

        {/* --- 2. MAIN WORKSPACE --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: ORIGINAL */}
          <div className="lg:col-span-5 aspect-[4/5] sticky top-24 animate-fade-in-up">
            <OriginalPhotoCard 
              imageSrc={currentInputImage} 
              onChangeClick={handleChangePhoto}
            />
          </div>

          {/* RIGHT: RESULTS GRID */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 md:gap-6">
            {isGenerating ? (
               [1, 2, 3, 4].map(i => (
                 <div key={i} className="w-full aspect-square rounded-[24px] bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 relative overflow-hidden border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-slate-100 dark:via-white/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Icons.Sparkles className="w-8 h-8 text-slate-400 dark:text-white/20 animate-spin" />
                    </div>
                 </div>
               ))
            ) : (
               displayResults.map((res, idx) => (
                 <div key={res.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                   <RemixCard 
                     src={res.src} 
                     styleName={selectedStyle} 
                     onHDClick={() => setShowUpsell(true)}
                     onApply={() => handleApply(res.src)}
                   />
                 </div>
               ))
            )}
          </div>

        </div>
      </main>

      {/* --- 3. FLOATING ACTION BAR --- */}
      <RemixActionBar 
        isGenerating={isGenerating}
        onRegenerate={simulateGeneration}
        onRandom={handleRandomStyle}
        onNavigate={onNavigate}
      />

      {/* --- 4. HD UPSELL MODAL --- */}
      <GlassModal isOpen={showUpsell} onClose={() => setShowUpsell(false)}>
        <div className="text-center mb-8 text-slate-900 dark:text-white">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-500 mb-4 border border-amber-200 dark:border-amber-500/30">
             <Icons.Unlock className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Unlock HD Remix</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto">Get 4x resolution, noise reduction, and commercial usage rights.</p>
        </div>

        <div className="space-y-3">
          <NeonButton onClick={() => setShowUpsell(false)} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-900/20 text-black font-bold">
            Unlock for 1 Credit
          </NeonButton>
          <button 
            onClick={() => setShowUpsell(false)} 
            className="w-full py-3 text-sm text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            No thanks, keep low quality
          </button>
        </div>
      </GlassModal>

    </DashboardLayout>
  );
};
