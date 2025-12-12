
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Icons } from './shared/components/Icons'; // IMPORT SHARED ICONS
import { AuthPage } from './features/auth/AuthPage'; // IMPORT FEATURE
import { CasualDashboard } from './roles/casual/pages/CasualDashboard'; // IMPORT CASUAL DASHBOARD
import { ProDashboard } from './roles/pro/pages/ProDashboard'; // IMPORT PRO DASHBOARD
import { CasualEditor } from './roles/casual/pages/CasualEditor'; // IMPORT CASUAL EDITOR
import { EditorProLite } from './roles/pro/pages/EditorProLite'; // IMPORT PRO EDITOR LITE
import { CasualRemix } from './roles/casual/pages/CasualRemix'; // IMPORT CASUAL REMIX
import { CasualMarketplace } from './roles/casual/pages/CasualMarketplace'; // IMPORT CASUAL MARKETPLACE
import { ProMarketplace } from './features/templates/pages/ProMarketplace'; // IMPORT PRO MARKETPLACE
import { CasualAvatar } from './roles/casual/pages/CasualAvatar'; // IMPORT CASUAL AVATAR
import { CasualBackgrounds } from './roles/casual/pages/CasualBackgrounds'; // IMPORT CASUAL BACKGROUNDS
import { BackgroundPacksProPanel } from './roles/pro/components/backgrounds/BackgroundPacksProPanel'; // IMPORT PRO BACKGROUNDS
import { CasualExport } from './roles/casual/pages/CasualExport'; // IMPORT CASUAL EXPORT
import { ProExport } from './roles/pro/pages/ProExport'; // IMPORT PRO EXPORT
import { CasualUpload } from './roles/casual/pages/CasualUpload'; // IMPORT CASUAL UPLOAD
import { ProUpload } from './roles/pro/pages/ProUpload'; // IMPORT PRO UPLOAD
import { AutoAlbumProPage } from './roles/pro/pages/AutoAlbumProPage'; // IMPORT AUTO ALBUM PRO
import { SyncProDashboard } from './roles/pro/pages/SyncProDashboard'; // IMPORT SYNC PRO
import { CasualCredits } from './roles/casual/pages/CasualCredits'; // IMPORT CASUAL CREDITS
import { CasualCreditsLog } from './roles/casual/pages/CasualCreditsLog'; // IMPORT CASUAL CREDITS LOG
import { CreditUsageLogProPage } from './roles/pro/billing/CreditUsageLogProPage'; // IMPORT PRO CREDITS LOG
import { CasualSubscription } from './roles/casual/pages/CasualSubscription'; // IMPORT CASUAL SUBSCRIPTION
import { CasualGenerator } from './roles/casual/pages/CasualGenerator'; // IMPORT CASUAL GENERATOR
import { ProGenerator } from './roles/pro/pages/ProGenerator'; // IMPORT PRO GENERATOR
import { CasualMyImages } from './roles/casual/pages/CasualMyImages'; // IMPORT CASUAL MY IMAGES
import { ProMyImages } from './roles/pro/pages/ProMyImages'; // IMPORT PRO MY IMAGES
import { OnboardingPage } from './features/onboarding/OnboardingPage'; // IMPORT ONBOARDING
import { ProfilePage } from './features/profile/ProfilePage'; // IMPORT PROFILE
import { NotificationsPage } from './features/notifications/NotificationsPage'; // IMPORT NOTIFICATIONS
import { PRICING_TIERS } from './services/mock/credits'; // IMPORT SHARED MOCK DATA
import { MOCK_USER, MOCK_PRO_USER, MOCK_FREELANCER_USER } from './services/mock/dashboard'; // IMPORT MOCK USER
import { FreelancerProjectsPage } from './roles/freelancer/pages/FreelancerProjectsPage'; // IMPORT FREELANCER PROJECTS
import { ProjectDetailPage } from './roles/freelancer/projects/ProjectDetailPage'; // IMPORT PROJECT DETAIL
import { ClientReviewPage } from './roles/freelancer/review/ClientReviewPage'; // IMPORT CLIENT REVIEW
import { ProjectDeliveryPage } from './roles/freelancer/delivery/ProjectDeliveryPage'; // IMPORT DELIVERY
import { FreelancerDashboardPage } from './roles/freelancer/analytics/FreelancerDashboardPage'; // IMPORT FREELANCER ANALYTICS
import { ClientCreditTrackingPage } from './roles/freelancer/billing/ClientCreditTrackingPage'; // IMPORT FREELANCER BILLING

