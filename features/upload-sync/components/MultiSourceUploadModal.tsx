import React, { useState } from 'react';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';
import { Icons } from '../../../shared/components/Icons';
import { SyncProgressView } from './SyncLiteUI';
import { UploadDropzone } from './UploadUI';
import { AssetItem } from '../../my-images/types';
import { connectToDrive, initGoogleDrive, listDriveFiles, DriveFile, downloadDriveFile, getUserInfo, GoogleUserInfo } from '../services/googleDriveService';

interface MultiSourceUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (assets: AssetItem[]) => void;
  activeFolderName: string;
}

export const MultiSourceUploadModal = ({ isOpen, onClose, onConfirm, activeFolderName }: MultiSourceUploadModalProps) => {
  const [activeUploadTab, setActiveUploadTab] = useState<'local' | 'drive' | 'cloud' | 'link'>('local');
  const [isUploading, setIsUploading] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<AssetItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Link Tab State
  const [linkUrl, setLinkUrl] = useState('');
  const [linkStatus, setLinkStatus] = useState<'idle' | 'checking' | 'valid' | 'error'>('idle');

  // Real Drive State
  const [driveAuthState, setDriveAuthState] = useState<'idle' | 'loading' | 'connected' | 'error'>('idle');
  const [driveFiles, setDriveFiles] = useState<DriveFile[]>([]);
  const [driveToken, setDriveToken] = useState<string>('');
  const [driveUser, setDriveUser] = useState<GoogleUserInfo | null>(null);

  React.useEffect(() => {
      if (activeUploadTab === 'drive') {
         initGoogleDrive().catch(console.error);
      }
  }, [activeUploadTab]);

  const handleDriveConnect = async () => {
    try {
        setDriveAuthState('loading');
        const token = await connectToDrive();
        setDriveToken(token);
        
        const [files, user] = await Promise.all([
            listDriveFiles(token),
            getUserInfo(token)
        ]);

        setDriveFiles(files);
        setDriveUser(user);
        setDriveAuthState('connected');
    } catch (error) {
        console.error("Drive connection failed:", error);
        setDriveAuthState('error');
    }
  };

  const handleSelectDriveFile = async (file: DriveFile) => {
      if (selectedFiles.some(f => f.name === file.name)) return;

      try {
          const blob = await downloadDriveFile(file.id, driveToken);
          const fauxFile = new File([blob], file.name, { type: file.mimeType });
          setSelectedFiles(prev => [...prev, fauxFile]);
      } catch (e) {
          console.error("Failed to download file", e);
      }
  };

  // ... handleUploadComplete, handleConfirm, handleDiscard keys ...

// ...

                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                            {driveFiles.map((file) => {
                                                const isSelected = selectedFiles.some(f => f.name === file.name);
                                                return (
                                                    <div 
                                                        key={file.id} 
                                                        onClick={() => handleSelectDriveFile(file)}
                                                        className={`
                                                            relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all group
                                                            ${isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent hover:border-blue-300'}
                                                        `}
                                                    >
                                                        {file.thumbnailLink && (
                                                            <img src={file.thumbnailLink} alt={file.name} className="w-full h-full object-cover" />
                                                        )}
                                                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                            {isSelected ? <Icons.Check className="w-6 h-6 text-white" /> : <Icons.Plus className="w-6 h-6 text-white" />}
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px] truncate">
                                                            {file.name}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>


  const handleUploadComplete = () => {
    setIsUploading(false);
    
    // Create final assets
    // Create final assets
    const newFiles: AssetItem[] = selectedFiles.map((file, idx) => ({
          id: `new_${Date.now()}_${idx}`,
          title: file.name,
          src: (file as any).externalUrl || URL.createObjectURL(file), // Support external links for preview
          source: 'upload',
          createdAt: new Date().toISOString(),
          folderId: '', 
          meta: { width: 1920, height: 1080 }
    }));

    // Reset local state
    setSelectedFiles([]);
    setPendingUploads([]);
    
    // Notify parent to add assets and show success
    onConfirm(newFiles);
    // Close this modal
    onClose();
  };

  const handleConfirm = () => {
    if (selectedFiles.length > 0) {
        setIsUploading(true);
    } else if (pendingUploads.length > 0) {
         // Fallback for other sources if they used pendingUploads
         onConfirm(pendingUploads);
         setPendingUploads([]);
         onClose();
    }
  };

  const handleDiscard = () => {
      setPendingUploads([]);
      setSelectedFiles([]);
      onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={() => {
        if (!isUploading) onClose();
    }}>
        <div className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Multi-Source Upload</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">Import media from your device or cloud services.</p>
            </div>

            {/* 1. Progress Step */}
            {isUploading ? (
                <div className="animate-fade-in py-8">
                    <SyncProgressView onComplete={handleUploadComplete} />
                </div>
            ) : pendingUploads.length > 0 ? (
                <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-slate-900 dark:text-white">Review Uploads</h3>
                        <span className="text-xs text-slate-500">{pendingUploads.length} items ready</span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {pendingUploads.map(file => (
                            <div key={file.id} className="relative aspect-square rounded-xl overflow-hidden group">
                                <img src={file.src} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors">
                                        <Icons.Trash className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3">
                         <button 
                            onClick={handleDiscard}
                            className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                         >
                            Discard
                         </button>
                         <NeonButton onClick={handleConfirm} className="flex-1 !w-auto">
                            Save to {activeFolderName}
                         </NeonButton>
                    </div>
                </div>
            ) : (
                <>
                {/* 3. Source Selection Tabs */}
                <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
                    {[
                        { id: 'local', label: 'Device', icon: Icons.Smartphone, color: 'violet' },
                        { id: 'drive', label: 'Drive', icon: Icons.Google, color: 'blue' },
                        { id: 'cloud', label: 'Cloud', icon: Icons.Cloud, color: 'cyan' },
                        { id: 'link', label: 'Link', icon: Icons.Link, color: 'pink' },
                    ].map((tab) => {
                        const Icon = tab.icon;
                        return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveUploadTab(tab.id as any)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-bold transition-all whitespace-nowrap
                                ${activeUploadTab === tab.id 
                                    ? `bg-${tab.color}-100 dark:bg-${tab.color}-900/30 border-${tab.color}-500 text-${tab.color}-700 dark:text-${tab.color}-400` 
                                    : 'bg-transparent border-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                                }
                            `}
                        >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                        );
                    })}
                </div>

                {/* Content Area */}
                <div className="min-h-[300px] flex flex-col">

                    {activeUploadTab === 'local' && (
                        <div className="animate-fade-in h-full flex flex-col">
                            <UploadDropzone 
                                onFilesSelected={(files) => setSelectedFiles(prev => [...prev, ...files])} 
                                previewFiles={selectedFiles}
                                onClear={() => setSelectedFiles([])}
                            />
                            {selectedFiles.length > 0 && (
                                <div className="mt-4 flex justify-center animate-fade-in-up">
                                    <NeonButton onClick={handleConfirm} className="!w-auto px-8">
                                        Start Upload ({selectedFiles.length})
                                    </NeonButton>
                                </div>
                            )}
                        </div>
                    )}

                    {activeUploadTab === 'drive' && (
                        <div className="h-full">
                            {!driveAuthState || driveAuthState === 'idle' ? (
                                <div className="animate-fade-in flex flex-col items-center justify-center h-full py-8 border-2 border-dashed border-blue-200 dark:border-blue-500/30 rounded-3xl bg-blue-50/50 dark:bg-blue-900/10">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4">
                                        <Icons.Google className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Google Drive</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-xs text-sm">
                                        Connect your account to access photos directly from Drive.
                                    </p>
                                    <NeonButton 
                                        onClick={handleDriveConnect} 
                                        className="!w-auto px-8 bg-blue-600 hover:bg-blue-700"
                                    >
                                        Connect Account
                                    </NeonButton>
                                </div>
                            ) : driveAuthState === 'loading' ? (
                                <div className="animate-fade-in flex flex-col items-center justify-center h-full">
                                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">Connecting to Google...</p>
                                </div>
                            ) : (
                                <div className="animate-fade-in h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-4 px-2">
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            {driveUser?.photoLink ? (
                                                <img src={driveUser.photoLink} className="w-6 h-6 rounded-full" alt="avatar" />
                                            ) : (
                                                <Icons.Google className="w-4 h-4" />
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{driveUser?.emailAddress || 'My Drive'}</span>
                                                <span className="text-[10px] text-slate-400">/ Google Drive / Photos</span>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={() => {
                                                setDriveAuthState('idle');
                                                setDriveUser(null);
                                                setDriveFiles([]);
                                            }} 
                                            className="text-xs text-red-500 hover:text-red-600 font-bold px-2 py-1 hover:bg-red-50 dark:hover:bg-red-900/10 rounded transition-colors"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                    
                                    <div className="flex-1 overflow-y-auto custom-scrollbar p-1 max-h-[400px]">
                                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                            {driveFiles.map((file) => {
                                                const isSelected = selectedFiles.some(f => f.name === file.name);
                                                return (
                                                    <div 
                                                        key={file.id} 
                                                        onClick={() => handleSelectDriveFile(file)}
                                                        className={`
                                                            relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all group
                                                            ${isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent hover:border-blue-300'}
                                                        `}
                                                    >
                                                        <img src={file.thumbnailLink} alt={file.name} className="w-full h-full object-cover" />
                                                        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                            {isSelected ? <Icons.Check className="w-6 h-6 text-white" /> : <Icons.Plus className="w-6 h-6 text-white" />}
                                                        </div>
                                                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px] truncate">
                                                            {file.name}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {selectedFiles.length > 0 && (
                                        <div className="mt-4 flex justify-center animate-fade-in-up">
                                            <NeonButton onClick={handleConfirm} className="!w-auto px-8 bg-blue-600 hover:bg-blue-700">
                                                Import Selected ({selectedFiles.length})
                                            </NeonButton>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeUploadTab === 'cloud' && (
                        <div className="animate-fade-in flex flex-col items-center justify-center h-full py-8 border-2 border-dashed border-cyan-200 dark:border-cyan-500/30 rounded-3xl bg-cyan-50/50 dark:bg-cyan-900/10">
                            <div className="w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 rounded-full flex items-center justify-center mb-4">
                            <Icons.Cloud className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cloud Storage</h3>
                            <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-xs text-sm">
                            Sync seamlessly from Dropbox, OneDrive, or Box.
                            </p>
                            <div className="flex gap-3">
                                <NeonButton onClick={() => { setIsUploading(true); }} className="!w-auto px-6 bg-[#0061FE] hover:bg-[#0061FE]/80">
                                    Dropbox
                                </NeonButton>
                                <NeonButton onClick={() => { setIsUploading(true); }} className="!w-auto px-6 bg-[#0078D4] hover:bg-[#0078D4]/80">
                                    OneDrive
                                </NeonButton>
                            </div>
                        </div>
                    )}


                    {activeUploadTab === 'link' && (
                        <div className="animate-fade-in flex flex-col items-center justify-center h-full py-8 border-2 border-dashed border-pink-200 dark:border-pink-500/30 rounded-3xl bg-pink-50/50 dark:bg-pink-900/10 transition-all">
                            
                            {/* Hidden Image for Validation */}
                            {linkUrl && (
                                <img 
                                    src={linkUrl} 
                                    className="hidden" 
                                    onLoad={() => setLinkStatus('valid')} 
                                    onError={() => setLinkStatus('error')} 
                                    alt="check" 
                                />
                            )}

                            {linkStatus === 'valid' ? (
                                <div className="mb-6 relative group w-64 aspect-video bg-black/5 rounded-xl overflow-hidden border-2 border-pink-500 shadow-lg animate-fade-in-up">
                                     <img src={linkUrl} className="w-full h-full object-contain" alt="Preview" />
                                     <button 
                                        onClick={() => {
                                            setLinkUrl('');
                                            setLinkStatus('idle');
                                        }}
                                        className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-full hover:bg-red-500 transition-colors"
                                     >
                                         <Icons.Times className="w-4 h-4" />
                                     </button>
                                     <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-white text-[10px] truncate px-3">
                                         {linkUrl}
                                     </div>
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full flex items-center justify-center mb-4">
                                        <Icons.Link className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Import via Link</h3>
                                    <p className="text-slate-500 dark:text-slate-400 mb-6 text-center max-w-xs text-sm">
                                    Paste a direct URL to an image file (JPG, PNG, WEBP).
                                    </p>
                                </>
                            )}

                            <div className="flex gap-2 w-full max-w-sm relative z-10">
                                <input 
                                    type="text" 
                                    value={linkUrl}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && linkStatus === 'valid') {
                                           // Trigger add
                                           document.getElementById('add-link-btn')?.click();
                                        }
                                    }}
                                    onChange={(e) => {
                                        setLinkUrl(e.target.value);
                                        setLinkStatus('checking');
                                    }}
                                    placeholder="https://example.com/image.webp"
                                    className={`
                                        flex-1 px-4 py-2 rounded-xl border bg-white dark:bg-[#1a1b26] focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm pr-10
                                        ${linkStatus === 'error' ? 'border-red-500 text-red-500' : 'border-slate-200 dark:border-white/10'}
                                    `}
                                />
                                {linkStatus === 'checking' && linkUrl && (
                                    <div className="absolute right-[100px] top-3 w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                                )}
                                
                                <NeonButton 
                                    id="add-link-btn"
                                    disabled={linkStatus !== 'valid'}
                                    onClick={() => {
                                        try {
                                           fetch(linkUrl)
                                            .then(res => res.blob())
                                            .then(blob => {
                                                const fileName = linkUrl.split('/').pop()?.split('?')[0] || `image_${Date.now()}.jpg`;
                                                const file = new File([blob], fileName, { type: blob.type });
                                                (file as any).externalUrl = linkUrl; 
                                                setSelectedFiles(prev => [...prev, file]);
                                                setLinkUrl('');
                                                setLinkStatus('idle');
                                            })
                                            .catch(() => {
                                                const fileName = linkUrl.split('/').pop()?.split('?')[0] || `image_${Date.now()}.jpg`;
                                                const file = new File([""], fileName, { type: "image/jpeg" });
                                                (file as any).externalUrl = linkUrl;
                                                setSelectedFiles(prev => [...prev, file]);
                                                setLinkUrl('');
                                                setLinkStatus('idle');
                                            });
                                        } catch (e) {
                                            console.error(e);
                                        }
                                    }} 
                                    className={`!w-auto px-6 ${linkStatus !== 'valid' ? 'opacity-50 cursor-not-allowed bg-slate-400' : 'bg-pink-600 hover:bg-pink-700'}`}
                                >
                                    Add
                                </NeonButton>
                            </div>
                            {linkStatus === 'error' && (
                                <p className="text-red-500 text-xs mt-2">Could not load image. Please check the URL.</p>
                            )}

                            {/* Added Links Queue */}
                            {selectedFiles.length > 0 && (
                                <div className="mt-8 w-full">
                                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3 px-1">
                                        Prepared ({selectedFiles.length})
                                    </h4>
                                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-[200px] overflow-y-auto custom-scrollbar p-1">
                                        {selectedFiles.map((file, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group bg-black/5 border border-slate-200 dark:border-white/10">
                                                 <img 
                                                    src={(file as any).externalUrl || URL.createObjectURL(file)} 
                                                    className="w-full h-full object-cover" 
                                                    alt="thumb" 
                                                />
                                                <button 
                                                    onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                                                    className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <Icons.Times className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-6 flex justify-center animate-fade-in-up">
                                        <NeonButton onClick={handleConfirm} className="!w-auto px-12 bg-pink-600 hover:bg-pink-700">
                                            Start Import
                                        </NeonButton>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                </>
            )}
        </div>
      </GlassModal>
  );
};
