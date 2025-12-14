import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Icons } from './Icons';
import { PRICING_TIERS } from '../../services/mock/credits';

const PricingCard = ({ plan, billing, onCtaClick }: { plan: typeof PRICING_TIERS[0], billing: 'monthly' | 'yearly', onCtaClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left);
    const mouseY = (e.clientY - rect.top);

    const rX = (mouseY / height - 0.5) * -20; 
    const rY = (mouseX / width - 0.5) * 20;   

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative h-full w-full rounded-[32px] p-[1px] group cursor-pointer perspective-1000"
    >
      {/* Border Gradient Container */}
      <div className={`absolute inset-0 rounded-[32px] transition-opacity duration-300 ${plan.highlight ? 'bg-gradient-to-b from-violet-500 to-indigo-500 opacity-100' : 'bg-gradient-to-b from-white/20 to-white/5 opacity-50 group-hover:opacity-100'}`} />
      
      {/* Main Card Content */}
      <div 
        className={`relative h-full w-full rounded-[31px] p-8 overflow-hidden flex flex-col items-start transition-colors duration-300 ${plan.highlight ? 'bg-[#13141f]/95' : 'bg-black/80 hover:bg-black/90'}`}
        style={{ transform: "translateZ(1px)" }}
      >
        {plan.highlight && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-1.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-b-xl shadow-lg shadow-violet-500/20 text-[10px] font-bold text-white uppercase tracking-wider z-20">
            Most Popular
          </div>
        )}

        {/* Spotlights */}
        <div className={`absolute -right-20 -top-20 w-64 h-64 bg-violet-600/20 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 ${plan.highlight ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'}`} />
        <div className={`absolute -left-20 -bottom-20 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 ${plan.highlight ? 'opacity-40' : 'opacity-0 group-hover:opacity-20'}`} />

        {/* 3D Inner Content */}
        <h3 className={`text-xl font-bold mb-2 relative z-10 ${plan.highlight ? 'text-white' : 'text-slate-200'}`} style={{ transform: "translateZ(20px)" }}>{plan.title}</h3>
        <p className="text-slate-400 text-sm mb-8 h-10 leading-relaxed relative z-10" style={{ transform: "translateZ(20px)" }}>{plan.desc}</p>
        
        <div className="flex items-baseline gap-1 mb-8 relative z-10" style={{ transform: "translateZ(30px)" }}>
          <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-slate-200'}`}>
            {billing === 'monthly' ? (plan.monthlyPrice === 0 ? 'Free' : `$${plan.monthlyPrice}`) : (plan.yearlyPrice === 0 ? 'Free' : `$${plan.yearlyPrice}`)}
          </span>
          {plan.yearlyPrice !== 0 && (
            <span className="text-slate-500 text-sm font-medium">/ mo</span>
          )}
        </div>

        <div className="space-y-4 mb-10 flex-1 w-full relative z-10" style={{ transform: "translateZ(20px)" }}>
          {plan.features.map((feat, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-slate-300 font-medium">
              <div className={`p-1 mt-0.5 rounded-full ${plan.highlight ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30' : 'bg-slate-700/50 text-slate-400'}`}>
                <Icons.Check className="w-3 h-3" />
              </div>
              {feat}
            </div>
          ))}
        </div>

        <button
          onClick={onCtaClick} 
          className={`relative z-10 w-full text-sm py-4 rounded-2xl font-bold transition-all duration-300 active:scale-95 ${plan.highlight ? 'bg-white text-black hover:bg-slate-200' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20'}`}
          style={{ transform: "translateZ(40px)" }}
        >
          {plan.cta}
        </button>
      </div>
    </motion.div>
  );
};

export const Pricing3D = ({ onCtaClick }: { onCtaClick: () => void }) => {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
        {/* Background Ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-4xl mx-auto mb-16 px-4 relative z-10">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md"
          >
             <Icons.CreditCard className="w-3 h-3" /> Flexibile Plans
          </motion.div>
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.1 }}
             viewport={{ once: true }}
             className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight"
          >
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Transparent Pricing</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             viewport={{ once: true }}
             className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto"
          >
            Choose the plan that fits your creative workflow. No hidden fees.
          </motion.p>
          
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
              className="w-16 h-8 rounded-full bg-white/10 p-1 relative transition-colors duration-300 ring-1 ring-white/10"
            >
              <div className={`w-6 h-6 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50 transition-transform duration-300 ${billing === 'yearly' ? 'translate-x-8' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm font-bold flex items-center gap-2 ${billing === 'yearly' ? 'text-white' : 'text-slate-500'}`}>
              Yearly
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/20">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 max-w-[1600px] mx-auto relative z-10">
           {PRICING_TIERS.map((plan, i) => (
             <motion.div
               key={plan.title}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
               viewport={{ once: true }}
             >
                <PricingCard plan={plan} billing={billing} onCtaClick={onCtaClick} />
             </motion.div>
           ))}
        </div>
    </section>
  );
};
