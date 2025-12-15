/**
 * TeamSwitcher Component (R4.1)
 * 
 * Dropdown component for switching between Personal and Team workspaces.
 * Located in Header, shows current context and allows switching.
 * 
 * UX Rules:
 * - Switch ≤ 1 click
 * - Always show current context clearly
 * - No reload, just context switch
 */

import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { useWorkspace } from './WorkspaceContextProvider';

interface TeamSwitcherProps {
    onCreateTeam?: () => void;
}

export const TeamSwitcher: React.FC<TeamSwitcherProps> = ({ onCreateTeam }) => {
    const { workspace, isTeamMode, currentTeam, teams, switchToPersonal, switchToTeam } = useWorkspace();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle workspace switch
    const handleSwitchToPersonal = () => {
        switchToPersonal();
        setIsOpen(false);
    };

    const handleSwitchToTeam = (teamId: string) => {
        switchToTeam(teamId);
        setIsOpen(false);
    };

    const handleCreateTeam = () => {
        setIsOpen(false);
        onCreateTeam?.();
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200
          ${isTeamMode
                        ? 'bg-cyan-500/10 border-cyan-500/30 hover:border-cyan-500/50'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }
        `}
            >
                {/* Avatar/Icon */}
                <div className={`
          w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold
          ${isTeamMode
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-500 text-white'
                        : 'bg-violet-500/20 text-violet-400'
                    }
        `}>
                    {isTeamMode && currentTeam
                        ? currentTeam.name.charAt(0).toUpperCase()
                        : <Icons.User className="w-4 h-4" />
                    }
                </div>

                {/* Label */}
                <div className="hidden md:flex flex-col items-start">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                        {isTeamMode ? 'Team' : 'Personal'}
                    </span>
                    <span className="text-sm font-semibold text-white truncate max-w-[100px]">
                        {isTeamMode && currentTeam ? currentTeam.name : 'My Workspace'}
                    </span>
                </div>

                {/* Chevron */}
                <Icons.ChevronLeft className={`
          w-4 h-4 text-slate-400 transition-transform duration-200
          ${isOpen ? 'rotate-90' : '-rotate-90'}
        `} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-[#1a1b26] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fade-in-up">
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Switch Workspace</p>
                    </div>

                    {/* Personal Workspace */}
                    <button
                        onClick={handleSwitchToPersonal}
                        className={`
              w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left
              ${!isTeamMode ? 'bg-violet-500/10' : ''}
            `}
                    >
                        <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                            <Icons.User className="w-4 h-4 text-violet-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white">Personal Workspace</p>
                            <p className="text-xs text-slate-500">Your private workspace</p>
                        </div>
                        {!isTeamMode && (
                            <Icons.Check className="w-4 h-4 text-violet-400" />
                        )}
                    </button>

                    {/* Divider with Teams label */}
                    {teams.length > 0 && (
                        <div className="px-4 py-2 border-t border-white/5">
                            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium">Teams</p>
                        </div>
                    )}

                    {/* Team List */}
                    {teams.map(team => (
                        <button
                            key={team.id}
                            onClick={() => handleSwitchToTeam(team.id)}
                            className={`
                w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left
                ${isTeamMode && currentTeam?.id === team.id ? 'bg-cyan-500/10' : ''}
              `}
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                                <span className="text-sm font-bold text-white">
                                    {team.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{team.name}</p>
                                <p className="text-xs text-slate-500">{team.memberCount} members</p>
                            </div>
                            {isTeamMode && currentTeam?.id === team.id && (
                                <Icons.Check className="w-4 h-4 text-cyan-400" />
                            )}
                        </button>
                    ))}

                    {/* Create Team Button */}
                    <div className="border-t border-white/5">
                        <button
                            onClick={handleCreateTeam}
                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left group"
                        >
                            <div className="w-8 h-8 rounded-lg border border-dashed border-slate-600 flex items-center justify-center group-hover:border-cyan-500 transition-colors">
                                <Icons.Plus className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                            </div>
                            <p className="text-sm font-medium text-slate-400 group-hover:text-white transition-colors">
                                Create New Team
                            </p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
