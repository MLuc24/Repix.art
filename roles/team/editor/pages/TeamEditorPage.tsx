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
import { GlassModal } from '../../../../shared/components/GlassUI';
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

type TeamTool = 'adjust' | 'filters' | 'presets' | 'mask' | 'crop' | 'export' | null;
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
}

export const TeamEditorPage: React.FC<TeamEditorPageProps> = ({
  onBack,
  imageUrl = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
  fileName = 'Campaign_Hero_v2.jpg',
  onNavigateToTeam,
  onNavigateToProject,
}) => {
  // Editor Core State
  const [activeTool, setActiveTool] = useState<TeamTool>(null);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [activeFilter, setActiveFilter] = useState('leica');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
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
    // Mock save
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

  // Editor Tool Handlers
  const handleToolClick = (tool: TeamTool) => {
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
      />
      <ToolButton
        icon={<Icons.Scissors />}
        label="Mask"
        isActive={activeTool === 'mask'}
        onClick={() => handleToolClick('mask')}
      />
      <ToolButton
        icon={<Icons.Layout />}
        label="Crop"
        isActive={activeTool === 'crop'}
        onClick={() => handleToolClick('crop')}
      />
    </>
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
            <ProCropPanel rotation={rotation} onRotationChange={setRotation} />
          </FloatingToolPanel>
        );
      case 'export':
        return (
          <FloatingToolPanel title="Export" onClose={() => setActiveTool(null)}>
            <ExportProOptions />
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

      {/* Main Image */}
      <div
        className="relative shadow-2xl transition-transform duration-200 ease-out border-4 border-white/5 rounded-sm"
        style={{ transform: `scale(${zoom / 100}) rotate(${rotation}deg)` }}
      >
        <img
          src={currentImage.url}
          alt={currentImage.fileName}
          className="max-h-[80vh] max-w-[90vw] object-contain block"
          style={getFilterStyle()}
        />
      </div>

      {/* Review Mode Badge */}
      {isReviewMode && (
        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-teal-600/90 backdrop-blur-sm border border-teal-400/30 text-white text-sm font-medium">
          Review Mode
        </div>
      )}

      {/* Zoom Controls */}
      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center p-1 gap-1 z-20 shadow-xl">
        <button
          onClick={() => setZoom(Math.max(10, zoom - 10))}
          className="p-2 hover:bg-white/10 rounded-md text-white"
        >
          <Icons.ZoomOut className="w-4 h-4" />
        </button>
        <div className="w-12 text-center text-xs font-mono text-slate-300">{zoom}%</div>
        <button
          onClick={() => setZoom(Math.min(300, zoom + 10))}
          className="p-2 hover:bg-white/10 rounded-md text-white"
        >
          <Icons.ZoomIn className="w-4 h-4" />
        </button>
      </div>

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
      {activeUsers
        .filter(u => u.user.id !== currentUserId && u.currentTool)
        .map((activeUser, index) => (
          <LiveEditIndicator
            key={activeUser.user.id}
            user={activeUser.user}
            tool={activeUser.currentTool!}
          />
        ))}

      {/* Realtime User Cursors */}
      <RealtimeUserCursors cursors={userCursors} />
    </div>
  );

  // Render history sidebar
  const renderHistoryDock = (
    <div className="h-full flex flex-col p-2 gap-2 overflow-y-auto">
      <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider px-1">
        History
      </p>
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-full aspect-square rounded-lg bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-violet-500/50 transition-all"
        >
          <img
            src={imageUrl}
            alt={`History ${i}`}
            className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity"
            style={{ filter: `hue-rotate(${i * 30}deg)` }}
          />
        </div>
      ))}
    </div>
  );

  // Team panels wrapper - combines both Comment and AI panels
  const renderTeamPanels = () => {
    const panels = [];

    // Comment Panel
    if (isCommentPanelOpen) {
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

    // AI Panel
    if (isAIPanelOpen) {
      panels.push(
        <div key="ai" className="flex-none w-80 h-full">
          <AIChatPanel onClose={() => setIsAIPanelOpen(false)} />
        </div>
      );
    }

    return panels.length > 0 ? <div className="flex h-full">{panels}</div> : null;
  };

  // Custom Team Header with R4.11 features + Realtime Collaboration
  const TeamEditorHeader = (
    <div className="h-auto flex flex-col">
      {/* Team Context Bar */}
      <TeamEditorContextBar
        team={mockTeamEditorData.team}
        project={mockTeamEditorData.project}
        assignee={assignment.assignee}
        onTeamClick={onNavigateToTeam}
        onProjectClick={onNavigateToProject}
      />

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
              <span className="text-slate-400">{mockTeamEditorData.project.name} / </span>
              <span className="text-white font-semibold">{currentImage.fileName}</span>
            </div>
          </div>

          <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Realtime Presence - Prominent Position */}
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

          <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {editMode === 'single' && (
            <ImageAssignmentStatus assignment={assignment} onStatusChange={handleStatusChange} />
          )}
        </div>

        {/* Center: Mode Controls with Modern Design */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-black/30 rounded-xl border border-white/5">
          <BatchEditToggle mode={editMode} onModeChange={setEditMode} />
          <div className="h-6 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
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

          <button
            onClick={() => setIsAIPanelOpen(!isAIPanelOpen)}
            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
              isAIPanelOpen
                ? 'bg-gradient-to-r from-violet-600 via-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-gradient-to-r hover:from-violet-600/20 hover:to-indigo-600/20 border border-white/5'
            }`}
          >
            <Icons.Sparkles className="w-4 h-4" />
            <span>AI</span>
          </button>

          <div className="h-8 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent mx-1" />

          <EditorSaveActions
            onSaveDraft={handleSaveDraft}
            onMarkReady={handleMarkReady}
            onSaveAndHandoff={handleSaveAndHandoff}
            currentStatus={assignment.status}
          />
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
        {/* Left History Sidebar */}
        <aside className={`flex-none z-30 h-full bg-[#0e0f13] border-r border-white/5 transition-all duration-300 ${isHistoryOpen ? 'w-28' : 'w-0 border-none'
          }`}>
          <div className={`w-28 h-full ${isHistoryOpen ? 'opacity-100' : 'opacity-0 absolute'}`}>
            {renderHistoryDock}
          </div>
          <button
            onClick={() => setIsHistoryOpen(!isHistoryOpen)}
            className={`absolute top-1/2 -translate-y-1/2 z-50 w-4 h-12 bg-[#0e0f13] border border-l-0 border-white/10 rounded-r-md flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/5 transition-all ${isHistoryOpen ? 'left-28' : 'left-0'
              }`}
          >
            <Icons.ChevronLeft className={`w-3 h-3 ${isHistoryOpen ? '' : 'rotate-180'}`} />
          </button>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 relative bg-[#15161b] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1f2128_0%,_#15161b_100%)]" />
          <div className="w-full h-full flex items-center justify-center relative z-10 p-4">
            {CanvasArea}
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
            <div className="bg-[#1a1b1e]/90 backdrop-blur-xl border border-white/5 rounded-full p-1.5 shadow-2xl flex items-center gap-1.5 px-3">
              {renderTools()}
            </div>
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
    </div>
  );
};

export default TeamEditorPage;
