
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { GlassModal, NeonButton, AuthInput } from '../../../../shared/components/GlassUI';
import { EditorSlider } from '../../../../features/editor/components/EditorUI';

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
}

export const CreateSessionModal = ({ isOpen, onClose, onConfirm }: CreateSessionModalProps) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [minSize, setMinSize] = useState(0);
  const [isPriority, setIsPriority] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleFinish = () => {
    onConfirm({ name, path, minSize, isPriority });
    onClose();
    setStep(1); // Reset
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} className="!bg-[#1a1b26] !border-white/10 text-white max-w-lg">
      
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-white mb-1">New Sync Session</h3>
        <p className="text-xs text-slate-400">Step {step} of 3</p>
      </div>

      {/* Step 1: Source */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in-up">
          <AuthInput 
            label="Session Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="e.g., Project Alpha"
          />
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Local Folder</label>
            <div className="flex gap-2">
              <input 
                readOnly
                value={path}
                placeholder="No folder selected"
                className="flex-1 bg-[#0f0f12] border border-white/10 rounded-xl px-4 py-3 text-sm text-white"
              />
              <button 
                onClick={() => setPath('/Users/Pro/Pictures/Selected_Folder')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-colors"
              >
                Browse
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Filters */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in-up">
           <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">File Types</label>
              <div className="flex gap-2">
                 {['RAW', 'JPG', 'PNG', 'WEBP'].map(type => (
                   <button key={type} className="px-3 py-1.5 rounded-lg bg-violet-600/20 border border-violet-500 text-violet-300 text-xs font-bold">{type}</button>
                 ))}
                 <button className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-500 text-xs hover:text-white">+</button>
              </div>
           </div>

           <div className="pt-2">
              <EditorSlider 
                label={`Ignore files smaller than ${minSize} MB`} 
                value={minSize} 
                max={100} 
                onChange={setMinSize} 
              />
           </div>

           <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
              <span className="text-sm font-medium text-slate-300">Exclude Screenshots</span>
              <div className="w-8 h-4 bg-green-500 rounded-full p-0.5"><div className="w-3 h-3 bg-white rounded-full translate-x-4" /></div>
           </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="space-y-6 animate-fade-in-up">
           <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Name</span> <span className="text-white font-bold">{name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Path</span> <span className="text-white truncate max-w-[200px]">{path}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Filters</span> <span className="text-white">Custom ({minSize}MB+)</span></div>
           </div>

           {/* Monetization Hook */}
           <div 
             onClick={() => setIsPriority(!isPriority)}
             className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${isPriority ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/5 hover:border-white/10'}`}
           >
              <div className={`p-2 rounded-lg ${isPriority ? 'bg-amber-500 text-black' : 'bg-white/10 text-slate-500'}`}>
                 <Icons.Zap className="w-4 h-4" />
              </div>
              <div>
                 <h4 className={`text-sm font-bold ${isPriority ? 'text-amber-400' : 'text-slate-300'}`}>Enable Priority Sync</h4>
                 <p className="text-[10px] text-slate-500">Faster upload queue. Costs 1 Credit.</p>
              </div>
              {isPriority && <Icons.Check className="w-4 h-4 text-amber-400 ml-auto" />}
           </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex gap-3 mt-8 pt-6 border-t border-white/10">
        {step > 1 && (
          <button onClick={handleBack} className="px-6 py-3 rounded-xl bg-white/5 text-slate-400 hover:text-white font-bold text-sm transition-colors">
            Back
          </button>
        )}
        <NeonButton onClick={step === 3 ? handleFinish : handleNext} className="w-full">
          {step === 3 ? (isPriority ? 'Start Session (1 Credit)' : 'Start Session') : 'Next Step'}
        </NeonButton>
      </div>

    </GlassModal>
  );
};
