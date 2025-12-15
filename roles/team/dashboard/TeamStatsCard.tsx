/**
 * TeamStatsCard Component (R4.2)
 * 
 * Displays a single stat card with:
 * - Icon
 * - Label
 * - Value
 * - Optional trend indicator
 */

import React from 'react';

interface TeamStatsCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    suffix?: string;
    color?: 'cyan' | 'violet' | 'amber' | 'emerald';
}

export const TeamStatsCard: React.FC<TeamStatsCardProps> = ({
    icon,
    label,
    value,
    suffix,
    color = 'cyan',
}) => {
    const colorClasses = {
        cyan: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
        violet: 'from-violet-500/20 to-purple-500/20 border-violet-500/30 text-violet-400',
        amber: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
        emerald: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    };

    return (
        <div className={`
      relative overflow-hidden rounded-2xl p-5
      bg-gradient-to-br ${colorClasses[color].split(' ').slice(0, 2).join(' ')}
      border ${colorClasses[color].split(' ')[2]}
    `}>
            {/* Background decoration */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5 blur-2xl" />

            {/* Content */}
            <div className="relative z-10">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3 ${colorClasses[color].split(' ')[3]}`}>
                    {icon}
                </div>

                {/* Value */}
                <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-3xl font-bold text-white">{value}</span>
                    {suffix && <span className="text-sm text-slate-400">{suffix}</span>}
                </div>

                {/* Label */}
                <p className="text-sm text-slate-400">{label}</p>
            </div>
        </div>
    );
};

/**
 * TeamStatsGrid Component
 * 
 * Container for 4 stat cards in a grid layout.
 */
import { Icons } from '../../../shared/components/Icons';
import { TeamStats } from '../../../services/mock/teamDashboard';

interface TeamStatsGridProps {
    stats: TeamStats;
}

export const TeamStatsGrid: React.FC<TeamStatsGridProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <TeamStatsCard
                icon={<Icons.Briefcase className="w-5 h-5" />}
                label="Active Projects"
                value={stats.activeProjects}
                color="cyan"
            />
            <TeamStatsCard
                icon={<Icons.Image className="w-5 h-5" />}
                label="Images in Progress"
                value={stats.imagesInProgress}
                color="violet"
            />
            <TeamStatsCard
                icon={<Icons.Bolt className="w-5 h-5" />}
                label="Credits Used (30d)"
                value={stats.creditsUsed30d}
                color="amber"
            />
            <TeamStatsCard
                icon={<Icons.Clock className="w-5 h-5" />}
                label="Avg. Completion"
                value={stats.avgCompletionTime}
                suffix="days"
                color="emerald"
            />
        </div>
    );
};