// --- CONSTANTS & CONFIG ---
const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Remix", href: "#remix" },
  { label: "Marketplace", href: "#marketplace" },
  { label: "Pricing", href: "#pricing" },
];

const FEATURES = [
  {
    id: "enhance",
    title: "Auto Enhance",
    desc: "Improve your photos instantly with AI smart lighting.",
    icon: <Icons.Bolt />,
    color: "from-blue-500 to-cyan-400",
  },
  {
    id: "remix",
    title: "AI Remix",
    desc: "Transform your style in one click. Cyberpunk, Anime, or Oil.",
    icon: <Icons.Sparkles />,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: "templates",
    title: "Templates",
    desc: "Professional layouts ready to use for social media.",
    icon: <Icons.Layout />,
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "avatar",
    title: "AI Avatar",
    desc: "Generate trendy AI avatars in seconds.",
    icon: <Icons.User />,
    color: "from-orange-400 to-amber-400",
  },
];

// --- SHARED UI COMPONENTS (Landing Specific) ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = "",
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }) => {
  const baseStyles = "relative px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl shadow-violet-500/20 hover:shadow-violet-500/40 border border-white/10",
    outline: "bg-transparent border border-white/20 text-slate-300 hover:border-violet-500 hover:text-white hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/10",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
      )}
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </button>
  );
};

const Section = ({ children, className = "", id, ...props }: React.HTMLAttributes<HTMLElement> & { id?: string }) => (
  <section id={id} className={`py-24 px-6 md:px-12 max-w-7xl mx-auto relative ${className}`} {...props}>
    {children}
  </section>
);

// --- LANDING PAGE COMPONENTS ---

const Header = ({ onLoginClick, onSignupClick }: { onLoginClick: () => void, onSignupClick: () => void }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 100; // Account for fixed header height (80px) + some breathing room
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-[#0f0f12]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-violet-900/5' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer group select-none" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-violet-500/30 transition-all duration-300">
            R
          </div>
          <span className="text-xl font-bold text-white tracking-tight group-hover:text-violet-200 transition-colors">
            REPIX.art
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 bg-white/5 px-6 py-2 rounded-full border border-white/5 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group cursor-pointer"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button onClick={onLoginClick} className="hidden md:block text-slate-300 hover:text-white font-medium transition-colors px-4 py-2 hover:bg-white/5 rounded-lg">
            Log In
          </button>
          <Button onClick={onSignupClick} className="px-6 py-2.5 text-sm">
            Start Creating
          </Button>
        </div>
      </div>
    </header>
  );
};

