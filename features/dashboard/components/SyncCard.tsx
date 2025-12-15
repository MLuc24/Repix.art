import React from 'react';
import { Icons } from '../../../shared/components/Icons';

export const SyncCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="px-4 mb-4 mt-auto">
      <button 
        onClick={onClick}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-lg shadow-violet-500/25 flex items-center justify-center gap-2 transition-all active:scale-95"
      >
        <Icons.Smartphone className="w-5 h-5" />
        Sync from Phone
      </button>
    </div>
  );
};
