
import React from 'react';
import { MemberUsage } from './types';

interface UsageByMemberTableProps {
    members: MemberUsage[];
}

export const UsageByMemberTable = ({ members }: UsageByMemberTableProps) => {
    return (
        <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Usage by Member</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Last 30 days credit consumption
                </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Member
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Credits Used
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Percentage
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                                Top Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {members.map((member) => (
                            <tr key={member.userId} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={member.userAvatar}
                                            alt={member.userName}
                                            className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800"
                                        />
                                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                                            {member.userName}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                                        {member.creditsUsed.toLocaleString()}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                                                style={{ width: `${member.percentage}%` }}
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-slate-600 dark:text-slate-400 w-10 text-right">
                                            {member.percentage}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-md">
                                        {member.topAction}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-slate-200 dark:divide-slate-800">
                {members.map((member) => (
                    <div key={member.userId} className="p-4">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <img
                                    src={member.userAvatar}
                                    alt={member.userName}
                                    className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800"
                                />
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                                        {member.userName}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {member.topAction}
                                    </p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-black text-slate-900 dark:text-white">
                                    {member.creditsUsed}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {member.percentage}%
                                </p>
                            </div>
                        </div>
                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
                                style={{ width: `${member.percentage}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
