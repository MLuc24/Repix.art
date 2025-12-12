
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { FreelancerBadge } from '../../../roles/freelancer/foundation/FreelancerBadge'; // NEW IMPORT

interface ProfileIdentityCardProps {
  user: {
    name: string;
    email?: string;
    avatar: string;
    role?: string;
  };
  onLogout: () => void;
  onUpgrade?: () => void;
}

export const ProfileIdentityCard = ({ user, onLogout, onUpgrade }: ProfileIdentityCardProps) => {
  const isPro = user.role === 'pro' || user.role === 'agency';
  const isFreelancer = user.role === 'freelancer';

  return (
    <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 rounded-[24px] overflow-hidden shadow-sm dark:shadow-none flex flex-col transition-colors">
      
      {/* Top Banner Background */}
      <div className={`h-24 relative ${isFreelancer ? 'bg-gradient-to-r from-cyan-600 to-blue-600' : 'bg-gradient-to-r from-violet-500 to-fuchsia-500'}`}>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
      </div>

      {/* Content */}
      <div className="px-6 pb-6 -mt-12 flex flex-col items-center text-center">
        
        {/* Avatar */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full p-1 bg-white dark:bg-[#1a1b26] shadow-xl">
             <img 
               src={user.avatar} 
               alt={user.name} 
               className="w-full h-full object-cover rounded-full bg-slate-200 dark:bg-slate-800" 
             />
          </div>
          {/* Role Badge Icon */}
          <div className="absolute bottom-1 right-1">
             {isFreelancer ? (
                <div className="w-6 h-6 rounded-full bg-cyan-500 border-2 border-white dark:border-[#1a1b26] flex items-center justify-center text-black" title="Freelancer">
                   <Icons.Briefcase className="w-3.5 h-3.5" />
                </div>
             ) : isPro ? (
                <div className="w-6 h-6 rounded-full bg-amber-400 border-2 border-white dark:border-[#1a1b26] flex items-center justify-center text-black" title="Pro Plan">
                   <Icons.Star className="w-3.5 h-3.5" />
                </div>
             ) : (
                <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-[#1a1b26] flex items-center justify-center text-slate-500" title="Free Plan">
                   <Icons.User className="w-3.5 h-3.5" />
                </div>
             )}
          </div>
        </div>

        {/* User Details */}
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 justify-center">
          {user.name} 
          {isFreelancer && <FreelancerBadge />}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{user.email || 'user@repix.art'}</p>

        {/* Plan Info Block */}
        <div className="w-full bg-slate-50 dark:bg-white/5 rounded-xl p-4 mb-6 border border-slate-100 dark:border-white/5">
           <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Current Plan</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${isFreelancer ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/10 dark:text-cyan-400' : isPro ? 'bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'}`}>
                {isFreelancer ? 'FREELANCER' : isPro ? 'PRO' : 'FREE'}
              </span>
           </div>
           <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">Member Since</span>
              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Oct 2023</span>
           </div>
           
           {!isPro && !isFreelancer && (
             <button 
               onClick={onUpgrade}
               className="w-full mt-3 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity"
             >
               Upgrade to Pro
             </button>
           )}
        </div>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 text-sm font-bold transition-colors flex items-center justify-center gap-2"
        >
          <Icons.LogOut className="w-4 h-4" /> Sign Out
        </button>

      </div>
    </div>
  );
};
