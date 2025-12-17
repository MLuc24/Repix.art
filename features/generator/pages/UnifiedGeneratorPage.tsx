
import React, { useState } from 'react';
import { DashboardLayout } from '../../dashboard/components/DashboardLayout';
import { GenModel } from '../types';
import { MOCK_MODELS } from '../../../services/mock/generator';
import { 
  GenPromptInput, 
  GenAspectRatio, 
  GenOutputSelector, 
  GenAdvancedSettings,
  GenModelSelector,
  HeroModelGrid,
  GenUploader,
  GenResultCard
} from '../components/BaseGeneratorUI';
import { Icons } from '../../../shared/components/Icons';

// --- MOCK CONSTANTS ---
const ALL_MODELS = [...MOCK_MODELS];

interface UnifiedGeneratorPageProps {
  user: any; // Using any for efficiency, ideally MOCK_USER type
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

export const UnifiedGeneratorPage = ({ user, onLogout, onNavigate }: UnifiedGeneratorPageProps) => {
  // Ensure models exist
  const models = ALL_MODELS && ALL_MODELS.length > 0 ? ALL_MODELS : [{ id: 'default', name: 'Default Model', description: '', thumbnail: '', isPro: false, cost: 1 }];

  // State
  const [prompt, setPrompt] = useState('');
  const [aspectOne, setAspectOne] = useState<'1:1' | '3:4' | '9:16' | '16:9'>('1:1');
  const [outputCount, setOutputCount] = useState(1);
  const [selectedModelId, setSelectedModelId] = useState(models[0].id);
  const [advSettings, setAdvSettings] = useState({ detail: 50, creativity: 50, sharpness: 50 });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);

  if (!user) return <div className="p-10 text-center text-white">Loading user...</div>;

  // Derived
  const currentRoleLevel = user.role === 'casual' ? 0 : user.role === 'pro' ? 1 : user.role === 'freelancer' ? 2 : 3;
  const isPro = currentRoleLevel >= 1;

  // Handlers
  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      // Mock result
      setGeneratedImages(prev => [
        'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop&q=60',
        ...prev
      ]);
    }, 2000);
  };

  const handleModelSelect = (model: GenModel) => {
    if (model.isPro && !isPro) {
      onNavigate('subscription');
      return;
    }
    setSelectedModelId(model.id);
  };

  const handleOutputChange = (count: number) => {
    if (count > 2 && !isPro) {
      onNavigate('subscription');
      return;
    }
    setOutputCount(count);
  };

  const handleEnhancePrompt = () => {
    if (!isPro) {
      onNavigate('subscription');
      return;
    }
    setPrompt(prev => prev + ' (Enhanced with pro detail, 8k resolution, cinematic lighting)');
  };

  return (
    <DashboardLayout 
      user={user} 
      onLogout={onLogout} 
      onNavigate={onNavigate} 
      activePage="generator"
    >
      <div className="max-w-6xl mx-auto pb-20">
        
        {/* HERO MODEL GRID */}
        <div className="mb-8">
            <HeroModelGrid 
                models={ALL_MODELS} 
                onSelect={handleModelSelect}
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: CONTROLS (4 cols) */}
          <div className="lg:col-span-4 space-y-6 sticky top-24">
            
            {/* 1. Prompt */}
            <div>
               <div className="flex items-center justify-between mb-2">
                 <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Prompt</h3>
                 <button className="text-xs text-violet-500 font-bold flex items-center gap-1 hover:text-violet-400">
                   <Icons.Clock className="w-3 h-3" /> History
                 </button>
               </div>
               <GenPromptInput 
                 value={prompt} 
                 onChange={setPrompt} 
                 onInspire={() => setPrompt("A futuristic cityscape with flying cars, neon lights, cyberpunk aesthetic, 8k resolution")}
                 onEnhance={isPro ? handleEnhancePrompt : undefined}
               />
               {!isPro && (
                 <div onClick={() => onNavigate('subscription')} className="mt-2 flex items-center justify-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10 cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-500/10 text-xs font-medium text-slate-500 hover:text-violet-500 transition-colors">
                    <Icons.Lock className="w-3 h-3" /> <span>Unlock Pro Prompt Enhancer</span>
                 </div>
               )}
            </div>

            {/* 2. Model Selector */}
            <div>
               <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Model</h3>
               <GenModelSelector 
                 models={ALL_MODELS} 
                 selectedId={selectedModelId} 
                 onSelect={handleModelSelect} 
               />
            </div>

            {/* 3. Settings Grid */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Ratio</h3>
                  <GenAspectRatio value={aspectOne} onChange={(val) => setAspectOne(val as any)} />
               </div>
               <div>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Output</h3>
                  <GenOutputSelector value={outputCount} onChange={handleOutputChange} />
               </div>
            </div>

            {/* 4. Advanced Settings (Always visible but maybe locked/limited for casual?) 
                For this unification, let's show it fully but maybe with visual flair.
            */}
            <GenAdvancedSettings values={advSettings} onChange={(k, v) => setAdvSettings(prev => ({ ...prev, [k]: v }))} />

            {/* GENERATE BUTTON */}
            <button
               onClick={handleGenerate}
               disabled={!prompt || isGenerating}
               className={`
                 w-full py-4 rounded-xl font-bold text-lg shadow-xl flex items-center justify-center gap-2 transition-all
                 ${!prompt || isGenerating
                   ? 'bg-slate-200 dark:bg-white/10 text-slate-400 cursor-not-allowed'
                   : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:shadow-violet-500/25 hover:scale-[1.02] text-white'
                 }
               `}
            >
               {isGenerating ? (
                 <>
                   <Icons.Refresh className="w-5 h-5 animate-spin" /> Generating...
                 </>
               ) : (
                 <>
                   <Icons.Sparkles className="w-5 h-5" /> Generate 
                   <span className="text-xs font-normal opacity-70 ml-1">({ALL_MODELS.find(m => m.id === selectedModelId)?.cost || 1} Credits)</span>
                 </>
               )}
            </button>

          </div>

          {/* RIGHT: PREVIEW & RESULTS (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Uploader Box */}
            <div className="bg-white dark:bg-[#1a1b26] p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
               <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 flex items-center gap-2">
                 <Icons.Image className="w-4 h-4 text-violet-500" /> Image to Image (Optional)
               </h3>
               <GenUploader onUpload={() => {}} />
            </div>

            {/* Results Grid */}
            <div className="space-y-4">
               <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                 <Icons.Grid className="w-4 h-4" /> Latest Generations
               </h3>
               
               {generatedImages.length === 0 ? (
                 <div className="h-64 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-2xl bg-slate-50 dark:bg-white/5">
                    <Icons.Image className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm font-medium">Your masterpieces will appear here</p>
                 </div>
               ) : (
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {generatedImages.map((src, idx) => (
                      <GenResultCard 
                        key={idx} 
                        src={src} 
                        onDownload={() => {}} 
                        onEdit={() => onNavigate('editor')}
                        onUpscale={isPro ? () => {} : undefined} 
                      />
                    ))}
                 </div>
               )}
            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
