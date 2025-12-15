import React from 'react';
import { GlassModal } from '../../../shared/components/GlassUI';
import { Icons } from '../../../shared/components/Icons';

interface SyncSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (option: 'phone' | 'computer') => void;
}

export const SyncSelectionModal = ({ isOpen, onClose, onSelect }: SyncSelectionModalProps) => {
  return (
      <GlassModal isOpen={isOpen} onClose={onClose}>
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sync Source</h2>
            <p className="text-slate-500 dark:text-slate-400">Where would you like to import photos from?</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <button 
                onClick={() => {
                    onClose();
                    onSelect('phone');
                }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-violet-50 dark:hover:bg-violet-600/20 hover:border-violet-500 hover:shadow-lg transition-all group"
            >
                <div className="w-16 h-16 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icons.Smartphone className="w-8 h-8 text-violet-500" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h3>
                <p className="text-xs text-slate-500 text-center">Scan QR to connect</p>
            </button>
            <button 
                onClick={() => {
                    onClose();
                    onSelect('computer');
                }}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-blue-50 dark:hover:bg-blue-600/20 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
                <div className="w-16 h-16 rounded-full bg-white dark:bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icons.Layout className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-1">Computer</h3>
                <p className="text-xs text-slate-500 text-center">Local folders</p>
            </button>
        </div>
      </GlassModal>
  );
};
