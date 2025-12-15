
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface ApplyBrandActionsProps {
    onApplyToProject: () => void;
    onApplyToImages: () => void;
}

export const ApplyBrandActions = ({ onApplyToProject, onApplyToImages }: ApplyBrandActionsProps) => {
    return (
        <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Apply Brand Style</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Quick apply your brand colors and style to projects or images
                </p>
            </div>

            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                        onClick={onApplyToProject}
                        className="group relative overflow-hidden p-6 rounded-xl border-2 border-slate-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500 transition-all hover:shadow-lg hover:shadow-blue-500/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Icons.Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Apply to Current Project</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Apply brand colors and style to all images in your active project
                            </p>
                        </div>
                    </button>

                    <button
                        onClick={onApplyToImages}
                        className="group relative overflow-hidden p-6 rounded-xl border-2 border-slate-200 dark:border-white/10 hover:border-violet-500 dark:hover:border-violet-500 transition-all hover:shadow-lg hover:shadow-violet-500/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Icons.Image className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Apply to Selected Images</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Choose specific images to apply your brand style
                            </p>
                        </div>
                    </button>
                </div>

                {/* Apply Effects Preview (Mock) */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/10 dark:to-violet-900/10 rounded-xl border border-blue-200 dark:border-blue-800/30">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-white dark:bg-slate-800 rounded-lg">
                            <Icons.Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">AI Brand Enhancement</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 mb-3">
                                When you apply brand style, our AI will automatically:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                    Adjust color tone
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                                    Suggest backgrounds
                                </div>
                                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500" />
                                    Apply preset filters
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
