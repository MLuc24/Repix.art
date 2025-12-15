import React from 'react';
import { GlassModal } from '../../../shared/components/GlassUI';

interface ClassificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (type: string) => void;
}

export const ClassificationModal = ({ isOpen, onClose, onConfirm }: ClassificationModalProps) => {
  return (
      <GlassModal isOpen={isOpen} onClose={onClose}>
         <div className="p-6 max-w-sm mx-auto">
             <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Change Classification</h3>
             <div className="grid grid-cols-2 gap-3">
                 {[
                    { id: 'upload', label: 'Upload', color: 'blue' },
                    { id: 'remix', label: 'AI Remix', color: 'fuchsia' },
                    { id: 'generated', label: 'Generated', color: 'violet' },
                    { id: 'export', label: 'Export', color: 'green' }
                 ].map(type => (
                     <button 
                        key={type.id}
                        onClick={() => {
                            onConfirm(type.id);
                            onClose();
                        }}
                        className={`p-4 rounded-xl border border-${type.color}-500/30 bg-${type.color}-500/10 hover:bg-${type.color}-500/20 text-${type.color}-500 font-bold transition-all`}
                     >
                        {type.label}
                     </button>
                 ))}
             </div>
         </div>
      </GlassModal>
  );
};
