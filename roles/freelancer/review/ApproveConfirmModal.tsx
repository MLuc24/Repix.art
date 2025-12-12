
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';

interface ApproveConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ApproveConfirmModal = ({ isOpen, onClose, onConfirm }: ApproveConfirmModalProps) => {
  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white max-w-sm">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-4 text-green-500">
           <Icons.Check className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Approve Project?</h3>
        <p className="text-sm text-slate-400">
          This will notify the freelancer that you are happy with all assets. The project will be marked as "Approved".
        </p>
      </div>

      <div className="space-y-3">
        <NeonButton onClick={onConfirm} className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
           Yes, Approve All
        </NeonButton>
        <button onClick={onClose} className="w-full py-3 text-xs font-bold text-slate-500 hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </GlassModal>
  );
};