const Hero = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <Section className="pt-32 pb-16 flex flex-col md:flex-row items-center gap-12 md:gap-20">
    <div className="flex-1 text-center md:text-left z-10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-900/30 border border-violet-500/30 text-violet-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in-up">
        <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
        New Engine v2.0 Live
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
        Master Your Photos with <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400 animate-gradient-x">
          AI Precision
        </span>
      </h1>
      <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto md:mx-0 leading-relaxed">
        Professional editing, creative remixing, and team collaboration in one powerful platform. 
        Join 2M+ creators turning imagination into reality.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
        <Button onClick={onCtaClick} className="w-full sm:w-auto text-lg px-10 py-4 shadow-violet-500/25">
          Start Editing Free
        </Button>
        <Button variant="outline" className="w-full sm:w-auto text-lg px-10 py-4">
          <Icons.Download className="w-5 h-5" />
          Download App
        </Button>
      </div>

      <div className="mt-10 flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500 font-medium">
        <div className="flex -space-x-2">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#020617] bg-slate-700 overflow-hidden">
               <img src={`https://i.pravatar.cc/100?img=${10+i}`} alt="user" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
        <p>Loved by 10,000+ Pro Designers</p>
      </div>
    </div>

    <div className="flex-1 relative w-full max-w-xl preserve-3d perspective-1000">
      <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/30 to-blue-600/30 blur-[100px] -z-10 animate-pulse-slow" />
      <div className="relative z-10 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/50 transform hover:rotate-y-2 transition-transform duration-500">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" 
          alt="App Interface" 
          className="rounded-lg shadow-lg border border-white/5"
        />
        
        {/* Floating UI Elements */}
        <div className="absolute -right-6 top-10 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '0s' }}>
          <div className="p-2 bg-violet-600 rounded-lg"><Icons.Bolt /></div>
          <div>
            <p className="text-xs text-slate-400">Enhance</p>
            <p className="font-bold text-sm">+24% Quality</p>
          </div>
        </div>

        <div className="absolute -left-6 bottom-20 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
          <div className="p-2 bg-pink-600 rounded-lg"><Icons.Sparkles /></div>
          <div>
            <p className="text-xs text-slate-400">Style</p>
            <p className="font-bold text-sm">Cyberpunk</p>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const FeaturesGrid = () => (
  <Section id="features" className="bg-slate-900/30">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
      <p className="text-slate-400 text-lg">Everything you need to create stunning visuals.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {FEATURES.map((feature, idx) => (
        <div 
          key={feature.id}
          className="group p-8 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer relative overflow-hidden"
        >
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
          
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-300`}>
            {React.cloneElement(feature.icon as React.ReactElement<any>, { width: 28, height: 28 })}
          </div>
          
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-colors">
            {feature.title}
          </h3>
          <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
            {feature.desc}
          </p>
        </div>
      ))}
    </div>
  </Section>
);

const RemixSection = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <Section id="remix" className="relative">
    <div className="flex flex-col lg:flex-row items-center gap-16">
      {/* Visual */}
      <div className="flex-1 relative w-full">
         <div className="grid grid-cols-2 gap-4">
             <div className="space-y-4 translate-y-8">
               <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 group">
                  <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur rounded text-xs font-medium">Original</div>
               </div>
               <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 group">
                  <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-violet-600/80 backdrop-blur rounded text-xs font-medium">Cyberpunk</div>
               </div>
             </div>
             <div className="space-y-4">
               <div className="relative rounded-2xl overflow-hidden aspect-square border border-white/10 group">
                  <img src="https://images.unsplash.com/photo-1633511090164-b43840ea1607?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-pink-600/80 backdrop-blur rounded text-xs font-medium">Anime</div>
               </div>
               <div className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-white/10 group">
                  <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 px-2 py-1 bg-cyan-600/80 backdrop-blur rounded text-xs font-medium">3D Render</div>
               </div>
             </div>
         </div>
         {/* Center Floating Element */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl flex items-center gap-3">
           <div className="p-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl text-white">
             <Icons.Wand className="w-6 h-6" />
           </div>
           <div>
             <p className="font-bold text-white">AI Remix</p>
             <p className="text-xs text-slate-400">One click magic</p>
           </div>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Reimagine Reality with <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">AI Styles</span>
        </h2>
        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
          Don't just edit—transform. Apply stunning artistic styles like Cyberpunk, Anime, and Oil Painting instantly. Our advanced AI understands depth and lighting to keep your subject perfect.
        </p>
        <ul className="space-y-4 mb-8">
          {['Preserves facial details', '50+ Premium Styles', '4K Resolution Export', 'Commercial Usage Rights'].map(item => (
            <li key={item} className="flex items-center gap-3 text-slate-300">
              <div className="p-1 rounded-full bg-violet-500/20 text-violet-400"><Icons.Check className="w-3 h-3" /></div>
              {item}
            </li>
          ))}
        </ul>
        <Button onClick={onCtaClick} variant="outline" className="px-8">Try Remix Free</Button>
      </div>
    </div>
  </Section>
);

const MarketplaceSection = ({ onCtaClick }: { onCtaClick: () => void }) => (
  <Section id="marketplace" className="bg-[#0f0f12]">
    <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
      <div className="max-w-xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Infinite Marketplace</h2>
        <p className="text-slate-400 text-lg">
          Thousands of community-crafted templates, backgrounds, and assets.
        </p>
      </div>
      <Button onClick={onCtaClick} variant="ghost" className="text-violet-400 hover:text-white">View All Assets <Icons.ArrowRight className="w-4 h-4" /></Button>
    </div>

    <div className="flex gap-6 overflow-x-auto pb-8 mask-gradient-x no-scrollbar">
      {[1,2,3,4,5].map((i) => (
        <div key={i} className="flex-none w-72 aspect-[4/5] rounded-2xl bg-[#1a1b26] border border-white/5 relative overflow-hidden group cursor-pointer hover:border-white/20 transition-all">
          <img src={`https://images.unsplash.com/photo-${i % 2 === 0 ? '1611591437281-460bfbe1220a' : '1586023492125-27b2c045efd7'}?auto=format&fit=crop&w=600&q=80`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
            <p className="text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">Template</p>
            <h4 className="text-lg font-bold text-white">Social Story Vol. {i}</h4>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const PricingSection = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <Section id="pricing">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-slate-400 text-lg mb-8">Choose the plan that fits your creative workflow.</p>
        
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRICING_TIERS.map((plan) => (
          <div 
            key={plan.title}
            className={`
              relative p-6 rounded-3xl border flex flex-col h-full
              ${plan.highlight 
                ? 'bg-[#1a1b26] border-violet-500 shadow-2xl shadow-violet-900/20 scale-105 z-10' 
                : 'bg-white/5 border-white/5 hover:border-white/10'
              }
            `}
          >
            {plan.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-[10px] font-bold text-white uppercase tracking-wider whitespace-nowrap">
                Most Popular
              </div>
            )}

            <h3 className="text-lg font-bold text-white mb-2">{plan.title}</h3>
            <p className="text-slate-400 text-xs mb-6 h-8">{plan.desc}</p>
            
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-3xl font-extrabold text-white">
                {billing === 'monthly' ? (plan.monthlyPrice === 0 ? 'Free' : `$${plan.monthlyPrice}`) : (plan.yearlyPrice === 0 ? 'Free' : `$${plan.yearlyPrice}`)}
              </span>
              {plan.yearlyPrice !== 0 && (
                <span className="text-slate-500 text-xs font-medium">/ mo</span>
              )}
            </div>

            <div className="space-y-3 mb-8 flex-1">
              {plan.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 text-xs text-slate-300">
                  <div className={`p-0.5 mt-0.5 rounded-full ${plan.highlight ? 'bg-violet-500/20 text-violet-400' : 'bg-slate-700 text-slate-400'}`}>
                    <Icons.Check className="w-2.5 h-2.5" />
                  </div>
                  {feat}
                </div>
              ))}
            </div>

            <Button 
              onClick={onCtaClick} 
              variant={plan.highlight ? 'primary' : 'outline'}
              className="w-full text-sm py-3"
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
};

// --- MAIN APP COMPONENT ---

const LandingPage = ({ onNavigate }: { onNavigate: (path: string) => void }) => (
  // Force dark mode: 'dark' class enables tailwind dark mode, bg-[#020617] overrides body light bg
  <div className="min-h-screen dark bg-[#020617] text-white"> 
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617] -z-20" />
    <Header 
      onLoginClick={() => onNavigate('auth')} 
      onSignupClick={() => onNavigate('auth')} 
    />
    <main className="text-white">
      <Hero onCtaClick={() => onNavigate('auth')} />
      <FeaturesGrid />
      <RemixSection onCtaClick={() => onNavigate('auth')} />
      <MarketplaceSection onCtaClick={() => onNavigate('auth')} />
      <PricingSection onCtaClick={() => onNavigate('auth')} />
      
      <Section className="text-center py-32">
        <h2 className="text-4xl font-bold mb-8">Ready to transform your workflow?</h2>
        <Button onClick={() => onNavigate('auth')} className="text-xl px-12 py-5 mx-auto">
          Get Started Now
        </Button>
      </Section>
    </main>
    <footer className="py-12 border-t border-white/5 text-center text-slate-500 text-sm">
      <p>&copy; 2024 REPIX.art. All rights reserved.</p>
    </footer>
  </div>
);

type ViewState = 'landing' | 'auth' | 'onboarding' | 'dashboard' | 'profile' | 'settings' | 'editor' | 'remix' | 'marketplace' | 'avatar' | 'backgrounds' | 'export' | 'upload' | 'credits' | 'credits-log' | 'subscription' | 'generator' | 'notifications' | 'auto-albums' | 'sync-pro' | 'my-images' | 'projects' | 'project-detail' | 'client-review' | 'delivery' | 'freelancer-analytics' | 'freelancer-billing';

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [userRole, setUserRole] = useState<'casual' | 'pro' | 'freelancer'>('casual');
  
  // Lifted User State
  const [userCredits, setUserCredits] = useState(MOCK_USER.credits);

  const handleAddCredits = (amount: number) => {
    setUserCredits(prev => prev + amount);
  };

  const handleOnboardingFinish = (selectedRole: string) => {
    // Determine which role to set based on ID
    if (selectedRole === 'agency') {
       setUserRole('freelancer'); // Mapping agency to freelance for now for demo
    } else if (selectedRole === 'pro' || selectedRole === 'team') {
       setUserRole('pro');
    } else {
       setUserRole('casual');
    }
    setCurrentView('dashboard');
  }

  // Determine current user object based on role
  const currentUser = userRole === 'freelancer' ? MOCK_FREELANCER_USER : userRole === 'pro' ? MOCK_PRO_USER : MOCK_USER;

  // Toggle role logic
  const handleRoleToggle = () => {
    setUserRole(prev => {
      if (prev === 'casual') return 'pro';
      if (prev === 'pro') return 'freelancer';
      return 'casual';
    });
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'auth':
        return <AuthPage onBack={() => setCurrentView('onboarding')} />;
      case 'onboarding':
        return <OnboardingPage onFinish={handleOnboardingFinish} />;
      case 'dashboard':
        if (userRole === 'pro' || userRole === 'freelancer') {
           // Both Pro and Freelancer use ProDashboard, but Freelancer gets extra flag
           return <ProDashboard 
             onLogout={() => setCurrentView('landing')} 
             onNavigate={(path) => setCurrentView(path as ViewState)} 
             isFreelancer={userRole === 'freelancer'}
           />;
        }
        return <CasualDashboard onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} userCredits={userCredits} />;
      
      case 'projects': 
        if (userRole === 'freelancer') {
          return <FreelancerProjectsPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <ProDashboard onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;

      case 'project-detail':
        if (userRole === 'freelancer') {
           return <ProjectDetailPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <FreelancerProjectsPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;

      case 'delivery':
        if (userRole === 'freelancer') {
           return <ProjectDeliveryPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <FreelancerProjectsPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;

      case 'freelancer-analytics': 
        if (userRole === 'freelancer') {
           return <FreelancerDashboardPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <ProDashboard onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;

      case 'freelancer-billing': // NEW ROUTE
        if (userRole === 'freelancer') {
           return <ClientCreditTrackingPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <ProDashboard onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;

      case 'client-review':
        // Accessible by anyone theoretically (public link), but here handled inside app routing for demo
        return <ClientReviewPage onNavigate={(path) => setCurrentView(path as ViewState)} />;

      case 'profile':
        return <ProfilePage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'notifications':
        return <NotificationsPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'settings':
        return <ProfilePage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'editor':
        if (userRole === 'pro' || userRole === 'freelancer') {
          return <EditorProLite onBack={() => setCurrentView('dashboard')} onExport={() => setCurrentView('export')} />;
        }
        return <CasualEditor onBack={() => setCurrentView('dashboard')} onExport={() => setCurrentView('export')} />;
      case 'export':
        if (userRole === 'pro' || userRole === 'freelancer') {
          return <ProExport onBack={() => setCurrentView('editor')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <CasualExport onBack={() => setCurrentView('editor')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'remix':
        return <CasualRemix user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'marketplace':
        if (userRole === 'pro' || userRole === 'freelancer') {
          return <ProMarketplace user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <CasualMarketplace user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'avatar':
        return <CasualAvatar user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'backgrounds':
        if (userRole === 'pro' || userRole === 'freelancer') {
          return <BackgroundPacksProPanel user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <CasualBackgrounds user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'upload':
        if (userRole === 'pro' || userRole === 'freelancer') {
          return <ProUpload onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <CasualUpload user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'auto-albums':
        // Only accessible in Pro usually, but fallback if Casual tries to access (could redirect)
        return <AutoAlbumProPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'sync-pro':
        if (userRole === 'pro' || userRole === 'freelancer') {
          return <SyncProDashboard onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        // Fallback for casual
        return <CasualDashboard onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} userCredits={userCredits} />;
      case 'credits':
        return <CasualCredits onNavigate={(path) => setCurrentView(path as ViewState)} onAddCredits={handleAddCredits} />;
      case 'credits-log':
        // Use Pro Log for Pro Users, Casual Log for Casual Users
        if (userRole === 'pro' || userRole === 'freelancer') {
           return <CreditUsageLogProPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <CasualCreditsLog onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'subscription':
        return <CasualSubscription user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => {
           if (path === 'dashboard' || path === 'auth') {
             // Logic for upgrade
           }
           setCurrentView(path as ViewState)
        }} />;
      case 'generator':
        if (userRole === 'pro' || userRole === 'freelancer') {
          return <ProGenerator onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <CasualGenerator onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'my-images':
        if (userRole === 'pro' || userRole === 'freelancer') {
          return <ProMyImages onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
        }
        return <CasualMyImages onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      default:
        return <LandingPage onNavigate={(path) => setCurrentView(path as ViewState)} />;
    }
  };

  return (
    <>
      {/* Dev Tool to Switch Roles */}
      <div className="fixed bottom-4 right-4 z-[9999] opacity-50 hover:opacity-100 transition-opacity">
         <button 
           onClick={handleRoleToggle}
           className="bg-black/80 text-white text-xs px-3 py-1 rounded-full border border-white/20"
         >
           Switch Role: {userRole.toUpperCase()}
         </button>
      </div>
      {renderView()}
    </>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
