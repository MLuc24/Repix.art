
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { TeamAssetItem } from './types';

interface TeamAssetCardProps {
    asset: TeamAssetItem;
    isSelected?: boolean;
    onAssetClick: () => void;
    onAction: (action: string) => void;
    showCrossTabActions?: boolean;
}

const getBadge = (source: string) => {
    switch (source) {
        case 'generated':
            return {
                icon: <Icons.Sparkles className="w-3.5 h-3.5" />,
                label: 'AI',
                bg: 'bg-violet-600'
            };
        case 'upload':
            return {
                icon: <Icons.Image className="w-3.5 h-3.5" />,
                label: 'IMG',
                bg: 'bg-slate-600'
            };
        case 'remix':
            return {
                icon: <Icons.Wand className="w-3.5 h-3.5" />,
                label: 'RMX',
                bg: 'bg-pink-600'
            };
        default:
            return {
                icon: <Icons.Image className="w-3.5 h-3.5" />,
                label: 'IMG',
                bg: 'bg-slate-600'
            };
    }
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
};

export const TeamAssetCard = ({ asset, isSelected, onAssetClick, onAction, showCrossTabActions = true }: TeamAssetCardProps) => {
    const badge = getBadge(asset.source);

    return (
        <div className="group">
            {/* Card with glow border - Inspired by reference */}
            <div
                className={`
                    relative rounded-2xl overflow-hidden cursor-pointer
                    transition-all duration-500
                    ${isSelected
                        ? 'ring-2 ring-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]'
                        : 'ring-1 ring-slate-700/50 hover:ring-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    }
                `}
                onClick={onAssetClick}
            >
                {/* Glow effect - Inspired by reference */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Image Container */}
                <div className="aspect-square relative bg-slate-800">
                    <img
                        src={asset.src}
                        alt={asset.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Badges - Top corners */}
                    <div className="absolute top-2 left-2 z-10">
                        <div className={`
                            px-2 py-1 rounded-md ${badge.bg} text-white 
                            flex items-center gap-1 shadow-lg text-xs font-bold
                        `}>
                            {badge.icon}
                            {badge.label}
                        </div>
                    </div>

                    {/* Shared/Personal indicator */}
                    {showCrossTabActions && (
                        <div className="absolute top-2 right-2 z-10">
                            <div className={`
                                px-2 py-1 rounded-md text-white 
                                flex items-center gap-1 shadow-lg text-xs font-bold backdrop-blur-sm
                                ${asset.isShared 
                                    ? 'bg-blue-600/90 border border-blue-400/30' 
                                    : 'bg-violet-600/90 border border-violet-400/30'
                                }
                            `}>
                                {asset.isShared ? <Icons.User className="w-3 h-3" /> : <Icons.User className="w-3 h-3" />}
                                {asset.isShared ? 'Team' : 'Mine'}
                            </div>
                        </div>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                        <div className="w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                                {/* Cross-tab action button */}
                                {showCrossTabActions && (
                                    asset.isShared ? (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onAction('save-to-personal'); }}
                                            className="flex-1 px-2 py-1.5 rounded-lg bg-violet-600/90 backdrop-blur hover:bg-violet-600 text-white border border-violet-400/30 transition-all text-xs font-medium flex items-center justify-center gap-1"
                                            title="Save to My Assets"
                                        >
                                            <Icons.Download className="w-3.5 h-3.5" />
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onAction('share-to-team'); }}
                                            className="flex-1 px-2 py-1.5 rounded-lg bg-blue-600/90 backdrop-blur hover:bg-blue-600 text-white border border-blue-400/30 transition-all text-xs font-medium flex items-center justify-center gap-1"
                                            title="Share to Team"
                                        >
                                            <Icons.Upload className="w-3.5 h-3.5" />
                                            Share
                                        </button>
                                    )
                                )}
                                <button
                                    onClick={(e) => { e.stopPropagation(); onAction('download'); }}
                                    className="p-1.5 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 text-white border border-white/20 transition-all"
                                    title="Download"
                                >
                                    <Icons.Download className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onAction('add-to-project'); }}
                                    className="p-1.5 rounded-lg bg-white/10 backdrop-blur hover:bg-white/20 text-white border border-white/20 transition-all"
                                    title="Add to Project"
                                >
                                    <Icons.Plus className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onAction('delete'); }}
                                    className="p-1.5 rounded-lg bg-red-500/20 backdrop-blur hover:bg-red-500 text-white border border-red-500/30 transition-all"
                                    title="Delete"
                                >
                                    <Icons.Trash className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Metadata section - Inspired by reference */}
                <div className="bg-slate-900/95 backdrop-blur-sm p-3 border-t border-slate-800/50">
                    <h3 className="text-white text-sm font-semibold truncate mb-1">
                        {asset.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{formatDate(asset.createdAt)}</span>
                        <span>{asset.meta.width}x{asset.meta.height}</span>
                    </div>

                    {/* Edit Button - Inspired by reference */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAction('open-editor');
                        }}
                        className="w-full mt-2 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-xs font-semibold shadow-lg shadow-blue-500/20 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};
