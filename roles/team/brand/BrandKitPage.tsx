import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { MOCK_BRAND_KIT } from './types';
import { Icons } from '../../../shared/components/Icons';
import { EditBrandKitModal } from './EditBrandKitModal';
import type { BrandKit } from './types';

interface BrandKitPageProps {
    onLogout: () => void;
    onNavigate: (path: string) => void;
    user?: any;
}

export const BrandKitPage = ({ onLogout, onNavigate, user = MOCK_TEAM_USER }: BrandKitPageProps) => {
    const [brand, setBrand] = useState<BrandKit>(MOCK_BRAND_KIT);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

    const handleSaveBrand = (updatedBrand: Partial<BrandKit>) => {
        setBrand(prev => ({ ...prev, ...updatedBrand }));
        console.log('Brand updated:', updatedBrand);
    };

    return (
        <DashboardLayout
            user={user}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="brand-kit"
        >
            <div className="h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-y-auto">
                <div className="max-w-7xl mx-auto p-8 space-y-8">

                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-sm text-slate-400">Brand Kits</span>
                                <Icons.ChevronRight className="w-4 h-4 text-slate-600" />
                                <span className="text-sm text-red-400">{brand.name}</span>
                            </div>
                            <h1 className="text-4xl font-bold text-white mb-2">Brand Assets</h1>
                            <p className="text-slate-400 text-sm">
                                Manage the visual identity source of truth including logos, colors, and typography.
                            </p>
                        </div>
                        <button
                            onClick={() => setIsEditModalOpen(true)}
                            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold text-sm transition flex items-center gap-2 shadow-lg shadow-red-500/20"
                        >
                            <Icons.Pencil className="w-4 h-4" />
                            Edit Brand Kit
                        </button>
                    </div>

                    {/* Logos Section */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-white">Logos</h2>
                            <button className="text-sm text-red-400 hover:text-red-300 transition">
                                Download All
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {brand.logos.map((logo, index) => (
                                <div
                                    key={logo.id}
                                    className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all"
                                >
                                    {/* Logo Preview with checkered background */}
                                    <div className="aspect-square bg-[repeating-conic-gradient(#1e293b_0%_25%,#0f172a_0%_50%)] bg-[length:20px_20px] p-8 flex items-center justify-center relative">
                                        <img
                                            src={logo.url}
                                            alt={logo.type}
                                            className="max-w-full max-h-full object-contain"
                                        />
                                        {index === 0 && (
                                            <div className="absolute top-3 right-3">
                                                <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded">
                                                    PRIMARY
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Logo Info */}
                                    <div className="p-4 bg-slate-900/80 backdrop-blur-sm">
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="text-white font-semibold mb-1">
                                                    {logo.type === 'primary' ? 'Primary Logo' :
                                                        logo.type === 'secondary' ? 'Secondary Logo (Inverted)' :
                                                            'Monogram / Icon'}
                                                </h3>
                                                <p className="text-xs text-slate-400">
                                                    {logo.formats?.join(', ') || 'SVG, PNG, JPG'}
                                                </p>
                                            </div>
                                        </div>

                                        {logo.type === 'primary' && (
                                            <div className="flex items-center gap-1 text-xs text-red-400 mb-2">
                                                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                                <span>Use on light backgrounds. Minimum width 120px.</span>
                                            </div>
                                        )}

                                        <p className="text-xs text-slate-500 italic">{logo.usage}</p>
                                    </div>
                                </div>
                            ))}

                            {/* Upload New Logo Card */}
                            <div className="group relative bg-slate-900/30 border-2 border-dashed border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all cursor-pointer">
                                <div className="aspect-square flex flex-col items-center justify-center p-8">
                                    <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mb-4 group-hover:bg-slate-700/50 transition">
                                        <Icons.Plus className="w-8 h-8 text-slate-600 group-hover:text-slate-500" />
                                    </div>
                                    <p className="text-slate-500 font-medium">Upload Asset</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Color Palette Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Color Palette</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {brand.colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all cursor-pointer"
                                >
                                    <div
                                        className="h-32 relative"
                                        style={{ backgroundColor: color.hex }}
                                    >
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/20 transition flex items-center justify-center">
                                            <Icons.Copy className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-white font-semibold text-sm mb-1">{color.name}</p>
                                        <p className="text-slate-400 text-xs font-mono">{color.hex}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Typography Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Typography</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {brand.fonts.map((font, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-all"
                                >
                                    <p className="text-slate-400 text-sm mb-2 uppercase tracking-wider">
                                        {font.type} Font
                                    </p>
                                    <p
                                        className="text-4xl font-bold text-white mb-2"
                                        style={{ fontFamily: font.name }}
                                    >
                                        {font.name}
                                    </p>
                                    <p className="text-slate-500 text-sm">
                                        Fallback: {font.fallback}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Apply Brand Style Section */}
                    <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 border border-slate-700 rounded-2xl p-8 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <h2 className="text-2xl font-bold text-white">Apply Brand Style</h2>
                            <span className="px-2 py-0.5 bg-red-600/20 text-red-400 text-xs font-bold rounded border border-red-500/30">
                                v2.4
                            </span>
                        </div>

                        <div className="flex items-center gap-2 mb-8">
                            <Icons.Sparkles className="w-4 h-4 text-red-400" />
                            <p className="text-sm text-slate-400">
                                Using Kit: <span className="text-red-400 font-semibold">{brand.name}</span>
                            </p>
                        </div>

                        {/* Apply Effect Options */}
                        <div className="mb-8">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-white font-semibold">Apply Effect</h3>
                                <button className="text-sm text-red-400 hover:text-red-300 transition">
                                    Reset to defaults
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-slate-900/50 border-2 border-red-600/50 rounded-xl p-4 cursor-pointer hover:border-red-500 transition">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icons.Sparkles className="w-5 h-5 text-red-400" />
                                        <h4 className="text-white font-semibold">Color Tone</h4>
                                    </div>
                                    <p className="text-xs text-slate-400">Match brand palette</p>
                                </div>

                                <div className="bg-slate-900/50 border-2 border-red-600/50 rounded-xl p-4 cursor-pointer hover:border-red-500 transition">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icons.Image className="w-5 h-5 text-red-400" />
                                        <h4 className="text-white font-semibold">Backgrounds</h4>
                                    </div>
                                    <p className="text-xs text-slate-400">Auto-replace suggestion</p>
                                </div>

                                <div className="bg-slate-900/30 border-2 border-slate-700 rounded-xl p-4 cursor-pointer hover:border-slate-600 transition">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icons.Sliders className="w-5 h-5 text-slate-500" />
                                        <h4 className="text-slate-400 font-semibold">Smart Presets</h4>
                                    </div>
                                    <p className="text-xs text-slate-500">Font & layout tweaks</p>
                                </div>
                            </div>
                        </div>

                        {/* Scope of Application */}
                        <div>
                            <h3 className="text-white font-semibold mb-4">Scope of Application</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Apply to Current Project */}
                                <div className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition">
                                    <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-8 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl mb-2">🎨</div>
                                            <p className="text-white font-semibold">Full Scope</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-white font-bold mb-2">Apply to Current Project</h4>
                                        <p className="text-sm text-slate-400 mb-4">
                                            Update all pages, components, and assets across the entire project with the active {brand.name} brand kit.
                                        </p>
                                        <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2">
                                            Apply to Project
                                            <Icons.ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                {/* Apply to Selected Images */}
                                <div className="bg-slate-900/50 border border-slate-700 rounded-xl overflow-hidden hover:border-slate-600 transition">
                                    <div className="aspect-video bg-gradient-to-br from-violet-500/20 to-purple-500/20 p-8 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="text-6xl mb-2">🎯</div>
                                            <p className="text-white font-semibold">Targeted</p>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h4 className="text-white font-bold mb-2">Apply to Selected Images</h4>
                                        <p className="text-sm text-slate-400 mb-4">
                                            Update only the currently selected elements or images on your canvas without affecting the rest of the layout.
                                        </p>
                                        <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-semibold transition flex items-center justify-center gap-2 border border-slate-700">
                                            Apply to Selection
                                            <Icons.ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                                <Icons.Info className="w-4 h-4" />
                                <p>Processing happens locally. You can undo changes immediately.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Edit Modal */}
            <EditBrandKitModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                brand={brand}
                onSave={handleSaveBrand}
            />
        </DashboardLayout>
    );
};
