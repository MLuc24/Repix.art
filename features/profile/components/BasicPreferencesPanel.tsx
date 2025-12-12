
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';

export const BasicPreferencesPanel = () => {
  const [settings, setSettings] = useState({
    confirmSpend: true,
    autoSave: true,
    emailAlerts: false,
    highContrast: false
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const ToggleRow = ({ label, icon, isOn, onClick }: { label: string, icon: React.ReactNode, isOn: boolean, onClick: () => void }) => (
    <div 
      onClick={onClick}
      className="flex items-center justify-between py-4 px-4 -mx-4 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl cursor-pointer group transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg transition-colors ${isOn ? 'bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-300' : 'bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500'}`}>
           {icon}
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
      </div>
      
      {/* IOS Style Switch */}
      <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${isOn ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-700'}`}>
        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isOn ? 'translate-x-5' : 'translate-x-0'}`} />
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-[#1a1b26]/60 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-[24px] p-6 shadow-sm dark:shadow-none transition-colors">
      <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
        <Icons.Settings className="w-4 h-4 text-violet-500 dark:text-violet-400" /> App Preferences
      </h3>
      
      <div className="divide-y divide-slate-100 dark:divide-white/5">
        <ToggleRow 
          label="Confirm before spending credits" 
          icon={<Icons.Wallet className="w-4 h-4" />}
          isOn={settings.confirmSpend} 
          onClick={() => toggle('confirmSpend')} 
        />
        <ToggleRow 
          label="Auto-save edits to library" 
          icon={<Icons.Image className="w-4 h-4" />}
          isOn={settings.autoSave} 
          onClick={() => toggle('autoSave')} 
        />
        <ToggleRow 
          label="Weekly digest & tips" 
          icon={<Icons.Mail className="w-4 h-4" />}
          isOn={settings.emailAlerts} 
          onClick={() => toggle('emailAlerts')} 
        />
      </div>
    </div>
  );
};
