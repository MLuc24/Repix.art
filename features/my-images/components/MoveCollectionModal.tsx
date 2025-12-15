import React from 'react';
import { GlassModal } from '../../../shared/components/GlassUI';
import { Icons } from '../../../shared/components/Icons';
import { AssetFolder } from '../types';

interface MoveCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (folderId: string) => void;
  folders: AssetFolder[];
}

export const MoveCollectionModal = ({ isOpen, onClose, onConfirm, folders }: MoveCollectionModalProps) => {
  return (
      <GlassModal isOpen={isOpen} onClose={onClose}>
         <div className="p-6 max-w-sm mx-auto">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Move to Collection</h3>
             <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                 {folders.map(f => (
                     <button 
                        key={f.id}
                        onClick={() => {
                            onConfirm(f.id);
                            onClose();
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 text-left transition-colors"
                     >
                        <Icons.Image className="w-4 h-4 opacity-50" />
                        <span className="font-medium">{f.name}</span>
                     </button>
                 ))}
             </div>
         </div>
      </GlassModal>
  );
};
