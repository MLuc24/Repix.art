import React from "react";
import { Marquee } from "./Marquee";
import { Icons } from "./Icons";
import { motion } from "framer-motion";

// Update Brands with correct colors/shapes
const BRAND_ICONS = {
  Microsoft: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="1" y="1" width="10" height="10" fill="#F25022"/>
      <rect x="13" y="1" width="10" height="10" fill="#7FBA00"/>
      <rect x="1" y="13" width="10" height="10" fill="#00A4EF"/>
      <rect x="13" y="13" width="10" height="10" fill="#FFB900"/>
    </svg>
  ),
  Adobe: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M15.1 0H24v24L15.1 0zM8.9 0H0v24l8.9-24zm0 0h6.2l-3.1 8 5.6 15h-4l-1.6-4.6h-6L8.9 0z" />
    </svg>
  ),
  Figma: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 24c3.314 0 6-2.686 6-6 0-3.314-2.686-6-6-6-3.314 0-6 2.686-6 6 6z" fill="#0ACF83"/>
      <path d="M6 12c0-3.314 2.686-6 6-6 3.314 0 6 2.686 6 6H6z" fill="#A259FF"/>
      <path d="M6 6C6 2.686 8.686 0 12 0c3.314 0 6 2.686 6 6H6z" fill="#F24E1E"/>
      <path d="M12 12c3.314 0 6-2.686 6-6V0H12c-3.314 0-6 2.686-6 6v6h6z" fill="#FF7262"/>
      <path d="M12 18c0-3.314-2.686-6-6-6-3.314 0-6 2.686-6 6s2.686 6 6 6z" fill="#1ABCFE"/>
    </svg>
  ),
  Spotify: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.32-1.32 9.841-.66 13.441 1.56.421.24.6.84.3 1.26zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.299z" />
    </svg>
  ),
  Amazon: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.6 15.6c-.9.2-2 .3-2.8.2-1.4-.2-2.3-.9-2.5-2v-.1c0-.1 0-.1.1-.1.9-.6 2.3-.9 3.5-1.1 1.7-.2 2.1 1 2.1 2.2v.9h-.4zm2.1-5.1c0 1.9-.1 3.2-.1 4.7 0 .4 0 .8.1 1.1h-2.1c-.1-.3-.1-.7-.1-1.1-.5.7-1.4 1.3-3 1.3-1.8 0-3.3-1.1-3.3-3.2 0-2 1.5-3.1 4.1-3.4 1.5-.2 2.3-.1 2.5 0v-.3c0-1-.3-2-2-2-.9 0-1.6.3-2.1.8-.1.1-.3.1-.4 0l-1-.9c-.1-.1-.1-.2 0-.3.9-1.1 2.3-1.5 3.9-1.5 2.5 0 3.5 1.5 3.7v1.1zm5.2 3.9c-.2.2-1.8 1.1-1.8 1.1-.2.2-.3.1-.3-.1 0 0 .5-3.3-1.2-5.4-.1-.1 0-.2.1-.3l.7-.6c.1-.1.2-.1.3 0 2 2.3 2.5 4.9 2.2 5.3zm-13.4.6s-1.8-1-2.1-1.2c-.1-.1-.1-.2 0-.2 0 0 2.2-.6 4.7.1.1 0 .1.1.1.2 0 0-.8.9-2.7 1.1z" />
    </svg>
  ),
  Netflix: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5.398 0v23.996h4.498L18.496 4.88v19.112h4.505V0.012h-4.4L8.71 19.957V0.008H5.398z"/>
    </svg>
  )
};

// Partners with specific brand colors
const PARTNERS = [
  { name: "Google", icon: <Icons.Google />, color: "" }, // Google icon is multi-colored SVG
  { name: "Microsoft", icon: <BRAND_ICONS.Microsoft />, color: "" }, // Microsoft icon is multi-colored SVG
  { name: "Adobe", icon: <BRAND_ICONS.Adobe />, color: "group-hover:text-[#FF0000]" },
  { name: "Figma", icon: <BRAND_ICONS.Figma />, color: "" }, // Figma icon is multi-colored SVG
  { name: "Spotify", icon: <BRAND_ICONS.Spotify />, color: "group-hover:text-[#1DB954]" },
  { name: "Amazon", icon: <BRAND_ICONS.Amazon />, color: "group-hover:text-[#FF9900]" },
  { name: "Netflix", icon: <BRAND_ICONS.Netflix />, color: "group-hover:text-[#E50914]" },
  { name: "Apple", icon: <Icons.Apple />, color: "group-hover:text-white" },
];

export const PartnersMarquee = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      
      {/* Feature-style Header */}
      <div className="container mx-auto px-4 mb-20 text-center relative z-10">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           viewport={{ once: true }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6"
         >
           <Icons.Check className="w-3 h-3" /> Trusted Ecosystem
         </motion.div>
         <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
           viewport={{ once: true }}
           className="text-4xl md:text-6xl font-black mb-6"
         >
           Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Industry Leaders</span>
         </motion.h2>
         <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           viewport={{ once: true }}
           className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
         >
           Empowering creative teams worldwide to push the boundaries of what's possible with AI.
         </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
          
          {/* Colorful Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/20 to-blue-600/20 blur-[60px] rounded-full -z-10" />

          {/* Marquee with Transparency Mask - Fade out edges */}
          <div className="relative [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
            <Marquee speed={30} className="[--gap:5rem] py-6">
              {PARTNERS.map((partner, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  {/* Icon Container with subtle color pop */}
                  <div className="w-14 h-14 flex items-center justify-center p-3 rounded-2xl bg-white/5 border border-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                      {/* 
                         - Default: Grayscale + Opacity
                         - Hover: Grayscale-0 + Full Opacity + Brand Color (via text class)
                      */}
                      <div className={`w-full h-full grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 ${partner.color || 'text-white'}`}>
                        {React.cloneElement(partner.icon as React.ReactElement<any>, { 
                            width: '100%', 
                            height: '100%', 
                            // Remove hardcoded fills so 'currentColor' works for simple icons
                            // And allow multi-color icons to show through via grayscale-0
                        })}
                      </div>
                  </div>
                  <span className="text-xl font-bold text-slate-500 group-hover:text-white transition-colors duration-300 hidden md:block">
                      {partner.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
      </div>
    </section>
  );
};
