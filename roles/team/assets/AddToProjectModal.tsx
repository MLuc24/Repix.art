
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';

interface AddToProjectModalProps {
    onClose: () => void;
    assetIds?: string[]; // Array of asset IDs to add
}

const MOCK_PROJECTS = [
    { id: 'p1', name: 'Q4 Marketing Campaign', members: 4, updated: '2h ago' },
    { id: 'p2', name: 'Website Redesign', members: 6, updated: '1d ago' },
    { id: 'p3', name: 'Social Media Assets', members: 2, updated: '3d ago' },
    { id: 'p4', name: 'Client Presentation', members: 3, updated: '1w ago' },
];

export const AddToProjectModal = ({ onClose, assetIds }: AddToProjectModalProps) => {
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProjects = MOCK_PROJECTS.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[80vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add to Project</h3>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <Icons.Close className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto">
                    <div className="relative mb-4">
                        <Icons.Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="pl-9 pr-4 py-2 w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Recent Projects</p>
                        {filteredProjects.map(project => (
                            <div
                                key={project.id}
                                onClick={() => setSelectedProjectId(project.id)}
                                className={`
                            flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors border
                            ${selectedProjectId === project.id
                                        ? 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                                        : 'bg-white border-transparent hover:bg-slate-50 dark:bg-transparent dark:hover:bg-slate-800'
                                    }
                        `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs">
                                        {project.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-white">{project.name}</p>
                                        <p className="text-xs text-slate-500">{project.members} members • {project.updated}</p>
                                    </div>
                                </div>
                                {selectedProjectId === project.id && (
                                    <Icons.Check className="w-5 h-5 text-blue-500" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        disabled={!selectedProjectId}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add {assetIds?.length ? `${assetIds.length} Assets` : ''}
                    </button>
                </div>

            </div>
        </div>
    );
};
