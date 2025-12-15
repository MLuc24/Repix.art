
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { BrandKit } from './types';

interface BrandOverviewCardProps {
    brand: BrandKit;
    onEdit: () => void;
    onApplyToProject: () => void;
}

export const BrandOverviewCard = ({ brand, onEdit, onApplyToProject }: BrandOverviewCardProps) => {
    const statusColors = {
        active: 'bg-green-500/20 text-green-400 border-green-500/30',
        incomplete: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    };

    return (
        <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
            <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{brand.name}</h1>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[brand.status]}`}>
                                {brand.status === 'active' ? 'Active' : 'Incomplete'}
                            </span>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Last updated: {new Date(brand.lastUpdated).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={onEdit}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors"
                        >
                            <Icons.Pencil className="w-4 h-4" />
                            Edit
                        </button>
                        <button
                            onClick={onApplyToProject}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                            <Icons.Wand className="w-4 h-4" />
                            Apply to Project
                        </button>
                    </div>
                </div>

                {/* Logo Preview */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10">
                    <div className="flex-1">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                            Primary Logo
                        </p>
                        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 inline-block">
                            <img
                                src={brand.logos.find(l => l.type === 'primary')?.url}
                                alt="Primary Logo"
                                className="h-12 object-contain"
                            />
                        </div>
                    </div>

                    {brand.logos.find(l => l.type === 'secondary') && (
                        <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                                Secondary Logo
                            </p>
                            <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 inline-block">
                                <img
                                    src={brand.logos.find(l => l.type === 'secondary')?.url}
                                    alt="Secondary Logo"
                                    className="h-12 object-contain"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
