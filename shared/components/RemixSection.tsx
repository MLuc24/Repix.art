import React from 'react';
import { motion } from 'framer-motion';
import { Icons } from './Icons';

const Button = ({ 
  children, 
  variant = 'primary', 
  className = "",
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }) => {
  const baseStyles = "relative px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 border border-white/10",
    outline: "bg-transparent border border-white/20 text-slate-300 hover:border-violet-500 hover:text-white hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/10",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      )}
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </button>
  );
};

const Section = ({ children, className = "", id, ...props }: React.HTMLAttributes<HTMLElement> & { id?: string }) => (
  <section id={id} className={`py-24 px-6 md:px-12 max-w-[1600px] mx-auto relative ${className}`} {...props}>
    {children}
  </section>
);

export const RemixSection = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <Section id="remix" className="relative">
    <div className="flex flex-col lg:flex-row items-center gap-16">
      {/* Visual - Functional Demo Look */}
      <div className="flex-1 relative w-full h-[500px]">
         <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-fuchsia-600/10 rounded-[32px] border border-white/10 backdrop-blur-sm p-2">
            <div className="w-full h-full bg-[#0a0a0c] rounded-[24px] overflow-hidden relative border border-white/5 flex flex-col">
                {/* Mock Header */}
                <div className="h-14 border-b border-white/10 flex items-center px-6 justify-between bg-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="text-xs font-mono text-slate-500">Remix Studio</div>
                </div>

                {/* Mock Canvas Area */}
                <div className="flex-1 flex relative">
                   {/* Sidebar Tools */}
                   <div className="w-16 border-r border-white/10 flex flex-col items-center py-4 gap-4">
                       <div className="p-2 rounded-lg bg-violet-600/20 text-violet-400"><Icons.Upload className="w-5 h-5"/></div>
                       <div className="p-2 rounded-lg hover:bg-white/5 text-slate-500"><Icons.Wand className="w-5 h-5"/></div>
                       <div className="p-2 rounded-lg hover:bg-white/5 text-slate-500"><Icons.Sliders className="w-5 h-5"/></div>
                   </div>

                   {/* Main Image Area */}
                   <div className="flex-1 relative p-8 flex items-center justify-center">
                        <div className="relative w-full max-w-sm aspect-[4/5] bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl group">
                            {/* Original */}
                            <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover transition-opacity duration-500 absolute inset-0 z-10 group-hover:opacity-0" alt="Original" />
                            {/* Remixed */}
                            <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover absolute inset-0 z-0" alt="Remixed" />
                            
                            {/* Floating Label */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 backdrop-blur border border-white/10 rounded-full text-xs font-bold text-white z-20 transition-all duration-300 group-hover:opacity-0 translate-y-0 group-hover:translate-y-4">
                                Hover to Remix ✨
                            </div>
                             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-violet-600/80 backdrop-blur border border-white/10 rounded-full text-xs font-bold text-white z-20 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                Cyberpunk Style Active
                            </div>
                        </div>

                        {/* Floating Action Badge */}
                        <motion.div 
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-10 right-10 bg-black/80 backdrop-blur border border-violet-500/30 p-4 rounded-xl shadow-xl shadow-violet-900/20 max-w-[160px]"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs font-bold text-slate-300">Generating...</span>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div 
                                    className="h-full bg-violet-500"
                                    animate={{ width: ["0%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>
                        </motion.div>
                   </div>
                </div>
            </div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Icons.Sparkles className="w-3 h-3" /> Core Action
        </div>
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Remix Reality with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">One Click</span>
        </h2>
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
           The heart of Repix. Simply upload your photo, select a premium style, and watch our AI transform it instantly. 
           It's not just a filter—it's a complete reimagination of your image.
        </p>
        
        <div className="space-y-6 mb-10">
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white shrink-0">1</div>
                <div>
                    <h4 className="text-white font-bold mb-1">Upload Photo</h4>
                    <p className="text-slate-400 text-sm">Drag & drop any image. We support JPG, PNG, and WebP.</p>
                </div>
            </div>
            <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white shrink-0">2</div>
                <div>
                    <h4 className="text-white font-bold mb-1">Select Style</h4>
                    <p className="text-slate-400 text-sm">Choose from 50+ pro styles like Cyberpunk, Anime, or Oil Painting.</p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center shadow-lg shadow-violet-600/40 text-white shrink-0">3</div>
                <div>
                    <h4 className="text-white font-bold mb-1">Generate</h4>
                    <p className="text-slate-400 text-sm">Our AI preserves facial details while completely transforming the aesthetic.</p>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-4">
            <Button onClick={onCtaClick} className="px-8 shadow-orange-500/20">
                <Icons.Upload className="w-5 h-5" />
                Start Remixing
            </Button>
            <Button onClick={onCtaClick} variant="outline">
                View Gallery
            </Button>
        </div>
      </div>
    </div>
  </Section>
);
