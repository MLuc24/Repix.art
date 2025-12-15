
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface TeamFolderSidebarProps {
    activeFolderId: string | null;
    onSelectFolder: (id: string | null) => void;
}

const FOLDERS = [
    { id: 'product-shots', name: 'Product Shots', count: 12 },
    { id: 'campaign-dec', name: 'Campaign Dec', count: 8 },
    { id: 'client-x', name: 'Client X', count: 4 },
];

export const TeamFolderSidebar = ({ activeFolderId, onSelectFolder }: TeamFolderSidebarProps) => {
    return (
        <div className="flex flex-col h-full py-4">
            <div className="px-4 mb-4">
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Icons.FolderPlus className="w-4 h-4" />
                    New Folder
                </button>
            </div>

            <div className="flex-1 overflow-y-auto px-2 space-y-1">
                <div
                    onClick={() => onSelectFolder(null)}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${activeFolderId === null
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                >
                    <div className="flex items-center gap-2">
                        <Icons.Image className="w-4 h-4" />
                        <span>All Assets</span>
                    </div>
                </div>

                <div className="pt-4 pb-2 px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                    <span>Folders</span>
                </div>

                {FOLDERS.map(folder => (
                    <div
                        key={folder.id}
                        onClick={() => onSelectFolder(folder.id)}
                        className={`group flex items-center justify-between px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${activeFolderId === folder.id
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                    >
                        <div className="flex items-center gap-2">
                            <Icons.Folder className={`w-4 h-4 ${activeFolderId === folder.id ? 'fill-current' : ''}`} />
                            <span>{folder.name}</span>
                        </div>
                        <span className={`text-xs ${activeFolderId === folder.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}>
                            {folder.count}
                        </span>
                        {/* Mock Action Menu trigger (could be added here) */}
                    </div>
                ))}
            </div>
        </div>
    );
};
