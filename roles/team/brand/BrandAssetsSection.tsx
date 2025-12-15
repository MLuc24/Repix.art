
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { BrandKit } from './types';

interface BrandAssetsSectionProps {
    brand: BrandKit;
}

export const BrandAssetsSection = ({ brand }: BrandAssetsSectionProps) => {
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const handleCopyColor = (hex: string) => {
        navigator.clipboard.writeText(hex);
        setCopiedColor(hex);
        setTimeout(() => setCopiedColor(null), 2000);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Colors Section */}
            <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
                            <Icons.Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Brand Colors</h2>
                    </div>
                </div>

                <div className="p-6 space-y-3">
                    {brand.colors.map((color, idx) => (
                        <div
                            key={idx}
                            className="group flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                        >
                            <div className="relative">
                                <div
                                    className="w-12 h-12 rounded-lg border-2 border-white dark:border-slate-800 shadow-md"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <div className="absolute inset-0 rounded-lg ring-1 ring-black/10" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <p className="font-semibold text-slate-900 dark:text-white">{color.name}</p>
                                    <button
                                        onClick={() => handleCopyColor(color.hex)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <code className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-mono rounded border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                                            {copiedColor === color.hex ? (
                                                <span className="text-green-500 flex items-center gap-1">
                                                    <Icons.Check className="w-3 h-3" /> Copied
                                                </span>
                                            ) : (
                                                color.hex
                                            )}
                                        </code>
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{color.usage}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Logos & Fonts Section */}
            <div className="space-y-6">

                {/* Logos */}
                <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                                <Icons.Image className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Logos</h2>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {brand.logos.map((logo) => (
                            <div key={logo.id} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize">
                                        {logo.type} Logo
                                    </p>
                                    <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                        Download
                                    </button>
                                </div>
                                <div className="bg-slate-50 dark:bg-white/5 rounded-lg p-4 border border-slate-200 dark:border-white/10">
                                    <img src={logo.url} alt={`${logo.type} logo`} className="h-16 object-contain mx-auto" />
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 italic">{logo.usage}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fonts */}
                <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                                <Icons.Type className="w-4 h-4 text-white" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Typography</h2>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        {brand.fonts.map((font, idx) => (
                            <div key={idx} className="space-y-2">
                                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize">
                                    {font.type} Font
                                </p>
                                <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10">
                                    <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: font.name }}>
                                        {font.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">
                                        Fallback: {font.fallback}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
