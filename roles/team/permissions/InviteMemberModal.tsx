
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';

interface InviteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInvite: (email: string, role: 'admin' | 'editor' | 'viewer') => void;
}

export const InviteMemberModal = ({ isOpen, onClose, onInvite }: InviteMemberModalProps) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'admin' | 'editor' | 'viewer'>('editor');
    const [inviteLink] = useState('https://repix.art/invite/acme-corp-xyz123');
    const [linkCopied, setLinkCopied] = useState(false);

    if (!isOpen) return null;

    const handleInvite = () => {
        if (email) {
            onInvite(email, role);
            setEmail('');
            onClose();
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(inviteLink);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Invite Team Member</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Add someone to your team</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                        <Icons.Close className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="colleague@company.com"
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                            Role
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { value: 'admin', label: 'Admin', color: 'from-red-500 to-orange-500' },
                                { value: 'editor', label: 'Editor', color: 'from-blue-500 to-cyan-500' },
                                { value: 'viewer', label: 'Viewer', color: 'from-slate-500 to-slate-600' }
                            ].map((r) => (
                                <button
                                    key={r.value}
                                    onClick={() => setRole(r.value as any)}
                                    className={`
                    p-3 rounded-xl border-2 transition-all
                    ${role === r.value
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                                        }
                  `}
                                >
                                    <div className={`w-8 h-8 mx-auto mb-2 rounded-lg bg-gradient-to-br ${r.color} flex items-center justify-center`}>
                                        <Icons.Shield className="w-4 h-4 text-white" />
                                    </div>
                                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                                        {r.label}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Or Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-3 bg-white dark:bg-slate-900 text-xs font-medium text-slate-500">
                                Or share invite link
                            </span>
                        </div>
                    </div>

                    {/* Invite Link */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Shareable Link
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inviteLink}
                                readOnly
                                className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-400 font-mono"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
                            >
                                {linkCopied ? (
                                    <Icons.Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                                ) : (
                                    <Icons.Copy className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                                )}
                            </button>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                            Anyone with this link can join as {role}
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleInvite}
                        disabled={!email}
                        className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Send Invite
                    </button>
                </div>

            </div>
        </div>
    );
};
