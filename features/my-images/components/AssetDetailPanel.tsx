
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { AssetItem } from '../types';

interface AssetDetailPanelProps {
  asset: AssetItem | null;
  onClose: () => void;
  onAction: (action: string) => void;
  isPro?: boolean;
}

export const AssetDetailPanel = ({ asset, onClose, onAction, isPro }: AssetDetailPanelProps) => {
  if (!asset) return null;

  return (
    <div className="w-full h-full md:w-80 bg-white dark:bg-[#131418] border-l border-slate-200 dark:border-white/5 flex flex-col overflow-y-auto animate-fade-in-up shadow-2xl z-40 fixed right-0 top-0 md:relative md:top-auto md:right-auto md:z-auto transition-colors">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/5">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Asset Details</h3>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
          <Icons.Close className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Preview */}
        <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/10 relative group">
           <img src={asset.src} className="w-full h-full object-contain" />
           {asset.isPro && (
             <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500 text-black text-[9px] font-bold rounded uppercase shadow-sm">
               Pro Quality
             </div>
           )}
        </div>

        {/* Primary Actions */}
        <div className="grid grid-cols-2 gap-3">
           <NeonButton onClick={() => onAction('edit')} className="w-full !py-2 text-xs">
             Open Editor
           </NeonButton>
           <button 
             onClick={() => onAction('remix')}
             className="w-full py-2 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 text-xs font-bold transition-colors"
           >
             Remix
           </button>
        </div>

        {/* Metadata */}
        <div className="space-y-4">
           <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 space-y-3">
              <div className="flex justify-between text-xs">
                 <span className="text-slate-500">Dimensions</span>
                 <span className="text-slate-900 dark:text-white font-mono">{asset.meta.width} x {asset.meta.height}</span>
              </div>
              <div className="flex justify-between text-xs">
                 <span className="text-slate-500">Created</span>
                 <span className="text-slate-900 dark:text-white">{new Date(asset.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-xs">
                 <span className="text-slate-500">Type</span>
                 <span className="text-slate-900 dark:text-white capitalize">{asset.source}</span>
              </div>
              {asset.meta.size && (
                <div className="flex justify-between text-xs">
                   <span className="text-slate-500">File Size</span>
                   <span className="text-slate-900 dark:text-white">{asset.meta.size}</span>
                </div>
              )}
              {asset.meta.credits && (
                <div className="flex justify-between text-xs border-t border-slate-200 dark:border-white/10 pt-2">
                   <span className="text-slate-500">Cost</span>
                   <span className="text-violet-600 dark:text-violet-400 font-bold">{asset.meta.credits} Credits</span>
                </div>
              )}
           </div>
        </div>

        {/* Pro Features */}
        {isPro && (
          <div className="space-y-2">
             <label className="text-xs font-bold text-slate-500 uppercase">Tags</label>
             <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] text-slate-600 dark:text-slate-400">Portrait</span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-[10px] text-slate-600 dark:text-slate-400">Studio</span>
                <button className="px-2 py-1 rounded border border-dashed border-slate-300 dark:border-slate-600 text-[10px] text-slate-500 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-colors">
                  + Add
                </button>
             </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="mt-auto p-4 border-t border-slate-200 dark:border-white/5">
         <button 
           onClick={() => onAction('delete')}
           className="w-full py-2 flex items-center justify-center gap-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
         >
           <Icons.Trash className="w-3.5 h-3.5" /> Delete Asset
         </button>
      </div>

    </div>
  );
};
