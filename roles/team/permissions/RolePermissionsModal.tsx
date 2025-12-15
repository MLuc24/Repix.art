/**
 * RolePermissionsModal - Modal to view and compare role permissions
 * Opens when user clicks "View Permissions" button
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
        <GlassModal isOpen={isOpen} onClose={onClose} className="max-w-3xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-violet-600/20">
                        <Icons.Shield className="w-6 h-6 text-violet-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Role Permissions</h2>
                        <p className="text-sm text-slate-400">Compare what each role can do</p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                >
                    <Icons.Close className="w-5 h-5" />
                </button>
            </div>

            {/* Permission Matrix */}
            <div className="overflow-x-auto -mx-6 px-6">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="pb-3 pr-4 text-left text-sm font-bold text-slate-300 uppercase tracking-wider">
                                Permission
                            </th>
                            <th className="pb-3 px-4 text-center text-sm font-bold text-slate-300 uppercase tracking-wider">
                                <div className="flex flex-col items-center gap-1">
                                    <span>Admin</span>
                                    <span className="text-[10px] font-normal text-slate-500 normal-case">Full Access</span>
                                </div>
                            </th>
                            <th className="pb-3 px-4 text-center text-sm font-bold text-slate-300 uppercase tracking-wider">
                                <div className="flex flex-col items-center gap-1">
                                    <span>Editor</span>
                                    <span className="text-[10px] font-normal text-slate-500 normal-case">Create & Edit</span>
                                </div>
                            </th>
                            <th className="pb-3 pl-4 text-center text-sm font-bold text-slate-300 uppercase tracking-wider">
                                <div className="flex flex-col items-center gap-1">
                                    <span>Viewer</span>
                                    <span className="text-[10px] font-normal text-slate-500 normal-case">View Only</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {PERMISSIONS.map((permission) => (
                            <tr key={permission.id} className="group hover:bg-white/5 transition-colors">
                                <td className="py-3 pr-4 text-sm text-white font-medium">
                                    {permission.name}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {permission.admin ? (
                                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                                            <Icons.Check className="w-4 h-4 text-emerald-400" />
                                        </div>
                                    ) : (
                                        <span className="text-slate-600">–</span>
                                    )}
                                </td>
                                <td className="py-3 px-4 text-center">
                                    {permission.editor ? (
                                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                                            <Icons.Check className="w-4 h-4 text-emerald-400" />
                                        </div>
                                    ) : (
                                        <span className="text-slate-600">–</span>
                                    )}
                                </td>
                                <td className="py-3 pl-4 text-center">
                                    {permission.viewer ? (
                                        <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/30 transition-colors">
                                            <Icons.Check className="w-4 h-4 text-emerald-400" />
                                        </div>
                                    ) : (
                                        <span className="text-slate-600">–</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="mt-6 p-4 rounded-xl bg-violet-600/10 border border-violet-500/20">
                <div className="flex items-start gap-3">
                    <Icons.Info className="w-5 h-5 text-violet-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                        <p className="text-white font-medium mb-1">Changing member roles</p>
                        <p className="text-slate-400">Only Admins can modify team member roles and permissions. Changes take effect immediately.</p>
                    </div>
                </div>
            </div>
        </GlassModal>
    );
};
