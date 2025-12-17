
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from '../../shared/components/Particles';
import { Icons } from '../../shared/components/Icons';
import { NeonButton, GlassModal } from '../../shared/components/GlassUI';

// --- ONBOARDING CONFIG ---
type OnboardingStep = 'profile' | 'experience' | 'goals' | 'interests' | 'workspace';

const STEPS: { id: OnboardingStep; title: string; subtitle: string }[] = [
  { id: 'profile', title: 'Welcome to Repix', subtitle: "Let's get to know you better." },
  { id: 'experience', title: 'Your Expertise', subtitle: 'Help us tailor the tools to your level.' },
  { id: 'goals', title: 'Primary Goal', subtitle: 'What do you want to achieve?' },
  { id: 'interests', title: 'Creative Focus', subtitle: 'What kind of art do you love?' },
  { id: 'workspace', title: 'Name Your Space', subtitle: 'Give your creative hub a utility name.' },
];

const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'Beginner', desc: 'Just starting my journey', icon: <Icons.User /> },
  { id: 'intermediate', label: 'Enthusiast', desc: 'I know the basics', icon: <Icons.Sparkles /> },
  { id: 'pro', label: 'Professional', desc: 'I do this for a living', icon: <Icons.Bolt /> },
];

const GOALS = [
  { id: 'career', label: 'Career Growth', icon: <Icons.Briefcase /> },
  { id: 'hobby', label: 'Personal Hobby', icon: <Icons.Star /> }, 
  { id: 'freelance', label: 'Freelancing', icon: <Icons.CreditCard /> },
  { id: 'social', label: 'Social Media', icon: <Icons.Share /> },
];

const INTERESTS = ['Photography', 'Digital Art', 'Marketing', 'UI/UX Design', '3D Modeling', 'Photo Retouching', 'Social Media', 'E-commerce'];

