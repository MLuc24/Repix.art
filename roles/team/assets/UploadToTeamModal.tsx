
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';

interface UploadToTeamModalProps {
    onClose: () => void;
}

export const UploadToTeamModal = ({ onClose }: UploadToTeamModalProps) => {
    const [dragActive, setDragActive] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            // Mock converting FileList to array
            const newFiles = Array.from(e.dataTransfer.files);
            setFiles(prev => [...prev, ...newFiles]);

            // Mock duplicate check logic
            if (newFiles.length > 0) {
                setTimeout(() => setShowDuplicateWarning(true), 500);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Upload to Team Assets</h3>
                    <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <Icons.Close className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">

                    {/* Folder Select */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Upload Location</label>
                        <select className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm transition-all focus:ring-2 focus:ring-blue-500">
                            <option value="">All Assets (Root)</option>
                            <option value="product-shots">Product Shots</option>
                            <option value="campaign-dec">Campaign Dec</option>
                            <option value="client-x">Client X</option>
                        </select>
                    </div>

                    {/* Drop Zone */}
                    <div
                        className={`
                    relative rounded-xl border-2 border-dashed transition-all duration-200 p-8 flex flex-col items-center justify-center text-center cursor-pointer mb-6
                    ${dragActive
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }
                `}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                    >
                        <input id="file-upload" type="file" multiple className="hidden" onChange={(e) => {
                            if (e.target.files) setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                        }} />

                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                            <Icons.Upload className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-500">SVG, PNG, JPG or GIF (max. 10MB)</p>
                    </div>

                    {/* File List */}
                    {files.length > 0 && (
                        <div className="space-y-2 mb-6">
                            {files.map((file, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-800">
                                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                                    <button onClick={() => setFiles(prev => prev.filter((_, i) => i !== idx))} className="text-slate-400 hover:text-red-500">
                                        <Icons.Close className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Duplicate Warning Mock */}
                    {showDuplicateWarning && (
                        <div className="mb-6 p-4 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/30 flex gap-3 animate-in slide-in-from-top-2">
                            <Icons.AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                            <div>
                                <h4 className="text-sm font-bold text-orange-800 dark:text-orange-200 mb-1">Duplicate detected</h4>
                                <p className="text-xs text-orange-700 dark:text-orange-300 mb-3">
                                    One or more files look similar to existing assets in "Product Shots".
                                </p>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-white dark:bg-slate-900 border border-orange-200 dark:border-orange-800 text-xs font-medium rounded-md shadow-sm hover:bg-slate-50 transition-colors">
                                        Skip Duplicates
                                    </button>
                                    <button className="px-3 py-1 bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-100 text-xs font-medium rounded-md hover:bg-orange-200 transition-colors">
                                        Upload Anyway
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        Cancel
                    </button>
                    <button
                        onClick={onClose}
                        disabled={files.length === 0}
                        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Upload {files.length > 0 ? `${files.length} Files` : ''}
                    </button>
                </div>

            </div>
        </div>
    );
};
