
import React from 'react';
import { Icons } from '../../../shared/components/Icons';

interface PaymentCompleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    creditsAdded: number;
    amountPaid: number;
}

export const PaymentCompleteModal = ({
    isOpen,
    onClose,
    creditsAdded,
    amountPaid
}: PaymentCompleteModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">

                {/* Success Animation */}
                <div className="p-8 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center animate-in zoom-in duration-500">
                        <Icons.Check className="w-10 h-10 text-white" />
                    </div>

                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                        Payment Successful!
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                        Your team credits have been added
                    </p>

                    {/* Credit Details */}
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 rounded-xl border border-blue-200 dark:border-blue-800/30 mb-6">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Icons.Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <p className="text-4xl font-black text-blue-600 dark:text-blue-400">
                                +{creditsAdded.toLocaleString()}
                            </p>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                            credits added to your team
                        </p>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl space-y-2 mb-6">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Amount Paid</span>
                            <span className="font-bold text-slate-900 dark:text-white">${amountPaid}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Payment Method</span>
                            <span className="font-medium text-slate-700 dark:text-slate-300">•••• 4242</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Transaction ID</span>
                            <span className="font-mono text-xs text-slate-500">TXN-{Date.now()}</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-left mb-6">
                        <Icons.FileText className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                            A receipt has been sent to your email. You can also download it from your billing history.
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-violet-700 transition-all shadow-lg shadow-blue-500/20"
                    >
                        Done
                    </button>
                </div>

            </div>
        </div>
    );
};
