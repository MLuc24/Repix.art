
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface AccountInfoCardProps {
  role: string;
  email: string;
  onViewPlans: () => void;
}

export const AccountInfoCard = ({ role, email, onViewPlans }: AccountInfoCardProps) => {
  const isPro = role === 'pro' || role === 'agency';

  return (
    <div className="h-full bg-white dark:bg-[#1a1b26]/60 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-[24px] p-6 flex flex-col shadow-sm dark:shadow-none transition-colors">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Icons.User className="w-4 h-4 text-violet-500 dark:text-violet-400" /> Account Details
        </h3>
        <button className="text-xs text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors font-medium">Edit</button>
      </div>

      <div className="flex-1 space-y-5">
        
        {/* Plan Row */}
        <div className="flex items-start justify-between group">
           <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Current Plan</p>
              <div className="flex items-center gap-2">
                 <span className={`text-sm font-bold ${isPro ? 'text-amber-500 dark:text-amber-400' : 'text-slate-900 dark:text-white'}`}>
                   {isPro ? 'Pro Creator' : 'Casual (Free)'}
                 </span>
                 {isPro && <Icons.Star className="w-3 h-3 text-amber-500 fill-amber-500" />}
              </div>
           </div>
           <button 
             onClick={onViewPlans}
             className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-[10px] font-bold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-white transition-all"
           >
             {isPro ? 'Manage' : 'Upgrade'}
           </button>
        </div>

        <div className="h-px bg-slate-100 dark:bg-white/5" />

        {/* Email Row */}
        <div>
           <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Email Address</p>
           <p className="text-sm font-medium text-slate-700 dark:text-slate-300 font-mono">{email}</p>
        </div>

        <div className="h-px bg-slate-100 dark:bg-white/5" />

        {/* Member Since Row */}
        <div>
           <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mb-1">Member Since</p>
           <p className="text-sm font-medium text-slate-700 dark:text-slate-300">October 24, 2023</p>
        </div>

      </div>
    </div>
  );
};
