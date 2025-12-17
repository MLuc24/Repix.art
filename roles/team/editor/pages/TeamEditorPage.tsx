import React, { useState, useEffect } from 'react';
import { Icons } from '../../../../shared/components/Icons';
import { EditorLayout } from '../../../../features/editor/components/EditorLayout';
import { ToolButton } from '../../../../features/editor/components/EditorUI';
import { ProAdjustPanel } from '../../../../features/editor/components/ProAdjustPanel';
import { ProFiltersPanel } from '../../../../roles/pro/components/filters/ProFiltersPanel';
import { ProCropPanel } from '../../../../features/editor/components/ProCropPanel';
import { MaskLiteProPanel } from '../../../../roles/pro/components/mask/MaskLiteProPanel';
import { PresetProPanel } from '../../../../roles/pro/preset/PresetProPanel';
import { FloatingToolPanel } from '../../../../features/editor/components/FloatingToolPanel';
import { ExportProOptions } from '../../../../features/editor/components/ExportProOptions';
import { ExportSuccessToast } from '../../../../features/export/components/ExportModals';
import { GlassModal, NeonButton } from '../../../../shared/components/GlassUI';
import {
  TeamEditorContextBar,
  ImageAssignmentStatus,
  EditorTeamCommentPanel,
  EditorSaveActions,
  BatchEditToggle,
  BatchFilmstrip,
  BatchActionPanel,
  QuickReviewControls,
  RealtimePresence,
  RealtimeActivityFeed,
  RealtimeUserCursors,
  LiveEditIndicator,
} from '../components';
import { AIChatPanel } from '../../../../features/editor/components/AIChatPanel';
import type {
  ImageAssignmentStatus as ImageStatusType,
  TeamComment,
  EditMode,
  BatchImage,
} from '../types';

type TeamTool = 'adjust' | 'filters' | 'presets' | 'mask' | 'crop' | 'export' | 'history' | null;
import {
  mockTeamEditorData,
  mockTeamMembers,
  mockBatchImages,
  mockActiveUsers,
  mockRealtimeActivities,
  mockUserCursors,
} from '../../../../services/mock/team_editor';

interface TeamEditorPageProps {
  onBack?: () => void;
  imageUrl?: string;
  fileName?: string;
  onNavigateToTeam?: () => void;
  onNavigateToProject?: () => void;
  userRole?: 'casual' | 'pro' | 'freelancer' | 'team' | 'agency';
  onNavigate?: (path: string) => void;
}

