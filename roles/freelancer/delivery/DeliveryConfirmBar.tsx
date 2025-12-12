
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';

interface DeliveryConfirmBarProps {
  totalAssets: number;
  totalCost: number;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const DeliveryConfirmBar = ({ totalAssets, totalCost, onConfirm, isLoading }: DeliveryConfirmBarProps) => {
  return (
    <div className="sticky bottom-0 z-30 bg-[#0e0f14]/90 backdrop-blur-xl border-t border-white/10 p-6">
      <div className="flex items-center justify-between gap-6">
        <div>
           <p className="text-xs text-slate-400 uppercase font-bold mb-1">Total Delivery Cost</p>
           <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-white">{totalCost} Credits</span>
              <span className="text-xs text-slate-500">for {totalAssets} assets</span>
           </div>
        </div>
        
        <div className="w-full max-w-sm">
           <NeonButton 
             onClick={onConfirm} 
             disabled={totalAssets === 0 || isLoading}
             isLoading={isLoading}
             className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 shadow-cyan-900/20"
           >
             <div className="flex items-center justify-center gap-2">
               <Icons.Download className="w-4 h-4" />
               Export & Deliver
             </div>
           </NeonButton>
        </div>
      </div>
    </div>
  );
};
