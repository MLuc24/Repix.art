
import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { AssetFolder } from '../../../../features/my-images/types';

interface FolderListProps {
  folders: AssetFolder[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
  onCreate: () => void;
}

const getIcon = (type: string, isActive: boolean) => {
  const className = `w-4 h-4 ${isActive ? 'text-white' : (
    type === 'heart' ? 'text-pink-500' : 
    type === 'star' ? 'text-amber-500' : 
    'text-blue-500'
  )}`;

  switch(type) {
    case 'heart': return <Icons.Wand className={className} />; 
    case 'star': return <Icons.Star className={className} />;
    default: return <Icons.Image className={className} />; 
  }
};

export const FolderList = ({ folders, activeId, onSelect, onCreate }: FolderListProps) => {
  return (
    <div className="w-full p-4 space-y-6">


       <div>
          <div className="flex items-center justify-between px-3 mb-2">
             <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Collections</span>
             <button onClick={onCreate} className="p-1 hover:bg-slate-100 dark:hover:bg-white/5 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white"><Icons.Plus className="w-3 h-3" /></button>
          </div>
          <div className="space-y-1">
             <button 
               onClick={() => onSelect(null)}
               className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeId === null ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
             >
                <Icons.Grid className={`w-4 h-4 ${activeId === null ? 'text-white' : 'text-slate-400'}`} />
                <span className="text-sm font-bold">All Assets</span>
             </button>
             {folders.map(folder => (
               <button 
                 key={folder.id}
                 onClick={() => onSelect(folder.id)}
                 className={`w-full flex items-center justify-between p-3 rounded-xl transition-all group ${activeId === folder.id ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5'}`}
               >
                  <div className="flex items-center gap-3">
                     {getIcon(folder.icon, activeId === folder.id)}
                     <span className="text-sm font-medium">{folder.name}</span>
                  </div>
                  <span className={`text-xs ${activeId === folder.id ? 'text-violet-200' : 'text-slate-400 dark:text-slate-600 group-hover:text-slate-600 dark:group-hover:text-slate-500'}`}>{folder.count}</span>
               </button>
             ))}
          </div>
       </div>
    </div>
  );
};
