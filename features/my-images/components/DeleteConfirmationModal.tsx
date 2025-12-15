import React from 'react';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';
import { Icons } from '../../../shared/components/Icons';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, title }: DeleteConfirmationModalProps) => {
  return (
      <GlassModal isOpen={isOpen} onClose={onClose}>
         <div className="p-6 text-center max-w-sm mx-auto">
             <div className="w-16 h-16 bg-red-100 dark:bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Icons.Trash className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
               {title}
             </h3>
             <p className="text-slate-500 dark:text-slate-400 mb-6">This action cannot be undone.</p>
             <div className="flex gap-3">
                 <button onClick={onClose} className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5">Cancel</button>
                 <NeonButton onClick={onConfirm} className="flex-1 !w-auto bg-red-500 hover:bg-red-600 shadow-red-500/20">Delete</NeonButton>
             </div>
         </div>
      </GlassModal>
  );
};
