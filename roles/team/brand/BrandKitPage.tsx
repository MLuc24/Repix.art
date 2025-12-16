
import React, { useState } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_TEAM_USER } from '../../../services/mock/dashboard';
import { MOCK_BRAND_KIT } from './types';
import { BrandOverviewCard } from './BrandOverviewCard';
import { BrandAssetsSection } from './BrandAssetsSection';
import { ApplyBrandActions } from './ApplyBrandActions';
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

    const handleSaveBrand = (updatedBrand: Partial<BrandKit>) => {
        setBrand(prev => ({ ...prev, ...updatedBrand }));
        // In real app, this would call an API
        console.log('Brand updated:', updatedBrand);
    };

    const handleApplyToProject = () => {
        // Mock apply to project action
        console.log('Applying brand to current project...');
        alert('Brand style will be applied to your current project. (Mock feature)');
    };

    const handleApplyToImages = () => {
        // Mock apply to images action
        console.log('Applying brand to selected images...');
        alert('Select images to apply brand style. (Mock feature)');
    };

    return (
        <DashboardLayout
            user={user}
            onLogout={onLogout}
            onNavigate={onNavigate}
            activePage="brand-kit"
        >
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Brand Overview */}
                <BrandOverviewCard
                    brand={brand}
                    onEdit={() => setIsEditModalOpen(true)}
                    onApplyToProject={handleApplyToProject}
                />

                {/* Apply Brand Actions */}
                <ApplyBrandActions
                    onApplyToProject={handleApplyToProject}
                    onApplyToImages={handleApplyToImages}
                />

                {/* Brand Assets */}
                <BrandAssetsSection brand={brand} />

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
