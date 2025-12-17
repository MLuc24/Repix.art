
import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { PRICING_TIERS } from '../../../services/mock/credits';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton } from '../../../shared/components/GlassUI';

export const CasualSubscription = ({ onLogout, onNavigate, user, onUpgrade }: { onLogout: () => void, onNavigate: (path: string) => void, user: any, onUpgrade?: (planId: string) => void }) => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
  const [upgradingId, setUpgradingId] = useState<string | null>(null);

  const handleUpgradeClick = (planId: string) => {
    setUpgradingId(planId);
    setTimeout(() => {
        if (onUpgrade) onUpgrade(planId);
        onNavigate('dashboard');
    }, 1500);
  };

  return (
    <DashboardLayout user={user} onLogout={onLogout} onNavigate={onNavigate} activePage="subscription">
      <div className="max-w-6xl mx-auto py-8 px-4">
        
        {/* HEADER */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider mb-4 animate-fade-in-up">
            <Icons.Star className="w-3 h-3" />
            Upgrade your Workspace
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 animate-fade-in-up">
            Choose Your Perfect Plan
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto animate-fade-in-up">
            Unlock professional tools, higher limits, and team collaboration features.
          </p>

          {/* TOGGLE */}
          <div className="mt-8 flex items-center justify-center gap-4 animate-fade-in-up">
            <span className={`text-sm font-bold ${billing === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className="w-16 h-8 rounded-full bg-slate-200 dark:bg-white/10 p-1 relative transition-colors duration-300"
            >
              <div className={`w-6 h-6 rounded-full bg-violet-600 shadow-sm transition-transform duration-300 ${billing === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-bold flex items-center gap-2 ${billing === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase border border-green-500/20">Save 20%</span>
            </span>
          </div>
        </div>

        {/* PRICING GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING_TIERS.map((plan, idx) => {
            const isCurrent = plan.id === 'casual'; // Hardcoded for demo
            
            return (
              <div 
                key={plan.id}
                className={`
                  relative p-6 rounded-[24px] flex flex-col h-full transition-all duration-300 animate-fade-in-up
                  ${plan.highlight 
                    ? 'bg-[#1a1b26] border-violet-500 shadow-2xl shadow-violet-900/20 scale-105 z-10 border-2' 
                    : 'bg-white dark:bg-[#0e0f14] border-slate-200 dark:border-white/10 hover:border-violet-300 dark:hover:border-white/20 border'
                  }
                `}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap shadow-lg">
                    Recommended
                  </div>
                )}

                <h3 className={`text-lg font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{plan.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs mb-6 h-8 leading-relaxed">{plan.desc}</p>
                
                <div className="flex items-baseline gap-1 mb-8">
                  <span className={`text-4xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {billing === 'monthly' 
                      ? (plan.monthlyPrice === 0 ? 'Free' : `$${plan.monthlyPrice}`) 
                      : (plan.yearlyPrice === 0 ? 'Free' : `$${plan.yearlyPrice}`)
                    }
                  </span>
                  {plan.monthlyPrice !== 0 && (
                    <span className="text-slate-500 text-xs font-medium">/ mo</span>
                  )}
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs">
                      <div className={`
                        p-0.5 mt-0.5 rounded-full flex-none
                        ${plan.highlight ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-400'}
                      `}>
                        <Icons.Check className="w-2.5 h-2.5" />
                      </div>
                      <span className={plan.highlight ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'}>{feat}</span>
                    </div>
                  ))}
                </div>

                {isCurrent ? (
                  <button 
                    disabled 
                    className="w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 text-slate-400 font-bold text-sm cursor-default"
                  >
                    Current Plan
                  </button>
                ) : (
                  <NeonButton 
                    onClick={() => handleUpgradeClick(plan.id)}
                    isLoading={upgradingId === plan.id}
                    className={`w-full text-sm py-3 ${!plan.highlight && '!bg-none !bg-slate-900 dark:!bg-white !text-white dark:!text-black hover:!shadow-lg'}`}
                  >
                    {plan.cta}
                  </NeonButton>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ SECTION (Optional) */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
           <div className="grid gap-4 text-left">
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2">Can I switch plans later?</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Yes, you can upgrade or downgrade at any time. Prorated credits will be applied to your account.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1a1b26] border border-slate-200 dark:border-white/10">
                 <h4 className="font-bold text-slate-800 dark:text-white text-sm mb-2">What happens to unused credits?</h4>
                 <p className="text-xs text-slate-500 dark:text-slate-400">Subscription credits roll over for up to 3 months. Purchased credit packs never expire.</p>
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
};
