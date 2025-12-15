/**
 * ImageAssignmentStatus
 * R4.10 — TEAM EDITOR CONTEXT (FOUNDATION)
 * 
 * Hiển thị trong Editor Header:
 * - Avatar người được assign
 * - Status: Editing / Ready / Approved / Revision Needed
 * - Dropdown để change status (UI-only)
 */

import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import type { ImageAssignmentStatusProps, ImageAssignmentStatus as StatusType } from '../types';

const STATUS_CONFIG: Record<StatusType, { label: string; color: string; bgColor: string; icon: React.ReactNode }> = {
  editing: {
    label: 'Editing',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20 border-amber-500/30',
    icon: <Icons.Pencil className="w-3.5 h-3.5" />,
  },
  ready: {
    label: 'Ready',
    color: 'text-teal-400',
    bgColor: 'bg-teal-500/20 border-teal-500/30',
    icon: <Icons.Check className="w-3.5 h-3.5" />,
  },
  approved: {
    label: 'Approved',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20 border-emerald-500/30',
    icon: <Icons.Check className="w-3.5 h-3.5" />,
  },
  'revision-needed': {
    label: 'Revision Needed',
    color: 'text-rose-400',
    bgColor: 'bg-rose-500/20 border-rose-500/30',
    icon: <Icons.Refresh className="w-3.5 h-3.5" />,
  },
};

export const ImageAssignmentStatus: React.FC<ImageAssignmentStatusProps> = ({
  assignment,
  onStatusChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentStatus = STATUS_CONFIG[assignment.status];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleStatusSelect = (status: StatusType) => {
    onStatusChange?.(status);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex items-center gap-3" ref={dropdownRef}>
      {/* Assignee Avatar */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <img
            src={assignment.assignee.avatar}
            alt={assignment.assignee.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white/10"
          />
          {/* Status dot overlay */}
          <span
            className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0e0f13] ${assignment.status === 'editing'
                ? 'bg-amber-400 animate-pulse'
                : assignment.status === 'ready'
                  ? 'bg-teal-400'
                  : assignment.status === 'approved'
                    ? 'bg-emerald-400'
                    : 'bg-rose-400'
              }`}
          />
        </div>
        <div className="hidden lg:block">
          <p className="text-xs font-medium text-slate-300 leading-tight">
            {assignment.assignee.name}
          </p>
          <p className="text-[10px] text-slate-500 capitalize">
            {assignment.assignee.role}
          </p>
        </div>
      </div>

      {/* Status Badge with Dropdown */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${currentStatus.bgColor} ${currentStatus.color} hover:opacity-80`}
      >
        {currentStatus.icon}
        <span className="text-xs font-medium">{currentStatus.label}</span>
        <Icons.ChevronLeft className={`w-3 h-3 -rotate-90 transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1b26] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[9999] animate-fade-in-up">
          <div className="p-1">
            {(Object.keys(STATUS_CONFIG) as StatusType[]).map((status) => {
              const config = STATUS_CONFIG[status];
              const isActive = status === assignment.status;
              return (
                <button
                  key={status}
                  onClick={() => handleStatusSelect(status)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${isActive
                      ? `${config.bgColor} ${config.color}`
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <span className={config.color}>{config.icon}</span>
                  <span>{config.label}</span>
                  {isActive && <Icons.Check className="w-3 h-3 ml-auto text-current" />}
                </button>
              );
            })}
          </div>
          <div className="border-t border-white/5 p-2">
            <p className="text-[10px] text-slate-500 text-center">
              Status will sync with Project
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageAssignmentStatus;
