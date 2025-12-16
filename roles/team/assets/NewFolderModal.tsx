import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';

interface NewFolderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (folderName: string, icon: string) => void;
    viewMode: 'personal' | 'shared';
}

const FOLDER_ICONS = [
    { id: 'folder', icon: Icons.Folder, label: 'Folder' },
    { id: 'star', icon: Icons.Star, label: 'Star' },
    { id: 'image', icon: Icons.Image, label: 'Image' },
    { id: 'user', icon: Icons.User, label: 'User' },
    { id: 'briefcase', icon: Icons.Briefcase, label: 'Work' },
];

export const NewFolderModal = ({ isOpen, onClose, onConfirm, viewMode }: NewFolderModalProps) => {
    const [folderName, setFolderName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('folder');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = () => {
        if (!folderName.trim()) {
            setError('Folder name is required');
            return;
        }
        onConfirm(folderName.trim(), selectedIcon);
        setFolderName('');
        setSelectedIcon('folder');
        setError('');
    };

    const handleClose = () => {
        setFolderName('');
        setSelectedIcon('folder');
        setError('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-slate-900 rounded-2xl w-full max-w-md p-6 shadow-2xl border border-slate-800 animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-white">Create New Folder</h2>
                        <p className="text-xs text-slate-400 mt-1">
                            In {viewMode === 'personal' ? 'My Assets' : 'Team Assets'}
                        </p>
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-slate-400 hover:text-white transition"
                    >
                        <Icons.Close className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-5">
                    {/* Folder Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Folder Name <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="text"
                            value={folderName}
                            onChange={(e) => {
                                setFolderName(e.target.value);
                                setError('');
                            }}
                            placeholder="e.g., Project Assets, Drafts, Final..."
                            className={`w-full px-4 py-2.5 bg-slate-800 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-500`}
                            autoFocus
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                        />
                        {error && (
                            <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                <Icons.AlertTriangle className="w-3 h-3" />
                                {error}
                            </p>
                        )}
                    </div>

                    {/* Icon Selection */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            Choose Icon
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                            {FOLDER_ICONS.map(({ id, icon: IconComponent, label }) => (
                                <button
                                    key={id}
                                    onClick={() => setSelectedIcon(id)}
                                    className={`
                                        p-3 rounded-lg transition-all duration-200
                                        ${selectedIcon === id
                                            ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                                            : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                        }
                                    `}
                                    title={label}
                                >
                                    <IconComponent className="w-5 h-5 mx-auto" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview */}
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                        <p className="text-xs text-slate-400 mb-2">Preview:</p>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-700 rounded-lg">
                                {React.createElement(
                                    FOLDER_ICONS.find(i => i.id === selectedIcon)?.icon || Icons.Folder,
                                    { className: "w-5 h-5 text-blue-400" }
                                )}
                            </div>
                            <span className="text-white font-medium">
                                {folderName || 'Folder Name'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white rounded-lg font-medium transition shadow-lg shadow-blue-500/20"
                    >
                        Create Folder
                    </button>
                </div>
            </div>
        </div>
    );
};
