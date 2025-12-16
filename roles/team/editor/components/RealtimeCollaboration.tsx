import React from 'react';
import { Icons } from '../../../../shared/components/Icons';
import type { TeamMember } from '../types';

// Realtime Presence Indicator
interface ActiveUser {
  user: TeamMember;
  isTyping?: boolean;
  currentTool?: string;
  lastActive: string;
  cursorPosition?: { x: number; y: number };
}

interface RealtimePresenceProps {
  activeUsers: ActiveUser[];
  currentUserId: string;
}

export const RealtimePresence: React.FC<RealtimePresenceProps> = ({
  activeUsers,
  currentUserId,
}) => {
  const otherUsers = activeUsers.filter(u => u.user.id !== currentUserId);

  return (
    <div className="flex items-center gap-1">
      {/* Active Users Avatars */}
      <div className="flex items-center -space-x-2">
        {otherUsers.slice(0, 5).map((activeUser) => (
          <div
            key={activeUser.user.id}
            className="relative group"
            title={`${activeUser.user.name} - ${activeUser.currentTool || 'Viewing'}`}
          >
            <div className="w-8 h-8 rounded-full border-2 border-[#0e0f13] overflow-hidden bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold relative">
              {activeUser.user.avatar ? (
                <img src={activeUser.user.avatar} alt={activeUser.user.name} className="w-full h-full object-cover" />
              ) : (
                activeUser.user.name[0].toUpperCase()
              )}

              {/* Online Indicator */}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0e0f13] animate-pulse" />
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <div className="font-medium">{activeUser.user.name}</div>
              {activeUser.currentTool && (
                <div className="text-slate-400 text-[10px]">Using {activeUser.currentTool}</div>
              )}
              {activeUser.isTyping && (
                <div className="text-violet-400 text-[10px] flex items-center gap-1">
                  <span className="inline-block w-1 h-1 bg-violet-400 rounded-full animate-bounce" />
                  <span className="inline-block w-1 h-1 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <span className="inline-block w-1 h-1 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  Typing...
                </div>
              )}
            </div>
          </div>
        ))}

        {otherUsers.length > 5 && (
          <div className="w-8 h-8 rounded-full border-2 border-[#0e0f13] bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
            +{otherUsers.length - 5}
          </div>
        )}
      </div>

      {/* Live Indicator */}
      {otherUsers.length > 0 && (
        <div className="ml-2 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">Live</span>
        </div>
      )}
    </div>
  );
};

// Realtime Activity Feed
interface ActivityItem {
  id: string;
  user: TeamMember;
  action: string;
  timestamp: string;
  icon?: keyof typeof Icons;
}

interface RealtimeActivityFeedProps {
  activities: ActivityItem[];
}

export const RealtimeActivityFeed: React.FC<RealtimeActivityFeedProps> = ({ activities }) => {
  return (
    <div className="absolute top-full left-0 mt-2 w-80 bg-[#1a1b1e]/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl overflow-hidden">
      <div className="p-3 border-b border-white/5">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <Icons.Activity className="w-4 h-4 text-violet-400" />
          Team Activity
        </h4>
      </div>

      <div className="max-h-64 overflow-y-auto">
        {activities.length === 0 ? (
          <div className="p-4 text-center text-slate-500 text-sm">
            No recent activity
          </div>
        ) : (
          activities.map((activity) => {
            const IconComponent = activity.icon ? Icons[activity.icon] : Icons.User;
            return (
              <div
                key={activity.id}
                className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {activity.user.avatar ? (
                      <img src={activity.user.avatar} alt={activity.user.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      activity.user.name[0].toUpperCase()
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white">
                      <span className="font-medium">{activity.user.name}</span>
                      <span className="text-slate-400 ml-1">{activity.action}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{activity.timestamp}</div>
                  </div>

                  {IconComponent && (
                    <IconComponent className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Realtime User Cursor (shows where other users are editing)
interface UserCursor {
  userId: string;
  userName: string;
  position: { x: number; y: number };
  color: string;
}

interface RealtimeUserCursorsProps {
  cursors: UserCursor[];
}

export const RealtimeUserCursors: React.FC<RealtimeUserCursorsProps> = ({ cursors }) => {
  return (
    <>
      {cursors.map((cursor) => (
        <div
          key={cursor.userId}
          className="absolute pointer-events-none z-[100] transition-all duration-700 ease-out"
          style={{
            left: `${50 + cursor.position.x * 0.3}%`,
            top: `${50 + cursor.position.y * 0.3}%`,
          }}
        >
          {/* Cursor Icon - Much Smaller */}
          <div className="relative">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
              <path
                d="M5 3L17 12L10 13L8 20L5 3Z"
                fill={cursor.color}
                stroke="white"
                strokeWidth="2.5"
              />
            </svg>

            {/* User Name Tag - Smaller and Closer */}
            <div
              className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-[10px] font-medium text-white whitespace-nowrap shadow-lg border border-white/30 backdrop-blur-sm"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.userName}
            </div>

            {/* Cursor Glow Effect - Smaller */}
            <div
              className="absolute top-0 left-0 w-2 h-2 rounded-full blur-sm opacity-50 animate-pulse"
              style={{ backgroundColor: cursor.color }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

// Live Edit Indicator (shows what tool someone is using)
interface LiveEditIndicatorProps {
  user: TeamMember;
  tool: string;
  onClose?: () => void;
}

export const LiveEditIndicator: React.FC<LiveEditIndicatorProps> = ({ user, tool, onClose }) => {
  return (
    <div className="absolute top-4 right-4 z-50 bg-violet-600/90 backdrop-blur-sm border border-violet-400/30 rounded-lg px-3 py-2 flex items-center gap-2 shadow-xl animate-in slide-in-from-top-2">
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
        ) : (
          user.name[0].toUpperCase()
        )}
      </div>

      <div className="text-xs text-white">
        <div className="font-medium">{user.name}</div>
        <div className="text-violet-200 text-[10px]">is using {tool}</div>
      </div>

      {onClose && (
        <button
          onClick={onClose}
          className="ml-2 p-1 hover:bg-white/10 rounded text-white/70 hover:text-white transition-colors"
        >
          <Icons.Close className="w-3 h-3" />
        </button>
      )}
    </div>
  );
};
