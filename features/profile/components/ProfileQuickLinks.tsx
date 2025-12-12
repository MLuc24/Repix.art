
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

export const ProfileQuickLinks = ({ onNavigate }: { onNavigate: (path: string) => void }) => {
  const links = [
    { label: 'My Gallery', sub: 'View assets', icon: <Icons.Image className="w-5 h-5" />, path: 'my-images', color: 'text-blue-500 dark:text-blue-400 bg-blue-500/10' },
    { label: 'Billing', sub: 'Usage history', icon: <Icons.FileText className="w-5 h-5" />, path: 'credits-log', color: 'text-green-500 dark:text-green-400 bg-green-500/10' },
    { label: 'Legal', sub: 'Terms & Privacy', icon: <Icons.Shield className="w-5 h-5" />, path: '#', color: 'text-slate-500 dark:text-slate-400 bg-slate-500/10' },
    { label: 'API Keys', sub: 'Dev settings', icon: <Icons.Bolt className="w-5 h-5" />, path: '#', color: 'text-amber-500 dark:text-amber-400 bg-amber-500/10' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {links.map((link) => (
        <button
          key={link.label}
          onClick={() => link.path !== '#' && onNavigate(link.path)}
          className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 hover:border-violet-500/30 dark:hover:border-violet-500/50 hover:shadow-lg transition-all group text-left"
        >
          <div className={`p-3 rounded-xl ${link.color} group-hover:scale-110 transition-transform duration-300`}>
            {link.icon}
          </div>
          <div>
             <span className="block text-sm font-bold text-slate-800 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{link.label}</span>
             <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">{link.sub}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
