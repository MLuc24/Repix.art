import React, { useState, useMemo } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamAssetItem } from './types';

interface UnifiedSearchModalProps {
    personalAssets: TeamAssetItem[];
    teamAssets: TeamAssetItem[];
    onClose: () => void;
    onSelectAsset: (asset: TeamAssetItem, source: 'personal' | 'team') => void;
}

export const UnifiedSearchModal = ({ personalAssets, teamAssets, onClose, onSelectAsset }: UnifiedSearchModalProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeScope, setActiveScope] = useState<'all' | 'personal' | 'team'>('all');

    const filteredResults = useMemo(() => {
        const query = searchQuery.toLowerCase();
        const personal = personalAssets.filter(a => a.title.toLowerCase().includes(query));
        const team = teamAssets.filter(a => a.title.toLowerCase().includes(query));

        if (activeScope === 'personal') return { personal, team: [] };
        if (activeScope === 'team') return { personal: [], team };
        return { personal, team };
    }, [searchQuery, activeScope, personalAssets, teamAssets]);

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 pt-20">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl mx-4 animate-in zoom-in-95 slide-in-from-top-10 duration-200 max-h-[80vh] flex flex-col">
                {/* Search Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                        <Icons.Search className="w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search across all your assets..."
                            autoFocus
                            className="flex-1 bg-transparent text-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
                        />
                        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                            <Icons.Close className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'personal', 'team'] as const).map(scope => (
                            <button
                                key={scope}
                                onClick={() => setActiveScope(scope)}
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${activeScope === scope ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                            >
                                {scope === 'all' ? 'All Assets' : scope === 'personal' ? 'My Assets' : 'Team Assets'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {filteredResults.personal.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">My Assets ({filteredResults.personal.length})</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {filteredResults.personal.map(asset => (
                                    <button
                                        key={asset.id}
                                        onClick={() => onSelectAsset(asset, 'personal')}
                                        className="group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-violet-500 transition-all"
                                    >
                                        <img src={asset.src} alt={asset.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            {asset.title}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {filteredResults.team.length > 0 && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">Team Assets ({filteredResults.team.length})</h3>
                            <div className="grid grid-cols-4 gap-3">
                                {filteredResults.team.map(asset => (
                                    <button
                                        key={asset.id}
                                        onClick={() => onSelectAsset(asset, 'team')}
                                        className="group relative aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all"
                                    >
                                        <img src={asset.src} alt={asset.title} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                            {asset.title}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {filteredResults.personal.length === 0 && filteredResults.team.length === 0 && searchQuery && (
                        <div className="text-center py-12">
                            <Icons.Search className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                            <p className="text-slate-600 dark:text-slate-400">No assets found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
