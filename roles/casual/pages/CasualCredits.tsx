
import React, { useState } from 'react';
import { CreditsHeader, CreditPackCard, OnDemandSection, TrustSection } from '../../../features/credits/components/CreditsUI';
import { PurchaseModal, SuccessView, ErrorModal, PaymentProcessingLoader, CustomAmountModal } from '../../../features/credits/components/CreditsModals';
import { MOCK_USER } from '../../../services/mock/dashboard';
import { CREDIT_PACKS, PAYMENT_METHODS, ON_DEMAND_PRICE } from '../../../services/mock/credits';
import { CreditPack, PurchaseStatus } from '../../../features/credits/types';
import { Icons } from '../../../shared/components/Icons';

interface CasualCreditsProps {
  onNavigate: (path: string) => void;
  onAddCredits?: (amount: number) => void;
}

export const CasualCredits = ({ onNavigate, onAddCredits }: CasualCreditsProps) => {
  const [balance, setBalance] = useState(MOCK_USER.credits);
  const [purchaseStatus, setPurchaseStatus] = useState<PurchaseStatus>('idle');
  const [selectedPack, setSelectedPack] = useState<CreditPack | null>(null);
  const [isCustomAmountOpen, setIsCustomAmountOpen] = useState(false);

  // --- HANDLERS ---
  const handleSelectPack = (pack: CreditPack) => {
    setSelectedPack(pack);
    setPurchaseStatus('confirming');
  };

  const handleCustomBuy = () => {
    setIsCustomAmountOpen(true);
  };

  const handleCustomConfirm = (amount: number) => {
    const customPack: CreditPack = {
      id: 'custom_generated',
      title: 'Custom Top-up',
      credits: amount,
      price: amount * ON_DEMAND_PRICE,
      description: `${amount} Credits at $${ON_DEMAND_PRICE}/ea`,
      features: ['Instant delivery', 'Never expires']
    };
    setIsCustomAmountOpen(false);
    handleSelectPack(customPack);
  };

  const handleConfirmPurchase = () => {
    setPurchaseStatus('processing');
    
    // Simulate API call
    setTimeout(() => {
      // Success Logic (90% chance)
      if (Math.random() > 0.1) {
        if (selectedPack) {
          setBalance(prev => prev + selectedPack.credits);
          // Trigger global update if callback exists
          if (onAddCredits) {
            onAddCredits(selectedPack.credits);
          }
        }
        setPurchaseStatus('success');
      } else {
        setPurchaseStatus('error');
      }
    }, 2500); // Slightly longer delay to show off the loader
  };

  const handleClose = () => {
    setPurchaseStatus('idle');
    setSelectedPack(null);
  };

  const handleContinueAfterSuccess = () => {
    handleClose();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-violet-500/30 pb-20 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-violet-900/20 rounded-[100%] blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#020617] to-transparent z-10" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <CreditsHeader onBack={() => onNavigate('dashboard')} />

        <main>
          {/* PACKS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start mb-16">
             {CREDIT_PACKS.map(pack => (
               <CreditPackCard 
                 key={pack.id} 
                 pack={pack} 
                 onBuy={handleSelectPack} 
               />
             ))}
          </div>

          {/* LOWER SECTION: ON DEMAND & TRUST */}
          <div className="max-w-4xl mx-auto">
             <OnDemandSection pricePerCredit={ON_DEMAND_PRICE} onBuy={handleCustomBuy} />
             
             <TrustSection methods={PAYMENT_METHODS} />
             
             {/* USAGE LOG LINK (Subtle Footer) */}
             <div className="mt-12 text-center">
               <button 
                 onClick={() => onNavigate('credits-log')}
                 className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors"
               >
                 <Icons.FileText className="w-4 h-4" /> View Purchase & Usage History
               </button>
             </div>
          </div>

        </main>
      </div>

      {/* --- MODALS --- */}
      
      {/* 1. Custom Amount Input */}
      <CustomAmountModal 
        isOpen={isCustomAmountOpen}
        onClose={() => setIsCustomAmountOpen(false)}
        onContinue={handleCustomConfirm}
        pricePerCredit={ON_DEMAND_PRICE}
      />

      {/* 2. Payment Confirmation */}
      <PurchaseModal 
        isOpen={purchaseStatus === 'confirming'}
        onClose={handleClose}
        onConfirm={handleConfirmPurchase}
        pack={selectedPack}
        paymentMethods={PAYMENT_METHODS}
      />
      
      {/* 3. Processing */}
      {purchaseStatus === 'processing' && <PaymentProcessingLoader />}

      {/* 4. Error */}
      <ErrorModal 
        isOpen={purchaseStatus === 'error'}
        onClose={handleClose}
        onRetry={handleConfirmPurchase}
      />

      {/* 5. Success */}
      {purchaseStatus === 'success' && (
        <SuccessView 
          newBalance={balance} 
          pack={selectedPack}
          onContinue={handleContinueAfterSuccess} 
        />
      )}

    </div>
  );
};
