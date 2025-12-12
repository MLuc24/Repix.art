
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { DeliveryAsset } from './types';

interface DeliveryImageSelectorProps {
  assets: DeliveryAsset[];
  onToggle: (id: string) => void;
  onToggleAll: () => void;
}

export const DeliveryImageSelector = ({ assets, onToggle, onToggleAll }: DeliveryImageSelectorProps) => {
  const selectedCount = assets.filter(a => a.isSelected).length;
  const isAllSelected = selectedCount === assets.length && assets.length > 0;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
          <Icons.Image className="w-4 h-4" /> Assets to Deliver
        </h3>
        <button 
          onClick={onToggleAll}
          className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          {isAllSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto custom-scrollbar pb-20 pr-2">
        {assets.map((asset) => (
          <div 
            key={asset.id}
            onClick={() => onToggle(asset.id)}
            className={`
              group relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all
              ${asset.isSelected 
                ? 'border-cyan-500 ring-2 ring-cyan-500/20' 
                : 'border-transparent hover:border-white/20'
              }
            `}
          >
            <img 
              src={asset.src} 
              alt={asset.name} 
              className={`w-full h-full object-cover transition-all ${asset.isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-80'}`} 
            />
            
            {/* Selection Circle */}
            <div className={`
              absolute top-2 right-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors z-10
              ${asset.isSelected 
                ? 'bg-cyan-500 border-cyan-500' 
                : 'bg-black/40 border-white/30 group-hover:border-white'
              }
            `}>
              {asset.isSelected && <Icons.Check className="w-3.5 h-3.5 text-black" />}
            </div>

            {/* Status Label */}
            <div className="absolute bottom-2 left-2">
               <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${asset.status === 'Approved' ? 'bg-green-500 text-black' : 'bg-slate-700 text-slate-300'}`}>
                 {asset.status}
               </span>
            </div>
          </div>
        ))}
        {/* Add Empty State if 0 assets */}
        {assets.length === 0 && (
           <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500 border border-dashed border-white/10 rounded-xl">
              <p>No approved assets found.</p>
           </div>
        )}
      </div>
    </div>
  );
};
