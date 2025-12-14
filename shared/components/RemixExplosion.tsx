import React, { useRef } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';

const EXPLOSION_ITEMS = [
  // 1. Left Top (Square Box)
  { src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80", x: -550, y: -280, rotate: -15, scale: 1.1, type: 'Cyberpunk' },
  // 2. Left Middle (Bag)
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80", x: -650, y: 20, rotate: -5, scale: 0.9, type: 'Original' },
  // 3. Left Bottom (Bottle)
  { src: "https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&w=400&q=80", x: -400, y: 320, rotate: 10, scale: 1.0, type: 'Anime' },
  
  // 4. Right Top (White Bottle)
  { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80", x: 450, y: -300, rotate: 15, scale: 1.0, type: '3D Render' },
  // 5. Right Middle (Small Box)
  { src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=400&q=80", x: 650, y: -100, rotate: 5, scale: 0.7, type: 'Packaging' },
  // 6. Right Bottom (Tube)
  { src: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80", x: 500, y: 200, rotate: -8, scale: 1.1, type: 'Oil Paint' },
  // 7. Right Bottom Center (Tub)
  { src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80", x: 200, y: 350, rotate: -3, scale: 0.8, type: 'Product' },
];

export const RemixExplosion = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for less "jerky" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001
  });

  // Animation Maps
  // Reduced scroll distance needed for effect by shortening container height in CSS
  const coverOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const coverScale = useTransform(smoothProgress, [0, 0.2], [1, 0.5]);

  // Content Text
  const textOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  const textScale = useTransform(smoothProgress, [0.1, 0.3], [0.9, 1]);
  const textY = useTransform(smoothProgress, [0.1, 0.3], [30, 0]);

  return (
    // Reduced height to 180vh to make it faster/smoother to scroll through
    <div id="remix" ref={containerRef} className="h-[180vh] relative z-20">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* CENTER CONTENT */}
        <motion.div 
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="relative z-30 text-center max-w-4xl px-4 pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white font-medium text-sm mb-6 backdrop-blur-md">
            <span>✨</span> One Click Magic
          </div>
          <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tight leading-tight">
            Remix Reality.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              Instantly.
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
             Don't just edit—transform. Apply stunning artistic styles like Cyberpunk, Anime, and Oil Painting instantly.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-transparent border border-white/20 hover:border-violet-500 hover:bg-violet-500/10 text-white font-bold rounded-xl text-lg transition-colors pointer-events-auto cursor-pointer"
          >
            Try Remix Free
          </motion.button>
        </motion.div>

        {/* EXPLODING ITEMS */}
        {EXPLOSION_ITEMS.map((item, idx) => {
           // Smoother expansion 0 -> 0.5
           const x = useTransform(smoothProgress, [0, 0.5], [0, item.x]);
           const y = useTransform(smoothProgress, [0, 0.5], [0, item.y]);
           const rotate = useTransform(smoothProgress, [0, 0.5], [0, item.rotate]);
           const opacity = useTransform(smoothProgress, [0, 0.15], [0, 1]);
           const scale = useTransform(smoothProgress, [0, 0.5], [0.5, item.scale]);

           return (
             <motion.div
               key={idx}
               style={{ x, y, rotate, opacity, scale }}
               className="will-change-transform absolute w-[200px] md:w-[260px] aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 bg-[#1a1b26]"
             >
                <img src={item.src} className="w-full h-full object-cover" alt={item.type} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
             </motion.div>
           );
        })}

        {/* INITIAL COVER IMAGE */}
        <motion.div 
           style={{ opacity: coverOpacity, scale: coverScale }}
           className="will-change-transform absolute z-40 w-[240px] md:w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border-4 border-white/10 bg-[#1a1b26] flex items-center justify-center cursor-pointer"
        >
           <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Cover" />
           <div className="absolute inset-0 bg-black/20" />
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-bold whitespace-nowrap">
             Scroll to Remix 🖱️
           </div>
        </motion.div>

      </div>
    </div>
  );
};
