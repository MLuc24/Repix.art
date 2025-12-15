
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface BillingOverviewCardProps {
    teamName: string;
    currentCredits: number;
    estimatedDaysRemaining: number;
    onBuyCredits: () => void;
}

export const BillingOverviewCard = ({
    teamName,
    currentCredits,
    estimatedDaysRemaining,
    onBuyCredits
}: BillingOverviewCardProps) => {
    const isLowCredits = currentCredits < 500;

    return (
        <div className="bg-gradient-to-br from-blue-600 to-violet-600 rounded-2xl p-6 text-white shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                {/* Left Side - Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Icons.Wallet className="w-5 h-5 opacity-80" />
                        <p className="text-sm font-medium opacity-80">{teamName}</p>
                    </div>

                    <div className="mb-4">
                        <p className="text-sm opacity-80 mb-1">Available Credits</p>
                        <div className="flex items-baseline gap-3">
                            <h1 className="text-5xl font-black">
                                {currentCredits.toLocaleString()}
                            </h1>
                            {isLowCredits && (
                                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full animate-pulse">
                                    Low Credits!
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                        <Icons.Clock className="w-4 h-4 opacity-70" />
                        <span className="opacity-90">
                            Estimated <span className="font-bold">{estimatedDaysRemaining} days</span> remaining at current usage
                        </span>
                    </div>
                </div>

                {/* Right Side - CTA */}
                <div className="flex flex-col gap-3">
                    <button
                        onClick={onBuyCredits}
                        className="flex items-center gap-2 px-6 py-4 bg-white text-blue-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg"
                    >
                        <Icons.Plus className="w-5 h-5" />
                        Buy Credits
                    </button>

                    {isLowCredits && (
                        <div className="flex items-start gap-2 p-3 bg-orange-500/20 backdrop-blur-sm rounded-lg">
                            <Icons.AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <p className="text-xs">
                                Team running low on credits. Consider purchasing more to avoid interruptions.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
