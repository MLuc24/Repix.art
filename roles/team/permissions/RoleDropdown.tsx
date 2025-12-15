
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamRole, ROLE_INFO } from './types';

interface RoleDropdownProps {
    currentRole: TeamRole;
    onChange: (role: TeamRole) => void;
    disabled?: boolean;
}

export const RoleDropdown = ({ currentRole, onChange, disabled }: RoleDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const currentRoleInfo = ROLE_INFO[currentRole];

    const handleSelect = (role: TeamRole) => {
        onChange(role);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
                className={`
          px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors
          ${disabled
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700 cursor-not-allowed'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
                    }
          flex items-center gap-2
        `}
            >
                <span className="capitalize">{currentRoleInfo.label}</span>
                {!disabled && <Icons.ChevronLeft className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-90' : '-rotate-90'}`} />}
            </button>

            {isOpen && !disabled && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {(Object.keys(ROLE_INFO) as TeamRole[]).map((role) => {
                            const info = ROLE_INFO[role];
                            const isSelected = role === currentRole;

                            return (
                                <button
                                    key={role}
                                    onClick={() => handleSelect(role)}
                                    className={`
                    w-full px-4 py-3 text-left transition-colors
                    ${isSelected
                                            ? 'bg-blue-50 dark:bg-blue-900/20'
                                            : 'hover:bg-slate-50 dark:hover:bg-white/5'
                                        }
                  `}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${info.color} flex items-center justify-center flex-shrink-0`}>
                                            <Icons.Shield className="w-5 h-5 text-white" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                                                    {info.label}
                                                </p>
                                                {isSelected && (
                                                    <Icons.Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {info.description}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
};
