
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from '../../shared/components/Particles';
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
      {/* Background Ambience - Hyperspeed */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <Particles
            particleCount={300}
            particleSpread={10}
            speed={0.1}
            particleColors={['#8b5cf6', '#cbd5e1', '#6366f1']}
            moveParticlesOnHover={true}
            particleHoverFactor={2}
            alphaParticles={true}
            particleBaseSize={120}
            sizeRandomness={1}
            cameraDistance={20}
            pixelRatio={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
            className="w-full h-full"
        />
      </div>

      <div className="relative z-10 max-w-7xl w-full text-center px-4">
        {/* Back Button */}
        <motion.button 
          onClick={onBack}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-0 left-4 md:left-0 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-20 group"
        >
          <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-all border border-white/5">
            <Icons.ChevronLeft />
          </div>
          <span className="font-medium text-sm hidden md:inline-block">Back to Login</span>
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 mt-12 md:mt-0"
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight text-white drop-shadow-2xl">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">Workspace</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Select the experience that best fits your needs. 
            <br className="hidden md:block"/> You can always switch or upgrade later.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-2">
          {ROLES.map((role, index) => {
            const isSelected = selectedRole === role.id;
            const isLockedState = role.locked && !isSelected;

            return (
              <motion.button
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => handleRoleClick(role)}
                className={`
                  relative p-6 rounded-[2rem] text-left transition-all duration-300 group flex flex-col items-start overflow-hidden h-full min-h-[380px]
                  ${isSelected 
                    ? 'bg-gradient-to-b from-white/10 to-white/5 border-violet-500/50 shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] scale-[1.02] z-10 ring-1 ring-violet-500/50' 
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-violet-500/30 hover:shadow-[0_0_20px_-5px_rgba(139,92,246,0.15)] focus:border-violet-500/40'
                  }
                  border backdrop-blur-xl
                `}
              >
                {/* Selection Ring Glow */}
                {isSelected && <div className="absolute inset-0 rounded-[2rem] ring-2 ring-violet-500/50 shadow-[inset_0_0_20px_rgba(139,92,246,0.2)] pointer-events-none" />}

                {/* Header Icon */}
                <div className={`
                  mb-6 p-4 rounded-2xl w-16 h-16 flex items-center justify-center border border-white/10 relative overflow-hidden bg-gradient-to-br ${role.color} shadow-lg
                  ${isSelected ? 'scale-110' : 'group-hover:scale-105'} transition-transform duration-300
                `}>
                   {React.cloneElement(role.icon as React.ReactElement<{ className?: string }>, { className: "w-8 h-8 text-white" })}
                </div>

                {/* Content */}
                <div className="relative z-10 w-full flex-grow flex flex-col">
                  <div className="flex justify-between items-start w-full mb-2">
                    <h3 className={`text-2xl font-bold ${isSelected ? 'text-white' : 'text-slate-200 group-hover:text-white'} transition-colors`}>{role.title}</h3>
                    
                    {/* Checkmark or Lock Icon */}
                    {isSelected && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-500 text-white p-1.5 rounded-full shadow-lg shadow-green-500/30">
                        <Icons.Check className="w-4 h-4" />
                      </motion.div>
                    )}
                    {isLockedState && (
                       <div className="bg-black/40 border border-white/10 p-1.5 rounded-full">
                          <Icons.Lock className="w-3.5 h-3.5 text-slate-400" />
                       </div>
                    )}
                  </div>

                  <p className="text-sm text-slate-400 mb-8 min-h-[40px] leading-relaxed font-medium">
                    {role.desc}
                  </p>
                  
                  <div className="space-y-3 mt-auto w-full pt-6 border-t border-white/5">
                    {role.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-slate-400/90">
                        <Icons.Check className={`w-4 h-4 ${isSelected ? 'text-green-400' : 'text-slate-600'}`} />
                        <span className={isSelected ? 'text-slate-200' : ''}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Locked Overlay/Hover */}
                {isLockedState && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
                     <motion.div 
                       initial={{ y: 10 }} 
                       whileHover={{ y: 0 }} 
                       className="bg-[#1e1e26] border border-white/10 p-6 rounded-2xl shadow-2xl text-center transform scale-90 group-hover:scale-100 transition-transform"
                     >
                       <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Icons.Lock className="w-6 h-6 text-white" />
                       </div>
                       <p className="text-white font-bold text-lg mb-1">Premium Plan</p>
                       <p className="text-slate-400 text-sm mb-4">Unlock full power for {role.price}</p>
                       <span className="inline-block px-6 py-2 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-slate-200 transition-colors">
                         View Details
                       </span>
                     </motion.div>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <NeonButton 
            onClick={handleFreeContinue} 
            disabled={!selectedRole}
            className="!w-full md:!w-72 !py-4 !text-lg !rounded-full shadow-2xl shadow-violet-500/20"
          >
            Enter Workspace
          </NeonButton>
        </motion.div>
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
