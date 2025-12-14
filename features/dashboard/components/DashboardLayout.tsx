
import React, { useState, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { Logo } from '../../../shared/components/Logo';
import { MOCK_USER } from '../../../services/mock/dashboard';
import { MOCK_NOTIFICATIONS } from '../../../services/mock/notifications';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface DashboardLayoutProps {
  children?: React.ReactNode;
  user: typeof MOCK_USER;
  onLogout: () => void;
  onNavigate: (path: string) => void;
  activePage?: string;
  currentCredits?: number;
  sidebarItems?: SidebarItem[]; // Optional override
}

// --- CASUAL MENU ---
const CASUAL_SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icons.Layout className="w-5 h-5" /> },
  { id: 'my-images', label: 'My Images', icon: <Icons.Image className="w-5 h-5" /> },
  // Upload removed as per request
  { id: 'remix', label: 'AI Remix', icon: <Icons.Sparkles className="w-5 h-5" /> },
  { id: 'marketplace', label: 'Templates', icon: <Icons.Grid className="w-5 h-5" /> },
  { id: 'backgrounds', label: 'Backgrounds', icon: <Icons.Image className="w-5 h-5" /> },
  { id: 'avatar', label: 'Avatars', icon: <Icons.User className="w-5 h-5" /> },
];

// --- PRO MENU ---
const PRO_SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icons.Layout className="w-5 h-5" /> },
  { id: 'my-images', label: 'My Images', icon: <Icons.Image className="w-5 h-5" /> },
  { id: 'generator', label: 'Generator', icon: <Icons.Wand className="w-5 h-5" /> },
  { id: 'editor', label: 'Editor', icon: <Icons.Sliders className="w-5 h-5" /> },
  { id: 'marketplace', label: 'Templates', icon: <Icons.Grid className="w-5 h-5" /> }, 
  { id: 'backgrounds', label: 'Backgrounds', icon: <Icons.Image className="w-5 h-5" /> }, 
  { id: 'credits-log', label: 'Usage Log', icon: <Icons.FileText className="w-5 h-5" /> },
];

// --- FREELANCER MENU (Pro + Projects + Analytics) ---
const FREELANCER_SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <Icons.Layout className="w-5 h-5" /> },
  { id: 'freelancer-analytics', label: 'Performance', icon: <Icons.Activity className="w-5 h-5" /> }, 
  { id: 'freelancer-billing', label: 'Client Costs', icon: <Icons.CreditCard className="w-5 h-5" /> }, // NEW
  { id: 'projects', label: 'Client Projects', icon: <Icons.Briefcase className="w-5 h-5" /> }, 
  { id: 'my-images', label: 'My Images', icon: <Icons.Image className="w-5 h-5" /> },
  { id: 'generator', label: 'Generator', icon: <Icons.Wand className="w-5 h-5" /> },
  { id: 'editor', label: 'Editor', icon: <Icons.Sliders className="w-5 h-5" /> },
];

