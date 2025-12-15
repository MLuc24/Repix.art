
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Icons } from './shared/components/Icons'; // IMPORT SHARED ICONS
import { Logo } from './shared/components/Logo'; // IMPORT LOGO
import { LandingMarquee } from './shared/components/LandingMarquee'; // IMPORT MARQUEE
import { ShimmerButton } from './shared/components/ShimmerButton'; // IMPORT SHIMMER BUTTON
import { RemixSection } from './shared/components/RemixSection'; // IMPORT REMIX SECTION
import { ThreeDCarousel } from './shared/components/ThreeDCarousel'; // IMPORT CAROUSEL
import { Features3D } from './shared/components/Features3D'; // IMPORT FEATURES 3D
import { ShowcaseSection } from './shared/components/ShowcaseSection'; // IMPORT SHOWCASE
import { Pricing3D } from './shared/components/Pricing3D'; // IMPORT PRICING 3D
import { Footer } from './shared/components/Footer'; // IMPORT FOOTER
import { PartnersMarquee } from './shared/components/PartnersMarquee'; // IMPORT PARTNERS
import { Header } from './shared/components/Header'; // IMPORT HEADER 3D
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
import { SettingsPage } from './features/settings/SettingsPage'; // IMPORT SETTINGS

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
  <section id={id} className={`py-24 px-6 md:px-12 max-w-[1600px] mx-auto relative ${className}`} {...props}>
    {children}
  </section>
);

// --- LANDING PAGE COMPONENTS ---





import { GlassModal } from './shared/components/GlassUI';

// ... other imports

const Hero = ({ onCtaClick, onWatchDemo }: { onCtaClick: () => void, onWatchDemo: () => void }) => (
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
        <ShimmerButton 
          onClick={onCtaClick} 
          wrapperClassName="w-full sm:w-auto shadow-violet-500/25"
          className="rounded-xl"
          backgroundClassName="bg-gradient-to-tr from-violet-600 to-indigo-500 group-hover:brightness-110"
          shimmerColor="#ffffff"
        >
           <span className="px-10 py-4 text-lg font-bold flex items-center gap-2">Start Editing Free <Icons.Wand className="w-5 h-5"/></span>
        </ShimmerButton>
        <button 
           className="relative w-full sm:w-auto px-10 py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 overflow-hidden group border border-white/20 text-slate-300 hover:border-violet-500 hover:text-white hover:bg-violet-500/10 hover:shadow-lg hover:shadow-violet-500/10" 
           onClick={onWatchDemo}
        >
          <Icons.Play className="w-5 h-5 group-hover:text-red-500 transition-colors" />
          Watch Demo
        </button>
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
      <div className="relative z-10 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl shadow-black/80 transform hover:rotate-y-2 transition-transform duration-500 ring-1 ring-white/10">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80" 
          alt="App Interface" 
          className="rounded-lg shadow-lg border border-white/5"
        />
        
        {/* Floating UI Elements */}
        <div className="absolute -right-6 top-10 bg-[#1e293b] backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-center gap-4 animate-float" style={{ animationDelay: '0s' }}>
          <div className="p-3 bg-violet-600 rounded-xl shadow-lg shadow-violet-500/30"><Icons.Bolt className="w-5 h-5 text-white" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Enhance</p>
            <p className="font-black text-white text-lg">+24% Quality</p>
          </div>
        </div>

        <div className="absolute -left-6 bottom-20 bg-[#1e293b] backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.5)] flex items-center gap-4 animate-float" style={{ animationDelay: '2s' }}>
          <div className="p-3 bg-pink-600 rounded-xl shadow-lg shadow-pink-500/30"><Icons.Sparkles className="w-5 h-5 text-white" /></div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Style</p>
            <p className="font-black text-white text-lg">Cyberpunk</p>
          </div>
        </div>
      </div>
    </div>
  </Section>
);

