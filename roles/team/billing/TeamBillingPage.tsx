
import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { BillingOverviewCard } from './BillingOverviewCard';
import { CreditUsageSummary } from './CreditUsageSummary';
import { UsageByMemberTable } from './UsageByMemberTable';
import { CreditUsageLog } from './CreditUsageLog';
import { BuyCreditsModal } from './BuyCreditsModal';
import { PaymentCompleteModal } from './PaymentCompleteModal';
import {
    MOCK_CREDIT_TRANSACTIONS,
    MOCK_MEMBER_USAGE,
    MOCK_USAGE_SUMMARY
} from './types';

interface TeamBillingPageProps {
    onLogout: () => void;
    onNavigate: (path: string) => void;
}

export const TeamBillingPage = ({ onLogout, onNavigate }: TeamBillingPageProps) => {
    const [currentCredits, setCurrentCredits] = useState(850);
    const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
    const [paymentCompleteData, setPaymentCompleteData] = useState<{
        isOpen: boolean;
        creditsAdded: number;
        amountPaid: number;
    }>({
        isOpen: false,
        creditsAdded: 0,
        amountPaid: 0
    });

    const estimatedDaysRemaining = Math.floor(currentCredits / MOCK_USAGE_SUMMARY.avgCreditsPerDay);

    const handlePurchase = (credits: number, price: number) => {
        // Mock purchase
        setCurrentCredits(prev => prev + credits);
        setPaymentCompleteData({
            isOpen: true,
            creditsAdded: credits,
            amountPaid: price
        });
        console.log(`Purchased ${credits} credits for $${price}`);
    };

    return (
        <DashboardLayout
            user={MOCK_TEAM_USER}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="team-billing"
            currentCredits={currentCredits}
        >
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Billing Overview */}
                <BillingOverviewCard
                    teamName="Acme Corp Team"
                    currentCredits={currentCredits}
                    estimatedDaysRemaining={estimatedDaysRemaining}
                    onBuyCredits={() => setIsBuyModalOpen(true)}
                />

                {/* Usage Summary */}
                <CreditUsageSummary summary={MOCK_USAGE_SUMMARY} />

                {/* Usage by Member */}
                <UsageByMemberTable members={MOCK_MEMBER_USAGE} />

                {/* Credit Usage Log */}
                <CreditUsageLog transactions={MOCK_CREDIT_TRANSACTIONS} />

            </div>

            {/* Modals */}
            <BuyCreditsModal
                isOpen={isBuyModalOpen}
                onClose={() => setIsBuyModalOpen(false)}
                onPurchase={handlePurchase}
            />

            <PaymentCompleteModal
                isOpen={paymentCompleteData.isOpen}
                onClose={() => setPaymentCompleteData({ isOpen: false, creditsAdded: 0, amountPaid: 0 })}
                creditsAdded={paymentCompleteData.creditsAdded}
                amountPaid={paymentCompleteData.amountPaid}
            />
        </DashboardLayout>
    );
};
