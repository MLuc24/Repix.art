import React, { useState } from 'react';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';
import { Icons } from '../../../shared/components/Icons';

interface CreateCollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, icon: string) => void;
}

export const CreateCollectionModal = ({ isOpen, onClose, onCreate }: CreateCollectionModalProps) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderIcon, setNewFolderIcon] = useState('folder');

  const handleCreate = () => {
      if (!newFolderName.trim()) return;
      onCreate(newFolderName, newFolderIcon);
      setNewFolderName('');
      setNewFolderIcon('folder');
      onClose();
  };

  return (
      <GlassModal isOpen={isOpen} onClose={onClose}>
         <div className="p-4 w-full max-w-sm mx-auto">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">New Collection</h3>
            <div className="grid grid-cols-5 gap-2 mb-6">
                {['folder', 'heart', 'star', 'image', 'user'].map((icon) => (
                    <button
                        key={icon}
                        onClick={() => setNewFolderIcon(icon)}
                        className={`p-3 rounded-xl border flex items-center justify-center transition-all ${newFolderIcon === icon ? 'bg-violet-600 border-violet-600 text-white' : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500'}`}
                    >
                        {icon === 'heart' && <Icons.Wand className="w-5 h-5" />}
                        {icon === 'star' && <Icons.Star className="w-5 h-5" />}
                        {icon === 'folder' && <Icons.Layout className="w-5 h-5" />}
                        {icon === 'image' && <Icons.Image className="w-5 h-5" />}
                        {icon === 'user' && <Icons.User className="w-5 h-5" />}
                    </button>
                ))}
            </div>

            <input 
                autoFocus
                type="text" 
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                placeholder="Collection Name..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 mb-6"
            />
            
            <div className="flex gap-3">
                <button 
                  onClick={onClose} 
                  className="flex-1 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                    Cancel
                </button>
                <NeonButton 
                  onClick={handleCreate} 
                  disabled={!newFolderName.trim()}
                  className="flex-1 !w-auto"
                >
                    Create
                </NeonButton>
            </div>
         </div>
      </GlassModal>
  );
};
