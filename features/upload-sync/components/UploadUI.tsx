import React, { useRef, useState } from 'react';
import { Icons } from '../../../shared/components/Icons';

interface UploadDropzoneProps {
  onFilesSelected?: (files: File[]) => void;
}

export const UploadDropzone = ({ onFilesSelected }: UploadDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (onFilesSelected) {
        onFilesSelected(Array.from(e.dataTransfer.files));
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onFilesSelected) {
        onFilesSelected(Array.from(e.target.files));
      }
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300
        ${isDragOver 
          ? 'border-violet-500 bg-violet-500/10 scale-[1.02]' 
          : 'border-slate-200 dark:border-white/10 hover:border-violet-400 dark:hover:border-violet-500/50 hover:bg-slate-50 dark:hover:bg-white/5'}
      `}
    >
      <input 
        type="file" 
        multiple 
        ref={fileInputRef} 
        className="hidden" 
        onChange={handleFileChange}
      />
      
      <div className="w-20 h-20 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icons.Upload className="w-8 h-8" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        Click or Drag photos here
      </h3>
      <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-sm mx-auto">
        Supports JPG, PNG, RAW. Up to 50 files or 2GB per batch.
      </p>

      <div className="flex justify-center gap-4">
          <span className="px-3 py-1 rounded bg-slate-100 dark:bg-white/5 text-xs font-mono text-slate-500">.JPG</span>
          <span className="px-3 py-1 rounded bg-slate-100 dark:bg-white/5 text-xs font-mono text-slate-500">.PNG</span>
          <span className="px-3 py-1 rounded bg-slate-100 dark:bg-white/5 text-xs font-mono text-slate-500">.RAW</span>
      </div>
    </div>
  );
};

export const UploadQueueCard = ({ 
    count, 
    progress, 
    thumbnail 
}: { 
    count: number, 
    progress: number, 
    thumbnail: string 
}) => {
    return (
        <div className="bg-white dark:bg-[#1a1b26] p-4 rounded-xl border border-slate-200 dark:border-white/5 flex items-center gap-4 shadow-lg animate-fade-in-up">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                <img src={thumbnail} alt="Upload" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">+{count - 1}</span>
                </div>
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white truncate">Uploading {count} items...</h4>
                    <span className="text-xs font-mono text-violet-500">{progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-xs text-slate-500 mt-1">2 mins remaining</p>
            </div>
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                <Icons.Close className="w-5 h-5" />
            </button>
        </div>
    );
};

export const SmartAlbumCard = () => {
    return (
        <div className="mt-4 p-4 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl text-white shadow-lg relative overflow-hidden group cursor-pointer hover:shadow-violet-500/25 transition-all">
            <div className="relative z-10 flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Icons.Sparkles className="w-4 h-4 text-yellow-300" />
                        <span className="text-xs font-bold uppercase tracking-wider text-white/90">AI Suggestion</span>
                    </div>
                    <h4 className="font-bold text-lg">Create "Summer 2024" Album?</h4>
                    <p className="text-sm text-white/80">Based on dates & location data.</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-violet-600 transition-colors">
                   <Icons.ArrowRight className="w-5 h-5" />
                </div>
            </div>
            {/* Decor */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
        </div>
    );
};
