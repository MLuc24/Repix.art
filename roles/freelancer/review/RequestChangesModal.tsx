
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';

interface RequestChangesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (feedback: string) => void;
}

export const RequestChangesModal = ({ isOpen, onClose, onSubmit }: RequestChangesModalProps) => {
  const [feedback, setFeedback] = useState('');

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white max-w-md">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
           <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
             <Icons.FileText className="w-6 h-6" />
           </div>
           <h3 className="text-xl font-bold text-white">Request Changes</h3>
        </div>
        <p className="text-sm text-slate-400">
          Please describe what changes you'd like the freelancer to make. This will return the project to "In Progress".
        </p>
      </div>

      <textarea 
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="w-full h-32 bg-[#0e0f14] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-600 focus:border-orange-500 outline-none resize-none mb-6"
        placeholder="e.g. The skin tones on the second photo are a bit too red..."
        autoFocus
      />

      <div className="space-y-3">
        <NeonButton 
          onClick={() => onSubmit(feedback)} 
          disabled={!feedback.trim()}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600"
        >
           Submit Request
        </NeonButton>
        <button onClick={onClose} className="w-full py-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </GlassModal>
  );
};
