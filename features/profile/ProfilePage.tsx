
import React from 'react';
import { DashboardLayout } from '../dashboard/components/DashboardLayout';
import { MOCK_USER } from '../../services/mock/dashboard';

// Import Components
import { ProfileIdentityCard } from './components/ProfileHeader'; // Renamed import for clarity logic
import { CreditsSnapshotCard } from './components/CreditsSnapshotCard';
import { BasicPreferencesPanel } from './components/BasicPreferencesPanel';
import { ProfileQuickLinks } from './components/ProfileQuickLinks';

interface ProfilePageProps {
  user?: typeof MOCK_USER;
  onLogout: () => void; 
  onNavigate: (path: string) => void;
}

export const ProfilePage = ({ user: propUser, onLogout, onNavigate }: ProfilePageProps) => {
  const user = propUser || MOCK_USER; 

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="profile">
      
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 animate-fade-in-up">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Account Settings</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage your profile, preferences, and billing.</p>
        </div>

        {/* New 1:2 Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Identity & Settings (Sticky on Desktop) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Identity Card (Combined Avatar + Plan Info) */}
            <ProfileIdentityCard 
              user={user} 
              onLogout={onLogout} 
              onUpgrade={() => onNavigate('subscription')}
            />

            {/* App Preferences */}
            <BasicPreferencesPanel />
            
            {/* Footer Meta */}
            <div className="text-center py-4">
               <p className="text-[10px] text-slate-400 dark:text-slate-600">
                 Repix ID: <span className="font-mono">8829-XJ-22</span><br/>
                 Version 2.1.0 (Build 402)
               </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Credits & Tools */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Credits Banner */}
            <CreditsSnapshotCard 
              credits={user.credits}
              onBuy={() => onNavigate('credits')}
              onLog={() => onNavigate('credits-log')}
            />

            {/* Quick Links Grid */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Quick Access</h3>
              <ProfileQuickLinks onNavigate={onNavigate} />
            </div>

            {/* Support / Help Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-500/10 flex items-center justify-between gap-4">
               <div>
                 <h4 className="font-bold text-slate-800 dark:text-slate-200">Need Help?</h4>
                 <p className="text-sm text-slate-600 dark:text-slate-400">Check our documentation or contact support.</p>
               </div>
               <button className="px-4 py-2 bg-white dark:bg-blue-600 text-blue-600 dark:text-white rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all">
                 Support Center
               </button>
            </div>

          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};
