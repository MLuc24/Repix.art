
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';

export const CustomBackgroundUploader = () => {
  const [customBgs, setCustomBgs] = useState<string[]>([]);

  const handleUpload = () => {
    // Mock upload
    const newBg = `https://images.unsplash.com/photo-${Math.random() > 0.5 ? '1578301978693-85ea9ec2a20c' : '1555529669-e69e7aa0ba9a'}?auto=format&fit=crop&w=400&q=80`;
    setCustomBgs([...customBgs, newBg]);
  };

  return (
    <div className="mt-8 pt-6 border-t border-white/10">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">My Backgrounds</h3>
      
      <div className="grid grid-cols-4 gap-3">
         {/* Upload Button */}
         <button 
           onClick={handleUpload}
           className="aspect-square rounded-xl border border-dashed border-white/10 hover:border-violet-500/50 hover:bg-white/5 flex flex-col items-center justify-center gap-1 transition-all group"
         >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-violet-500/20 text-slate-400 group-hover:text-violet-400 transition-colors">
               <Icons.Plus className="w-4 h-4" />
            </div>
            <span className="text-[9px] font-bold text-slate-500 group-hover:text-slate-300">Upload</span>
         </button>

         {/* Local List */}
         {customBgs.map((src, i) => (
           <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-white/5">
              <img src={src} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button className="p-1.5 rounded-full bg-white text-black hover:scale-110 transition-transform">
                    <Icons.Check className="w-3 h-3" />
                 </button>
              </div>
           </div>
         ))}
      </div>
      <p className="text-[10px] text-slate-600 mt-2">Local uploads are not synced to cloud.</p>
    </div>
  );
};
