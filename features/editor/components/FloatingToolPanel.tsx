
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface FloatingToolPanelProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export const FloatingToolPanel = ({ title, onClose, children }: FloatingToolPanelProps) => {
  return (
    <div className="absolute top-4 left-4 w-80 max-h-[85vh] flex flex-col bg-[#0e0f13]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 animate-fade-in-up overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <Icons.Close className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {children}
      </div>
    </div>
  );
};
