/**
 * EditorSaveActions
 * R4.10 — TEAM EDITOR CONTEXT (FOUNDATION)
 * 
 * Thay thế nút "Save" đơn giản bằng:
 * - Save Draft
 * - Mark Ready for Review
 * - Save & Handoff (trả ảnh về Project Grid)
 */

import React, { useState } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import type { EditorSaveActionsProps } from '../types';

export const EditorSaveActions: React.FC<EditorSaveActionsProps> = ({
  onSaveDraft,
  onMarkReady,
  onSaveAndHandoff,
  isSaving = false,
  currentStatus = 'editing',
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleAction = async (action: string, callback?: () => void) => {
    setActionLoading(action);
    try {
      callback?.();
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 500));
    } finally {
      setActionLoading(null);
      setShowDropdown(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Save Draft Button */}
      <button
        onClick={() => handleAction('draft', onSaveDraft)}
        disabled={isSaving || actionLoading !== null}
        className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-300 hover:text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {actionLoading === 'draft' ? (
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        ) : (
          <Icons.Download className="w-4 h-4" />
        )}
        <span className="hidden md:inline">Save Draft</span>
      </button>

      {/* Primary Action - Based on current status */}
      {currentStatus === 'editing' ? (
        <button
          onClick={() => handleAction('ready', onMarkReady)}
          disabled={isSaving || actionLoading !== null}
          className="flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg text-white text-sm font-semibold transition-all shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {actionLoading === 'ready' ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Icons.Check className="w-4 h-4" />
          )}
          <span>Mark Ready</span>
        </button>
      ) : currentStatus === 'ready' ? (
        <button
          onClick={() => handleAction('handoff', onSaveAndHandoff)}
          disabled={isSaving || actionLoading !== null}
          className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 rounded-lg text-white text-sm font-semibold transition-all shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {actionLoading === 'handoff' ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Icons.Share className="w-4 h-4" />
          )}
          <span>Save & Handoff</span>
        </button>
      ) : (
        <button
          onClick={() => handleAction('handoff', onSaveAndHandoff)}
          disabled={isSaving || actionLoading !== null}
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {actionLoading === 'handoff' ? (
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Icons.Check className="w-4 h-4" />
          )}
          <span>Complete & Handoff</span>
        </button>
      )}

      {/* More Actions Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-all"
        >
          <Icons.MoreVertical className="w-4 h-4" />
        </button>

        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-[9998]"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1b26] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[9999] animate-fade-in-up">
              <div className="p-1">
                <button
                  onClick={() => handleAction('draft', onSaveDraft)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icons.Download className="w-4 h-4 text-slate-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Save Draft</p>
                    <p className="text-[10px] text-slate-500">Keep working on this later</p>
                  </div>
                </button>

                <button
                  onClick={() => handleAction('ready', onMarkReady)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icons.Check className="w-4 h-4 text-teal-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Mark Ready for Review</p>
                    <p className="text-[10px] text-slate-500">Request team review</p>
                  </div>
                </button>

                <div className="my-1 border-t border-white/5" />

                <button
                  onClick={() => handleAction('handoff', onSaveAndHandoff)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icons.Share className="w-4 h-4 text-violet-400" />
                  <div className="text-left">
                    <p className="text-sm font-medium">Save & Handoff</p>
                    <p className="text-[10px] text-slate-500">Return image to Project Grid</p>
                  </div>
                </button>
              </div>

              <div className="border-t border-white/5 p-2 bg-white/5">
                <p className="text-[10px] text-slate-500 text-center">
                  Handoff makes image visible in Project
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditorSaveActions;
