
import React, { useState } from 'react';
import { Icons } from '../../shared/components/Icons';
import { NeonButton, GlassModal } from '../../shared/components/GlassUI';

interface RoleOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  features: string[];
  locked: boolean;
  price?: string;
  color: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'casual',
    title: 'Casual Creator',
    icon: <Icons.Sparkles className="w-8 h-8 text-white" />,
    desc: 'I want to edit personal photos and create fun avatars.',
    features: ['Auto Enhance', 'Fun Filters', 'Social Export'],
    locked: false,
    color: 'from-fuchsia-500 to-pink-500'
  },
  {
    id: 'pro',
    title: 'Pro Designer',
    icon: <Icons.Bolt className="w-8 h-8 text-white" />,
    desc: 'I need high-quality tools for my portfolio and personal projects.',
    features: ['4K Export', 'Manual Adjustments', 'RAW Support'],
    locked: true,
    price: '$15/mo',
    color: 'from-amber-400 to-orange-500'
  },
  {
    id: 'team', // Displayed as Freelance
    title: 'Freelance',
    icon: <Icons.Wallet className="w-8 h-8 text-white" />,
    desc: 'I manage assets and deliver high-quality work for multiple clients.',
    features: ['Client Folders', 'Brand Kits', 'Commercial License'],
    locked: true,
    price: '$39/mo',
    color: 'from-cyan-400 to-blue-500'
  },
  {
    id: 'agency',
    title: 'Agency',
    icon: <Icons.Layout className="w-8 h-8 text-white" />,
    desc: 'Managing multiple brands and high volume production.',
    features: ['Multi-tenant', 'API Access', 'Priority Support'],
    locked: true,
    price: '$159/mo',
    color: 'from-violet-500 to-purple-600'
  }
];

// Steps for the upgrade flow
type UpgradeStep = 'preview' | 'payment' | 'processing' | 'success';

