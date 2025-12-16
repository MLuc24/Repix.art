/**
 * TeamQuickActions Component (R4.2)
 * 
 * Large action buttons for quick navigation:
 * - Team Projects
 * - Team Assets
 * - Team Presets
 * - Team Billing
 */

import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface QuickAction {
    id: string;
    label: string;
    description: string;
    icon: React.ReactNode;
    path: string;
    color: string;
}

const QUICK_ACTIONS: QuickAction[] = [
    {
        id: 'projects',
        label: 'Team Projects',
        description: 'View all active projects',
        icon: <Icons.Briefcase className="w-6 h-6" />,
        path: 'projects',
        color: 'from-cyan-500 to-blue-500',
    },
    {
        id: 'assets',
        label: 'Team Assets',
        description: 'Shared image library',
        icon: <Icons.Image className="w-6 h-6" />,
        path: 'team-assets',
        color: 'from-violet-500 to-purple-500',
    },
    {
        id: 'generator',
        label: 'Generator',
        description: 'Create new images',
        icon: <Icons.Wand className="w-6 h-6" />,
        path: 'generator',
        color: 'from-amber-500 to-orange-500',
    },
    {
        id: 'billing',
        label: 'Team Billing',
        description: 'Credits & invoices',
        icon: <Icons.CreditCard className="w-6 h-6" />,
        path: 'freelancer-billing',
        color: 'from-emerald-500 to-teal-500',
    },
];

interface TeamQuickActionsProps {
    onNavigate: (path: string) => void;
}

export const TeamQuickActions: React.FC<TeamQuickActionsProps> = ({ onNavigate }) => {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {QUICK_ACTIONS.map(action => (
                    <button
                        key={action.id}
                        onClick={() => onNavigate(action.path)}
                        className="group relative overflow-hidden rounded-2xl p-5 bg-[#1a1b26] border border-white/10 hover:border-white/20 transition-all duration-300 text-left"
                    >
                        {/* Hover gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300`}>
                            {action.icon}
                        </div>

                        {/* Label */}
                        <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                            {action.label}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-slate-500">
                            {action.description}
                        </p>

                        {/* Arrow */}
                        <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Icons.ArrowRight className="w-5 h-5 text-slate-400" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