export const OnboardingPage = ({ onFinish, onBack }: { onFinish: (roleId: string) => void, onBack: () => void }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const currentStep = STEPS[currentStepIndex];

  // Form State
  const [formData, setFormData] = useState({
    username: '',
    experience: '',
    goal: '',
    interests: [] as string[],
    workspaceName: ''
  });

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Show Gift Modal
      setShowGiftModal(true);
    }
  };

  const handleClaimGift = () => {
      onFinish('casual');
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      return { ...prev, interests: [...prev.interests, interest] };
    });
  };

  // Validation
  const isStepValid = () => {
    switch(currentStep.id) {
      case 'profile': return formData.username.length > 2;
      case 'experience': return !!formData.experience;
      case 'goals': return !!formData.goal;
      case 'interests': return formData.interests.length > 0;
      case 'workspace': return formData.workspaceName.length > 2;
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <Particles
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleColors={['#8b5cf6', '#cbd5e1', '#6366f1']}
            className="w-full h-full"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4">
        
        {/* Progress Bar */}
        <div className="mb-8 flex items-center justify-between gap-2">
            {STEPS.map((s, i) => (
               <div key={s.id} className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden relative">
                  <div 
                    className={`absolute inset-y-0 left-0 bg-violet-500 transition-all duration-500 ease-out ${i <= currentStepIndex ? 'w-full' : 'w-0'}`} 
                  />
               </div>
            ))}
        </div>

        {/* Card Container */}
        <div className="bg-[#0e0f14]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">
            
            {/* Nav Header */}
            <div className="flex justify-between items-center mb-8">
               <button onClick={handleBack} className="text-slate-500 hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
                  <Icons.ChevronLeft className="w-4 h-4" /> Back
               </button>
               <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step {currentStepIndex + 1}/{STEPS.length}</span>
            </div>
            
            <AnimatePresence mode="wait">
               <motion.div
                 key={currentStep.id}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 transition={{ duration: 0.3 }}
                 className="flex-1 flex flex-col"
               >
                  <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">{currentStep.title}</h1>
                  <p className="text-slate-400 text-lg mb-8">{currentStep.subtitle}</p>

                  <div className="flex-1">
                     
                     {/* STEP 1: PROFILE */}
                     {currentStep.id === 'profile' && (
                        <div className="space-y-6">
                           <div className="flex justify-center mb-8">
                              <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-dashed border-slate-600 flex items-center justify-center cursor-pointer hover:border-violet-500 hover:text-violet-500 transition-colors group relative">
                                  <Icons.Upload className="w-6 h-6 text-slate-400 group-hover:text-violet-500" />
                                  <span className="absolute -bottom-6 text-xs text-slate-500">Upload Photo</span>
                              </div>
                           </div>
                           
                           <div>
                              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">Display Name</label>
                              <input 
                                type="text" 
                                value={formData.username}
                                onChange={(e) => updateField('username', e.target.value)}
                                placeholder="e.g. Alex Creative" 
                                className="w-full bg-[#1a1b26] border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-violet-500 transition-colors text-lg"
                                autoFocus
                              />
                           </div>
                        </div>
                     )}

                     {/* STEP 2: EXPERIENCE */}
                     {currentStep.id === 'experience' && (
                        <div className="grid gap-4">
                           {EXPERIENCE_LEVELS.map((level) => (
                             <button
                               key={level.id}
                               onClick={() => updateField('experience', level.id)}
                               className={`
                                 flex items-center gap-4 p-4 rounded-xl border transition-all text-left
                                 ${formData.experience === level.id 
                                   ? 'bg-violet-600/10 border-violet-500 ring-1 ring-violet-500/50' 
                                   : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                 }
                               `}
                             >
                                <div className={`p-3 rounded-lg ${formData.experience === level.id ? 'bg-violet-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                   {React.cloneElement(level.icon as React.ReactElement<{ className?: string }>, { className: "w-5 h-5" })}
                                </div>
                                <div>
                                   <div className={`font-bold ${formData.experience === level.id ? 'text-white' : 'text-slate-200'}`}>{level.label}</div>
                                   <div className="text-sm text-slate-500">{level.desc}</div>
                                </div>
                             </button>
                           ))}
                        </div>
                     )}

                     {/* STEP 3: GOALS */}
                     {currentStep.id === 'goals' && (
                        <div className="grid grid-cols-2 gap-4">
                           {GOALS.map((goal) => (
                             <button
                               key={goal.id}
                               onClick={() => updateField('goal', goal.id)}
                               className={`
                                 flex flex-col items-center justify-center gap-3 p-6 rounded-xl border transition-all text-center h-40
                                 ${formData.goal === goal.id 
                                   ? 'bg-indigo-600/10 border-indigo-500 ring-1 ring-indigo-500/50' 
                                   : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
                                 }
                               `}
                             >
                                <div className={`p-4 rounded-full ${formData.goal === goal.id ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-400'}`}>
                                   {React.cloneElement(goal.icon as React.ReactElement<{ className?: string }>, { className: "w-6 h-6" })}
                                </div>
                                <div className={`font-bold ${formData.goal === goal.id ? 'text-white' : 'text-slate-300'}`}>{goal.label}</div>
                             </button>
                           ))}
                        </div>
                     )}

                     {/* STEP 4: INTERESTS */}
                     {currentStep.id === 'interests' && (
                        <div>
                          <p className="text-sm text-slate-400 mb-4">Select all that apply:</p>
                          <div className="flex flex-wrap gap-3">
                             {INTERESTS.map((interest) => (
                               <button
                                 key={interest}
                                 onClick={() => toggleInterest(interest)}
                                 className={`
                                   px-4 py-2.5 rounded-full text-sm font-bold border transition-all
                                   ${formData.interests.includes(interest)
                                     ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                     : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500 hover:text-white'
                                   }
                                 `}
                               >
                                 {interest}
                               </button>
                             ))}
                          </div>
                        </div>
                     )}

                     {/* STEP 5: WORKSPACE */}
                     {currentStep.id === 'workspace' && (
                        <div className="flex flex-col h-full justify-center">
                           <div className="relative mb-8">
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl pointer-events-none" />
                             <Icons.Layout className="w-16 h-16 text-slate-700 mx-auto mb-6 block" />
                           </div>
                           
                           <label className="block text-center text-sm font-bold text-slate-300 mb-4 uppercase tracking-wide">Name your Workspace</label>
                           <input 
                              type="text" 
                              value={formData.workspaceName}
                              onChange={(e) => updateField('workspaceName', e.target.value)}
                              placeholder={`${formData.username || 'My'}'s Workspace`}
                              className="w-full bg-transparent border-b-2 border-slate-700 focus:border-violet-500 text-center text-3xl font-black text-white placeholder-slate-700 py-4 focus:outline-none transition-colors"
                              autoFocus
                           />
                           <p className="text-center text-slate-500 mt-4 text-sm">
                             This will be your home for all projects and assets.
                           </p>
                        </div>
                     )}

                  </div>

                  {/* Actions */}
                  <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-end">
                      {/* Skip & Next Logic */}
                      <button 
                        onClick={handleNext} 
                        className="text-slate-500 hover:text-white text-sm font-bold px-4 py-2 transition-colors mr-4"
                      >
                         Skip
                      </button>

                      <NeonButton 
                        onClick={handleNext} 
                        disabled={!isStepValid()}
                        className="!w-auto !px-8 !py-3"
                      >
                         {currentStepIndex === STEPS.length - 1 ? 'Launch Repix' : 'Next Step'}
                         {currentStepIndex !== STEPS.length - 1 && <Icons.ArrowRight className="w-4 h-4 ml-2" />}
                      </NeonButton>
                  </div>

               </motion.div>
            </AnimatePresence>
            
        </div>
        
      </div>



      {/* GIFT MODAL */}
      <GlassModal
        isOpen={showGiftModal}
        onClose={() => {}}
        hideCloseButton={true}
        className="!bg-transparent !border-none !p-0 !shadow-none !overflow-visible flex items-center justify-center py-10"
      >
          <div className="relative w-full max-w-md mx-auto animate-fade-in-up">
             <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-3xl blur-xl opacity-50" />
             <div className="relative bg-[#1a1b26] border border-white/10 rounded-3xl p-8 text-center shadow-2xl overflow-hidden">
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                
                <div className="mb-6 flex justify-center">
                   <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-orange-500 rounded-2xl rotate-3 flex items-center justify-center shadow-lg shadow-orange-500/30 ring-4 ring-white/10">
                      <Icons.Sparkles className="w-10 h-10 text-white" />
                   </div>
                </div>

                <h2 className="text-3xl font-black text-white mb-2">Welcome Gift!</h2>
                <p className="text-slate-400 mb-6 leading-relaxed">
                   To kickstart your journey, we've added <span className="text-amber-400 font-bold">100 Free AI Credits</span> to your wallet.
                </p>

                <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-8 flex items-center justify-between">
                   <div className="text-left">
                      <p className="text-xs text-slate-500 uppercase font-bold">Balance</p>
                      <p className="text-2xl font-black text-white">100 Credits</p>
                   </div>
                   <div className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-lg border border-green-500/20">
                      ADDED
                   </div>
                </div>

                <NeonButton onClick={handleClaimGift} className="!w-full">
                   Claim & Start Creating
                </NeonButton>
             </div>
          </div>
      </GlassModal>

    </div>
  );
};
