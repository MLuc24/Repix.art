import React, { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Icons } from './Icons';

const FEATURES = [
  {
    id: "txt2img",
    title: "Text to Image",
    desc: "Turn your words into stunning artwork with advanced AI generation.",
    icon: <Icons.Type />, // Assuming Icons.Type exists or I need to find a suitable one. Let's check Icons.tsx first.
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "img2img",
    title: "Image to Image",
    desc: "Redraw and transform existing photos into completely new styles.",
    icon: <Icons.Image />,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "enhance",
    title: "AI Enhance",
    desc: "Upscale, denoise, and fix lighting instantly with smart enhancement.",
    icon: <Icons.Bolt />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "remix",
    title: "Style Remix",
    desc: "Apply premium artistic presets like Cyberpunk, Anime, or Oil Painting.",
    icon: <Icons.Sparkles />,
    color: "from-orange-400 to-amber-400",
  },
];

const TiltCard = ({ feature, index }: { feature: typeof FEATURES[0], index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left);
    const mouseY = (e.clientY - rect.top);

    const rX = (mouseY / height - 0.5) * -25; // Rotate X based on Y axis movement
    const rY = (mouseX / width - 0.5) * 25;   // Rotate Y based on X axis movement

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-full w-full rounded-3xl bg-gradient-to-br from-white/10 to-white/0 border border-white/10 p-1 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-500/20 group cursor-pointer"
    >
      {/* Background with Depth */}
      <div className="absolute inset-0 rounded-3xl bg-black/40 border border-white/10 opacity-100 backdrop-blur-md" style={{ transform: "translateZ(-50px)" }} />
      
      {/* Main Content Content */}
      <div className="relative h-full w-full rounded-[20px] bg-transparent p-8 overflow-hidden flex flex-col items-start" style={{ transform: "translateZ(20px)" }}>
        
        {/* Spotlight Gradient - Follows simplified logic or fixed */}
        <div className={`absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br ${feature.color} opacity-20 blur-[80px] group-hover:opacity-40 transition-opacity duration-500 rounded-full pointer-events-none`} />

        {/* 3D Elements */}
        <div className="relative z-10 flex flex-col h-full items-start text-left w-full">
            <div 
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/50 ring-2 ring-white/10 group-hover:scale-110 transition-transform duration-300`} 
              style={{ transform: "translateZ(50px)" }}
            >
                  {React.cloneElement(feature.icon as React.ReactElement<any>, { width: 32, height: 32 })}
            </div>
            
            <h3 className="text-2xl font-black text-white mb-3 tracking-wide drop-shadow-lg" style={{ transform: "translateZ(40px)" }}>{feature.title}</h3>
            <p className="text-slate-300 font-medium leading-relaxed mb-6 drop-shadow-md" style={{ transform: "translateZ(30px)" }}>{feature.desc}</p>
            
            {/* Action text */}
            <div className="mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-sm font-bold text-white uppercase tracking-wider drop-shadow-lg" style={{ transform: "translateZ(30px)" }}>
                Try now <Icons.ArrowRight className="w-4 h-4" />
            </div>

            {/* Visual Decorative Lines */}
            <div className="mt-auto pt-8 flex gap-2 w-full">
                 <div className="h-1 flex-1 rounded-full bg-white/20 overflow-hidden shadow-inner">
                     <div className={`h-full w-0 group-hover:w-full bg-gradient-to-r ${feature.color} transition-all duration-700 ease-out shadow-[0_0_10px_rgba(255,255,255,0.5)]`} />
                 </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Features3D = () => {
  return (
    <section id="features" className="py-32 relative">
      <div className="text-center mb-20">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6"
         >
           <Icons.Bolt className="w-3 h-3" /> Core Engine
         </motion.div>
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           viewport={{ once: true }}
           className="text-4xl md:text-6xl font-black mb-6"
         >
           Powerful <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Capabilities</span>
         </motion.h2>
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           viewport={{ once: true }}
           className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
         >
           Everything you need to create stunning visuals, powered by next-gen AI.
         </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-[1600px] mx-auto">
         {FEATURES.map((feature, i) => (
             <motion.div 
               key={feature.id}
               initial={{ opacity: 0, y: 50, rotateX: -10 }}
               whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
               transition={{ duration: 0.6, delay: i * 0.1 }}
               viewport={{ once: true }}
               className="h-[400px] perspective-1000"
             >
                <TiltCard feature={feature} index={i} />
             </motion.div>
         ))}
      </div>
    </section>
  );
};
