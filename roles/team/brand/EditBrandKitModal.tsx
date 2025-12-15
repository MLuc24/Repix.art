
import React, { useState } from 'react';
import { Icons } from '../../../shared/components/Icons';
import { BrandKit, BrandColor } from './types';

interface EditBrandKitModalProps {
    isOpen: boolean;
    onClose: () => void;
    brand: BrandKit;
    onSave: (updatedBrand: Partial<BrandKit>) => void;
}

export const EditBrandKitModal = ({ isOpen, onClose, brand, onSave }: EditBrandKitModalProps) => {
    const [brandName, setBrandName] = useState(brand.name);
    const [colors, setColors] = useState(brand.colors);
    const [headingFont, setHeadingFont] = useState(brand.fonts.find(f => f.type === 'heading')?.name || '');
    const [bodyFont, setBodyFont] = useState(brand.fonts.find(f => f.type === 'body')?.name || '');

    if (!isOpen) return null;

    const handleColorChange = (index: number, field: keyof BrandColor, value: string) => {
        const newColors = [...colors];
        newColors[index] = { ...newColors[index], [field]: value };
        setColors(newColors);
    };

    const handleSave = () => {
        onSave({
            name: brandName,
            colors,
            fonts: [
                { type: 'heading', name: headingFont, fallback: 'sans-serif' },
                { type: 'body', name: bodyFont, fallback: 'sans-serif' }
            ]
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Edit Brand Kit</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Update your brand assets and colors</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                    >
                        <Icons.Close className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">

                    {/* Brand Name */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Brand Name
                        </label>
                        <input
                            type="text"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Enter brand name"
                        />
                    </div>

                    {/* Logo Upload Section */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Logos
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                            {['Primary Logo', 'Secondary Logo'].map((label, idx) => (
                                <div key={idx} className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-6 text-center hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer">
                                    <Icons.Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</p>
                                    <p className="text-xs text-slate-500">Click to upload or drag & drop</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Colors */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                            Brand Colors
                        </label>
                        <div className="space-y-3">
                            {colors.map((color, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                                    <div className="relative">
                                        <input
                                            type="color"
                                            value={color.hex}
                                            onChange={(e) => handleColorChange(idx, 'hex', e.target.value)}
                                            className="w-12 h-12 rounded-lg cursor-pointer border-2 border-white dark:border-slate-700 shadow-md"
                                        />
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            value={color.name}
                                            onChange={(e) => handleColorChange(idx, 'name', e.target.value)}
                                            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Color name"
                                        />
                                        <input
                                            type="text"
                                            value={color.usage}
                                            onChange={(e) => handleColorChange(idx, 'usage', e.target.value)}
                                            className="px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Usage notes"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fonts */}
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                            Typography
                        </label>
                        <div className="space-y-3">
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Heading Font
                                </label>
                                <input
                                    type="text"
                                    value={headingFont}
                                    onChange={(e) => setHeadingFont(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Inter, Roboto, Montserrat"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                                    Body Font
                                </label>
                                <input
                                    type="text"
                                    value={bodyFont}
                                    onChange={(e) => setBodyFont(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., Roboto, Open Sans, Lato"
                                />
                            </div>
                        </div>
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
                        onClick={handleSave}
                        className="px-5 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                    >
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
};
