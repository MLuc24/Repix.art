import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Icons } from './Icons';
import { Logo } from './Logo';
import { ShimmerButton } from './ShimmerButton';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  gradient: string;
  iconColor: string;
}

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export const Header = ({ onLoginClick, onSignupClick }: HeaderProps) => {

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
       el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems: MenuItem[] = [
     {
      icon: <Icons.Gallery className="h-5 w-5" />,
      label: "Showcase",
      action: () => scrollToSection('showcase'),
      gradient: "radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.06) 50%, rgba(190,24,93,0) 100%)",
      iconColor: "group-hover:text-pink-500",
    },
    {
      icon: <Icons.Bolt className="h-5 w-5" />,
      label: "Features",
      action: () => scrollToSection('features'),
      gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
      iconColor: "group-hover:text-blue-500",
    },
    {
      icon: <Icons.Share className="h-5 w-5" />,
      label: "Remix",
      action: () => scrollToSection('remix'),
      gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
      iconColor: "group-hover:text-orange-500",
    },
    {
      icon: <Icons.Layout className="h-5 w-5" />,
      label: "Marketplace",
      action: () => scrollToSection('marketplace'),
      gradient: "radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(22,163,74,0.06) 50%, rgba(21,128,61,0) 100%)",
      iconColor: "group-hover:text-green-500",
    },
    {
      icon: <Icons.CreditCard className="h-5 w-5" />,
      label: "Pricing",
      action: () => scrollToSection('pricing'),
      gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
      iconColor: "group-hover:text-red-500",
    },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
         className="flex items-center gap-1 p-2 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40 pointer-events-auto"
      >
        
        {/* Logo */}
        <div className="pl-2 pr-4">
            <Logo className="scale-75 origin-left" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-white/10 hidden md:block" />

        {/* 3D Menu Bar */}
        <nav className="hidden md:block relative px-2">
          <ul className="flex items-center gap-1 relative z-10">
            {menuItems.map((item) => (
              <motion.li key={item.label} className="relative">
                <motion.div
                  className="block rounded-xl overflow-visible group relative cursor-pointer"
                  style={{ perspective: "600px" }}
                  whileHover="hover"
                  initial="initial"
                  onClick={item.action}
                >
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 z-0 pointer-events-none rounded-xl"
                    variants={glowVariants}
                    style={{
                      background: item.gradient,
                      opacity: 0,
                    }}
                  />
                  {/* Front-facing menu item */}
                  <div className="flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent text-slate-300 group-hover:text-white transition-colors rounded-xl">
                    <motion.div variants={itemVariants} transition={sharedTransition} style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom", position: 'relative' }} className="flex items-center gap-2"> 
                         <span className={`transition-colors duration-300 ${item.iconColor}`}>
                            {item.icon}
                        </span>
                        <span className="font-medium text-sm">{item.label}</span>
                    </motion.div>
                  </div>
                  
                  {/* Back-facing menu item (Flip) */}
                  <motion.div
                    className="absolute inset-0 z-10 flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-slate-300 group-hover:text-white transition-colors rounded-xl pointer-events-none"
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      transform: "rotateX(90deg)"
                    }}
                  >
                       <span className={`transition-colors duration-300 ${item.iconColor}`}>
                            {item.icon}
                        </span>
                        <span className="font-medium text-sm">{item.label}</span>
                  </motion.div>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Vertical Divider */}
        <div className="w-px h-8 bg-white/10 hidden md:block" />

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pl-2">
            <button 
                onClick={onSignupClick}
                className="px-4 py-2 rounded-xl text-sm font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
                Sign Up
            </button>
            <ShimmerButton 
                onClick={onLoginClick}
                className="rounded-xl shadow-lg shadow-violet-500/20"
                backgroundClassName="bg-gradient-to-tr from-violet-600 to-indigo-500 group-hover:brightness-110"
                shimmerColor="#ffffff"
            >
                <span className="px-5 py-2 text-sm font-bold">Login</span>
            </ShimmerButton>
        </div>

      </motion.div>
    </header>
  );
};
