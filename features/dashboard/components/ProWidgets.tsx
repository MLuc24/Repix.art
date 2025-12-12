
import React, { useState, useMemo } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';
import { RecentFileCard } from './DashboardWidgets'; // Use Shared Base Component
import { RECENT_FILES } from '../../../services/mock/dashboard';

// --- 3.1 PRO QUICK ACTIONS BAR ---
interface ProQuickActionsProps {
  onAction: (action: string) => void;
}

export const ProQuickActionsBar = ({ onAction }: ProQuickActionsProps) => {
  const actions = [
    { id: 'batch_gen', label: 'Batch Gen', icon: <Icons.Layout />, color: 'text-violet-500 dark:text-violet-400', desc: 'Create 4 images' },
    { id: 'editor', label: 'Editor', icon: <Icons.Sliders />, color: 'text-blue-500 dark:text-blue-400', desc: 'Open Workspace' },
    { id: 'remove_bg', label: 'Remove BG', icon: <Icons.Scissors />, color: 'text-fuchsia-500 dark:text-fuchsia-400', desc: 'Smart Cutout' },
    { id: 'upscale', label: 'HD Upscale', icon: <Icons.Maximize />, color: 'text-amber-500 dark:text-amber-400', desc: '4K Enhance' },
  ];

  return (
    <div className="flex items-center gap-3 w-full bg-white dark:bg-[#1a1b26]/50 border border-slate-200 dark:border-white/10 rounded-2xl p-2 backdrop-blur-md shadow-sm">
      {actions.map((action) => (
        <button
          key={action.id}
          onClick={() => onAction(action.id)}
          className="flex-1 flex flex-col md:flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group relative overflow-hidden"
          title={action.desc}
        >
          <div className={`${action.color} group-hover:scale-110 transition-transform`}>
            {React.cloneElement(action.icon as React.ReactElement<any>, { width: 20, height: 20 })}
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

// --- 3.2 PRO RECOMMENDED TOOLS ---
interface ToolItem {
  id: string;
  title: string;
  desc: string;
  iconType: string;
}

export const RecommendedToolsPro = ({ tools, onSelect }: { tools: ToolItem[], onSelect: (id: string) => void }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onSelect(tool.id)}
          className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 hover:border-violet-500/30 hover:bg-slate-50 dark:hover:bg-[#1f202e] transition-all text-left group shadow-sm dark:shadow-none"
        >
          <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors">
            {tool.iconType === 'Image' && <Icons.Image className="w-5 h-5" />}
            {tool.iconType === 'Layout' && <Icons.Layout className="w-5 h-5" />}
            {tool.iconType === 'Maximize' && <Icons.Maximize className="w-5 h-5" />}
            {tool.iconType === 'Sliders' && <Icons.Sliders className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-0.5 group-hover:text-violet-600 dark:group-hover:text-violet-300 transition-colors">{tool.title}</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-500">{tool.desc}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

// --- 3.5 OPEN LAST PROJECT BANNER ---
export const LastProjectBanner = ({ onClick }: { onClick: () => void }) => (
  <div 
    onClick={onClick}
    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-violet-600/90 to-indigo-600/90 dark:from-violet-900/40 dark:to-indigo-900/40 border border-violet-200/20 dark:border-violet-500/20 cursor-pointer hover:border-white/30 dark:hover:border-violet-500/40 transition-all mb-6 group shadow-lg shadow-violet-500/10"
  >
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-white/20 dark:bg-black/40 flex items-center justify-center border border-white/20 dark:border-white/10 text-white">
        <Icons.Refresh className="w-4 h-4" />
      </div>
      <div>
        <p className="text-xs font-bold text-white group-hover:text-violet-100 dark:group-hover:text-violet-200 transition-colors">Continue editing "{RECENT_FILES[0].name}"</p>
        <p className="text-[10px] text-violet-100/70 dark:text-slate-400">Autosaved 2 mins ago</p>
      </div>
    </div>
    <div className="px-3 py-1.5 rounded-lg bg-white/20 dark:bg-white/10 text-[10px] font-bold text-white hover:bg-white/30 transition-colors border border-white/10">
      Open Project
    </div>
  </div>
);

// --- PRO FILTER BAR ---
interface ProFilterBarProps {
  active: string;
  onChange: (filter: string) => void;
}

const ProFilterBar = ({ active, onChange }: ProFilterBarProps) => {
  const filters = ['All', 'Edited', 'Generated', 'Pro Models', 'Upscaled'];
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mask-gradient-x">
      {filters.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`
            whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
            ${active === f 
              ? 'bg-slate-800 text-white border-slate-800 dark:bg-white dark:text-black dark:border-white' 
              : 'bg-white dark:bg-transparent border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5'
            }
          `}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

// --- VIEW MODE SWITCHER ---
const ViewModeSwitcher = ({ mode, onChange }: { mode: 'grid' | 'list', onChange: (m: 'grid' | 'list') => void }) => (
  <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-lg border border-slate-200 dark:border-white/5">
    <button 
      onClick={() => onChange('grid')}
      className={`p-1.5 rounded-md transition-all ${mode === 'grid' ? 'bg-white dark:bg-[#1a1b26] text-violet-600 dark:text-white shadow-sm' : 'text-slate-400'}`}
      title="Grid View"
    >
      <Icons.Grid className="w-4 h-4" />
    </button>
    <button 
      onClick={() => onChange('list')}
      className={`p-1.5 rounded-md transition-all ${mode === 'list' ? 'bg-white dark:bg-[#1a1b26] text-violet-600 dark:text-white shadow-sm' : 'text-slate-400'}`}
      title="Compact List"
    >
      <Icons.Layout className="w-4 h-4" /> 
    </button>
  </div>
);

// --- COMPACT FILE ROW (Pro Version) ---
interface FileItem {
  id: number;
  src: string;
  name: string;
  date: string;
  status: string;
  size: string;
  type: string;
  model?: string;
  resolution?: string;
}

export const ProCompactRow: React.FC<{ file: FileItem, onOpen: () => void }> = ({ file, onOpen }) => (
  <div 
    onClick={onOpen}
    className="group flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 hover:border-violet-500/30 cursor-pointer transition-all hover:bg-slate-50 dark:hover:bg-[#1f202e] shadow-sm dark:shadow-none"
  >
    {/* Thumbnail */}
    <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5">
      <img src={file.src} alt={file.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
    </div>
    
    {/* Info */}
    <div className="flex-1 min-w-0 grid grid-cols-12 gap-4 items-center">
      <div className="col-span-5 md:col-span-4">
        <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</h4>
        <p className="text-[10px] text-slate-500 truncate">{file.type} • {file.size}</p>
      </div>
      
      <div className="hidden md:block col-span-3">
        {file.model ? (
          <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30 px-1.5 py-0.5 rounded border border-violet-200 dark:border-violet-500/30">
            {file.model}
          </span>
        ) : (
          <span className="text-[10px] text-slate-400">-</span>
        )}
      </div>

      <div className="col-span-3 text-right">
         <p className="text-xs text-slate-500">{file.date}</p>
      </div>

      <div className="col-span-4 md:col-span-2 flex justify-end gap-2">
         <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${file.status === 'Generated' ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`}>
            {file.status}
         </span>
      </div>
    </div>

    {/* Actions */}
    <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
      <Icons.ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

// --- 4. PRO RECENT FILES CONTAINER (Composed Component) ---
interface ProRecentFilesSectionProps {
  onNavigate: (path: string) => void;
}

export const ProRecentFilesSection = ({ onNavigate }: ProRecentFilesSectionProps) => {
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter Logic
  const filteredFiles = useMemo(() => {
    return RECENT_FILES.filter(f => {
      if (filter === 'All') return true;
      if (filter === 'Edited') return f.status === 'Edited';
      if (filter === 'Generated') return f.status === 'Generated';
      if (filter === 'Pro Models') return f.tags?.includes('Pro Model');
      if (filter === 'Upscaled') return f.tags?.includes('Upscaled') || f.tags?.includes('HD');
      return true;
    });
  }, [filter]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Assets</h2>
        
        <div className="flex items-center gap-4">
          <ProFilterBar active={filter} onChange={setFilter} />
          <ViewModeSwitcher mode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      <LastProjectBanner onClick={() => onNavigate('editor')} />

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredFiles.map((file, idx) => (
            <div key={file.id} onClick={() => onNavigate('editor')}>
              <RecentFileCard 
                {...file} 
                delay={`${idx * 0.05}s`} 
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredFiles.map((file) => (
            <ProCompactRow key={file.id} file={file} onOpen={() => onNavigate('editor')} />
          ))}
        </div>
      )}
    </div>
  );
};

// --- 3.6 CREDIT WIDGET PRO ---
export const ProCreditWidget = ({ credits, onTopUp }: { credits: number, onTopUp: () => void }) => (
  <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="p-2 rounded-full bg-amber-500/20 text-amber-500">
        <Icons.Star className="w-5 h-5" />
      </div>
      <div>
        <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Pro Balance</p>
        <p className="text-lg font-extrabold text-slate-900 dark:text-white leading-none">{credits} <span className="text-xs font-normal text-slate-500">Credits</span></p>
      </div>
    </div>
    <NeonButton onClick={onTopUp} className="!w-auto !py-2 !px-4 !text-xs !bg-gradient-to-r !from-amber-500 !to-orange-500">
      Top Up
    </NeonButton>
  </div>
);

// --- 3.7 PROMO BLOCK ---
export const ProPromoBlock = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-900 to-indigo-900 p-4 flex items-center justify-between shadow-lg">
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
    <div className="relative z-10">
      <p className="text-sm font-bold text-white">Try RealPhoto V3 Model</p>
      <p className="text-xs text-indigo-200">Starting at 2 credits/image.</p>
    </div>
    <button className="relative z-10 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg border border-white/20 transition-colors">
      Try Now
    </button>
  </div>
);
