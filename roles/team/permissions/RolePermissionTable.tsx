
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { PERMISSIONS } from './types';

export const RolePermissionTable = () => {
    return (
        <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2">
                    <Icons.Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Role Permissions</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Understand what each role can do
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Permission
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Admin
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Editor
                            </th>
                            <th className="px-6 py-3 text-center text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Viewer
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {PERMISSIONS.map((permission) => (
                            <tr key={permission.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                    {permission.name}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {permission.admin ? (
                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
                                            <Icons.Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                    ) : (
                                        <span className="text-slate-300 dark:text-slate-700">–</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {permission.editor ? (
                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
                                            <Icons.Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                    ) : (
                                        <span className="text-slate-300 dark:text-slate-700">–</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {permission.viewer ? (
                                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20">
                                            <Icons.Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        </div>
                                    ) : (
                                        <span className="text-slate-300 dark:text-slate-700">–</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
