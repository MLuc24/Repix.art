/**
 * BatchEditToggle Component
 * R4.11 — TEAM BATCH EDIT & REVIEW MODE
 * 
 * Toggle between Single Edit and Batch Edit modes.
 */

import React from 'react';
import type { BatchEditToggleProps } from '../types';

export const BatchEditToggle: React.FC<BatchEditToggleProps> = ({
  mode,
  onModeChange,
}) => {
  return (
    <div className="inline-flex items-center bg-black/30 rounded-lg p-1 border border-white/5">
      <button
        onClick={() => onModeChange('single')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
          mode === 'single'
            ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        Single Edit
      </button>
      <button
        onClick={() => onModeChange('batch')}
        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
          mode === 'batch'
            ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
            : 'text-slate-400 hover:text-white hover:bg-white/5'
        }`}
      >
        Batch Edit
      </button>
    </div>
  );
};
