/**
 * RolePermissionsModal - Premium Permissions Comparison Modal
 * Enhanced table design with modern aesthetics
 */

import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal } from '../../../shared/components/GlassUI';
import { PERMISSIONS } from './types';

interface RolePermissionsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const RolePermissionsModal: React.FC<RolePermissionsModalProps> = ({ isOpen, onClose }) => {
    return (
        <GlassModal isOpen={isOpen} onClose={onClose} className="max-w-4xl">
            {/* Premium Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-600/20 to-violet-500/10 border border-violet-400/30">
                        <Icons.Shield className="w-7 h-7 text-violet-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white mb-1">Role Permissions</h2>
                        <p className="text-sm text-slate-400">Compare capabilities across team roles</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-400/30 transition-all text-slate-400 hover:text-red-300 group"
                >
                    <Icons.Close className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>
            </div>

            {/* Enhanced Permission Matrix */}
            <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="pb-4 pr-6 text-left">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Permission</span>
                            </th>
                            <th className="pb-4 px-6">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-400/30">
                                        <Icons.Shield className="w-5 h-5 text-red-400" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-white block mb-0.5">Admin</span>
                                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Full Control</span>
                                    </div>
                                </div>
                            </th>
                            <th className="pb-4 px-6">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-2 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30">
                                        <Icons.Pencil className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-white block mb-0.5">Editor</span>
                                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Create & Edit</span>
                                    </div>
                                </div>
                            </th>
                            <th className="pb-4 pl-6">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="p-2 rounded-xl bg-gradient-to-br from-slate-500/20 to-slate-600/20 border border-slate-400/30">
                                        <Icons.Eye className="w-5 h-5 text-slate-400" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-white block mb-0.5">Viewer</span>
                                        <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">View Only</span>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {PERMISSIONS.map((permission, index) => (
                            <tr
                                key={permission.id}
                                className="group hover:bg-white/[0.02] transition-all duration-200"
                                style={{ animationDelay: `${index * 30}ms` }}
                            >
                                <td className="py-4 pr-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/10 group-hover:border-violet-400/30 transition-all">
                                            <span className="text-xs font-bold text-slate-400 group-hover:text-violet-400 transition-colors">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <span className="text-sm text-white font-semibold">{permission.name}</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-center">
                                        {permission.admin ? (
                                            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 group-hover:bg-emerald-500/30 group-hover:border-emerald-400/60 group-hover:scale-110 transition-all shadow-lg shadow-emerald-500/10">
                                                <Icons.Check className="w-5 h-5 text-emerald-400" />
                                            </div>
                                        ) : (
                                            <span className="text-slate-700 text-xl font-bold">–</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex justify-center">
                                        {permission.editor ? (
                                            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 group-hover:bg-emerald-500/30 group-hover:border-emerald-400/60 group-hover:scale-110 transition-all shadow-lg shadow-emerald-500/10">
                                                <Icons.Check className="w-5 h-5 text-emerald-400" />
                                            </div>
                                        ) : (
                                            <span className="text-slate-700 text-xl font-bold">–</span>
                                        )}
                                    </div>
                                </td>
                                <td className="py-4 pl-6">
                                    <div className="flex justify-center">
                                        {permission.viewer ? (
                                            <div className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 group-hover:bg-emerald-500/30 group-hover:border-emerald-400/60 group-hover:scale-110 transition-all shadow-lg shadow-emerald-500/10">
                                                <Icons.Check className="w-5 h-5 text-emerald-400" />
                                            </div>
                                        ) : (
                                            <span className="text-slate-700 text-xl font-bold">–</span>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Enhanced Footer Info */}
            <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-violet-600/10 via-violet-500/5 to-transparent border border-violet-500/20 backdrop-blur-sm">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-violet-500/20 border border-violet-400/30">
                        <Icons.Info className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm text-white font-bold mb-2">Managing Permissions</p>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Only <span className="text-violet-300 font-semibold">Admins</span> can modify team member roles and permissions.
                            Changes take effect immediately and will be reflected across all team workspaces.
                        </p>
                    </div>
                </div>
            </div>
        </GlassModal>
    );
};
