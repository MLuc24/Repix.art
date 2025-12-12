
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_USER } from '../../../services/mock/dashboard';
import { MOCK_MODELS, MOCK_INSPIRATION_PROMPTS } from '../../../services/mock/generator';
import { GenModel, AspectRatio, GeneratorMode, GenResult } from '../../../features/generator/types';
import { 
  GenPromptInput, 
  GenAspectRatio, 
  GenModelSelector, 
  GenUploader, 
  GenResultCard,
  HeroModelGrid
} from '../../../features/generator/components/BaseGeneratorUI';
import { NeonButton, GlassModal } from '../../../shared/components/GlassUI';
import { Icons } from '../../../shared/components/Icons';

export const CasualGenerator = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  // State
  const [mode, setMode] = useState<GeneratorMode>('text-to-image');
  const [prompt, setPrompt] = useState('');
  // Default to a free model to avoid initial lock state issues
  const [selectedModel, setSelectedModel] = useState<GenModel>(MOCK_MODELS.find(m => !m.isPro) || MOCK_MODELS[0]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenResult[]>([]);
  
  // Modals
  const [showUpsell, setShowUpsell] = useState(false);
  const [lockedFeature, setLockedFeature] = useState('');

  // --- INIT LOGIC ---
  useEffect(() => {
    const savedPrompt = sessionStorage.getItem('gen_prompt');
    const savedMode = sessionStorage.getItem('gen_mode');

    if (savedPrompt) {
      setPrompt(savedPrompt);
      sessionStorage.removeItem('gen_prompt');
    }

    if (savedMode && (savedMode === 'text-to-image' || savedMode === 'image-to-image')) {
      setMode(savedMode as GeneratorMode);
      sessionStorage.removeItem('gen_mode');
    }
  }, []);

  // Handlers
  const handleInspire = () => {
    const random = MOCK_INSPIRATION_PROMPTS[Math.floor(Math.random() * MOCK_INSPIRATION_PROMPTS.length)];
    setPrompt(random);
  };

  // Removed handleProEnhance entirely for Casual User

  const handleModelSelect = (model: GenModel) => {
    if (model.isPro) {
      setLockedFeature(`Model: ${model.name}`);
      setShowUpsell(true);
      return;
    }
    setSelectedModel(model);
  };

  const handleUpload = () => {
    setUploadedImage('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80');
  };

  const handleGenerate = () => {
    if (!prompt && !uploadedImage) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      // Casual is strictly 1 image
      const newResult: GenResult = {
        id: Date.now().toString(),
        src: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1620641788421-7a1c342ea42e' : '1633511090164-b43840ea1607'}?auto=format&fit=crop&w=600&q=80`,
        prompt: prompt,
        ratio: aspectRatio,
        createdAt: new Date().toISOString()
      };
      
      setResults([newResult, ...results]);
      setIsGenerating(false);
    }, 2500);
  };

  const handleClearResults = () => {
    setResults([]);
  };

  const handleUpscaleLock = () => {
    setLockedFeature('HD Upscale (4K)');
    setShowUpsell(true);
  };

  return (
    <DashboardLayout user={MOCK_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="generator">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-140px)]">
        
        {/* --- LEFT COLUMN: CONTROLS --- */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:border-r border-slate-200 dark:border-white/5 lg:pr-8">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">AI Generator</h1>
               <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-[10px] font-bold uppercase text-slate-600 dark:text-slate-300">Lite</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Standard generation mode.</p>
          </div>

          {/* Mode Tabs */}
          <div className="flex p-1 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/5">
            <button 
              onClick={() => setMode('text-to-image')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'text-to-image' ? 'bg-white dark:bg-[#1a1b26] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Text to Image
            </button>
            <button 
              onClick={() => setMode('image-to-image')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${mode === 'image-to-image' ? 'bg-white dark:bg-[#1a1b26] text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
            >
              Image to Image
            </button>
          </div>

          <div className="space-y-6 overflow-y-auto custom-scrollbar flex-1 pb-20">
            {/* 1. MODEL */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
               <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">Model</label>
               <GenModelSelector 
                 models={MOCK_MODELS} 
                 selectedId={selectedModel.id} 
                 onSelect={handleModelSelect} 
               />
            </section>

            {/* 2. PROMPT */}
            <section className="animate-fade-in-up">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">Prompt</label>
              <GenPromptInput 
                value={prompt} 
                onChange={setPrompt} 
                onInspire={handleInspire}
                // REMOVED onEnhance
              />
            </section>

            {/* 3. UPLOAD (If I2I) */}
            {mode === 'image-to-image' && (
              <section className="animate-fade-in-up">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">Reference Image</label>
                <GenUploader onUpload={handleUpload} previewUrl={uploadedImage || undefined} />
              </section>
            )}

            {/* 4. RATIO */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
               <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">Aspect Ratio</label>
               <GenAspectRatio 
                 value={aspectRatio} 
                 onChange={setAspectRatio} 
               />
            </section>

            {/* UPSELL BANNER IN SIDEBAR (Replacing Advanced Settings) */}
            <section className="p-4 rounded-xl bg-gradient-to-r from-violet-900/10 to-fuchsia-900/10 border border-violet-500/20 border-dashed animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
               <div className="flex items-start gap-3">
                  <div className="p-2 bg-violet-600 rounded-lg text-white"><Icons.Sliders className="w-4 h-4" /></div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white mb-1">Advanced Controls Locked</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Upgrade to control details, creativity, and generate 4 images at once.</p>
                  </div>
               </div>
               <button onClick={() => onNavigate('subscription')} className="mt-3 w-full py-2 bg-white/10 hover:bg-white/20 border border-slate-200 dark:border-white/10 text-xs font-bold rounded-lg transition-colors text-violet-600 dark:text-violet-300">
                 View Pro Plans
               </button>
            </section>

            {/* ACTION */}
            <div className="pt-2 animate-fade-in-up sticky bottom-0 bg-slate-50 dark:bg-[#020617] pb-4 z-10 transition-colors" style={{ animationDelay: '0.3s' }}>
              <NeonButton 
                onClick={handleGenerate} 
                isLoading={isGenerating}
                disabled={!prompt && !uploadedImage}
                className="py-4 text-base"
              >
                Generate ({selectedModel.cost} Credits)
              </NeonButton>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: RESULTS --- */}
        <div className="lg:col-span-8 flex flex-col h-full">
           
           {results.length > 0 && (
             <div className="flex items-center justify-between mb-6 h-10 animate-fade-in-up">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Results ({results.length})</h2>
                <button 
                  onClick={handleClearResults}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 px-3 py-1.5 rounded-lg"
                >
                  Clear All
                </button>
             </div>
           )}

           {isGenerating && (
              <div className="flex-1 w-full rounded-3xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 flex flex-col items-center justify-center relative overflow-hidden mb-6 min-h-[400px] shadow-sm">
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-violet-500/10 dark:via-violet-500/5 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
                 <div className="relative z-10 p-8 rounded-full bg-slate-50 dark:bg-black/20 backdrop-blur-sm border border-slate-200 dark:border-white/5 mb-6">
                    <Icons.Sparkles className="w-12 h-12 text-violet-500 animate-pulse" />
                 </div>
                 <p className="text-lg font-bold text-slate-900 dark:text-white">Generating artwork...</p>
                 <p className="text-sm text-slate-500 mt-2">Using {selectedModel.name}</p>
              </div>
           )}

           {!isGenerating && results.length === 0 && (
             <div className="flex-1 flex flex-col justify-center">
                <HeroModelGrid 
                  models={MOCK_MODELS} 
                  onSelect={handleModelSelect}
                />
             </div>
           )}

           {!isGenerating && results.length > 0 && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pb-20 custom-scrollbar">
               {results.map((res) => (
                 <GenResultCard 
                   key={res.id} 
                   src={res.src} 
                   onDownload={() => {}} 
                   onEdit={() => onNavigate('editor')}
                   onUpscale={handleUpscaleLock}
                 />
               ))}
             </div>
           )}

        </div>

      </div>

      {/* UPSELL MODAL */}
      <GlassModal isOpen={showUpsell} onClose={() => setShowUpsell(false)}>
        <div className="text-center">
          <div className="inline-flex p-3 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-4">
            <Icons.Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Unlock {lockedFeature}</h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm">
            This feature is exclusively available in the Pro plan. Get higher quality, faster speeds, and commercial rights.
          </p>
          <NeonButton onClick={() => onNavigate('subscription')} className="w-full mb-3">
            Upgrade to Pro
          </NeonButton>
          <button onClick={() => setShowUpsell(false)} className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white">
            Maybe later
          </button>
        </div>
      </GlassModal>

    </DashboardLayout>
  );
};
