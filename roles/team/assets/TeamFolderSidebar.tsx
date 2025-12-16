
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { AssetFolder } from './types';

interface TeamFolderSidebarProps {
    activeFolderId: string | null;
    onSelectFolder: (id: string | null) => void;
    viewMode: 'personal' | 'shared';
    folders: AssetFolder[];
    onCreateFolder: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    'folder': Icons.Folder,
    'heart': Icons.Star,
    'star': Icons.Star,
    'image': Icons.Image,
    'user': Icons.User,
};

export const TeamFolderSidebar = ({ activeFolderId, onSelectFolder, viewMode, folders, onCreateFolder }: TeamFolderSidebarProps) => {
    return (
        <div className="flex flex-col h-full p-5">
            {/* New Folder Button - Premium Style */}
            <button
                onClick={onCreateFolder}
                className="group w-full flex items-center justify-center gap-2 px-3 py-2 mb-5 text-xs font-semibold bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-lg shadow-md shadow-blue-500/20 transition-all duration-300 hover:scale-105 active:scale-95"
                title="Create a new folder"
            >
                <Icons.FolderPlus className="w-3.5 h-3.5" />
                New Folder
            </button>

            {/* Folders List */}
            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                {/* All Assets */}
                <div
                    onClick={() => onSelectFolder(null)}
                    className={`
                        group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-300
                        ${activeFolderId === null
                            ? 'bg-gradient-to-r from-blue-600/20 to-violet-600/20 text-blue-400 shadow-md shadow-blue-500/10 border border-blue-500/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700/50'
                        }
                    `}
                >
                    <div className="flex items-center gap-2">
                        <div className={`
                            p-1 rounded-md transition-colors
                            ${activeFolderId === null
                                ? 'bg-blue-500/20'
                                : 'bg-slate-800 group-hover:bg-slate-700'
                            }
                        `}>
                            <Icons.Grid className="w-3.5 h-3.5" />
                        </div>
                        <span>All Assets</span>
                    </div>
                </div>

                {/* Folders Section Header */}
                <div className="pt-4 pb-2 px-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                            {viewMode === 'personal' ? 'My Folders' : 'Team Folders'}
                        </span>
                        <span className="text-[10px] text-slate-600 font-semibold">
                            {folders.length}
                        </span>
                    </div>
                </div>

                {/* Folder Items */}
                {folders.length > 0 ? (
                    folders.map(folder => {
                        const IconComponent = iconMap[folder.icon] || Icons.Folder;
                        const isActive = activeFolderId === folder.id;

                        return (
                            <div
                                key={folder.id}
                                onClick={() => onSelectFolder(folder.id)}
                                className={`
                                    group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-300
                                    ${isActive
                                        ? 'bg-gradient-to-r from-violet-600/20 to-purple-600/20 text-violet-400 shadow-md shadow-violet-500/10 border border-violet-500/30'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent hover:border-slate-700/50'
                                    }
                                `}
                            >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <div className={`
                                        p-1 rounded-md transition-colors flex-shrink-0
                                        ${isActive
                                            ? 'bg-violet-500/20'
                                            : 'bg-slate-800 group-hover:bg-slate-700'
                                        }
                                    `}>
                                        <IconComponent className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="truncate">{folder.name}</span>
                                </div>

                                {/* Count Badge */}
                                <span className={`
                                    ml-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold flex-shrink-0 transition-all
                                    ${isActive
                                        ? 'bg-violet-500/30 text-violet-300'
                                        : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-400'
                                    }
                                `}>
                                    {folder.count}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <div className="px-3 py-6 text-center">
                        <Icons.Folder className="w-10 h-10 mx-auto mb-2 text-slate-700 opacity-50" />
                        <p className="text-xs text-slate-500 mb-1">No folders yet</p>
                        <p className="text-[10px] text-slate-600">Create a folder to organize</p>
                    </div>
                )}
            </div>
        </div>
    );
};
