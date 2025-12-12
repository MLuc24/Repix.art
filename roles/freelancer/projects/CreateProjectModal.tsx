
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton, AuthInput } from '../../../shared/components/GlassUI';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { projectName: string; clientName: string; clientEmail: string; status: string }) => void;
}

export const CreateProjectModal = ({ isOpen, onClose, onConfirm }: CreateProjectModalProps) => {
  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [status, setStatus] = useState('Draft');

  const handleSubmit = () => {
    if (!projectName || !clientName) return;
    onConfirm({ projectName, clientName, clientEmail, status });
    // Reset form
    setProjectName('');
    setClientName('');
    setClientEmail('');
    setStatus('Draft');
    onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white max-w-md">
      <div className="text-center mb-6">
        <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400">
           <Icons.Briefcase className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">New Client Project</h3>
        <p className="text-xs text-slate-400">Set up a workspace for your job.</p>
      </div>

      <div className="space-y-4 mb-8">
        <AuthInput 
          label="Project Name" 
          value={projectName} 
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="e.g. Summer Campaign"
        />
        
        <AuthInput 
          label="Client Name" 
          value={clientName} 
          onChange={(e) => setClientName(e.target.value)}
          placeholder="e.g. Alice Marketing"
        />

        <AuthInput 
          label="Client Email (Optional)" 
          value={clientEmail} 
          onChange={(e) => setClientEmail(e.target.value)}
          placeholder="contact@client.com"
          type="email"
        />

        <div className="space-y-2">
           <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Initial Status</label>
           <div className="grid grid-cols-3 gap-2">
              {['Draft', 'In Review', 'Approved'].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`py-2 rounded-lg text-xs font-bold border transition-all ${status === s ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300' : 'bg-white/5 border-transparent text-slate-500 hover:text-white'}`}
                >
                  {s}
                </button>
              ))}
           </div>
        </div>
      </div>

      <div className="flex gap-3">
         <button onClick={onClose} className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-sm font-bold transition-colors">
           Cancel
         </button>
         <NeonButton onClick={handleSubmit} disabled={!projectName || !clientName} className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600">
           Create Project
         </NeonButton>
      </div>
    </GlassModal>
  );
};