const MarketplaceSection = ({ onCtaClick, onSellClick }: { onCtaClick: () => void, onSellClick?: () => void }) => (
  <Section id="marketplace" className="relative overflow-hidden pt-32">
    {/* Background Glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-900/20 blur-[120px] rounded-full pointer-events-none -z-10" />

    <div className="text-center max-w-4xl mx-auto mb-10 relative z-10 px-4">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
        <Icons.Layout className="w-3 h-3" /> Community Assets
      </div>
      <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
        Infinite <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">Marketplace</span>
      </h2>
      <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto">
        Browse, Preview, and Use thousands of community-crafted templates.
        <br className="hidden md:block" />
        Filter by rating, author, or tags to find the perfect asset for your project.
      </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={onCtaClick} className="rounded-full px-8 py-4 text-base shadow-violet-500/20">
            Browse All Assets
          </Button>
          <Button onClick={onSellClick} variant="outline" className="rounded-full px-8 py-4 text-base">
            Sell Your Work
          </Button>
        </div>
    </div>

    <div className="h-[600px] w-full -mt-20 relative z-0">
      <ThreeDCarousel />
      {/* Bottom fade for smooth transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none" />
    </div>
  </Section>
);

// --- MAIN APP COMPONENT ---

const LandingPage = ({ onNavigate }: { onNavigate: (path: string, mode?: 'login' | 'register') => void }) => {
  const [showDemo, setShowDemo] = useState(false);

  return (
  // Force dark mode: 'dark' class enables tailwind dark mode, bg-[#020617] overrides body light bg
  <div className="min-h-screen dark bg-[#020617] text-white"> 
    <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#020617] to-[#020617] -z-20" />
    <LandingMarquee />
    <Header 
      onLoginClick={() => onNavigate('auth', 'login')} 
      onSignupClick={() => onNavigate('auth', 'register')} 
    />
    <main className="text-white">
      <Hero onCtaClick={() => onNavigate('auth', 'register')} onWatchDemo={() => setShowDemo(true)} />
      <PartnersMarquee />
      <ShowcaseSection 
        onCtaClick={() => onNavigate('auth', 'register')} 
        onGalleryClick={() => {
          const element = document.getElementById('marketplace');
          if (element) {
             element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
      <Features3D />
      <RemixSection 
        onCtaClick={() => onNavigate('auth', 'register')} 
        onGalleryClick={() => {
          const element = document.getElementById('marketplace');
          if (element) {
             element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />
      <MarketplaceSection 
        onCtaClick={() => onNavigate('auth', 'login')} 
        onSellClick={() => onNavigate('auth', 'register')}
      />
      <Pricing3D onCtaClick={() => onNavigate('auth', 'register')} />
      
      <GlassModal 
        isOpen={showDemo} 
        onClose={() => setShowDemo(false)} 
        className="!bg-transparent !p-0 !border-0 !shadow-none max-w-7xl w-full mx-auto"
      >
        <div className="relative group perspective-1000">
           {/* Ambient Glow - Adjusted for transparency */}
           <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-indigo-600 rounded-[32px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
           
           {/* Monitor Frame - Glass Effect */}
           <div className="relative bg-white/5 backdrop-blur-2xl rounded-[32px] p-2 md:p-4 border border-white/10 shadow-2xl ring-1 ring-white/10">
              {/* Screen Glare/Reflection */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[28px] pointer-events-none z-20 opacity-30" />
              
              {/* Inner Bezel */}
              <div className="relative rounded-[24px] overflow-hidden bg-black/80 shadow-inner border border-white/5">
                <div className="relative pt-[56.25%]">
                    <iframe 
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=1" 
                      title="REPIX Demo"
                      className="absolute inset-0 w-full h-full rounded-[24px]"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                </div>
              </div>
              
              {/* Bottom Chin */}
              <div className="h-4 md:h-6 flex items-center justify-center opacity-50">
                 <div className="w-1 h-1 rounded-full bg-white/50 mx-auto box-content border border-white/20 p-0.5" />
              </div>
           </div>
        </div>
      </GlassModal>
    </main>
    <Footer />
  </div>
  );
};

type ViewState = 'landing' | 'auth' | 'onboarding' | 'dashboard' | 'profile' | 'settings' | 'editor' | 'remix' | 'marketplace' | 'avatar' | 'backgrounds' | 'export' | 'upload' | 'credits' | 'credits-log' | 'subscription' | 'generator' | 'notifications' | 'auto-albums' | 'sync-pro' | 'my-images' | 'projects' | 'project-detail' | 'client-review' | 'delivery' | 'freelancer-analytics' | 'freelancer-billing';

const App = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [userRole, setUserRole] = useState<'casual' | 'pro' | 'freelancer'>('casual');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
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
    setCurrentView('dashboard');
  }

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={(path, mode) => {
           if (mode) {
             setAuthMode(mode);
           } else if (path === 'auth') {
             setAuthMode('login'); // Default
           }
           setCurrentView(path as ViewState);
        }} />;
      case 'auth':
        return <AuthPage 
            initialMode={authMode} 
            onBack={() => setCurrentView('landing')} 
            onLoginSuccess={() => setCurrentView('onboarding')} 
        />;
      case 'onboarding':
        return <OnboardingPage onFinish={handleOnboardingFinish} onBack={() => {
            setAuthMode('login');
            setCurrentView('auth');
        }} />;
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
        return <ProfilePage user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'notifications':
        return <NotificationsPage onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
      case 'settings':
        return <SettingsPage user={currentUser} onLogout={() => setCurrentView('landing')} onNavigate={(path) => setCurrentView(path as ViewState)} />;
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
      {/* Dev Tool to Switch Roles - Only visible in authenticated dashboard views */}
      {currentView !== 'landing' && currentView !== 'auth' && currentView !== 'onboarding' && (
        <div className="fixed bottom-4 right-4 z-[9999] opacity-50 hover:opacity-100 transition-opacity">
           <button 
             onClick={handleRoleToggle}
             className="bg-black/80 text-white text-xs px-3 py-1 rounded-full border border-white/20"
           >
             Switch Role: {userRole.toUpperCase()}
           </button>
        </div>
      )}
      {renderView()}
    </>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
