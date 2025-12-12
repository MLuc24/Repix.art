
import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';

export const ExportCreditReport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("CSV Report Downloaded"); // Mock action
    }, 1500);
  };

  return (
    <button 
      onClick={handleExport}
      disabled={isExporting}
      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1b26] border border-slate-200 dark:border-white/10 hover:border-cyan-500/50 hover:bg-white/5 text-slate-400 hover:text-white transition-all text-xs font-bold disabled:opacity-50"
    >
      {isExporting ? (
        <Icons.Refresh className="w-4 h-4 animate-spin" />
      ) : (
        <Icons.Download className="w-4 h-4" />
      )}
      <span>{isExporting ? 'Generating...' : 'Export CSV'}</span>
    </button>
  );
};
