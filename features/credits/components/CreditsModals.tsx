
import React, { useState, useEffect } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { GlassModal, NeonButton } from '../../../shared/components/GlassUI';
import { CreditPack, PaymentMethod } from '../types';

// --- LOADING STATE ---
export const PaymentProcessingLoader = () => (
  <div className="fixed inset-0 z-[60] bg-[#0e0f14]/90 backdrop-blur-xl flex flex-col items-center justify-center">
    <div className="relative w-32 h-32 mb-8">
      <div className="absolute inset-0 rounded-full border-2 border-white/5" />
      <div className="absolute inset-0 rounded-full border-t-2 border-violet-500 animate-spin" />
      <div className="absolute inset-4 rounded-full border-r-2 border-fuchsia-500 animate-spin [animation-duration:1.5s]" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Icons.CreditCard className="w-8 h-8 text-violet-300 animate-pulse" />
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">Processing Payment...</h3>
    <p className="text-slate-400 text-sm">Securely contacting payment gateway</p>
  </div>
);

// --- CUSTOM AMOUNT MODAL ---
interface CustomAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (amount: number) => void;
  pricePerCredit: number;
}

export const CustomAmountModal = ({ isOpen, onClose, onContinue, pricePerCredit }: CustomAmountModalProps) => {
  const [amount, setAmount] = useState(10);
  const [inputValue, setInputValue] = useState("10");

  useEffect(() => {
    if (isOpen) {
      setAmount(10);
      setInputValue("10");
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    const num = parseInt(val);
    if (!isNaN(num)) {
      setAmount(Math.max(1, Math.min(10000, num))); // Clamp between 1 and 10000
    } else {
      setAmount(0);
    }
  };

  const totalPrice = (amount * pricePerCredit).toFixed(2);
  const isValid = amount > 0;

  return (
    <GlassModal 
      isOpen={isOpen} 
      onClose={onClose}
      className="!bg-[#1a1b26] !border-white/10 text-white" // Force Dark
    >
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 mb-4 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
           <Icons.Sliders className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-1">Custom Amount</h3>
        <p className="text-slate-400 text-sm">Enter the number of credits you need.</p>
      </div>

      <div className="flex flex-col items-center gap-6 mb-8">
         <div className="relative w-full">
            <input 
              type="number" 
              inputMode="numeric"
              min="1"
              max="10000"
              value={inputValue}
              onChange={handleInputChange}
              className="w-full bg-[#0f0f12] border border-white/10 rounded-2xl py-6 text-center text-4xl font-bold text-white focus:border-violet-500 outline-none transition-colors"
              placeholder="0"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 text-xs font-bold uppercase tracking-wider pointer-events-none">Credits</span>
         </div>

         {/* Calculation Display */}
         <div className="w-full bg-white/5 border border-white/5 rounded-xl p-4 flex justify-between items-center">
            <div>
               <p className="text-xs text-slate-400 uppercase tracking-wider mb-0.5">Price per credit</p>
               <p className="text-sm font-medium text-slate-300">${pricePerCredit}</p>
            </div>
            <div className="text-right">
               <p className="text-xs text-violet-300 uppercase tracking-wider mb-0.5">Total</p>
               <p className="text-2xl font-bold text-white">${totalPrice}</p>
            </div>
         </div>
      </div>

      <NeonButton 
        onClick={() => isValid && onContinue(amount)} 
        disabled={!isValid}
        className="w-full"
      >
        Continue to Payment
      </NeonButton>
    </GlassModal>
  );
};

// --- CONFIRM MODAL ---
interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pack: CreditPack | null;
  paymentMethods: PaymentMethod[];
}

export const PurchaseModal = ({ isOpen, onClose, onConfirm, pack, paymentMethods }: PurchaseModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]?.id);

  if (!pack) return null;

  return (
    <GlassModal 
      isOpen={isOpen} 
      onClose={onClose}
      className="!bg-[#1a1b26] !border-white/10 text-white" // Force Dark
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-1">Confirm Purchase</h3>
        <p className="text-slate-400">Add credits to your account instantly.</p>
      </div>

      <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 flex items-center justify-between">
         <div>
            <p className="text-sm font-bold text-white">{pack.title}</p>
            <p className="text-xs text-slate-400">{pack.credits} Credits</p>
         </div>
         <div className="text-xl font-bold text-violet-300">
            ${pack.price.toFixed(2)}
         </div>
      </div>

      <div className="mb-8">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block text-left">Payment Method</label>
        <div className="space-y-2">
           {paymentMethods.map(m => (
             <button 
               key={m.id}
               onClick={() => setSelectedMethod(m.id)}
               className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all ${selectedMethod === m.id ? 'bg-violet-600/20 border-violet-500 text-white' : 'bg-black/20 border-transparent hover:bg-black/40 text-slate-400'}`}
             >
                {m.iconType === 'CreditCard' && <Icons.CreditCard className="w-5 h-5" />}
                {m.iconType === 'Apple' && <Icons.Apple className="w-5 h-5" />}
                {m.iconType === 'Google' && <Icons.Google className="w-5 h-5" />}
                {m.iconType === 'Wallet' && <Icons.Wallet className="w-5 h-5" />}
                <span className="text-sm font-medium">{m.name}</span>
                {selectedMethod === m.id && <Icons.Check className="w-4 h-4 ml-auto text-violet-400" />}
             </button>
           ))}
        </div>
      </div>

      <div className="space-y-3">
        <NeonButton onClick={onConfirm} className="w-full">
           Pay ${pack.price.toFixed(2)}
        </NeonButton>
        <button onClick={onClose} className="w-full py-3 text-sm font-medium text-slate-500 hover:text-white transition-colors">
          Cancel Transaction
        </button>
      </div>
    </GlassModal>
  );
};

// --- SUCCESS VIEW COMPONENTS ---

const ReceiptCard = ({ pack }: { pack: CreditPack }) => (
  <div className="w-full bg-[#1a1b26]/50 backdrop-blur-md rounded-2xl border border-white/5 p-6 md:p-8 relative overflow-hidden group">
    {/* Decorative Line */}
    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
    
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-2 text-white font-bold">
        <div className="p-2 rounded-lg bg-white/5 border border-white/5"><Icons.FileText className="w-4 h-4" /></div>
        <span className="text-sm">Receipt</span>
      </div>
      <button className="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1 group/btn">
        <Icons.Download className="w-3 h-3 group-hover/btn:translate-y-0.5 transition-transform" /> Download PDF
      </button>
    </div>

    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
        <span className="text-slate-400">Order ID</span>
        <div className="flex items-center gap-2 text-white font-mono cursor-pointer hover:text-violet-300 transition-colors">
          #RPX-88294 <Icons.Copy className="w-3 h-3 text-slate-500" />
        </div>
      </div>
      <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
        <span className="text-slate-400">Date</span>
        <span className="text-white">Oct 24, 2024, 10:42 AM</span>
      </div>
      <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
        <span className="text-slate-400">Item</span>
        <span className="text-white font-medium">{pack.title}</span>
      </div>
      <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
        <span className="text-slate-400">Payment Method</span>
        <div className="flex items-center gap-2 text-white">
          <Icons.CreditCard className="w-3 h-3 text-slate-400" /> Visa •••• 4242
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <span className="text-slate-400">Total Paid</span>
        <span className="text-xl font-bold text-white">${pack.price.toFixed(2)}</span>
      </div>
    </div>
  </div>
);

const CreditSummaryCard = ({ newBalance, addedCredits }: { newBalance: number, addedCredits: number }) => (
  <div className="bg-gradient-to-br from-violet-900/40 to-indigo-900/40 border border-white/10 rounded-2xl p-6 relative overflow-hidden backdrop-blur-xl">
    <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/20 blur-[60px] rounded-full pointer-events-none" />
    
    <div className="flex items-center justify-between mb-4 relative z-10">
      <div className="flex flex-col">
        <span className="text-xs font-bold text-violet-300 uppercase tracking-wider mb-1">Credits Added</span>
        <span className="text-2xl font-bold text-white">+{addedCredits}</span>
      </div>
      <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
        <Icons.Bolt className="w-6 h-6 text-violet-400" />
      </div>
    </div>
    
    <div className="pt-4 border-t border-white/10 relative z-10">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-300">New Balance</span>
        <span className="text-lg font-bold text-white font-mono">{newBalance} Credits</span>
      </div>
    </div>
  </div>
);

const PromoSidebar = () => (
  <div className="h-full flex flex-col justify-center">
    <div className="rounded-3xl p-8 bg-gradient-to-b from-[#1a1b26] to-[#0f0f12] border border-white/10 relative overflow-hidden group cursor-pointer hover:border-violet-500/30 transition-all">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=600&q=60')] bg-cover opacity-10 mix-blend-overlay transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      
      <div className="relative z-10 text-center">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-500 flex items-center justify-center text-white mb-4 shadow-lg shadow-fuchsia-500/20">
          <Icons.User className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Try AI Avatars</h3>
        <p className="text-sm text-slate-400 mb-6">Generate 50+ unique styles of yourself using your new credits.</p>
        <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-bold transition-colors">
          Create Avatar
        </button>
      </div>
    </div>
  </div>
);

export const SuccessView = ({ newBalance, pack, onContinue }: { newBalance: number, pack: CreditPack | null, onContinue: () => void }) => {
  const addedCredits = pack ? pack.credits : 0;
  const safePack = pack || { title: 'Unknown Pack', price: 0, credits: 0, id: 'unknown', description: '' };

  return (
    <div className="fixed inset-0 z-[60] bg-[#0e0f14] text-white overflow-y-auto">
      <div className="min-h-screen flex flex-col md:flex-row">
        
        {/* LEFT MAIN CONTENT */}
        <div className="flex-1 p-6 md:p-12 lg:p-20 flex flex-col justify-center max-w-3xl mx-auto w-full relative z-10">
          
          {/* Confetti / Ambient BG */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-violet-500 rounded-full animate-float opacity-50" />
            <div className="absolute top-[30%] right-[30%] w-3 h-3 bg-cyan-400 rounded-full animate-float opacity-40" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[20%] left-[40%] w-2 h-2 bg-fuchsia-500 rounded-full animate-float opacity-50" style={{ animationDelay: '2s' }} />
          </div>

          <div className="animate-fade-in-up">
            {/* HERO */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                <Icons.Check className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                  Payment Successful!
                </h1>
                <p className="text-slate-400 mt-1">Thank you for your purchase.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <CreditSummaryCard newBalance={newBalance} addedCredits={addedCredits} />
              <div className="hidden md:block">
                 {/* Placeholder for desktop layout balance visual or empty */}
                 <div className="h-full rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center p-6 text-center">
                    <p className="text-sm text-slate-500">
                      Your transaction ID is <span className="font-mono text-slate-300">#RPX-88294</span>. <br/>A confirmation email has been sent.
                    </p>
                 </div>
              </div>
            </div>

            {/* RECEIPT */}
            <div className="mb-10">
              <ReceiptCard pack={safePack} />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <NeonButton onClick={onContinue} className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600">
                Use Credits Now
              </NeonButton>
              <button 
                onClick={onContinue}
                className="px-8 py-4 rounded-xl border border-white/10 text-slate-300 font-bold hover:bg-white/5 hover:text-white transition-colors"
              >
                Back to Store
              </button>
            </div>
            
            <button className="mt-6 text-xs text-slate-500 hover:text-violet-400 transition-colors flex items-center gap-2">
              View Purchase History <Icons.ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR (Desktop Only) */}
        <div className="hidden lg:block w-[400px] bg-[#090a0d] border-l border-white/5 p-12 relative z-20">
           <PromoSidebar />
        </div>

      </div>
    </div>
  );
};

// --- ERROR MODAL ---
export const ErrorModal = ({ isOpen, onClose, onRetry }: { isOpen: boolean, onClose: () => void, onRetry: () => void }) => {
  return (
    <GlassModal 
      isOpen={isOpen} 
      onClose={onClose}
      className="!bg-[#1a1b26] !border-white/10 text-white" // Force Dark
    >
       <div className="text-center">
         <div className="inline-flex p-4 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
            <Icons.AlertTriangle className="w-10 h-10" />
         </div>
         <h3 className="text-2xl font-bold text-white mb-2">Payment Failed</h3>
         <p className="text-slate-400 mb-8 max-w-sm mx-auto">
           We encountered an issue processing your transaction. No charges were made.
         </p>
         
         <div className="space-y-3">
           <NeonButton onClick={onRetry} className="w-full bg-gradient-to-r from-red-600 to-rose-600 shadow-red-900/20">
             Try Again
           </NeonButton>
           <button onClick={onClose} className="w-full py-3 text-sm text-slate-500 hover:text-white transition-colors">
             Cancel & Close
           </button>
         </div>
         
         <div className="mt-6 pt-6 border-t border-white/5">
           <button className="text-xs text-slate-500 hover:text-white">Contact Support</button>
         </div>
       </div>
    </GlassModal>
  );
};
