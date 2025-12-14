
import React, { useState, useEffect } from 'react';
import { Icons } from '../../shared/components/Icons';
import { GlassPanel, AuthInput, NeonButton, SocialButton } from '../../shared/components/GlassUI';

type AuthMode = 'login' | 'register';

export const AuthPage = ({ initialMode = 'login', onBack, onLoginSuccess }: { initialMode?: AuthMode, onBack: () => void, onLoginSuccess: () => void }) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [animateCard, setAnimateCard] = useState(false);

  // Trigger animation on mount
  useEffect(() => {
    setAnimateCard(true);
  }, []);

  // Update mode if initialMode changes while component is mounted (though usually it re-mounts)
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      // "Log in" successful, call success callback
      onLoginSuccess(); 
    }, 1500);
  };

  const toggleMode = () => {
    setAnimateCard(false);
    setTimeout(() => {
      setMode(mode === 'login' ? 'register' : 'login');
      setAnimateCard(true);
    }, 200);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#0f0f12] text-white">
      {/* --- BACKGROUND AMBIANCE --- */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] animate-float" />
      
      {/* --- BACK NAVIGATION --- */}
      <button 
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-white/50 hover:text-white transition-colors z-20 group"
      >
        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-all">
          <Icons.ChevronLeft />
        </div>
        <span className="font-medium">Back</span>
      </button>

      {/* --- AUTH CARD --- */}
      <div className={`
        relative z-10 w-full max-w-[480px] px-6 transition-all duration-500 transform
        ${animateCard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'}
      `}>
        <GlassPanel className="p-8 md:p-12">
          
          {/* HEADER */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 mb-6 shadow-lg shadow-violet-500/30">
              <span className="text-xl font-bold">R</span>
            </div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
              {mode === 'login' ? 'Welcome Back 👋' : 'Create Account ✨'}
            </h2>
            <p className="text-slate-400">
              {mode === 'login' 
                ? 'Enter your credentials to access your workspace.' 
                : 'Join thousands of creators enhancing their art.'}
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleAuth} className="space-y-4">
            <AuthInput 
              label="Email Address" 
              type="email"
              icon={<Icons.Mail />}
            />
            
            <AuthInput 
              label="Password" 
              type={showPassword ? "text" : "password"}
              icon={<Icons.Lock />}
              rightElement={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                </button>
              }
            />

            {mode === 'register' && (
              <AuthInput 
                label="Confirm Password" 
                type="password"
                icon={<Icons.Check />}
              />
            )}

            {mode === 'login' && (
              <div className="flex justify-end">
                <a href="#" className="text-sm text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot Password?
                </a>
              </div>
            )}

            <div className="pt-4">
              <NeonButton type="submit" isLoading={loading}>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </NeonButton>
            </div>
          </form>
          
          {/* SOCIAL LOGIN */}
          <div className="my-8 flex items-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Or continue with</span>
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
          </div>

          <div className="flex gap-4">
            <SocialButton icon={<Icons.Google />} />
            <SocialButton icon={<Icons.Apple />} />
            <SocialButton icon={<Icons.Facebook />} />
          </div>

          {/* FOOTER SWITCH */}
          <div className="mt-8 text-center">
            <p className="text-slate-400">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={toggleMode}
                className="text-white font-bold hover:underline decoration-violet-500 underline-offset-4 transition-all"
              >
                {mode === 'login' ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>

        </GlassPanel>

        {/* BOTTOM LINKS */}
        <div className="mt-8 flex justify-center gap-6 text-xs text-slate-600 font-medium">
          <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Help Center</a>
        </div>
      </div>
    </div>
  );
};
