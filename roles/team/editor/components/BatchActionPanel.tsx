/**
 * BatchActionPanel Component
 * R4.11 — TEAM BATCH EDIT & REVIEW MODE
 * 
 * Quick actions panel for batch operations: preset, background, remix, export.
 */

import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import type { BatchActionPanelProps } from '../types';

export const BatchActionPanel: React.FC<BatchActionPanelProps> = ({
  selectedCount,
  onApplyPreset,
  onApplyBackground,
  onApplyRemix,
  onExportBatch,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-36 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-[#1a1b1e]/95 backdrop-blur-xl border border-violet-500/30 rounded-2xl shadow-2xl shadow-violet-500/20 p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center">
              <span className="text-xs text-white font-bold">{selectedCount}</span>
            </div>
            <span className="text-sm text-slate-200 font-medium">Batch Actions</span>
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onApplyPreset}
            className="group flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-violet-600/20 border border-white/5 hover:border-violet-500/50 transition-all"
          >
            <Icons.Wand className="w-5 h-5 text-violet-400 group-hover:text-violet-300" />
            <span className="text-xs text-slate-300 group-hover:text-white font-medium">
              Apply Preset
            </span>
          </button>

          <button
            onClick={onApplyBackground}
            className="group flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-teal-600/20 border border-white/5 hover:border-teal-500/50 transition-all"
          >
            <Icons.Image className="w-5 h-5 text-teal-400 group-hover:text-teal-300" />
            <span className="text-xs text-slate-300 group-hover:text-white font-medium">
              Background
            </span>
          </button>

          <button
            onClick={onApplyRemix}
            className="group flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-amber-600/20 border border-white/5 hover:border-amber-500/50 transition-all"
          >
            <Icons.Sparkles className="w-5 h-5 text-amber-400 group-hover:text-amber-300" />
            <span className="text-xs text-slate-300 group-hover:text-white font-medium">
              Remix Style
            </span>
          </button>

          <button
            onClick={onExportBatch}
            className="group flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 hover:bg-emerald-600/20 border border-white/5 hover:border-emerald-500/50 transition-all"
          >
            <Icons.Download className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300" />
            <span className="text-xs text-slate-300 group-hover:text-white font-medium">
              Export All
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
