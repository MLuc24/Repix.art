
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamRole, ROLE_INFO } from './types';

interface ConfirmRoleChangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    memberName: string;
    currentRole: TeamRole;
    newRole: TeamRole;
}

export const ConfirmRoleChangeModal = ({
    isOpen,
    onClose,
    onConfirm,
    memberName,
    currentRole,
    newRole
}: ConfirmRoleChangeModalProps) => {
    if (!isOpen) return null;

    const currentRoleInfo = ROLE_INFO[currentRole];
    const newRoleInfo = ROLE_INFO[newRole];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                            <Icons.AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Confirm Role Change</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">This will update member permissions</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-slate-600 dark:text-slate-300 mb-6">
                        You're about to change <span className="font-bold text-slate-900 dark:text-white">{memberName}</span>'s role:
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                        {/* Current Role */}
                        <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Current</p>
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${currentRoleInfo.color} flex items-center justify-center`}>
                                    <Icons.Shield className="w-4 h-4 text-white" />
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white">{currentRoleInfo.label}</p>
                            </div>
                        </div>

                        {/* Arrow */}
                        <Icons.ArrowRight className="w-5 h-5 text-slate-400 flex-shrink-0" />

                        {/* New Role */}
                        <div className="flex-1 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-500">
                            <p className="text-xs text-blue-600 dark:text-blue-400 mb-2 font-semibold">New</p>
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${newRoleInfo.color} flex items-center justify-center`}>
                                    <Icons.Shield className="w-4 h-4 text-white" />
                                </div>
                                <p className="font-bold text-slate-900 dark:text-white">{newRoleInfo.label}</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                            <span className="font-semibold">New permissions: </span>
                            {newRoleInfo.description}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Confirm Change
                    </button>
                </div>

            </div>
        </div>
    );
};