export const TeamEditorPage: React.FC<TeamEditorPageProps> = ({
  onBack,
  imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
  fileName = 'Campaign_Hero_v2.jpg',
  onNavigateToTeam,
  onNavigateToProject,
  userRole = 'team',
  onNavigate,
}) => {
  // Upgrade Modal State
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [upgradeFeatureName, setUpgradeFeatureName] = useState('');
  const [suggestedPlan, setSuggestedPlan] = useState('');

  const triggerUpgradeModal = (feature: string, plan: string = '') => {
    setUpgradeFeatureName(feature);
    setSuggestedPlan(plan);
    setIsUpgradeModalOpen(true);
  };

  const [isHoldingCompare, setIsHoldingCompare] = useState(false);

  // Editor Core State
  const [activeTool, setActiveTool] = useState<TeamTool>(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [cropRatio, setCropRatio] = useState('original');
  const [activeFilter, setActiveFilter] = useState('leica');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  // Removed isHistoryOpen state
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);

  // Team Context State
  const [assignment, setAssignment] = useState(mockTeamEditorData.assignment);
  const [comments, setComments] = useState<TeamComment[]>(mockTeamEditorData.comments);
  const [isCommentPanelOpen, setIsCommentPanelOpen] = useState(true);

  // Realtime Collaboration State
  const [activeUsers, setActiveUsers] = useState(mockActiveUsers);
  const [realtimeActivities, setRealtimeActivities] = useState(mockRealtimeActivities);
  const [showActivityFeed, setShowActivityFeed] = useState(false);
  const [userCursors, setUserCursors] = useState(mockUserCursors);
  const currentUserId = mockTeamMembers[2].id; // Mike Wilson (current user)

  // Simulate cursor movement for realtime effect
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCursors(prev => 
        prev.map(cursor => ({
          ...cursor,
          position: {
            x: cursor.position.x + (Math.random() - 0.5) * 3,
            y: cursor.position.y + (Math.random() - 0.5) * 3,
          }
        }))
      );
    }, 2000); // Move cursors every 2s
    return () => clearInterval(interval);
  }, []);

  // R4.11 — Batch Edit & Review Mode State
  const [editMode, setEditMode] = useState<EditMode>('single');
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [batchImages, setBatchImages] = useState<BatchImage[]>(mockBatchImages);
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Adjustments State
  const [adjustments, setAdjustments] = useState({
    exposure: 0, contrast: 0, highlights: 0, shadows: 0,
    saturation: 0, vibrance: 0, temp: 0, tint: 0,
    sharpness: 0, noise: 0
  });

  // Shared Export Config
  const [exportConfig, setExportConfig] = useState({
    format: 'JPG',
    resolution: '2x',
    quality: 90,
    keepMetadata: true,
    removeWatermark: userRole !== 'casual',
    colorProfile: 'sRGB'
  });

  // History State
  interface HistoryVersion {
    id: string;
    version: string;
    action: string;
    changes: string[];
    timestamp: string;
    thumbnail: string;
  }

  const [history, setHistory] = useState<HistoryVersion[]>([
    { 
      id: 'v1', 
      version: 'v1.0', 
      action: 'Original Upload',
      changes: ['Initial import'], 
      timestamp: '10:00 AM', 
      thumbnail: imageUrl 
    }
  ]);

  // Handlers
  const handleStatusChange = (newStatus: ImageStatusType) => {
    setAssignment((prev) => ({
      ...prev,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleAddComment = (content: string, mentions: string[]) => {
    const newComment: TeamComment = {
      id: `comment-${Date.now()}`,
      author: mockTeamMembers[2], // Current user (Mike)
      content,
      mentions,
      createdAt: new Date().toISOString(),
      isInternal: true,
    };
    setComments((prev) => [...prev, newComment]);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...');
    
    // Capture changes
    const currentChanges = [];
    if (adjustments.exposure !== 0) currentChanges.push(`Exposure ${adjustments.exposure > 0 ? '+' : ''}${adjustments.exposure}`);
    if (adjustments.contrast !== 0) currentChanges.push(`Contrast ${adjustments.contrast > 0 ? '+' : ''}${adjustments.contrast}`);
    if (activeFilter !== 'leica') currentChanges.push(`Filter: ${activeFilter}`);
    if (rotation !== 0) currentChanges.push(`Rotate ${rotation}°`);
    if (currentChanges.length === 0) currentChanges.push('Manual adjustments');

    // Add new version to history
    const newVersion: HistoryVersion = {
      id: `v${history.length + 1}`,
      version: `v${history.length + 1}.0`,
      action: 'Saved Draft',
      changes: currentChanges,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      thumbnail: imageUrl
    };
    setHistory(prev => [newVersion, ...prev]);

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleRestore = (version: HistoryVersion) => {
    const confirmRestore = window.confirm(`Restore to ${version.version}? Current changes will be lost.`);
    if (confirmRestore) {
      console.log('Restoring', version.id);
      // Mock restore logic
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 2000);
    }
  };

  const handleMarkReady = () => {
    console.log('Marking as ready...');
    handleStatusChange('ready');
  };

  const handleSaveAndHandoff = () => {
    console.log('Saving and handing off...');
    handleStatusChange('approved');
    // Would navigate back to project
    onBack?.();
  };

  // R4.11 — Batch Edit Handlers
  const handleToggleImageSelect = (id: string) => {
    setSelectedImageIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedImageIds(batchImages.map((img) => img.id));
  };

  const handleDeselectAll = () => {
    setSelectedImageIds([]);
  };

  const handleImageClick = (id: string) => {
    const index = batchImages.findIndex((img) => img.id === id);
    if (index !== -1) {
      setCurrentImageIndex(index);
      setEditMode('single');
    }
  };

  // R4.11 — Batch Actions
  const handleApplyPreset = () => {
    console.log('Applying preset to', selectedImageIds.length, 'images');
  };

  const handleApplyBackground = () => {
    console.log('Applying background to', selectedImageIds.length, 'images');
  };

  const handleApplyRemix = () => {
    console.log('Applying remix to', selectedImageIds.length, 'images');
  };

  const handleExportBatch = () => {
    console.log('Exporting', selectedImageIds.length, 'images');
  };

  // R4.11 — Review Mode Handlers
  const handleNextImage = () => {
    if (currentImageIndex < batchImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePreviousImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleApproveImage = () => {
    const currentImage = batchImages[currentImageIndex];
    console.log('Approving image:', currentImage.fileName);
    setBatchImages((prev) =>
      prev.map((img) =>
        img.id === currentImage.id ? { ...img, status: 'approved' } : img
      )
    );
    handleNextImage();
  };

  const handleRejectImage = () => {
    const currentImage = batchImages[currentImageIndex];
    console.log('Rejecting image:', currentImage.fileName);
    setBatchImages((prev) =>
      prev.map((img) =>
        img.id === currentImage.id ? { ...img, status: 'revision-needed' } : img
      )
    );
    handleNextImage();
  };

  const handleQuickComment = () => {
    setIsCommentPanelOpen(true);
  };

  // Role Helper
  const isRoleAtLeast = (role: string) => {
    const levels = { casual: 0, pro: 1, freelancer: 2, team: 3, agency: 4 };
    const current = levels[userRole as keyof typeof levels] || 0;
    const required = levels[role as keyof typeof levels] || 0;
    return current >= required;
  };

  // Editor Tool Handlers
  const handleToolClick = (tool: TeamTool) => {
    // Lock Checks
    if (tool === 'mask' && !isRoleAtLeast('freelancer')) {
      triggerUpgradeModal('Masking Tools', 'Pro');
      return;
    }
    if (tool === 'presets' && !isRoleAtLeast('pro')) {
      triggerUpgradeModal('Pro Presets', 'Plus');
      return;
    }
    setActiveTool(prev => prev === tool ? null : tool);
  };

  const handleUndo = () => {
    console.log('Undo');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleRedo = () => {
    console.log('Redo');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };

  const handleReset = () => {
    const confirmReset = window.confirm('Reset all edits?');
    if (confirmReset) {
      setAdjustments({
        exposure: 0, contrast: 0, highlights: 0, shadows: 0,
        saturation: 0, vibrance: 0, temp: 0, tint: 0,
        sharpness: 0, noise: 0
      });
      setActiveFilter('leica');
      setRotation(0);
      setFlipH(false);
      setFlipV(false);
      setCropRatio('original');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 2000);
    }
  };

  // Export handlers
  useEffect(() => {
    const handleExportTrigger = () => {
      setActiveTool('export');
    };
    const handleExportComplete = () => {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 4000);
    };
    window.addEventListener('TRIGGER_EXPORT', handleExportTrigger);
    window.addEventListener('EXPORT_COMPLETE', handleExportComplete);
    return () => {
      window.removeEventListener('TRIGGER_EXPORT', handleExportTrigger);
      window.removeEventListener('EXPORT_COMPLETE', handleExportComplete);
    };
  }, []);

  // Filter styles
  const PRO_FILTERS: Record<string, string> = {
    leica: 'contrast(1.1) saturate(1.1) sepia(0.1)',
    kodak: 'sepia(0.2) saturate(1.4) contrast(1.1) brightness(1.05)',
    fuji: 'contrast(1.05) saturate(1.2) hue-rotate(-5deg) brightness(1.05)', // Green/Magenta tint
    cine: 'contrast(1.2) saturate(0.9) brightness(0.9) hue-rotate(180deg) sepia(0.2)', // Teal/Orangeish
    clean: 'brightness(1.1) contrast(0.95) saturate(1.05) blur(0.2px)', // Smoothing simulation
    hdr: 'contrast(1.3) saturate(1.3) brightness(1.1)',
    matte: 'contrast(0.9) brightness(1.1) saturate(0.8)',
    ultra: 'contrast(1.4) saturate(1.2) brightness(1.05)',
    skin: 'brightness(1.05) saturate(1.1) contrast(0.95) sepia(0.1)',
    noir: 'grayscale(100%) contrast(1.4) brightness(0.9)',
    pastel: 'brightness(1.2) saturate(1.4) contrast(0.9) hue-rotate(10deg)',
    pop: 'saturate(1.6) contrast(1.1) brightness(1.1)',
    bw: 'grayscale(100%) contrast(1.2)',
    vivid: 'saturate(1.3) contrast(1.1)',
    vintage: 'sepia(0.5) contrast(0.9) brightness(0.9)',
    cyber: 'hue-rotate(190deg) saturate(1.5) contrast(1.1)',
    movie: 'brightness(0.9) contrast(1.2) sepia(0.2)',
  };

  const getFilterStyle = () => {
    const parts = [];
    if (activeFilter && PRO_FILTERS[activeFilter]) {
      parts.push(PRO_FILTERS[activeFilter]);
    }
    if (adjustments.exposure !== 0) parts.push(`brightness(${1 + adjustments.exposure / 200})`);
    if (adjustments.contrast !== 0) parts.push(`contrast(${1 + adjustments.contrast / 200})`);
    if (adjustments.saturation !== 0) parts.push(`saturate(${1 + adjustments.saturation / 100})`);
    return { filter: parts.join(' ') };
  };

  // Render toolbar tools
  const renderTools = () => (
    <>
      <ToolButton
        icon={<Icons.Clock />}
        label="History"
        isActive={activeTool === 'history'}
        onClick={() => handleToolClick('history')}
      />
      <div className="h-px w-6 bg-white/10 my-1" />
      <ToolButton
        icon={<Icons.Sliders />}
        label="Adjust"
        isActive={activeTool === 'adjust'}
        onClick={() => handleToolClick('adjust')}
      />
      <ToolButton
        icon={<Icons.Wand />}
        label="Filters"
        isActive={activeTool === 'filters'}
        onClick={() => handleToolClick('filters')}
      />
      <ToolButton
        icon={<Icons.Grid />}
        label="Presets"
        isActive={activeTool === 'presets'}
        onClick={() => handleToolClick('presets')}
        locked={!isRoleAtLeast('pro')}
      />
      <ToolButton
        icon={<Icons.Scissors />}
        label="Mask"
        isActive={activeTool === 'mask'}
        onClick={() => handleToolClick('mask')}
        locked={!isRoleAtLeast('freelancer')}
      />
      <ToolButton
        icon={<Icons.Layout />}
        label="Crop"
        isActive={activeTool === 'crop'}
        onClick={() => handleToolClick('crop')}
      />
    </>
  );

  // Render history sidebar
  const renderHistoryDock = (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
         <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Version History</span>
         <span className="text-[10px] text-slate-600">{history.length} Versions</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {history.map((item, index) => (
          <div
            key={item.id}
            className={`group relative flex gap-3 p-3 rounded-xl border transition-all duration-200 ${index === 0 ? 'bg-white/10 border-violet-500/50' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
          >
            {/* Thumbnail */}
            <div className="w-12 h-12 rounded-lg bg-black overflow-hidden flex-none relative self-start">
               <img 
                 src={item.thumbnail} 
                 alt={item.version} 
                 className={`w-full h-full object-cover transition-all ${index === 0 ? 'opacity-100' : 'opacity-60 grayscale group-hover:grayscale-0'}`}
                 style={{ filter: index !== history.length - 1 ? `hue-rotate(${index * 15}deg)` : 'none' }} 
               />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col min-w-0">
               <div className="flex items-center justify-between mb-1">
                 <span className={`text-xs font-bold ${index === 0 ? 'text-white' : 'text-slate-400'}`}>
                   {item.version}
                 </span>
                 <span className="text-[10px] text-slate-500 font-mono">
                   {item.timestamp}
                 </span>
               </div>
               <p className="text-[11px] text-slate-300 font-medium mb-1">
                 {item.action}
               </p>
               
               {/* Changes List */}
               {item.changes && item.changes.length > 0 && (
                 <ul className="space-y-0.5 mb-2">
                   {item.changes.map((change, i) => (
                     <li key={i} className="text-[10px] text-slate-500 flex items-center gap-1.5 truncate">
                        <span className="w-1 h-1 rounded-full bg-slate-600 flex-none" />
                        {change}
                     </li>
                   ))}
                 </ul>
               )}

               <div className="flex items-center justify-between mt-auto">
                 {index === 0 ? (
                   <span className="text-[9px] font-bold text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                     Current
                   </span>
                 ) : (
                    <button 
                      onClick={() => handleRestore(item)}
                      className="text-[10px] font-bold text-violet-400 hover:text-white hover:bg-violet-600 px-2 py-1 rounded transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                    >
                      <Icons.Undo className="w-3 h-3" /> Restore
                    </button>
                 )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Floating tool panels content
  const renderFloatingContent = () => {
    switch (activeTool) {
      case 'adjust':
        return (
          <FloatingToolPanel title="Adjustments" onClose={() => setActiveTool(null)}>
            <ProAdjustPanel values={adjustments} onChange={setAdjustments} />
          </FloatingToolPanel>
        );
      case 'filters':
        return (
          <FloatingToolPanel title="Filters" onClose={() => setActiveTool(null)}>
            <ProFiltersPanel activeId={activeFilter} onSelect={setActiveFilter} />
          </FloatingToolPanel>
        );
      case 'presets':
        return (
          <FloatingToolPanel title="Presets" onClose={() => setActiveTool(null)}>
            <PresetProPanel onSelect={(preset: any) => {
              setAdjustments({
                exposure: 5, contrast: 10, highlights: -5, shadows: 5,
                saturation: 15, vibrance: 10, temp: 0, tint: 0,
                sharpness: 0, noise: 0
              });
              setActiveFilter('vivid');
            }} />
          </FloatingToolPanel>
        );
      case 'mask':
        return (
          <FloatingToolPanel title="Masking" onClose={() => setActiveTool(null)}>
            <MaskLiteProPanel />
          </FloatingToolPanel>
        );
      case 'crop':
        return (
          <FloatingToolPanel title="Crop & Rotate" onClose={() => setActiveTool(null)}>
            <ProCropPanel 
              rotation={rotation} 
              onRotationChange={setRotation}
              activeRatio={cropRatio}
              onRatioChange={setCropRatio}
              flipH={flipH}
              onFlipHChange={setFlipH}
              flipV={flipV}
              onFlipVChange={setFlipV}
            />
          </FloatingToolPanel>
        );
      case 'export':
        return (
          <FloatingToolPanel title="Export" onClose={() => setActiveTool(null)}>
            <ExportProOptions 
              isUnlocked={isRoleAtLeast('pro')} 
              onUpgradeClick={() => triggerUpgradeModal('Pro Export Options', 'Plus')}
              config={exportConfig as any}
              onChange={(cfg: any) => setExportConfig(cfg)}
            />
          </FloatingToolPanel>
        );
      case 'history':
        return (
          <FloatingToolPanel title="History" onClose={() => setActiveTool(null)}>
            {renderHistoryDock}
          </FloatingToolPanel>
        );
      default:
        return null;
    }
  };

  // Render canvas with image and overlays
  const currentImage = batchImages[currentImageIndex] || { url: imageUrl, fileName };
  const CanvasArea = (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Floating Tool Panel */}
      {activeTool && (
        <div className="absolute top-0 left-0 h-full z-30">
          {renderFloatingContent()}
        </div>
      )}

      {/* Main Image Compariom Layout */}
      <div className="flex items-center justify-center gap-6 w-full h-full px-4">
        
        {/* Left: Original Image (Reference) - Smaller */}
        <div className="relative group flex-none w-64 opacity-80 hover:opacity-100 transition-all duration-300 hover:w-96 z-20">
          <div className="absolute -top-3 left-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-black/80 px-2 py-0.5 rounded border border-white/10">
            Original
          </div>
          <div
            className="relative shadow-xl border-2 border-white/5 rounded-lg overflow-hidden bg-black/20"
          >
            <img
              src={currentImage.url}
              alt="Original"
              className="w-full h-auto object-contain block"
              style={{ filter: 'none' }}
            />
          </div>
          
          {/* Overlay: Dimensions (Original) */}
          <div className="absolute top-4 left-4 z-40 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
            1024 × 1024 px
          </div>
        </div>

        {/* Right: Edited Image (Main) - Centered Group */}
        <div className="relative group flex-none max-w-[70vw]">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xs font-bold text-violet-400 uppercase tracking-wider bg-black/50 px-3 py-1 rounded-full border border-violet-500/20 z-30">
            Edited Result
          </div>
            <div
              className={`relative shadow-2xl transition-transform duration-200 ease-out border-4 border-violet-500/30 rounded-sm ${cropRatio !== 'original' ? 'overflow-hidden' : ''}`}
              style={{ 
                transform: `scale(${zoom / 100}) rotate(${rotation}deg) scaleX(${flipH ? -1 : 1}) scaleY(${flipV ? -1 : 1})`,
              }}
            >
              <img
                src={currentImage.url}
                alt="Edited"
                className={`block max-w-full transition-all duration-300 ${cropRatio === 'original' ? 'h-[80vh] w-auto object-contain' : 'max-h-[80vh] w-auto object-cover'}`}
                style={{
                  ...getFilterStyle(),
                  aspectRatio: cropRatio === 'original' ? 'auto' : cropRatio.replace(':', '/'),
                }}
              />

            {/* Overlay: Image Dimensions (Top Left) - Counter Scaled */}
            <div 
              className="absolute top-4 left-4 z-40 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity origin-top-left"
              style={{ transform: `rotate(${-rotation}deg) scale(${100 / zoom})` }}
            >
              {(() => {
                const ORIGINAL_W = 1920;
                const ORIGINAL_H = 1280;
                
                if (cropRatio === 'original') return `${ORIGINAL_W} × ${ORIGINAL_H} px`;
                
                const [wRatio, hRatio] = cropRatio.split(':').map(Number);
                const targetRatio = wRatio / hRatio;
                const originalRatio = ORIGINAL_W / ORIGINAL_H;
                
                let finalW, finalH;
                
                if (originalRatio > targetRatio) {
                  // Original is wider than target -> Height is limiting factor (Crop Sides)
                  finalH = ORIGINAL_H;
                  finalW = Math.round(ORIGINAL_H * targetRatio);
                } else {
                  // Original is taller/more square than target -> Width is limiting factor (Crop Top/Bottom)
                  finalW = ORIGINAL_W;
                  finalH = Math.round(ORIGINAL_W / targetRatio);
                }
                
                return `${finalW} × ${finalH} px`;
              })()}
            </div>

            {/* Overlay: Zoom Controls (Bottom Left) - Counter Scaled */}
            <div 
              className="absolute bottom-4 left-4 z-40 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center p-1 gap-2 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity origin-bottom-left"
              style={{ transform: `rotate(${-rotation}deg) scale(${100 / zoom})` }}
            >
               <button
                 onClick={(e) => { e.stopPropagation(); setZoom(Math.max(10, zoom - 10)); }}
                 className="p-1.5 hover:bg-white/10 rounded-full text-white transition-colors"
               >
                 <Icons.ZoomOut className="w-3.5 h-3.5" />
               </button>
               <span className="w-10 text-center text-[10px] font-mono text-slate-300 pointer-events-none">{zoom}%</span>
               <button
                 onClick={(e) => { e.stopPropagation(); setZoom(Math.min(300, zoom + 10)); }}
                 className="p-1.5 hover:bg-white/10 rounded-full text-white transition-colors"
               >
                 <Icons.ZoomIn className="w-3.5 h-3.5" />
               </button>
            </div>
          </div>
        </div>

      </div>

      {/* Review Mode Badge */}
      {/* Review Mode Overlay */}
      {isReviewMode && (
        isRoleAtLeast('team') ? (
          // Business/Team: Advanced Review Interface
          <div className="absolute inset-0 z-50 bg-[#0e0f13] flex flex-col animate-fade-in">
            {/* Review Header */}
            <div className="flex-none h-16 flex items-center justify-between px-6 border-b border-white/10 bg-[#0e0f13]">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400">
                  <Icons.Eye className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Final Review</h3>
                  <p className="text-[10px] text-slate-500">Check details before exporting</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                 <button 
                   onClick={() => setIsReviewMode(false)}
                   className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors text-sm font-medium"
                 >
                   Back to Edit
                 </button>
                 <button 
                   onClick={() => {
                     setIsReviewMode(false);
                     handleToolClick('export');
                   }}
                   className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white shadow-lg shadow-teal-500/20 transition-all font-bold text-sm flex items-center gap-2"
                 >
                   <Icons.Download className="w-4 h-4" />
                   Export
                 </button>
              </div>
            </div>

            {/* Review Canvas */}
            <div className="flex-1 overflow-hidden relative flex items-center justify-center bg-[#050505]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1b1e_0%,_#000000_100%)] opacity-50" />
              
              <div 
                className="relative z-10 max-w-[90%] max-h-[85%] cursor-zoom-in group select-none"
                onMouseDown={() => setIsHoldingCompare(true)}
                onMouseUp={() => setIsHoldingCompare(false)}
                onMouseLeave={() => setIsHoldingCompare(false)}
                onTouchStart={() => setIsHoldingCompare(true)}
                onTouchEnd={() => setIsHoldingCompare(false)}
              >
                <img
                  src={currentImage.url}
                  alt="Review"
                  className="max-w-full max-h-full object-contain drop-shadow-2xl rounded-lg"
                  style={isHoldingCompare ? { filter: 'none' } : getFilterStyle()}
                  draggable={false}
                />

                {/* Compare Label */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-xs font-medium text-white pointer-events-none transition-opacity duration-200">
                  {isHoldingCompare ? (
                    <span className="text-rose-400 flex items-center gap-2">
                      <Icons.EyeOff className="w-3 h-3" /> Showing Original
                    </span>
                  ) : (
                    <span className="text-slate-300 flex items-center gap-2">
                      <Icons.Eye className="w-3 h-3" /> Hold to Compare
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Free/Casual: Simple Preview Overlay
          <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center animate-in fade-in duration-200">
             <button 
               onClick={() => setIsReviewMode(false)}
               className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
             >
               <Icons.Times className="w-6 h-6" />
             </button>

             <div className="relative">
               <img
                  src={currentImage.url}
                  alt="Review"
                  className="max-w-[90vw] max-h-[80vh] object-contain shadow-2xl rounded-lg"
                  style={getFilterStyle()}
                />
                
                {/* Watermark - Controlled by Export Settings */}
                {!exportConfig.removeWatermark && (
                  <div className="absolute bottom-4 right-4 z-10 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 pointer-events-none">
                    <Icons.Sparkles className="w-3 h-3 text-white/70" />
                    <span className="text-[10px] font-bold text-white/70 tracking-widest uppercase">Repix.art</span>
                  </div>
                )}
             </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setIsReviewMode(false)}
                  className="px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white font-medium transition-colors"
                >
                  Continue Editing
                </button>
                <button 
                  onClick={() => {
                   setIsReviewMode(false);
                   handleToolClick('export');
                 }}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-bold hover:bg-slate-200 transition-colors"
                >
                  Export Image
                </button>
              </div>
          </div>
        )
      )}

      {/* Zoom Controls Removed - Moved to Bottom Center */}

      {/* Mask Mode Indicator */}
      {activeTool === 'mask' && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <div className="w-full h-full bg-red-500/10 mix-blend-overlay animate-pulse" />
          <div className="absolute top-20 bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-xs font-bold shadow-xl">
            Mask Mode Active
          </div>
        </div>
      )}

      {/* Live Edit Indicators - Show when other users are editing */}
      {/* Live Edit Indicators - Show only for Team */}
      {isRoleAtLeast('team') && activeUsers
        .filter(u => u.user.id !== currentUserId && u.currentTool)
        .map((activeUser, index) => (
          <LiveEditIndicator
            key={activeUser.user.id}
            user={activeUser.user}
            tool={activeUser.currentTool!}
          />
        ))}

      {/* Realtime User Cursors - Show only for Team */}
      {isRoleAtLeast('team') && <RealtimeUserCursors cursors={userCursors} />}
    </div>
  );



  // Team panels wrapper - combines both Comment and AI panels
  const renderTeamPanels = () => {
    const panels = [];

    // Comment Panel
    if (isCommentPanelOpen && isRoleAtLeast('freelancer')) {
      panels.push(
        <div key="comments" className="flex-none w-72 h-full">
          <EditorTeamCommentPanel
            comments={comments}
            teamMembers={mockTeamMembers}
            onAddComment={handleAddComment}
            isOpen={isCommentPanelOpen}
            onToggle={() => setIsCommentPanelOpen(!isCommentPanelOpen)}
          />
        </div>
      );
    }

    return panels.length > 0 ? <div className="flex h-full">{panels}</div> : null;
  };

  // Custom Team Header with R4.11 features + Realtime Collaboration
  const TeamEditorHeader = (
    <div className="h-auto flex flex-col">
      {/* Team Context Bar */}
      {/* Team Context Bar - ONLY FOR TEAM ROLE */}
      {isRoleAtLeast('team') && (
        <TeamEditorContextBar
          team={mockTeamEditorData.team}
          project={mockTeamEditorData.project}
          assignee={assignment.assignee}
          onTeamClick={onNavigateToTeam}
          onProjectClick={onNavigateToProject}
        />
      )}

      {/* Modern Enhanced Editor Header with Realtime Collaboration */}
      <header className="h-16 flex-none bg-gradient-to-r from-[#0e0f13]/95 via-[#12141a]/95 to-[#0e0f13]/95 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-4 relative z-50 shadow-lg shadow-black/20">
        {/* Left: Navigation + File */}
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2.5 hover:bg-white/5 rounded-xl transition-all duration-200 text-slate-400 hover:text-white group">
            <Icons.ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <div className="flex items-center gap-3 px-3 py-1.5 bg-white/5 rounded-xl border border-white/5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 via-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-violet-600/20">
              R
            </div>
            <div className="text-sm">
              {isRoleAtLeast('team') && <span className="text-slate-400">{mockTeamEditorData.project.name} / </span>}
              <span className="text-white font-semibold">{currentImage.fileName}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Realtime Presence - Prominent Position - Only for Team */}
          {isRoleAtLeast('team') && (
            <div className="relative">
              <div
                className="cursor-pointer"
                onMouseEnter={() => setShowActivityFeed(true)}
                onMouseLeave={() => setShowActivityFeed(false)}
              >
                <RealtimePresence activeUsers={activeUsers} currentUserId={currentUserId} />
              </div>
              {showActivityFeed && <RealtimeActivityFeed activities={realtimeActivities} />}
            </div>
          )}

          <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {editMode === 'single' && isRoleAtLeast('team') && (
            <ImageAssignmentStatus assignment={assignment} onStatusChange={handleStatusChange} />
          )}
        </div>

        {/* Center: Mode Controls with Modern Design */}
        {/* Center: Mode Controls with Modern Design */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-black/30 rounded-xl border border-white/5 relative">
          {/* Unlocked for all roles */}
          {/* Batch Edit Toggle Removed */}
          {isRoleAtLeast('team') ? (
            <QuickReviewControls
              isReviewMode={isReviewMode}
              onToggleReview={() => setIsReviewMode(!isReviewMode)}
              currentIndex={currentImageIndex}
              totalImages={batchImages.length}
              onNext={handleNextImage}
              onPrevious={handlePreviousImage}
              onApprove={handleApproveImage}
              onReject={handleRejectImage}
              onAddComment={handleQuickComment}
            />
          ) : (
            <button
               onClick={() => setIsReviewMode(true)}
               className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-sm font-medium text-white transition-all hover:scale-105 active:scale-95"
            >
              <Icons.Eye className="w-4 h-4" />
              Preview Result
            </button>
          )}
        </div>

        {/* Right: Actions with Modern Design */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-black/40 rounded-xl p-1 border border-white/5 shadow-lg">
            <button onClick={handleUndo} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="Undo">
              <Icons.Undo className="w-4 h-4" />
            </button>
            <button onClick={handleRedo} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200" title="Redo">
              <Icons.Redo className="w-4 h-4" />
            </button>
            <div className="w-px h-4 bg-white/10 mx-0.5" />
            <button onClick={handleReset} className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all duration-200" title="Reset">
              <Icons.Trash className="w-4 h-4" />
            </button>
          </div>

          {/* Comments - Only for Pro (Freelancer) and above */}
          {isRoleAtLeast('freelancer') && (
            <button
              onClick={() => setIsCommentPanelOpen(!isCommentPanelOpen)}
              className={`relative p-2.5 rounded-xl transition-all duration-200 ${
                isCommentPanelOpen
                  ? 'bg-gradient-to-br from-violet-600 to-violet-700 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <Icons.MessageSquare className="w-4 h-4" />
              {comments.length > 0 && !isCommentPanelOpen && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-gradient-to-br from-rose-500 to-rose-600 text-[10px] text-white font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/50 animate-pulse">
                  {comments.length}
                </span>
              )}
            </button>
          )}

          {/* AI Button Removed from Header */}

          <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-1" />

          {/* Business Workflow Actions - Only for Team */}
          {isRoleAtLeast('team') ? (
            <EditorSaveActions
              onSaveDraft={handleSaveDraft}
              onMarkReady={handleMarkReady}
              onSaveAndHandoff={handleSaveAndHandoff}
              currentStatus={assignment.status}
            />
          ) : (
             /* Non-Team Actions */
             <div className="flex items-center gap-3">
               <button 
                 onClick={handleSaveDraft}
                 className="p-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
                 title="Save Draft"
               >
                 <Icons.Save className="w-5 h-5" />
               </button>
               <button 
                 onClick={() => handleToolClick('export')}
                 className="px-6 py-2 bg-white text-black font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors"
               >
                 Export
               </button>
             </div>
          )}
        </div>
      </header>
    </div>
  );

  // Share Modal
  const ShareModal = (
    <GlassModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} className="max-w-md">
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2">Share Project</h3>
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 font-mono">
            repix.art/team/project-x
          </div>
          <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-sm">
            Copy
          </button>
        </div>
      </div>
    </GlassModal>
  );

  return (
    <div className="h-screen w-full bg-[#0e0f13] flex flex-col overflow-hidden">
      {TeamEditorHeader}

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* 1. Left Sidebar Toolbar (Docked) */}
        <aside className="w-16 bg-[#0e0f13] border-r border-white/5 flex flex-col items-center py-6 z-30 flex-none gap-4">
          {renderTools()}
        </aside>

        {/* 2. Center Canvas Area */}
        <main className="flex-1 relative bg-[#15161b] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2128_0%,_#15161b_100%)]" />
          
          {/* Content Wrapper - Removed padding-right to fix left-skew issues */}
          <div className="w-full h-full flex items-center justify-center relative z-10 p-4">
            {CanvasArea}
          </div>

          {/* Zoom Controls Removed - Moved to Overlay */}

          {/* AI Assistant FAB & Chat Window */}
          <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
            {/* Chat Window Popup */}
            {isAIPanelOpen && (
              <div className="w-[400px] h-[500px] pointer-events-auto rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-4 fade-in duration-300 border border-white/10 bg-[#1a1b1e] flex flex-col origin-bottom-right">
                <AIChatPanel onClose={() => setIsAIPanelOpen(false)} />
              </div>
            )}

            {/* Floating Action Button */}
            <button
              onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
              className={`pointer-events-auto w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 active:scale-95 z-50 ${
                isAIPanelOpen 
                  ? 'bg-white text-slate-900 rotate-90' 
                  : 'bg-[#6366f1] text-white hover:bg-[#5558e6]' 
              }`}
            >
              {isAIPanelOpen ? (
                <Icons.Times className="w-5 h-5" />
              ) : (
                <Icons.Gemini className="w-5 h-5 animate-pulse" />
              )}
            </button>
          </div>
        </main>

        {/* Right Panels */}
        {renderTeamPanels()}
      </div>

      {/* R4.11 Batch Features */}
      {editMode === 'batch' && (
        <>
          <BatchActionPanel
            selectedCount={selectedImageIds.length}
            onApplyPreset={handleApplyPreset}
            onApplyBackground={handleApplyBackground}
            onApplyRemix={handleApplyRemix}
            onExportBatch={handleExportBatch}
          />
          <BatchFilmstrip
            images={batchImages}
            selectedIds={selectedImageIds}
            onToggleSelect={handleToggleImageSelect}
            onSelectAll={handleSelectAll}
            onDeselectAll={handleDeselectAll}
            onImageClick={handleImageClick}
          />
        </>
      )}

      {ShareModal}
      <ExportSuccessToast show={showSuccessToast} onClose={() => setShowSuccessToast(false)} />

      {/* UPGRADE MODAL */}
      <GlassModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)}>
        <div className="text-center p-4">
           <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-6">
             <Icons.Lock className="w-8 h-8 text-amber-500" />
           </div>
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Unlock {upgradeFeatureName}</h3>
           <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xs mx-auto">
             Upgrade to <span className="font-bold text-violet-500">{suggestedPlan || 'Business'}</span> to access this feature and supercharge your workflow.
           </p>
           <NeonButton onClick={() => onNavigate?.('subscription')}>
             View Upgrade Plans
           </NeonButton>
           <button 
             onClick={() => setIsUpgradeModalOpen(false)}
             className="mt-4 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
           >
             Maybe Later
           </button>
        </div>
      </GlassModal>
    </div>
  );
};

export default TeamEditorPage;
