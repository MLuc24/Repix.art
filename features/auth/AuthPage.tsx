
import React, { useState, useEffect } from 'react';
import { Icons } from '../../shared/components/Icons';
import { GlassPanel, GlassModal, AuthInput, NeonButton, SocialButton } from '../../shared/components/GlassUI';
import { Particles } from '../../shared/components/Particles';
import { motion, AnimatePresence } from 'framer-motion';

type AuthMode = 'login' | 'register';

export const AuthPage = ({ initialMode = 'login', onBack, onLoginSuccess }: { initialMode?: AuthMode, onBack: () => void, onLoginSuccess: () => void }) => {
  const [isRegister, setIsRegister] = useState(initialMode === 'register');
  const [isMobile, setIsMobile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Forgot Password State
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    setIsRegister(initialMode === 'register');
  }, [initialMode]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      onLoginSuccess();
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);
    // Mock API
    setTimeout(() => {
      setResetLoading(false);
      setResetSent(true);
    }, 1500);
  };

  const closeResetModal = () => {
    setShowResetModal(false);
    setTimeout(() => {
      setResetSent(false); // Reset state after close
    }, 300);
  }

  const passwordToggle = (
    <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-white transition-colors">
      {showPassword ? <Icons.EyeOff size={18} /> : <Icons.Eye size={18} />}
    </button>
  );

  // --- POPUP COMPONENT ---
  const resetPasswordModal = (
    <GlassModal isOpen={showResetModal} onClose={closeResetModal} className="max-w-[420px] !bg-[#1e1e24] border-white/10">
      <div className="text-center px-2">
        {!resetSent ? (
          <>
            <div className="w-16 h-16 bg-violet-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 ring-1 ring-violet-500/30">
               <Icons.Lock className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Forgot Password?</h3>
            <p className="text-slate-400 mb-8 font-light text-sm leading-relaxed">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleResetPassword} className="space-y-6">
              <AuthInput 
                label="Email Address" 
                placeholder="name@example.com" 
                icon={<Icons.Mail />} 
                className="bg-black/20"
                variant="dark"
              />
              <NeonButton type="submit" isLoading={resetLoading}>
                Send Reset Link
              </NeonButton>
            </form>
          </>
        ) : (
          <div className="animate-fade-in-up">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/30">
               <Icons.Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Check your email</h3>
            <p className="text-slate-400 mb-8 font-light text-sm">
              We've sent a password reset link to your email.
            </p>
            <NeonButton onClick={closeResetModal}>
              Back to Login
            </NeonButton>
          </div>
        )}
        
        {!resetSent && (
          <button onClick={closeResetModal} className="mt-6 text-sm text-slate-500 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto group">
            <Icons.ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </button>
        )}
      </div>
    </GlassModal>
  );

  // Mobile View (Simple Toggle)
  if (isMobile) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#0f0f12] relative overflow-hidden">
        {resetPasswordModal}
        <div className="absolute inset-0 overflow-hidden">
             <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
        </div>
        
        <GlassPanel className="w-full max-w-md p-8 relative z-10">
           <button onClick={onBack} className="absolute top-6 left-6 text-slate-400 hover:text-white"><Icons.ChevronLeft /></button>
           <div className="text-center mt-8 mb-8">
             <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-2">
               {isRegister ? 'Create Account' : 'Welcome Back'}
             </h2>
             <p className="text-slate-400">
               {isRegister ? 'Join the creative revolution' : 'Sign in to continue accessing your art'}
             </p>
           </div>

           <form onSubmit={handleAuth} className="space-y-4">
              {isRegister && <AuthInput label="Name" icon={<Icons.User />} />}
              <AuthInput label="Email" type="email" icon={<Icons.Mail />} />
              <AuthInput 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                icon={<Icons.Lock />} 
                rightElement={passwordToggle}
              />
              
              {!isRegister && (
                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => setShowResetModal(true)} 
                    className="text-xs text-slate-400 hover:text-violet-400 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              <NeonButton type="submit">{isRegister ? 'Sign Up' : 'Sign In'}</NeonButton>
           </form>

           <div className="mt-6 text-center">
             <p className="text-slate-400">
               {isRegister ? 'Already have an account?' : "Don't have an account?"}
               <button onClick={() => setIsRegister(!isRegister)} className="ml-2 text-violet-400 font-bold hover:underline">
                 {isRegister ? 'Sign In' : 'Sign Up'}
               </button>
             </p>
           </div>
        </GlassPanel>
      </div>
    );
  }

  // Desktop View (Sliding Overlay)
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f0f12] relative overflow-hidden font-sans">
      {resetPasswordModal}
      
      {/* Background Ambiance - WEBG PARTICLES */}
      <div className="absolute inset-0 z-0">
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

      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-50">
        <div className="p-2 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md"><Icons.ChevronLeft /></div>
        <span className="font-medium">Back to Home</span>
      </button>

      {/* Main Container */}
      <div className="relative z-10 bg-white/5 backdrop-blur-2xl w-[1000px] max-w-full min-h-[600px] rounded-[30px] shadow-[0_0_40px_-5px_rgba(124,58,237,0.3)] overflow-hidden border border-white/20 ring-1 ring-white/10">
        
        {/* --- SIGN IN FORM (LEFT SIDE) --- */}
        <div className={`absolute top-0 left-0 h-full w-1/2 flex flex-col items-center justify-center p-12 transition-all duration-1000 ease-in-out z-10 ${!isRegister ? 'opacity-100 pointer-events-auto transform translate-x-0' : 'opacity-0 pointer-events-none transform -translate-x-10'}`}>
             <div className="w-full max-w-[320px]">
               <h2 className="text-4xl font-bold mb-6 text-white text-center">Sign In</h2>
               <div className="flex gap-4 justify-center mb-6">
                 <SocialButton icon={<Icons.Google />} />
                 <SocialButton icon={<Icons.Facebook />} />
                 <SocialButton icon={<Icons.Apple />} />
               </div>
               <p className="text-slate-500 text-center text-sm mb-6">or use your email account</p>
               <form onSubmit={handleAuth} className="space-y-4">
                 <AuthInput label="Email" type="email" icon={<Icons.Mail />} className="bg-black/40 border-white/5 focus:border-violet-500/50 backdrop-blur-md transition-all hover:bg-black/50" variant="dark" />
                 <AuthInput 
                   label="Password" 
                   type={showPassword ? "text" : "password"} 
                   icon={<Icons.Lock />} 
                   rightElement={passwordToggle}
                   className="bg-black/40 border-white/5 focus:border-violet-500/50 backdrop-blur-md transition-all hover:bg-black/50" 
                   variant="dark" 
                 />
                 <button 
                    type="button" 
                    onClick={(e) => { e.preventDefault(); setShowResetModal(true); }}
                    className="block w-full text-xs text-right text-slate-400 hover:text-violet-400 mb-4 transition-colors"
                 >
                    Forgot your password?
                 </button>
                 <NeonButton type="submit">Sign In</NeonButton>
               </form>
             </div>
        </div>

        {/* --- SIGN UP FORM (RIGHT SIDE) --- */}
        <div className={`absolute top-0 right-0 h-full w-1/2 flex flex-col items-center justify-center p-12 transition-all duration-1000 ease-in-out z-10 ${isRegister ? 'opacity-100 pointer-events-auto transform translate-x-0' : 'opacity-0 pointer-events-none transform translate-x-10'}`}>
            <div className="w-full max-w-[320px]">
              <h2 className="text-4xl font-bold mb-6 text-white text-center">Create Account</h2>
              <div className="flex gap-4 justify-center mb-6">
                 <SocialButton icon={<Icons.Google />} />
                 <SocialButton icon={<Icons.Facebook />} />
                 <SocialButton icon={<Icons.Apple />} />
              </div>
              <p className="text-slate-500 text-center text-sm mb-6">or use your email for registration</p>
              <form onSubmit={handleAuth} className="space-y-4">
                <AuthInput label="Name" icon={<Icons.User />} className="bg-black/40 border-white/5 backdrop-blur-md transition-all hover:bg-black/50" variant="dark" />
                <AuthInput label="Email" type="email" icon={<Icons.Mail />} className="bg-black/40 border-white/5 backdrop-blur-md transition-all hover:bg-black/50" variant="dark" />
                <AuthInput 
                  label="Password" 
                  type={showPassword ? "text" : "password"} 
                  icon={<Icons.Lock />} 
                  rightElement={passwordToggle}
                  className="bg-black/40 border-white/5 backdrop-blur-md transition-all hover:bg-black/50" 
                  variant="dark" 
                />
                <NeonButton type="submit">Sign Up</NeonButton>
              </form>
            </div>
        </div>

        {/* --- OVERLAY CONTAINER --- */}
        <motion.div 
          className="absolute top-0 left-0 w-1/2 h-full z-20 overflow-hidden"
          initial={false}
          animate={{ x: isRegister ? '0%' : '100%' }}
          transition={{ type: "spring", stiffness: 90, damping: 20, mass: 1.2 }}
        >
          {/* OVERLAY PANEL (200% Width) */}
          <motion.div 
            className="relative -left-full h-full w-[200%] bg-gradient-to-r from-violet-600/85 to-indigo-600/85 backdrop-blur-md text-white border-l border-white/10"
            initial={false}
            animate={{ x: isRegister ? '50%' : '0%' }}
            transition={{ type: "spring", stiffness: 90, damping: 20, mass: 1.2 }}
          >
             {/* LEFT HALF CONTENT (Visible when Overlay is Left -> Register Mode active -> Shows 'Welcome Back' to switch to Login) */}
             <div className="w-full h-full flex flex-row items-center justify-center">
                
                {/* Section 1: "Welcome Back" (Visible when overlay is Left) */}
                <div className="w-1/2 h-full flex flex-col items-center justify-center p-12 text-center">
                   <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                   <p className="mb-8 text-white/80 leading-relaxed max-w-xs">To keep connected with us please login with your personal info</p>
                   <button 
                     onClick={() => setIsRegister(false)}
                     className="px-10 py-3 rounded-full border-2 border-white font-bold text-white uppercase tracking-wider hover:bg-white hover:text-indigo-600 transition-colors"
                   >
                     Sign In
                   </button>
                </div>

                {/* Section 2: "Hello, Friend!" (Visible when overlay is Right) */}
                <div className="w-1/2 h-full flex flex-col items-center justify-center p-12 text-center">
                   <h2 className="text-4xl font-bold mb-4">Hello, Friend!</h2>
                   <p className="mb-8 text-white/80 leading-relaxed max-w-xs">Enter your personal details and start journey with us</p>
                   <button 
                     onClick={() => setIsRegister(true)}
                     className="px-10 py-3 rounded-full border-2 border-white font-bold text-white uppercase tracking-wider hover:bg-white hover:text-violet-600 transition-colors"
                   >
                     Sign Up
                   </button>
                </div>
             </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};


