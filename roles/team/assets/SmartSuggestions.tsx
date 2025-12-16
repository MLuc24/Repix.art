import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamAssetItem } from './types';

interface SmartSuggestionsProps {
    viewMode: 'personal' | 'shared';
    suggestedAssets: TeamAssetItem[];
    onShareAsset: (asset: TeamAssetItem) => void;
    onSaveAsset: (asset: TeamAssetItem) => void;
}

export const SmartSuggestions = ({ viewMode, suggestedAssets, onShareAsset, onSaveAsset }: SmartSuggestionsProps) => {
    if (suggestedAssets.length === 0) return null;

    return (
        <div className="mb-6 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
            <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-violet-500 rounded-lg">
                    <Icons.Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                        {viewMode === 'personal' ? 'Suggested to Share' : 'Suggested to Save'}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        {viewMode === 'personal'
                            ? 'These assets might be useful for your team'
                            : 'Popular team assets you might want in your library'
                        }
                    </p>
                </div>
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                    Dismiss
                </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
                {suggestedAssets.slice(0, 5).map(asset => (
                    <div key={asset.id} className="flex-shrink-0 w-32 group">
                        <div className="relative aspect-square rounded-lg overflow-hidden mb-2 border-2 border-transparent group-hover:border-blue-500 transition-all">
                            <img src={asset.src} alt={asset.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <button
                                    onClick={() => viewMode === 'personal' ? onShareAsset(asset) : onSaveAsset(asset)}
                                    className="px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-lg text-xs font-medium shadow-lg hover:scale-105 transition-transform"
                                >
                                    {viewMode === 'personal' ? 'Share' : 'Save'}
                                </button>
                            </div>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 font-medium truncate">{asset.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">{asset.ownerString}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
