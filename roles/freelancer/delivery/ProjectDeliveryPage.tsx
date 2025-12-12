
import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../features/dashboard/components/DashboardLayout';
import { MOCK_FREELANCER_USER } from '../../../services/mock/dashboard';
import { MOCK_PROJECT_ASSETS } from '../../../services/mock/freelancer'; // Using project assets as source
import { Icons } from '../../../shared/components/Icons';
import { DeliveryAsset, DeliveryConfig, DeliveryPreset } from './types';
import { DeliveryPresetSelector } from './DeliveryPresetSelector';
import { DeliveryImageSelector } from './DeliveryImageSelector';
import { DeliveryOptionsPanel } from './DeliveryOptionsPanel';
import { DeliveryConfirmBar } from './DeliveryConfirmBar';
import { DeliveryResultScreen } from './DeliveryResultScreen';

export const ProjectDeliveryPage = ({ onLogout, onNavigate }: { onLogout: () => void, onNavigate: (path: string) => void }) => {
  // --- STATE ---
  const [stage, setStage] = useState<'configure' | 'result'>('configure');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Data State
  const [assets, setAssets] = useState<DeliveryAsset[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<DeliveryPreset | null>(null); // Initial null, set in effect
  const [config, setConfig] = useState<DeliveryConfig>({
    presetId: 'social',
    removeWatermark: true,
    zipPackage: true,
    customNaming: 'Project_Final'
  });

  // Init Data
  useEffect(() => {
    // Map mock project assets to delivery assets
    const mapped: DeliveryAsset[] = MOCK_PROJECT_ASSETS.map(a => ({
      id: a.id,
      src: a.src,
      name: a.name,
      status: 'Approved', // Mock status
      isSelected: true // Select all by default
    }));
    setAssets(mapped);
  }, []);

  // --- HANDLERS ---
  
  const handleToggleAsset = (id: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, isSelected: !a.isSelected } : a));
  };

  const handleToggleAll = () => {
    const allSelected = assets.every(a => a.isSelected);
    setAssets(prev => prev.map(a => ({ ...a, isSelected: !allSelected })));
  };

  const handleExport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStage('result');
    }, 2000);
  };

  // --- CALCULATIONS ---
  const selectedCount = assets.filter(a => a.isSelected).length;
  const baseCostPerImage = 1; // Mock base cost
  const multiplier = selectedPreset?.multiplier || 1;
  const totalCost = Math.ceil(selectedCount * baseCostPerImage * multiplier);

  return (
    <DashboardLayout user={MOCK_FREELANCER_USER} onLogout={onLogout} onNavigate={onNavigate} activePage="projects">
      <div className="flex flex-col h-[calc(100vh-100px)] -mt-4 border-t border-white/5">
        
        {/* HEADER */}
        <div className="flex items-center gap-4 px-6 py-4 bg-[#0e0f14] border-b border-white/5">
           <button onClick={() => onNavigate('projects')} className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
             <Icons.ChevronLeft className="w-5 h-5" />
           </button>
           <div>
             <h1 className="text-lg font-bold text-white">Project Delivery</h1>
             <p className="text-xs text-slate-500">Prepare files for client download</p>
           </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-hidden relative">
           
           {stage === 'configure' ? (
             <div className="h-full flex flex-col lg:flex-row">
                
                {/* LEFT: IMAGE SELECTOR */}
                <div className="flex-1 bg-slate-50 dark:bg-[#020617] p-6 overflow-hidden flex flex-col">
                   <DeliveryImageSelector 
                     assets={assets}
                     onToggle={handleToggleAsset}
                     onToggleAll={handleToggleAll}
                   />
                </div>

                {/* RIGHT: SETTINGS SIDEBAR */}
                <div className="w-full lg:w-96 bg-[#131418] border-l border-white/5 p-6 overflow-y-auto custom-scrollbar">
                   <DeliveryPresetSelector 
                     selectedId={selectedPreset?.id || 'social'} 
                     onSelect={setSelectedPreset} 
                   />
                   
                   <DeliveryOptionsPanel 
                     config={config}
                     onChange={(updates) => setConfig(prev => ({ ...prev, ...updates }))}
                   />
                </div>

             </div>
           ) : (
             <div className="h-full bg-[#020617] p-6 flex flex-col">
                <DeliveryResultScreen 
                  projectName={config.customNaming}
                  onBackToDashboard={() => onNavigate('dashboard')}
                />
             </div>
           )}

        </div>

        {/* FOOTER (Only in Configure mode) */}
        {stage === 'configure' && (
          <DeliveryConfirmBar 
            totalAssets={selectedCount}
            totalCost={totalCost}
            onConfirm={handleExport}
            isLoading={isProcessing}
          />
        )}

      </div>
    </DashboardLayout>
  );
};
