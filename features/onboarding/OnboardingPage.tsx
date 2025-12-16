
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from '../../shared/components/Particles';
import { Icons } from '../../shared/components/Icons';
import { NeonButton, GlassModal } from '../../shared/components/GlassUI';
import { Gradient } from '../../shared/components/Gradient';

interface RoleOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  desc: string;
  features: string[];
  locked: boolean;
  price?: string;
  yearlyPrice?: string;
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
    yearlyPrice: '$12',
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
    yearlyPrice: '$29',
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
    yearlyPrice: '$129',
    color: 'from-violet-500 to-purple-600'
  }
];

// Steps for the upgrade flow
type UpgradeStep = 'preview' | 'payment' | 'processing' | 'success';

export const OnboardingPage = ({ onFinish, onBack }: { onFinish: (roleId: string) => void, onBack: () => void }) => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState<RoleOption | null>(null);
  const [upgradeStep, setUpgradeStep] = useState<UpgradeStep>('preview');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

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
          className="mb-8 mt-8 md:mt-0"
        >
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight text-white drop-shadow-2xl">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">Workspace</span>
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Select the experience that best fits your needs. 
            <br className="hidden md:block"/> You can always switch or upgrade later.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 px-2">
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
                  relative p-5 rounded-[1.5rem] text-left transition-all duration-300 group flex flex-col items-start overflow-hidden h-full min-h-[220px]
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
                  mb-4 p-3 rounded-2xl w-12 h-12 flex items-center justify-center border border-white/10 relative overflow-hidden bg-gradient-to-br ${role.color} shadow-lg
                  ${isSelected ? 'scale-110' : 'group-hover:scale-105'} transition-transform duration-300
                `}>
                   {React.cloneElement(role.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6 text-white" })}
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

                  <p className="text-sm text-slate-400 mb-4 min-h-[40px] leading-relaxed font-medium">
                    {role.desc}
                  </p>
                  
                  
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
        hideCloseButton={true} // Fixed: Remove external X button
        className="!bg-transparent !border-none !p-0 !shadow-none !overflow-visible flex items-center justify-center py-10" 
      >
         {targetRole && (
            <Gradient className="max-w-[500px] w-full mx-auto shadow-2xl">
               <div className="flex flex-col relative bg-[#121217] rounded-[30px] overflow-hidden min-h-[500px]">
                {/* Internal Close Button (kept) */}
                <button 
                  onClick={handleCloseModal}
                  className="absolute top-5 right-5 p-2 rounded-full bg-black/40 hover:bg-white text-white/70 hover:text-black transition-colors z-50 backdrop-blur-md"
                >
                  <Icons.Close className="w-5 h-5" />
                </button>
              
              {/* --- HEADER BANNER --- */}
              <div className="relative h-32 w-full shrink-0">
                 <div className={`absolute inset-0 bg-gradient-to-br ${targetRole.color}`} />
                 <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60" />
                 <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl mix-blend-overlay" />
                 <div className="absolute top-10 left-10 w-24 h-24 bg-black/20 rounded-full blur-2xl" />
              </div>

              {/* 3D Floating Icon */}
              <div className="absolute top-16 left-8 z-10 w-24 h-24">
                  <div className={`
                    w-full h-full rounded-3xl flex items-center justify-center 
                    bg-[#1a1b26] border border-white/10 
                    shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] 
                    ring-4 ring-[#121217]
                    relative overflow-hidden group
                  `}>
                     <div className={`absolute inset-0 bg-gradient-to-br ${targetRole.color} opacity-20`} />
                     <div className="relative z-10 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform duration-500">
                        {React.cloneElement(targetRole.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 text-white" })}
                     </div>
                  </div>
              </div>

                  {/* --- CONTENT BODY --- */}
                  <div className="px-8 pb-12 pt-10 relative bg-[#121217] flex-1 flex flex-col justify-between overflow-hidden">
                     {/* Decorative Background Noise/Glow */}
                     <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[80px] pointer-events-none" />
                     <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] pointer-events-none" />
                      
                     {/* Title & Desc - Aligned Right/Center due to icon on left */}
                     <div className="pl-28 mb-8 relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                           <h2 className="text-3xl font-black text-white tracking-tight drop-shadow-md">
                              {targetRole.title}
                           </h2>
                           <div className="px-2 py-0.5 rounded text-[10px] font-black bg-gradient-to-r from-amber-200 to-yellow-400 text-black uppercase tracking-wider shadow-lg shadow-yellow-500/20 transform -skew-x-12">
                             PRO
                           </div>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[260px]">
                           {targetRole.desc}
                        </p>
                     </div>
    
                     {/* Step 1: Feature Preview */}
                     {upgradeStep === 'preview' && (
                        <div className="animate-fade-in-up flex-1 flex flex-col relative z-10">
                           
                           {/* Features Grid - Richer Cards */}
                           <div className="grid grid-cols-2 gap-4 mb-8">
                              {targetRole.features.map((feat, i) => (
                                 <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10 transition-all group cursor-default">
                                    <div className="p-1.5 rounded-full bg-gradient-to-tr from-green-400 to-emerald-600 text-white shadow-sm flex-shrink-0">
                                       <Icons.Check className="w-2.5 h-2.5" />
                                    </div>
                                    <span className="font-bold text-slate-200 text-xs">{feat}</span>
                                 </div>
                              ))}
                                <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 shadow-sm opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                                    <div className="p-1.5 rounded-full bg-white/10 text-slate-500 flex-shrink-0">
                                       <Icons.Check className="w-2.5 h-2.5" />
                                    </div>
                                    <span className="font-bold text-slate-500 text-xs">View all perks...</span>
                                 </div>
                           </div>
    
                           <div className="mt-auto">
                                {/* Actions Row - Increased spacing */}
                                <div className="flex items-center gap-6">
                                    {/* Action Column */}
                                    <div className="flex flex-col gap-4 flex-1">
                                        
                                        {/* Billing Toggle */}
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'} transition-colors`}>Monthly</span>
                                            
                                            <button 
                                                onClick={() => setBillingCycle(c => c === 'monthly' ? 'yearly' : 'monthly')}
                                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${billingCycle === 'yearly' ? 'bg-white/10' : 'bg-white/10'}`}
                                            >
                                                <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${billingCycle === 'monthly' ? 'opacity-0' : 'opacity-100'}`} />
                                                <div 
                                                    className={`w-4 h-4 rounded-full bg-violet-500 shadow-lg transform transition-transform duration-300 ${billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-0'}`} 
                                                />
                                            </button>

                                            <span className={`text-xs font-bold ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'} transition-colors`}>Yearly</span>
                                            
                                            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[9px] font-bold tracking-wide border border-emerald-500/20">
                                                SAVE 20%
                                            </span>
                                        </div>

                                        {/* Price Display */}
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-4xl font-black text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">
                                                {billingCycle === 'monthly' 
                                                    ? targetRole.price?.replace('/mo', '') 
                                                    : targetRole.yearlyPrice
                                                }
                                            </span>
                                            <span className="text-sm font-medium text-slate-500">
                                                /mo
                                            </span>
                                        </div>
                                    </div>
    
                                    <NeonButton onClick={handleProceedToPay} className="w-40 h-14 text-sm font-bold shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)] border border-white/20 hover:border-white/50 ring-1 ring-white/10 overflow-hidden group shrink-0">
                                        <span className="relative z-10 drop-shadow-md">Unlock Access</span>
                                    </NeonButton>
                                </div>
                                <button 
                                    onClick={handleCloseModal} 
                                    className="w-full text-center mt-8 text-[10px] font-bold text-slate-600 hover:text-white uppercase tracking-widest transition-colors"
                                >
                                    Maybe later, I'll stick to Casual
                                </button>
                           </div>
                        </div>
                     )}

                 {/* Step 2: Payment Form */}
                 {upgradeStep === 'payment' && (
                    <div className="animate-fade-in-up flex-1 flex flex-col justify-center">
                      <div className="mb-6 bg-[#1a1b26] p-4 rounded-2xl border border-white/5 text-center shadow-lg">
                         <div className="flex justify-center mb-2 text-violet-400"><Icons.Lock className="w-5 h-5" /></div>
                         <p className="text-xs font-medium text-slate-300">Secured by Stripe End-to-End Encryption</p>
                      </div>

                      <div className="space-y-4 mb-8">
                         <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Card Number</label>
                            <div className="bg-[#0f0f12] rounded-xl border border-white/10 p-1 focus-within:border-violet-500 transition-colors shadow-inner flex items-center">
                               <div className="pl-4 text-slate-500"><Icons.CreditCard className="w-5 h-5" /></div>
                               <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-transparent p-3.5 text-sm text-white placeholder-slate-700 focus:outline-none font-mono" />
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Expires</label>
                                <input type="text" placeholder="MM/YY" className="w-full bg-[#0f0f12] rounded-xl border border-white/10 p-3.5 text-sm text-white placeholder-slate-700 focus:border-violet-500 focus:outline-none text-center font-mono shadow-inner" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">CVC</label>
                                <input type="text" placeholder="123" className="w-full bg-[#0f0f12] rounded-xl border border-white/10 p-3.5 text-sm text-white placeholder-slate-700 focus:border-violet-500 focus:outline-none text-center font-mono shadow-inner" />
                            </div>
                         </div>
                      </div>

                      <div className="flex gap-4">
                          <button onClick={() => setUpgradeStep('preview')} className="px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-white transition-colors">
                            Back
                          </button>
                          <NeonButton onClick={handlePay} className="flex-1">
                            Pay {targetRole.price}
                          </NeonButton>
                      </div>
                    </div>
                 )}

                 {/* Step 3: Processing */}
                 {upgradeStep === 'processing' && (
                    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in-up text-center">
                       <div className="relative w-20 h-20 mb-6">
                          <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                          <div className="absolute inset-0 rounded-full border-4 border-t-violet-500 animate-spin" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-violet-500 rounded-full blur-md animate-pulse" />
                       </div>
                       <h3 className="text-xl font-bold text-white mb-2">Verifying</h3>
                       <p className="text-xs text-slate-400 tracking-wider uppercase">Please wait a moment</p>
                    </div>
                 )}

                 {/* Step 4: Success */}
                 {upgradeStep === 'success' && (
                    <div className="flex-1 flex flex-col justify-center items-center animate-fade-in-up text-center">
                       <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-green-600 rounded-3xl rotate-3 flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(34,197,94,0.4)] border-t border-white/30">
                          <Icons.Check className="w-12 h-12 text-white drop-shadow-md" />
                       </div>
                       <h2 className="text-3xl font-black text-white mb-2">Unleashed!</h2>
                       <p className="text-slate-400 mb-8 max-w-xs text-sm leading-relaxed">
                         You are now a <span className="text-white font-bold">{targetRole.title}</span>.
                       </p>
                       
                       <NeonButton onClick={handleFinalizeUpgrade} className="w-full text-sm">
                         Let's Create
                       </NeonButton>
                    </div>
                 )}

              </div>
           </div>
           </Gradient>
         )}
      </GlassModal>

    </div>
  );
};
