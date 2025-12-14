import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icons } from './Icons';
import { NeonButton } from './GlassUI';

const DEMO_STYLES = [
  { 
    id: 'cyberpunk', 
    label: 'Cyberpunk City', 
    icon: '⚡',
    prompt: "futuristic city with neon lights, high tech, rainy night, detailed",
    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?auto=format&fit=crop&w=1000&q=80",
    gradient: "from-pink-500 to-violet-500"
  },
  { 
    id: 'anime', 
    label: 'Anime Style', 
    icon: '🎨',
    prompt: "anime character portrait, vibrant colors, studio ghibli style, detailed background",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000&auto=format&fit=crop", 
    gradient: "from-orange-400 to-red-500"
  },
  { 
    id: 'render', 
    label: '3D Render', 
    icon: '🧊',
    prompt: "3d render, octane render, unreal engine 5, hyperrealistic, soft lighting",
    image: "https://images.unsplash.com/photo-1633511090164-b43840ea1607?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-blue-400 to-cyan-400"
  },
  { 
    id: 'painting', 
    label: 'Oil Painting', 
    icon: '🖌️',
    prompt: "oil painting on canvas, classical art style, textured brushstrokes, masterpiece",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop",
    gradient: "from-emerald-400 to-teal-500"
  },
];

export const ShowcaseSection = ({ onCtaClick, onGalleryClick }: { onCtaClick?: () => void, onGalleryClick?: () => void }) => {
  const [selectedStyle, setSelectedStyle] = useState(DEMO_STYLES[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleStyleSelect = (style: typeof DEMO_STYLES[0]) => {
    if (selectedStyle.id === style.id || isGenerating) return;
    
    setIsGenerating(true);
    setProgress(0);

    // Simulate generation progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 40); // 40ms * 20 steps = ~800ms total

    // Finish generation
    setTimeout(() => {
      setSelectedStyle(style);
      setIsGenerating(false);
      clearInterval(interval);
      setProgress(100);
    }, 1000);
  };

  return (
    <section id="showcase" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-wider mb-6"
           >
             <Icons.Zap className="w-3 h-3" /> Live Demo
           </motion.div>
           <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
             Create in <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Real-Time</span>
           </h2>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto">
             Experience the power of Repix instantly. Select a style to remix the concept.
           </p>
        </div>

        {/* Demo Interface */}
        <div className="max-w-4xl mx-auto bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col md:flex-row min-h-[400px]">
           
           {/* Sidebar Controls */}
           <div className="w-full md:w-1/3 border-r border-white/10 p-6 flex flex-col gap-6 bg-[#0f0f12]">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">PROMPT</label>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-slate-300 font-mono min-h-[80px]">
                    <span className="text-pink-500">{">"}</span> {selectedStyle.prompt}
                    <span className="animate-pulse ml-1 inline-block w-1.5 h-4 bg-pink-500 align-middle"/>
                </div>
              </div>

              <div className="flex-1">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">SELECT STYLE</label>
                 <div className="grid grid-cols-1 gap-2">
                    {DEMO_STYLES.map((style) => (
                        <button 
                            key={style.id}
                            onClick={() => handleStyleSelect(style)}
                            disabled={isGenerating}
                            className={`
                                relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left group
                                ${selectedStyle.id === style.id 
                                    ? 'bg-white/10 border border-white/20 shadow-lg' 
                                    : 'hover:bg-white/5 border border-transparent hover:border-white/5 opacity-60 hover:opacity-100'}
                            `}
                        >
                            <span className="text-xl">{style.icon}</span>
                            <div className="flex-1">
                                <span className={`block font-bold text-sm ${selectedStyle.id === style.id ? 'text-white' : 'text-slate-300'}`}>{style.label}</span>
                            </div>
                            {selectedStyle.id === style.id && (
                                <motion.div layoutId="active-dot" className="w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]" />
                            )}
                        </button>
                    ))}
                 </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>Credits used</span>
                      <span>0 / 100 Free</span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-600 w-[5%]" />
                  </div>
              </div>
           </div>

           {/* Preview Area */}
           <div className="w-full md:w-2/3 relative bg-[#050505] flex items-center justify-center overflow-hidden">
                {/* Image Display */}
                <div className="relative w-full h-full"> 
                   <AnimatePresence mode="wait">
                       <motion.img 
                            key={selectedStyle.id}
                            src={selectedStyle.image}
                            alt={selectedStyle.label}
                            initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="w-full h-full object-cover"
                       />
                   </AnimatePresence>
                   
                   {/* Gradient Overlay */}
                   <div className={`absolute inset-0 bg-gradient-to-t ${selectedStyle.gradient} opacity-20 mix-blend-overlay pointer-events-none`} />
                   
                   {/* Loading Overlay */}
                   <AnimatePresence>
                    {isGenerating && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4"
                        >
                            <div className="relative w-16 h-16">
                                <Icons.Wand className="w-full h-full text-pink-500 animate-pulse" />
                                <div className="absolute inset-0 border-4 border-pink-500/30 rounded-full animate-spin border-t-pink-500" />
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-white font-bold tracking-widest uppercase text-sm">Generating</span>
                                <span className="text-pink-400 font-mono text-xs">{progress}%</span>
                            </div>
                        </motion.div>
                    )}
                   </AnimatePresence>

                   <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <div className="px-4 py-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-xs font-mono text-slate-300">
                            1024 x 1024 • {selectedStyle.id.toUpperCase()}_V4
                        </div>
                        <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-black/60 hover:bg-white/10 text-white transition-colors border border-white/10" title="Download">
                                <Icons.Download className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg bg-black/60 hover:bg-white/10 text-white transition-colors border border-white/10" title="Maximize">
                                <Icons.Maximize className="w-4 h-4" />
                            </button>
                        </div>
                   </div>
                </div>
           </div>

        </div>

        {/* Action Buttons */}
        <div className="mt-16 flex flex-col items-center gap-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
                <NeonButton 
                  onClick={onCtaClick}
                  className="!w-auto rounded-full px-8 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.8)]"
                >
                    <span className="flex items-center gap-2 text-lg">
                        <Icons.Wand className="w-5 h-5" />
                        Try It Yourself
                    </span>
                </NeonButton>
                <NeonButton 
                  onClick={onGalleryClick}
                  className="!w-auto rounded-full px-8 bg-white/5 border border-white/10 hover:bg-white/10 !bg-none shadow-none hover:shadow-lg hover:shadow-white/5"
                >
                    <span className="flex items-center gap-2 text-lg">
                        <Icons.Gallery className="w-5 h-5" />
                        View Gallery
                    </span>
                </NeonButton>
            </div>
            
            <button className="text-slate-400 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
                <Icons.Play className="w-4 h-4" /> Watch full walkthrough
            </button>
        </div>

      </div>
    </section>
  );
};
