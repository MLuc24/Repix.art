
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { ReviewAsset } from '../../../services/mock/review';

interface ReviewImageGridProps {
  assets: ReviewAsset[];
  onOpenAsset: (asset: ReviewAsset) => void;
}

export const ReviewImageGrid = ({ assets, onOpenAsset }: ReviewImageGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {assets.map((asset) => (
        <div 
          key={asset.id}
          onClick={() => onOpenAsset(asset)}
          className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1a1b26] border border-white/5 hover:border-violet-500/50 cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-1"
        >
          <img src={asset.src} alt={asset.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
             {asset.status === 'approved' && (
               <span className="px-2 py-1 rounded-lg bg-green-500 text-white text-[10px] font-bold uppercase shadow-lg flex items-center gap-1">
                 <Icons.Check className="w-3 h-3" /> Approved
               </span>
             )}
             {asset.status === 'rejected' && (
               <span className="px-2 py-1 rounded-lg bg-red-500 text-white text-[10px] font-bold uppercase shadow-lg flex items-center gap-1">
                 <Icons.Close className="w-3 h-3" /> Changes
               </span>
             )}
             {asset.status === 'pending' && (
               <span className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur border border-white/10 text-white text-[10px] font-bold uppercase shadow-lg">
                 Pending
               </span>
             )}
          </div>

          {/* Comment Count Badge */}
          {asset.commentCount > 0 && (
            <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-violet-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-lg">
               <Icons.FileText className="w-3 h-3" /> {asset.commentCount}
            </div>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[1px]">
             <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center text-white mb-2">
                <Icons.Eye className="w-6 h-6" />
             </div>
             <p className="text-white text-xs font-bold">Click to Review</p>
          </div>
          
          {/* Footer Label */}
          <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/90 to-transparent">
             <p className="text-xs font-medium text-white truncate">{asset.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
