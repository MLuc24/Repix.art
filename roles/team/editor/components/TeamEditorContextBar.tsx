/**
 * TeamEditorContextBar
 * R4.10 — TEAM EDITOR CONTEXT (FOUNDATION)
 * 
 * Thanh context mảnh phía trên Editor hiển thị Team > Project > Assigned
 * Click để navigate đến Team Dashboard hoặc Project Detail
 */

import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import type { TeamEditorContextBarProps } from '../types';

export const TeamEditorContextBar: React.FC<TeamEditorContextBarProps> = ({
  team,
  project,
  assignee,
  onTeamClick,
  onProjectClick,
}) => {
  return (
    <div className="h-10 flex-none bg-gradient-to-r from-violet-600/10 via-indigo-600/10 to-violet-600/10 border-b border-violet-500/20 flex items-center px-4 gap-2 relative">
      {/* Team Section */}
      <button
        onClick={onTeamClick}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-violet-500/30 transition-all group"
      >
        {team.logo ? (
          <img
            src={team.logo}
            alt={team.name}
            className="w-5 h-5 rounded-md object-cover"
          />
        ) : (
          <div
            className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
            style={{ backgroundColor: team.color || '#8b5cf6' }}
          >
            {team.name.charAt(0)}
          </div>
        )}
        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
          TEAM: {team.name}
        </span>
      </button>

      {/* Separator */}
      <Icons.ChevronLeft className="w-4 h-4 text-slate-600 rotate-180" />

      {/* Project Section */}
      <button
        onClick={onProjectClick}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-teal-500/30 transition-all group"
      >
        <Icons.Folder className="w-4 h-4 text-teal-400" />
        <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
          Project: {project.name}
        </span>
        {/* Project Status Indicator */}
        <span
          className={`w-2 h-2 rounded-full ${project.status === 'active'
              ? 'bg-emerald-400 animate-pulse'
              : project.status === 'on-hold'
                ? 'bg-amber-400'
                : 'bg-slate-400'
            }`}
        />
      </button>

      {/* Separator */}
      <Icons.ChevronLeft className="w-4 h-4 text-slate-600 rotate-180" />

      {/* Assigned Section */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
        {assignee ? (
          <>
            <img
              src={assignee.avatar}
              alt={assignee.name}
              className="w-5 h-5 rounded-full object-cover ring-2 ring-emerald-500/50"
            />
            <span className="text-xs font-medium text-emerald-400">
              Assigned: {assignee.name === 'Mike Wilson' ? 'You' : assignee.name}
            </span>
          </>
        ) : (
          <>
            <Icons.User className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-medium text-slate-400">Unassigned</span>
          </>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Quick Info */}
      {project.deadline && (
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Icons.Calendar className="w-3.5 h-3.5" />
          <span>Due: {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      )}
    </div>
  );
};

export default TeamEditorContextBar;
