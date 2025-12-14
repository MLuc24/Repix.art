import React from 'react';

const WALL_IMAGES = [
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80",
];

const Column = ({ images, speed = 30, direction = 'up', className = "" }: { images: string[], speed?: number, direction?: 'up'|'down', className?: string }) => {
  // Triple the images to ensure smooth loop coverage
  const loopImages = [...images, ...images, ...images]; 

  return (
    <div className={`relative overflow-hidden h-screen pointer-events-none ${className}`}>
        {/* Gradient Masks */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020617] to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020617] to-transparent z-10" />
        
        <div className="flex flex-col gap-5 animate-scroll-up" style={{ animationDuration: `${speed}s`, animationDirection: direction === 'down' ? 'reverse' : 'normal' }}>
            {loopImages.map((src, i) => (
                <div key={i} className="w-full aspect-[3/4] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/5 opacity-50 hover:opacity-100 transition-opacity">
                    <img src={src} className="w-full h-full object-cover" alt="Art" />
                </div>
            ))}
        </div>
    </div>
  );
};

export const LandingMarquee = () => {
  return (
    <>
      {/* Left Columns */}
      <div className="fixed left-0 top-0 bottom-0 w-[400px] z-0 hidden 2xl:flex gap-6 p-6">
         <Column images={WALL_IMAGES.slice(0, 4)} speed={45} className="w-1/2 mt-12" />
         <Column images={WALL_IMAGES.slice(4, 8)} speed={35} className="w-1/2" direction="down" />
      </div>

       {/* Right Columns */}
      <div className="fixed right-0 top-0 bottom-0 w-[400px] z-0 hidden 2xl:flex gap-6 p-6">
         <Column images={WALL_IMAGES.slice(2, 6)} speed={38} className="w-1/2" direction="down" />
         <Column images={WALL_IMAGES.slice(5, 9)} speed={50} className="w-1/2 mt-20" />
      </div>
    </>
  );
};
