
import React, { useState } from 'react';
import { DashboardHeader } from '../dashboard/components/DashboardWidgets';
import { Icons } from '../../shared/components/Icons';
import { MOCK_USER } from '../../services/mock/dashboard';
import { MOCK_NOTIFICATIONS } from '../../services/mock/notifications';

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success': return <Icons.Check className="w-5 h-5 text-green-400" />;
    case 'alert': return <Icons.AlertTriangle className="w-5 h-5 text-red-400" />;
    case 'update': return <Icons.Sparkles className="w-5 h-5 text-violet-400" />;
    default: return <Icons.Bell className="w-5 h-5 text-blue-400" />;
  }
};

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success': return 'bg-green-500/10 border-green-500/20';
    case 'alert': return 'bg-red-500/10 border-red-500/20';
    case 'update': return 'bg-violet-500/10 border-violet-500/20';
    default: return 'bg-blue-500/10 border-blue-500/20';
  }
};

export const NotificationsPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0e0f14] text-white font-sans pb-20">
      <DashboardHeader user={MOCK_USER} onLogout={onLogout} />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <button onClick={() => onNavigate('dashboard')} className="text-slate-400 hover:text-white transition-colors">
              <Icons.ChevronLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold">Notifications</h1>
            <span className="px-2 py-0.5 rounded-full bg-violet-600 text-xs font-bold text-white">
              {notifications.filter(n => !n.isRead).length} New
            </span>
          </div>
          <button 
            onClick={markAllRead}
            className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Mark all as read
          </button>
        </div>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
               <Icons.Bell className="w-12 h-12 text-slate-500 mb-4" />
               <p className="text-lg font-bold text-slate-300">No notifications</p>
               <p className="text-sm text-slate-500">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((item, idx) => (
              <div 
                key={item.id}
                className={`
                  group relative p-4 rounded-2xl border transition-all duration-300 animate-fade-in-up flex gap-4
                  ${item.isRead 
                    ? 'bg-transparent border-white/5 opacity-70 hover:opacity-100 hover:bg-white/5' 
                    : 'bg-[#1a1b26] border-white/10 hover:border-violet-500/30'
                  }
                `}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                {!item.isRead && (
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
                )}

                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 ${getNotificationColor(item.type)}`}>
                  {getNotificationIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex justify-between items-start mb-1 pr-4">
                    <h4 className={`text-sm font-bold ${item.isRead ? 'text-slate-300' : 'text-white'}`}>{item.title}</h4>
                    <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{item.time}</span>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed pr-8">{item.message}</p>
                </div>

                {/* Hover Actions */}
                <button 
                  onClick={() => deleteNotification(item.id)}
                  className="absolute bottom-4 right-4 p-2 rounded-lg text-slate-500 hover:bg-red-500/10 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                  title="Remove"
                >
                  <Icons.Trash className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};