export const DashboardLayout = ({ 
  children, 
  user, 
  onLogout, 
  onNavigate, 
  activePage = 'dashboard', 
  currentCredits,
  sidebarItems
}: DashboardLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => document.body.classList.contains('dark'));
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const displayedCredits = currentCredits !== undefined ? currentCredits : user.credits;

  // AUTO-SELECT SIDEBAR BASED ON ROLE IF NOT PROVIDED
  const getSidebarItems = () => {
    if (sidebarItems) return sidebarItems;
    if (user.role === 'freelancer') return FREELANCER_SIDEBAR_ITEMS;
    if (user.role === 'pro') return PRO_SIDEBAR_ITEMS;
    return CASUAL_SIDEBAR_ITEMS;
  };

  const itemsToRender = getSidebarItems();

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#020617] transition-colors duration-300 font-sans overflow-x-hidden">
      
      {/* --- MOBILE SIDEBAR BACKDROP --- */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- SIDEBAR (LEFT) --- */}
      <aside className={`
        fixed left-0 top-0 h-screen w-64 bg-white dark:bg-[#0e0f14] border-r border-slate-200 dark:border-white/5 
        flex flex-col z-[70] transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        
        {/* Logo */}
        <div 
          className="h-20 flex items-center justify-between px-6"
        >
<Logo onClick={() => onNavigate('dashboard')} />
          
          {/* Close Mobile Menu */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
          >
            <Icons.Close className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
          {itemsToRender.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }
                `}
              >
                {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { 
                  className: `w-5 h-5 ${isActive ? 'text-white' : 'currentColor'}` 
                })}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer Area: User Profile & Upgrade */}
        <div className="p-4 border-t border-slate-200 dark:border-white/5 relative">
          
          {showProfileMenu && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setShowProfileMenu(false)} />
              <div className="absolute bottom-[calc(100%+8px)] left-4 right-4 z-40 animate-fade-in-up">
                 <div className="bg-white dark:bg-[#1a1b26] rounded-xl border border-slate-200 dark:border-white/10 shadow-xl p-1 flex flex-col overflow-hidden">
                    <button 
                      onClick={() => { onNavigate('profile'); setShowProfileMenu(false); }} 
                      className="px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-left transition-colors flex items-center gap-2"
                    >
                      <Icons.User className="w-4 h-4" /> Profile
                    </button>
                    <button 
                      onClick={() => { onNavigate('settings'); setShowProfileMenu(false); }} 
                      className="px-3 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg text-left transition-colors flex items-center gap-2"
                    >
                      <Icons.Settings className="w-4 h-4" /> Settings
                    </button>
                    <div className="h-px bg-slate-100 dark:bg-white/5 my-1" />
                    <button 
                      onClick={() => { onLogout(); setShowProfileMenu(false); }} 
                      className="px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg text-left transition-colors flex items-center gap-2"
                    >
                      <Icons.LogOut className="w-4 h-4" /> Logout
                    </button>
                 </div>
              </div>
            </>
          )}

          <div 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`
              flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer relative select-none
              ${showProfileMenu ? 'bg-slate-100 dark:bg-white/10' : 'hover:bg-slate-50 dark:hover:bg-white/5'}
            `}
          >
            <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full border border-slate-200 dark:border-white/10" />
            
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate capitalize">
                {user.role === 'pro' ? 'Pro Plan' : user.role === 'freelancer' ? 'Freelancer' : 'Free Plan'}
              </p>
            </div>

            {user.role === 'casual' && (
              <button 
                onClick={(e) => {
                  e.stopPropagation(); 
                  onNavigate('subscription');
                }}
                className="px-3 py-1.5 rounded-full bg-transparent border border-slate-300 dark:border-white/20 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors whitespace-nowrap"
              >
                Upgrade
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300 bg-slate-50 dark:bg-[#020617] lg:pl-64">
        
        <header className="sticky top-0 z-40 h-20 px-4 md:px-8 flex items-center justify-between bg-white/80 dark:bg-[#0e0f14]/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/5 transition-colors">
          
          {/* Mobile Hamburger */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 -ml-2 mr-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            <Icons.Grid className="w-6 h-6" />
          </button>

          <div className="hidden lg:flex flex-col w-64">
             <h1 className="text-lg font-bold text-slate-800 dark:text-white truncate">Welcome back, {user.name.split(' ')[0]} 👋</h1>
             <p className="text-xs text-slate-500 dark:text-slate-400 truncate">Ready to create something amazing?</p>
          </div>
          
          <div className="flex-1 max-w-2xl px-2 md:px-8 group">
             <div className="relative w-full">
               <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-violet-500 transition-colors">
                 <Icons.Search className="w-4 h-4" />
               </div>
               <input 
                 type="text" 
                 placeholder="Search projects..." 
                 className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent focus:bg-white dark:focus:bg-[#1a1b26] focus:border-violet-500 dark:focus:border-violet-500 focus:shadow-md focus:shadow-violet-500/10 text-sm text-slate-900 dark:text-white placeholder-slate-500 transition-all outline-none"
               />
             </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0 justify-end">
            <div 
              onClick={() => onNavigate('credits')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-500/50 cursor-pointer transition-colors group"
              title="Buy more credits"
            >
              <Icons.Bolt className="w-4 h-4 text-violet-600 dark:text-violet-400 group-hover:animate-pulse" />
              <span className="hidden md:inline text-sm font-bold text-slate-700 dark:text-white">{displayedCredits} Credits</span>
              <span className="md:hidden text-sm font-bold text-slate-700 dark:text-white">{displayedCredits}</span>
            </div>

            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors hidden sm:block"
            >
              {isDarkMode ? <Icons.Sun className="w-5 h-5" /> : <Icons.Moon className="w-5 h-5" />}
            </button>

            <div className="relative">
              <button 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`p-2.5 rounded-full transition-colors relative ${isNotifOpen ? 'bg-violet-50 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10'}`}
              >
                <Icons.Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white dark:border-[#0e0f14]" />
              </button>

              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsNotifOpen(false)} />
                  <div className="absolute right-0 top-12 w-80 bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10 rounded-2xl shadow-2xl p-2 z-40 animate-fade-in-up origin-top-right">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                      <h3 className="font-bold text-sm text-slate-800 dark:text-white">Notifications</h3>
                      <button className="text-xs text-violet-600 font-medium">Mark read</button>
                    </div>
                    <div className="py-2 max-h-64 overflow-y-auto">
                      {MOCK_NOTIFICATIONS.slice(0,3).map(n => (
                        <div key={n.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer rounded-lg transition-colors">
                          <p className="text-xs font-bold text-slate-800 dark:text-white mb-0.5">{n.title}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 w-full max-w-[100vw]">
          {children}
        </main>

      </div>
    </div>
  );
};
