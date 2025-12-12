
import React from 'react';
import { Icons } from '../../../shared/components/Icons';
import { NeonButton, GlassPanel } from '../../../shared/components/GlassUI';
import { CreditPack, PaymentMethod } from '../types';

// --- HEADER ---
export const CreditsHeader = ({ onBack }: { onBack: () => void }) => (
  <div className="relative z-20 mb-16 pt-8">
    {/* Navigation Absolute Left */}
    <div className="absolute top-0 left-0">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors py-2 px-4 rounded-full hover:bg-white/5 border border-transparent hover:border-white/5"
      >
        <Icons.ChevronLeft className="w-5 h-5" />
        <span className="font-medium text-sm">Back</span>
      </button>
    </div>

    {/* Centered Hero Text */}
    <div className="text-center max-w-2xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-bold uppercase tracking-wider mb-6 animate-fade-in-up">
        <Icons.Sparkles className="w-3 h-3 text-violet-400" />
        <span>Power Up Your Art</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
        Choose Your Plan
      </h1>
      <p className="text-slate-400 text-lg md:text-xl leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        Flexible credits for everyone. Unlock <span className="text-white font-medium">HD exports</span>, <span className="text-white font-medium">Avatars</span>, and <span className="text-white font-medium">Pro Styles</span>.
      </p>
    </div>
  </div>
);

// --- PACK CARD ---
interface CreditPackCardProps {
  pack: CreditPack;
  onBuy: (pack: CreditPack) => void;
  key?: React.Key;
}

export const CreditPackCard = ({ pack, onBuy }: CreditPackCardProps) => {
  const isPopular = pack.isPopular;

  return (
    <div 
      className={`
        relative flex flex-col transition-all duration-300 group
        ${isPopular 
          ? 'z-10 transform md:-translate-y-4' 
          : 'z-0'
        }
      `}
    >
      {/* Popular Tag */}
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
          <div className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
            <Icons.Star className="w-3 h-3 fill-black" />
            Most Popular
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className={`
        flex-1 rounded-[30px] p-8 flex flex-col items-center text-center relative overflow-hidden border transition-all duration-300
        ${isPopular
          ? 'bg-[#13141c] border-violet-500/50 shadow-[0_0_40px_rgba(139,92,246,0.2)]'
          : 'bg-[#0f0f12] border-white/5 hover:border-white/10 hover:bg-[#13141c]'
        }
      `}>
        {/* Glow BG for Popular */}
        {isPopular && <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-violet-500/10 blur-[60px]" />}

        <h3 className={`text-lg font-bold mb-4 ${isPopular ? 'text-white' : 'text-slate-400'}`}>{pack.title}</h3>
        
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-sm font-bold text-slate-500">$</span>
          <span className="text-5xl font-extrabold text-white tracking-tight">{Math.floor(pack.price)}</span>
          <span className="text-xl font-bold text-slate-400">.{pack.price.toFixed(2).split('.')[1]}</span>
        </div>
        
        <div className="mb-8 px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-violet-300 font-mono text-sm font-bold">
          {pack.credits} Credits
        </div>
        
        <div className="w-full space-y-4 mb-8 border-t border-white/5 pt-8">
          {pack.features?.map((feat, i) => (
            <div key={i} className="flex items-center gap-3 text-sm text-slate-300 text-left w-full">
              <div className={`p-0.5 rounded-full flex-none ${isPopular ? 'text-green-400 bg-green-400/10' : 'text-slate-500 bg-slate-800'}`}>
                <Icons.Check className="w-3 h-3" />
              </div>
              <span className={isPopular ? 'text-white' : 'text-slate-300'}>{feat}</span>
            </div>
          ))}
          <div className="flex items-center gap-3 text-sm text-slate-500 text-left w-full">
              <div className="p-0.5 rounded-full flex-none bg-slate-800 text-slate-600">
                <Icons.Check className="w-3 h-3" />
              </div>
              <span>No expiration date</span>
          </div>
        </div>

        <div className="mt-auto w-full">
          {isPopular ? (
            <NeonButton onClick={() => onBuy(pack)} className="w-full shadow-violet-500/25">
              Choose Plan
            </NeonButton>
          ) : (
             <button 
               onClick={() => onBuy(pack)}
               className="w-full py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold transition-all hover:scale-[1.02]"
             >
               Choose Plan
             </button>
          )}
        </div>
      </div>
    </div>
  );
};

// --- ON DEMAND ROW ---
export const OnDemandSection = ({ pricePerCredit, onBuy }: { pricePerCredit: number, onBuy: () => void }) => (
  <div className="flex flex-col md:flex-row items-center justify-between p-6 rounded-3xl bg-[#13141c] border border-white/5">
     <div className="flex items-center gap-6 mb-4 md:mb-0">
        <div className="w-14 h-14 rounded-2xl bg-slate-800/50 flex items-center justify-center text-slate-400 border border-white/5">
           <Icons.Sliders className="w-7 h-7" />
        </div>
        <div>
           <h3 className="text-lg font-bold text-white mb-1">Need a specific amount?</h3>
           <p className="text-sm text-slate-400">Buy custom credits for <span className="text-white font-bold">${pricePerCredit}</span> / credit.</p>
        </div>
     </div>
     <button 
       onClick={onBuy} 
       className="px-8 py-3 rounded-xl bg-white text-black hover:bg-slate-200 font-bold text-sm transition-colors whitespace-nowrap"
     >
       Custom Amount
     </button>
  </div>
);

// --- TRUST BADGES ---
export const TrustSection = ({ methods }: { methods: PaymentMethod[] }) => (
  <div className="mt-16 text-center border-t border-white/5 pt-12">
    <p className="text-sm text-slate-500 mb-6">Secured payment with</p>
    <div className="flex flex-wrap justify-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
       {methods.map(m => (
         <div key={m.id} className="flex items-center gap-2" title={m.name}>
            {m.iconType === 'Apple' && <Icons.Apple className="w-6 h-6" />}
            {m.iconType === 'Google' && <Icons.Google className="w-6 h-6" />}
            {m.iconType === 'CreditCard' && <Icons.CreditCard className="w-6 h-6" />}
            {m.iconType === 'Wallet' && <Icons.Wallet className="w-6 h-6" />}
            <span className="text-sm font-semibold">{m.name}</span>
         </div>
       ))}
    </div>
  </div>
);
