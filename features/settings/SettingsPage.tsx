
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { Icons } from '../../shared/components/Icons';
import { NeonButton, GlassPanel } from '../../shared/components/GlassUI';
import { MOCK_USER } from '../../services/mock/dashboard';

interface SettingsPageProps {
  user?: typeof MOCK_USER;
  onLogout: () => void;
  onNavigate: (path: string) => void;
}

type SettingsTab = 'general' | 'appearance' | 'notifications' | 'security' | 'api';

export const SettingsPage = ({ user: propUser, onLogout, onNavigate }: SettingsPageProps) => {
  const user = propUser || MOCK_USER;
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');

  // --- LOCAL STATE FOR SETTINGS ---
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);

  useEffect(() => {
    // Sync local state with actual theme if possible
    const storedTheme = localStorage.getItem('theme_preference');
    if (storedTheme) setTheme(storedTheme);
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme_preference', newTheme);
    if (newTheme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  const TABS = [
    { id: 'general', label: 'General', icon: <Icons.Settings className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Icons.Image className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Icons.Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Icons.Lock className="w-4 h-4" /> },
    { id: 'api', label: 'API Keys', icon: <Icons.Layout className="w-4 h-4" /> },
  ];

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="settings">
      <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
        
        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your workspace configuration and preferences.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* SIDEBAR NAVIGATION */}
          <div className="lg:col-span-3 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as SettingsTab)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${activeTab === tab.id 
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20' 
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* CONTENT PANEL */}
          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/5 rounded-2xl p-6 min-h-[500px] shadow-sm dark:shadow-none">
              
              {/* --- GENERAL TAB --- */}
              {activeTab === 'general' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Language & Region</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-500 uppercase">Interface Language</label>
                         <div className="relative">
                           <select 
                             value={language}
                             onChange={(e) => setLanguage(e.target.value)}
                             className="w-full bg-slate-50 dark:bg-[#0e0f14] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-violet-500 transition-colors appearance-none"
                           >
                             <option value="en">English (US)</option>
                             <option value="vi">Tiếng Việt</option>
                             <option value="fr">Français</option>
                             <option value="jp">日本語</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                             <Icons.ChevronLeft className="-rotate-90 w-4 h-4" />
                           </div>
                         </div>
                      </div>
                      <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-500 uppercase">Timezone</label>
                         <div className="relative">
                           <select className="w-full bg-slate-50 dark:bg-[#0e0f14] border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:border-violet-500 transition-colors appearance-none">
                             <option>(GMT-07:00) Pacific Time</option>
                             <option>(GMT+07:00) Bangkok, Hanoi</option>
                             <option>(GMT+00:00) UTC</option>
                           </select>
                           <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                             <Icons.ChevronLeft className="-rotate-90 w-4 h-4" />
                           </div>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-slate-200 dark:border-white/5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Danger Zone</h3>
                    <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-xl p-4 flex items-center justify-between">
                       <div>
                         <p className="font-bold text-red-600 dark:text-red-400">Delete Workspace</p>
                         <p className="text-xs text-red-500/70 mt-1">Once deleted, all of your assets and data will be permanently removed.</p>
                       </div>
                       <button className="px-4 py-2 bg-red-100 dark:bg-red-500/10 text-red-600 hover:bg-red-200 dark:hover:bg-red-500/20 rounded-lg text-sm font-bold transition-colors">
                         Delete Account
                       </button>
                    </div>
                  </div>
                </div>
              )}

              {/* --- APPEARANCE TAB --- */}
              {activeTab === 'appearance' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Theme Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Dark */}
                      <div 
                        onClick={() => handleThemeChange('dark')}
                        className={`cursor-pointer group relative rounded-xl overflow-hidden border-2 transition-all ${theme === 'dark' ? 'border-violet-500' : 'border-slate-200 dark:border-white/10 hover:border-violet-500/50'}`}
                      >
                         <div className="h-24 bg-[#0f0f12] relative">
                            <div className="absolute top-2 left-2 w-16 h-12 bg-[#1a1b26] rounded-lg border border-white/10"></div>
                            <div className="absolute top-2 right-2 w-6 h-6 bg-violet-600 rounded-full"></div>
                         </div>
                         <div className="p-3 bg-white dark:bg-[#1a1b26]">
                           <p className="text-sm font-bold text-slate-900 dark:text-white">Dark Mode</p>
                         </div>
                         {theme === 'dark' && <div className="absolute top-2 right-2 p-1 bg-violet-500 rounded-full text-white"><Icons.Check className="w-3 h-3" /></div>}
                      </div>

                      {/* Light */}
                      <div 
                        onClick={() => handleThemeChange('light')}
                        className={`cursor-pointer group relative rounded-xl overflow-hidden border-2 transition-all ${theme === 'light' ? 'border-violet-500' : 'border-slate-200 dark:border-white/10 hover:border-violet-500/50'}`}
                      >
                         <div className="h-24 bg-slate-100 relative">
                            <div className="absolute top-2 left-2 w-16 h-12 bg-white rounded-lg shadow-sm"></div>
                            <div className="absolute top-2 right-2 w-6 h-6 bg-violet-500 rounded-full"></div>
                         </div>
                         <div className="p-3 bg-white dark:bg-[#1a1b26]">
                           <p className="text-sm font-bold text-slate-900 dark:text-white">Light Mode</p>
                         </div>
                         {theme === 'light' && <div className="absolute top-2 right-2 p-1 bg-violet-500 rounded-full text-white"><Icons.Check className="w-3 h-3" /></div>}
                      </div>

                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Accessibility</h3>
                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-black/20 rounded-xl">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">Reduced Motion</p>
                        <p className="text-xs text-slate-500">Minimize animations and transitions.</p>
                      </div>
                      <div className="relative">
                         {/* Toggle Mock */}
                         <div className="w-12 h-6 bg-slate-300 dark:bg-white/10 rounded-full cursor-pointer"></div>
                         <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- NOTIFICATIONS TAB --- */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Email Notifications</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 border border-slate-200 dark:border-white/5 rounded-xl">
                       <input type="checkbox" checked={emailNotif} onChange={() => setEmailNotif(!emailNotif)} className="mt-1 w-4 h-4 accent-violet-500" />
                       <div>
                         <p className="text-sm font-bold text-slate-900 dark:text-white">Activity Digest</p>
                         <p className="text-xs text-slate-500">Weekly summary of your projects and credits usage.</p>
                       </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 border border-slate-200 dark:border-white/5 rounded-xl">
                       <input type="checkbox" checked={marketingEmails} onChange={() => setMarketingEmails(!marketingEmails)} className="mt-1 w-4 h-4 accent-violet-500" />
                       <div>
                         <p className="text-sm font-bold text-slate-900 dark:text-white">Product Updates</p>
                         <p className="text-xs text-slate-500">News about new features and storage updates.</p>
                       </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Push Notifications</h3>
                     <div className="flex items-center justify-between">
                       <p className="text-sm text-slate-500">Enable browser notifications for completed exports.</p>
                       <div 
                         onClick={() => setPushNotif(!pushNotif)}
                         className={`w-12 h-6 rounded-full cursor-pointer relative transition-colors ${pushNotif ? 'bg-green-500' : 'bg-slate-300 dark:bg-white/10'}`}
                       >
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${pushNotif ? 'left-7' : 'left-1'}`} />
                       </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- SECURITY TAB --- */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Password & Auth</h3>
                    <NeonButton className="w-auto px-6 py-2.5 text-sm" variant="secondary">
                       Change Password
                    </NeonButton>
                  </div>

                  <div className="pt-6 border-t border-slate-200 dark:border-white/5">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Active Sessions</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-black/20 rounded-xl">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-white dark:bg-white/10 rounded-lg"><Icons.Layout className="w-5 h-5 text-slate-500" /></div>
                           <div>
                             <p className="text-sm font-bold text-slate-900 dark:text-white">Windows PC • Chrome</p>
                             <p className="text-xs text-green-500">Current Session</p>
                           </div>
                         </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-black/20 rounded-xl opacity-60">
                         <div className="flex items-center gap-3">
                           <div className="p-2 bg-white dark:bg-white/10 rounded-lg"><Icons.Layout className="w-5 h-5 text-slate-500" /></div>
                           <div>
                             <p className="text-sm font-bold text-slate-900 dark:text-white">iPhone 13 • Safari</p>
                             <p className="text-xs text-slate-500">Last active 2 days ago</p>
                           </div>
                         </div>
                         <button className="text-xs text-red-500 hover:underline">Revoke</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

               {/* --- API TAB --- */}
               {activeTab === 'api' && (
                <div className="space-y-8">
                  <div className="bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Developer API</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                      Use the Repix API to integrate image generation and processing directly into your applications.
                    </p>
                    <div className="space-y-2 mb-6">
                      <label className="text-xs font-bold text-slate-500 uppercase">Your API Key</label>
                      <div className="flex gap-2">
                        <code className="flex-1 bg-white dark:bg-black/40 border border-slate-200 dark:border-white/10 px-4 py-3 rounded-xl font-mono text-sm text-slate-600 dark:text-slate-300 overflow-hidden">
                          sk_live_51M...84j229s
                        </code>
                        <button className="px-4 py-2 bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white rounded-xl hover:bg-slate-200 dark:hover:bg-white/20 font-bold text-sm">
                          Copy
                        </button>
                      </div>
                    </div>
                    <NeonButton className="w-full sm:w-auto px-6" onClick={() => {}}>
                      Generate New Key
                    </NeonButton>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
