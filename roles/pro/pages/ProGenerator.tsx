
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_PRO_USER } from '../../../services/mock/dashboard';
import { MOCK_MODELS, MOCK_INSPIRATION_PROMPTS } from '../../../services/mock/generator';
import { GenModel, AspectRatio, GeneratorMode, GenResult } from '../../../features/generator/types';
import { 
  GenPromptInput, 
  GenAspectRatio, 
  GenModelSelector, 
  GenUploader, 
  GenResultCard,
  HeroModelGrid,
  GenOutputSelector,
  GenAdvancedSettings
} from '../../../features/generator/components/BaseGeneratorUI';
import { ProRemixControls, RemixSettings } from '../../../features/generator/components/ProRemixControls';
import { NeonButton } from '../../../shared/components/GlassUI';
import { Icons } from '../../../shared/components/Icons';

export const ProGenerator = ({ onLogout, onNavigate, user = MOCK_PRO_USER }: { onLogout: () => void, onNavigate: (path: string) => void, user?: typeof MOCK_PRO_USER }) => {
  const [mode, setMode] = useState<GeneratorMode>('text-to-image');
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState<GenModel>(MOCK_MODELS[0]);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  
  // Pro Features Unlocked
  const [outputCount, setOutputCount] = useState(1);
  const [advSettings, setAdvSettings] = useState({ detail: 50, creativity: 50, sharpness: 0 });
  const [remixSettings, setRemixSettings] = useState<RemixSettings>({
    influence: 65,
    controlMode: 'balanced',
    negativePrompt: '',
    seed: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<GenResult[]>([]);

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

  const handleInspire = () => {
    const random = MOCK_INSPIRATION_PROMPTS[Math.floor(Math.random() * MOCK_INSPIRATION_PROMPTS.length)];
    setPrompt(random);
  };

  const handleProEnhance = () => {
    if (prompt) {
      setPrompt(`(Masterpiece, 8k Resolution, Pro Lighting), ${prompt}, highly detailed, sharp focus`);
    } else {
      setPrompt("A cinematic masterpiece of a futuristic city, neon lights, 8k, unreal engine 5 render");
    }
  };

  const handleModelSelect = (model: GenModel) => {
    setSelectedModel(model);
  };

  const handleUpload = () => {
    setUploadedImage('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80');
  };

  const handleRemixSettingChange = (key: keyof RemixSettings, value: any) => {
    setRemixSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleGenerate = () => {
    if (!prompt && !uploadedImage) return;
    
    setIsGenerating(true);
    setTimeout(() => {
      const newResults: GenResult[] = Array.from({ length: outputCount }).map(() => ({
        id: Date.now().toString() + Math.random(),
        src: `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1620641788421-7a1c342ea42e' : '1633511090164-b43840ea1607'}?auto=format&fit=crop&w=600&q=80`,
        prompt: prompt,
        ratio: aspectRatio,
        createdAt: new Date().toISOString()
      }));
      
      setResults([...newResults, ...results]);
      setIsGenerating(false);
    }, 2500);
  };

  const handleClearResults = () => {
    setResults([]);
  };

  const handleUpscale = () => {
    console.log("Upscaling image...");
  };

  const totalCost = (selectedModel.cost + (outputCount > 1 ? (outputCount === 2 ? 1 : 2) : 0));

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="generator">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[calc(100vh-140px)]">
        
        {/* --- CONTROLS --- */}
        <div className="lg:col-span-4 flex flex-col gap-6 lg:border-r border-slate-200 dark:border-white/5 lg:pr-8">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
               <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">AI Generator</h1>
               <span className="px-2 py-0.5 rounded bg-violet-500/10 border border-violet-500/30 text-[10px] font-bold uppercase text-violet-500">Studio</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Advanced controls active.</p>
          </div>

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
            
            {/* 1. UPLOAD (Moved to top for I2I workflow) */}
            {mode === 'image-to-image' && (
              <section className="animate-fade-in-up">
                <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">Reference Image</label>
                <GenUploader onUpload={handleUpload} previewUrl={uploadedImage || undefined} />
              </section>
            )}

            {/* 2. MODEL */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
               <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">Model</label>
               <GenModelSelector 
                 models={MOCK_MODELS} 
                 selectedId={selectedModel.id} 
                 onSelect={handleModelSelect} 
               />
            </section>

            {/* 3. PRO CONTROLS (Common to BOTH modes now, pass mode to handle I2I specifics) */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <ProRemixControls 
                mode={mode}
                settings={remixSettings} 
                onChange={handleRemixSettingChange} 
              />
            </section>

            {/* 4. PROMPT */}
            <section className="animate-fade-in-up">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">
                {mode === 'image-to-image' ? 'Changes / Prompt' : 'Prompt'}
              </label>
              <GenPromptInput 
                value={prompt} 
                onChange={setPrompt} 
                onInspire={handleInspire}
                onEnhance={handleProEnhance}
              />
            </section>

            {/* 5. RATIO & OUTPUT */}
            <section className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
               <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">Aspect Ratio</label>
               <GenAspectRatio 
                 value={aspectRatio} 
                 onChange={setAspectRatio} 
               />
            </section>

            <section className="animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
               <label className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2 block">Output Count</label>
               <GenOutputSelector 
                 value={outputCount}
                 onChange={setOutputCount}
               />
            </section>

            {/* 6. ADVANCED SETTINGS (Text to Image) */}
            {mode === 'text-to-image' && (
              <section className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                 <GenAdvancedSettings 
                   values={advSettings}
                   onChange={(k, v) => setAdvSettings(prev => ({ ...prev, [k]: v }))}
                 />
              </section>
            )}

            <div className="pt-2 animate-fade-in-up sticky bottom-0 bg-slate-50 dark:bg-[#020617] pb-4 z-10 transition-colors" style={{ animationDelay: '0.3s' }}>
              <NeonButton 
                onClick={handleGenerate} 
                isLoading={isGenerating}
                disabled={!prompt && !uploadedImage}
                className="py-4 text-base"
              >
                {mode === 'image-to-image' ? `Remix (${totalCost} Credits)` : `Generate (${totalCost} Credits)`}
              </NeonButton>
            </div>
          </div>
        </div>

        {/* --- RESULTS --- */}
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
                 <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {mode === 'image-to-image' ? 'Remixing your visual...' : `Dreaming up ${outputCount} image${outputCount > 1 ? 's' : ''}...`}
                 </p>
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
             <div className={`grid grid-cols-1 ${outputCount > 1 ? 'md:grid-cols-2' : 'md:grid-cols-1'} gap-6 overflow-y-auto pb-20 custom-scrollbar`}>
               {results.map((res) => (
                 <GenResultCard 
                   key={res.id} 
                   src={res.src} 
                   onDownload={() => {}} 
                   onEdit={() => onNavigate('editor')}
                   onUpscale={handleUpscale} 
                 />
               ))}
             </div>
           )}
        </div>
      </div>
    </DashboardLayout>
  );
};