export const OnboardingPage = ({ onFinish, onBack }: { onFinish: (roleId: string) => void, onBack: () => void }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState<RoleOption | null>(null);
  const [upgradeStep, setUpgradeStep] = useState<UpgradeStep>('preview');

  // Handle Card Click
  const handleRoleClick = (role: RoleOption) => {
    if (role.locked) {
      setTargetRole(role);
      setUpgradeStep('preview'); // Reset step
    } else {
      setSelectedRole(role.id);
    }
  };

  // Close & Reset
  const handleCloseModal = () => {
    setTargetRole(null);
    setUpgradeStep('preview');
  };

  // Go to Payment Form
  const handleProceedToPay = () => {
    setUpgradeStep('payment');
  };

  // Simulate Payment Process
  const handlePay = () => {
    setUpgradeStep('processing');
    setTimeout(() => {
      setUpgradeStep('success');
    }, 2500); // 2.5s simulated delay
  };

  // Finalize after success (For Paid Roles)
  const handleFinalizeUpgrade = () => {
    if (targetRole) {
      // Pass the selected role ID back to App
      onFinish(targetRole.id);
    }
  };

  // Finalize for Free Role
  const handleFreeContinue = () => {
    if (selectedRole) {
      onFinish(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl w-full text-center">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-0 left-0 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-20 group"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-all">
            <Icons.ChevronLeft />
          </div>
          <span className="font-medium text-sm">Back</span>
        </button>

        <div className="mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Step 1 of 1</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            How will you use REPIX?
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Select your workspace experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {ROLES.map((role) => {
            const isSelected = selectedRole === role.id;
            // If the role is locked, and NOT the one currently force-selected (after upgrade)
            const isLockedState = role.locked && !isSelected;

            return (
              <button
                key={role.id}
                onClick={() => handleRoleClick(role)}
                className={`
                  relative p-6 rounded-3xl border text-left transition-all duration-300 group flex flex-col overflow-hidden
                  ${isSelected 
                    ? `bg-white/10 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] scale-105 z-10 ring-1 ring-white/30` 
                    : isLockedState
                      ? 'bg-[#0f0f12] border-white/5 opacity-80 hover:opacity-100 hover:border-white/10'
                      : 'bg-[#1a1b26] border-white/5 hover:border-white/20 hover:bg-[#1f202e]'
                  }
                `}
              >
                {/* Header Icon */}
                <div className={`mb-6 p-4 rounded-2xl w-fit border border-white/10 relative overflow-hidden bg-gradient-to-br ${role.color}`}>
                   {role.icon}
                </div>

                {/* Locked Overlay Badge */}
                {isLockedState && (
                  <div className="absolute top-4 right-4 px-2 py-1 rounded bg-black/60 backdrop-blur border border-white/10 flex items-center gap-1.5 shadow-lg z-20">
                    <Icons.Lock className="w-3 h-3 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">Locked</span>
                  </div>
                )}

                {/* Selected Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 p-1 rounded-full bg-green-500 text-white shadow-lg shadow-green-500/50 z-20">
                    <Icons.Check className="w-4 h-4" />
                  </div>
                )}

                <h3 className={`text-xl font-bold mb-2 ${isSelected ? 'text-white' : 'text-slate-200'}`}>{role.title}</h3>
                <p className="text-sm text-slate-400 mb-6 min-h-[40px] leading-relaxed">{role.desc}</p>
                
                <div className="space-y-3 mt-auto">
                  {role.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-500">
                      <div className={`p-0.5 rounded-full flex-none ${isSelected ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-600'}`}>
                         <Icons.Check className="w-2 h-2" />
                      </div>
                      <span className={isSelected ? 'text-slate-300' : ''}>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Hover CTA for Locked Items */}
                {isLockedState && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 p-4 text-center">
                     <Icons.Lock className="w-8 h-8 text-white mb-2" />
                     <p className="text-white font-bold text-sm mb-1">Premium Plan</p>
                     <p className="text-slate-400 text-xs mb-4">Unlock for {role.price}</p>
                     <span className="px-4 py-2 rounded-lg bg-white text-black text-xs font-bold uppercase tracking-wider">
                       Upgrade
                     </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <NeonButton 
            onClick={handleFreeContinue} 
            disabled={!selectedRole}
            className="!w-full md:!w-64"
          >
            Get Started
          </NeonButton>
        </div>
      </div>

      {/* --- UPGRADE FLOW MODAL --- */}
      <GlassModal 
        isOpen={!!targetRole} 
        onClose={handleCloseModal}
        className="!bg-[#1a1b26] !border-white/10 text-white" // FORCE DARK MODE
      >
         {targetRole && (
           <div className="text-center">
              
              {/* HEADER VISUAL (Always visible) */}
              {upgradeStep !== 'success' && (
                <div className="relative mb-6 mx-auto w-16 h-16">
                   <div className={`absolute inset-0 bg-gradient-to-br ${targetRole.color} rounded-2xl blur-xl opacity-50`} />
                   <div className={`relative w-full h-full bg-gradient-to-br ${targetRole.color} rounded-2xl flex items-center justify-center text-white shadow-2xl`}>
                      {React.cloneElement(targetRole.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8" })}
                   </div>
                   {upgradeStep === 'preview' && (
                     <div className="absolute -top-2 -right-2 bg-white text-black p-1 rounded-full shadow-lg border-2 border-[#1a1b26]">
                        <Icons.Lock className="w-3 h-3" />
                     </div>
                   )}
                </div>
              )}

              {/* STEP 1: PREVIEW */}
              {upgradeStep === 'preview' && (
                <div className="animate-fade-in-up">
                  <h2 className="text-2xl font-bold text-white mb-2">Unlock {targetRole.title}</h2>
                  <p className="text-slate-400 mb-6 text-sm">
                    Get instant access to advanced features designed for {targetRole.title.toLowerCase()}.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 text-left space-y-3">
                     {targetRole.features.map((feat, i) => (
                       <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                          <div className="p-1 rounded-full bg-green-500/20 text-green-400"><Icons.Check className="w-3 h-3" /></div>
                          {feat}
                       </div>
                     ))}
                     <div className="h-px bg-white/10 my-2" />
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-white">Subscription</span>
                        <span className="text-lg font-bold text-violet-300">{targetRole.price}</span>
                     </div>
                  </div>

                  <NeonButton onClick={handleProceedToPay} className="w-full">
                    Subscribe & Unlock
                  </NeonButton>
                  
                  <button 
                    onClick={handleCloseModal} 
                    className="mt-4 text-xs font-bold text-slate-500 hover:text-white transition-colors"
                  >
                    No thanks, I'll stick to Casual
                  </button>
                </div>
              )}

              {/* STEP 2: PAYMENT FORM */}
              {upgradeStep === 'payment' && (
                <div className="animate-fade-in-up text-left">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white">Secure Checkout</h3>
                    <p className="text-xs text-slate-400">Encrypted payment via Stripe</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000" 
                          className="w-full bg-[#0f0f12] border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none transition-colors"
                        />
                        <div className="absolute left-3 top-3.5 text-slate-500">
                          <Icons.CreditCard className="w-5 h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Expiry</label>
                        <input 
                          type="text" 
                          placeholder="MM / YY" 
                          className="w-full bg-[#0f0f12] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">CVC</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="123" 
                            className="w-full bg-[#0f0f12] border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-600 focus:border-violet-500 focus:outline-none transition-colors"
                          />
                          <div className="absolute right-3 top-3.5 text-slate-500">
                            <Icons.Lock className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <NeonButton onClick={handlePay} className="w-full">
                    Pay {targetRole.price}
                  </NeonButton>
                  <button onClick={() => setUpgradeStep('preview')} className="w-full py-3 text-center text-xs text-slate-500 hover:text-white mt-2">
                    Back to plan details
                  </button>
                </div>
              )}

              {/* STEP 3: PROCESSING */}
              {upgradeStep === 'processing' && (
                <div className="py-12 animate-fade-in-up">
                   <div className="relative w-20 h-20 mx-auto mb-6">
                      <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                      <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 animate-spin" />
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">Processing Payment...</h3>
                   <p className="text-xs text-slate-400">Do not close this window</p>
                </div>
              )}

              {/* STEP 4: SUCCESS */}
              {upgradeStep === 'success' && (
                <div className="py-8 animate-fade-in-up">
                   <div className="w-20 h-20 mx-auto bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                      <Icons.Check className="w-10 h-10 text-green-400" />
                   </div>
                   <h2 className="text-2xl font-bold text-white mb-2">Upgrade Successful!</h2>
                   <p className="text-slate-400 mb-8 max-w-xs mx-auto">
                     You are now a <span className="text-white font-bold">{targetRole.title}</span>. Enjoy your new features.
                   </p>
                   
                   <NeonButton onClick={handleFinalizeUpgrade} className="w-full">
                     Continue to App
                   </NeonButton>
                </div>
              )}

           </div>
         )}
      </GlassModal>

    </div>
  );
};
