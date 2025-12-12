
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

// --- QUICK ACTION CARD ---
interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string; // Tailwind gradient classes
  onClick?: () => void;
  delay?: string;
}

export const QuickActionCard = ({ title, subtitle, icon, color, onClick, delay = '0s' }: ActionCardProps) => (
  <button 
    onClick={onClick}
    style={{ animationDelay: delay }}
    className={`
      group relative w-full text-left p-6 h-48 rounded-3xl overflow-hidden
      bg-white dark:bg-[#1a1b26] 
      hover:bg-white dark:hover:bg-[#1f202e]
      border border-slate-200 dark:border-white/5
      hover:border-violet-200 dark:hover:border-violet-500/30
      transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-violet-900/10
      animate-fade-in-up flex flex-col justify-between
    `}
  >
    {/* Gradient Background Effect on Hover */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
    
    <div className={`
      w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white
      shadow-lg shadow-black/5 group-hover:scale-110 transition-transform duration-300
    `}>
      {icon}
    </div>

    <div>
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-600 group-hover:to-fuchsia-600 dark:group-hover:from-violet-400 dark:group-hover:to-fuchsia-400">
        {title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
        {subtitle}
      </p>
    </div>
    
    {/* Decorative Circle */}
    <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-gradient-to-br ${color} opacity-5 blur-2xl group-hover:opacity-10 transition-all duration-500`} />
  </button>
);

// --- SUGGESTION CARD ---
interface SuggestionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  delay?: string;
}

export const SuggestionCard = ({ title, subtitle, icon, delay = '0s' }: SuggestionCardProps) => (
  <div 
    style={{ animationDelay: delay }}
    className="
      group flex items-center gap-4 p-4 rounded-2xl 
      bg-white dark:bg-[#1a1b26]
      border border-slate-200 dark:border-white/5
      hover:border-violet-200 dark:hover:border-violet-500/30
      hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none
      cursor-pointer transition-all duration-300 animate-fade-in-up
    "
  >
    <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/5 text-violet-600 dark:text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-0.5">
        <h4 className="font-semibold text-slate-800 dark:text-white">{title}</h4>
        <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-100 dark:border-cyan-500/20">AI Pick</span>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
    <Icons.ArrowRight className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all" />
  </div>
);

// --- RECENT FILE CARD (BASE) ---
interface FileCardProps {
  src: string;
  name: string;
  status: string;
  date: string;
  delay?: string;
  tags?: string[]; // PRO FEATURE EXTENSION
}

export const RecentFileCard = ({ src, name, status, date, delay = '0s', tags }: FileCardProps) => (
  <div 
    style={{ animationDelay: delay }}
    className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer animate-fade-in-up shadow-sm hover:shadow-xl dark:shadow-none transition-shadow duration-300 border border-slate-200 dark:border-white/5 bg-[#1a1b26]"
  >
    <img src={src} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    
    {/* PRO TAGS OVERLAY */}
    {tags && tags.length > 0 && (
      <div className="absolute top-3 left-3 flex gap-1">
        {tags.map(tag => (
          <span key={tag} className="px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm border border-white/10 text-[9px] font-bold text-white uppercase tracking-wide">
            {tag}
          </span>
        ))}
      </div>
    )}

    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
       <button className="px-6 py-2 bg-white text-slate-900 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg">Edit</button>
       <button className="px-6 py-2 bg-white/20 text-white border border-white/50 rounded-full font-bold text-sm hover:bg-white/30 transition-all backdrop-blur-md">Remix</button>
    </div>
    
    <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
      <p className="text-sm font-medium text-white truncate">{name}</p>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-slate-300">{date}</span>
        <span className="text-[10px] px-1.5 rounded bg-white/20 text-white border border-white/20 uppercase font-bold">{status}</span>
      </div>
    </div>
  </div>
);

// --- HIGHLIGHT FEATURE CARD ---
export const FeatureHighlightCard = ({ title, icon, color }: { title: string, icon: React.ReactNode, color: string }) => (
  <div className="relative p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 group hover:border-slate-300 dark:hover:border-white/10 hover:shadow-md dark:hover:shadow-none transition-all duration-300 overflow-hidden cursor-pointer">
     <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
     <div className="flex flex-col items-center text-center gap-2 relative z-10">
        <div className={`p-2 rounded-lg bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-white group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{title}</span>
     </div>
  </div>
);

// --- DASHBOARD HEADER ---
export const DashboardHeader = ({ user, onLogout }: { user: any, onLogout: () => void }) => (
  <header className="flex items-center justify-between px-6 py-4 bg-transparent relative z-50">
     <div className="flex items-center gap-2">
       <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20">
            R
       </div>
       <span className="text-xl font-bold text-white tracking-tight">REPIX</span>
     </div>

     <div className="flex items-center gap-4">
        <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Help</button>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-3 cursor-pointer group relative">
             <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-white/10" />
             <span className="text-sm font-medium text-white hidden md:block">{user.name}</span>
             
             <div className="absolute top-full right-0 pt-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-50">
                <div className="bg-[#1a1b26] border border-white/10 rounded-xl p-1 shadow-xl min-w-[120px]">
                   <button onClick={onLogout} className="w-full text-left px-3 py-2 text-xs font-medium text-red-400 hover:bg-white/5 rounded-lg">Log Out</button>
                </div>
             </div>
        </div>
     </div>
  </header>
);
