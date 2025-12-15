/**
 * BatchFilmstrip Component
 * R4.11 — TEAM BATCH EDIT & REVIEW MODE
 * 
 * Bottom filmstrip with multi-select checkboxes for batch editing.
 */

import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import type { BatchFilmstripProps } from '../types';

export const BatchFilmstrip: React.FC<BatchFilmstripProps> = ({
  images,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onDeselectAll,
  onImageClick,
}) => {
  const selectedCount = selectedIds.length;
  const allSelected = selectedCount === images.length && images.length > 0;

  return (
    <div className="h-32 bg-[#0e0f13]/95 backdrop-blur-xl border-t border-white/5 flex flex-col">
      {/* Toolbar */}
      <div className="h-10 flex-none flex items-center justify-between px-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">
            {selectedCount > 0 ? (
              <>
                <span className="text-violet-400 font-semibold">{selectedCount}</span> selected
              </>
            ) : (
              `${images.length} images`
            )}
          </span>

          {selectedCount > 0 && (
            <>
              <div className="w-px h-4 bg-white/10" />
              <button
                onClick={onDeselectAll}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Deselect All
              </button>
            </>
          )}
        </div>

        <button
          onClick={allSelected ? onDeselectAll : onSelectAll}
          className="text-xs text-violet-400 hover:text-violet-300 transition-colors font-medium"
        >
          {allSelected ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {/* Filmstrip */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="h-full flex items-center gap-2 px-4 py-2">
          {images.map((image) => {
            const isSelected = selectedIds.includes(image.id);
            return (
              <div
                key={image.id}
                className="relative flex-none group"
              >
                {/* Image Container */}
                <div
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-violet-500 shadow-lg shadow-violet-500/30'
                      : 'border-white/10 hover:border-white/30'
                  }`}
                  onClick={() => onImageClick?.(image.id)}
                >
                  <img
                    src={image.url}
                    alt={image.fileName}
                    className="w-full h-full object-cover"
                  />

                  {/* Status Badge */}
                  {image.status && (
                    <div className="absolute top-1 right-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          image.status === 'approved'
                            ? 'bg-emerald-400'
                            : image.status === 'ready'
                            ? 'bg-teal-400'
                            : image.status === 'revision-needed'
                            ? 'bg-rose-400'
                            : 'bg-amber-400'
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Checkbox */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSelect(image.id);
                  }}
                  className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isSelected
                      ? 'bg-violet-600 border-violet-600'
                      : 'bg-black/60 border-white/20 group-hover:border-white/40'
                  }`}
                >
                  {isSelected && <Icons.Check className="w-3 h-3 text-white" />}
                </button>

                {/* File Name */}
                <p className="absolute -bottom-5 left-0 right-0 text-[10px] text-slate-500 text-center truncate px-1">
                  {image.fileName}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
