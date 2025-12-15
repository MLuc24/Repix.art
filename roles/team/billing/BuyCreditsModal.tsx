
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';

interface BuyCreditsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPurchase: (amount: number, price: number) => void;
}

const CREDIT_PACKAGES = [
    {
        credits: 1000,
        price: 49,
        popular: false,
        discount: null,
        features: ['Perfect for small teams', 'Valid for 6 months']
    },
    {
        credits: 5000,
        price: 199,
        popular: true,
        discount: '20% off',
        features: ['Most popular choice', 'Valid for 1 year', 'Priority support']
    },
    {
        credits: 10000,
        price: 349,
        popular: false,
        discount: '30% off',
        features: ['Best value for agencies', 'Valid for 1 year', 'Dedicated support', 'Custom invoicing']
    }
];

export const BuyCreditsModal = ({ isOpen, onClose, onPurchase }: BuyCreditsModalProps) => {
    const [selectedPackage, setSelectedPackage] = useState(1); // Default to popular package
    const [customAmount, setCustomAmount] = useState('');
    const [showCustom, setShowCustom] = useState(false);

    if (!isOpen) return null;

    const handlePurchase = () => {
        if (showCustom && customAmount) {
            const credits = parseInt(customAmount);
            const price = Math.floor(credits * 0.05); // Mock pricing
            onPurchase(credits, price);
        } else {
            const pkg = CREDIT_PACKAGES[selectedPackage];
            onPurchase(pkg.credits, pkg.price);
        }
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Buy Team Credits</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                                Choose a package that fits your team's needs
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-800 rounded-lg transition-colors">
                            <Icons.Close className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">

                    {!showCustom ? (
                        <>
                            {/* Package Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                {CREDIT_PACKAGES.map((pkg, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedPackage(idx)}
                                        className={`
                      relative p-6 rounded-xl border-2 transition-all text-left
                      ${selectedPackage === idx
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg scale-105'
                                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                                            }
                      ${pkg.popular ? 'md:-mt-2 md:mb-2' : ''}
                    `}
                                    >
                                        {pkg.popular && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                                <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-xs font-bold rounded-full shadow-lg">
                                                    Most Popular
                                                </span>
                                            </div>
                                        )}

                                        {pkg.discount && (
                                            <div className="absolute top-4 right-4">
                                                <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-md">
                                                    {pkg.discount}
                                                </span>
                                            </div>
                                        )}

                                        <div className="mb-4">
                                            <p className="text-3xl font-black text-slate-900 dark:text-white mb-1">
                                                {pkg.credits.toLocaleString()}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">credits</p>
                                        </div>

                                        <div className="mb-4">
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                ${pkg.price}
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                ${(pkg.price / pkg.credits).toFixed(3)} per credit
                                            </p>
                                        </div>

                                        <ul className="space-y-2">
                                            {pkg.features.map((feature, fIdx) => (
                                                <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                                                    <Icons.Check className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </button>
                                ))}
                            </div>

                            {/* Custom Amount Button */}
                            <button
                                onClick={() => setShowCustom(true)}
                                className="w-full p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl hover:border-blue-400 dark:hover:border-blue-500 transition-colors text-center"
                            >
                                <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                                    Need a custom amount? Click here
                                </p>
                            </button>
                        </>
                    ) : (
                        /* Custom Amount */
                        <div className="max-w-md mx-auto">
                            <button
                                onClick={() => setShowCustom(false)}
                                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-6"
                            >
                                <Icons.ChevronLeft className="w-4 h-4" />
                                Back to packages
                            </button>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                    Custom Credit Amount
                                </label>
                                <input
                                    type="number"
                                    value={customAmount}
                                    onChange={(e) => setCustomAmount(e.target.value)}
                                    placeholder="Enter amount (min. 100)"
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-lg font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    min="100"
                                />
                            </div>

                            {customAmount && parseInt(customAmount) >= 100 && (
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30">
                                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Estimated Price:</p>
                                    <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                                        ${Math.floor(parseInt(customAmount) * 0.05)}
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Our team will contact you for custom pricing
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            {!showCustom ? (
                                <>
                                    Selected: <span className="font-bold text-slate-900 dark:text-white">
                                        {CREDIT_PACKAGES[selectedPackage].credits.toLocaleString()} credits
                                    </span>
                                </>
                            ) : (
                                customAmount && parseInt(customAmount) >= 100 ? (
                                    <>
                                        Custom: <span className="font-bold text-slate-900 dark:text-white">
                                            {parseInt(customAmount).toLocaleString()} credits
                                        </span>
                                    </>
                                ) : null
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePurchase}
                                disabled={showCustom && (!customAmount || parseInt(customAmount) < 100)}
                                className="px-6 py-2.5 text-sm font-bold bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-lg hover:from-blue-700 hover:to-violet-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};
