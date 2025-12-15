
import React from 'react';
import { TeamAssetItem } from './types';
import { TeamAssetCard } from './TeamAssetCard';

interface TeamAssetGridProps {
    assets: TeamAssetItem[];
    onAssetClick: (e: React.MouseEvent, asset: TeamAssetItem) => void;
    onAction: (action: string, asset: TeamAssetItem) => void;
    selectedAssetId?: string;
}

export const TeamAssetGrid = ({ assets, onAssetClick, onAction, selectedAssetId }: TeamAssetGridProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {assets.map((asset) => (
                <TeamAssetCard
                    key={asset.id}
                    asset={asset}
                    isSelected={selectedAssetId === asset.id}
                    onAssetClick={() => onAssetClick({ stopPropagation: () => { } } as React.MouseEvent, asset)} // Pass fake event if not needed, or just handle inside
                    onAction={(action) => onAction(action, asset)}
                />
            ))}
        </div>
    );
};
