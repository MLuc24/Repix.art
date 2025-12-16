/**
 * QuickReviewControls Component
 * R4.11 — TEAM BATCH EDIT & REVIEW MODE
 * 
 * Quick review mode controls: Edit/Review toggle, navigation, approve/reject.
 */

import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import type { QuickReviewControlsProps } from '../types';

export const QuickReviewControls: React.FC<QuickReviewControlsProps> = ({
  isReviewMode,
  onToggleReview,
  currentIndex,
  totalImages,
  onNext,
  onPrevious,
  onApprove,
  onReject,
  onAddComment,
}) => {
  return (
    <div className="flex items-center gap-3">
      {/* Edit/Review Mode Toggle */}
      <div className="inline-flex items-center bg-black/30 rounded-lg p-1 border border-white/5">
        <button
          onClick={onToggleReview}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
            !isReviewMode
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Icons.Pencil className="w-3.5 h-3.5" />
          Edit
        </button>
        <button
          onClick={onToggleReview}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
            isReviewMode
              ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Icons.Eye className="w-3.5 h-3.5" />
          Review
        </button>
      </div>

      {/* Review Mode Controls */}
      {isReviewMode && (
        <>
          <div className="h-6 w-px bg-white/10" />

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevious}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all text-slate-300"
              title="Previous"
            >
              <Icons.ChevronLeft className="w-4 h-4" />
            </button>

            <span className="text-xs text-slate-400 font-medium min-w-[60px] text-center">
              {currentIndex + 1} / {totalImages}
            </span>

            <button
              onClick={onNext}
              disabled={currentIndex === totalImages - 1}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-all text-slate-300"
              title="Next"
            >
              <Icons.ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="h-6 w-px bg-white/10" />

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onReject}
              className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 hover:border-rose-500/50 text-rose-300 hover:text-rose-200 text-xs font-medium transition-all flex items-center gap-1.5"
            >
              <Icons.Close className="w-3.5 h-3.5" />
              Reject
            </button>

            <button
              onClick={onAddComment}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
              title="Add Comment"
            >
              <Icons.MessageSquare className="w-4 h-4" />
            </button>

            <button
              onClick={onApprove}
              className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-300 hover:text-emerald-200 text-xs font-medium transition-all flex items-center gap-1.5"
            >
              <Icons.Check className="w-3.5 h-3.5" />
              Approve
            </button>
          </div>
        </>
      )}
    </div>
  );
};
