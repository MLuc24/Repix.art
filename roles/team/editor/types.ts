/**
 * Team Editor Types
 * R4.10 — TEAM EDITOR CONTEXT (FOUNDATION)
 * 
 * Types for team-aware editor components that extend Freelancer editor.
 */

export interface TeamContext {
  id: string;
  name: string;
  logo?: string;
  color?: string;
}

export interface ProjectContext {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'on-hold';
  deadline?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: 'owner' | 'admin' | 'editor' | 'viewer';
  email?: string;
}

export type ImageAssignmentStatus = 'editing' | 'ready' | 'approved' | 'revision-needed';

export interface ImageAssignment {
  id: string;
  imageId: string;
  assignee: TeamMember;
  status: ImageAssignmentStatus;
  assignedAt: string;
  updatedAt: string;
}

export interface TeamComment {
  id: string;
  author: TeamMember;
  content: string;
  mentions: string[]; // member IDs mentioned with @
  createdAt: string;
  isInternal: boolean; // Not visible to client
}

export interface TeamEditorContextBarProps {
  team: TeamContext;
  project: ProjectContext;
  assignee?: TeamMember;
  onTeamClick?: () => void;
  onProjectClick?: () => void;
}

export interface ImageAssignmentStatusProps {
  assignment: ImageAssignment;
  onStatusChange?: (newStatus: ImageAssignmentStatus) => void;
}

export interface EditorTeamCommentPanelProps {
  comments: TeamComment[];
  teamMembers: TeamMember[];
  onAddComment?: (content: string, mentions: string[]) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export interface EditorSaveActionsProps {
  onSaveDraft?: () => void;
  onMarkReady?: () => void;
  onSaveAndHandoff?: () => void;
  isSaving?: boolean;
  currentStatus?: ImageAssignmentStatus;
}

// R4.11 — BATCH EDIT & REVIEW MODE TYPES
export type EditMode = 'single' | 'batch';
export type ReviewDecision = 'approve' | 'reject' | 'skip';

export interface BatchImage {
  id: string;
  url: string;
  fileName: string;
  assignee?: TeamMember;
  status: ImageAssignmentStatus;
  selected?: boolean;
}

export interface BatchEditToggleProps {
  mode: EditMode;
  onModeChange: (mode: EditMode) => void;
}

export interface BatchFilmstripProps {
  images: BatchImage[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onImageClick?: (id: string) => void;
}

export interface BatchActionPanelProps {
  selectedCount: number;
  onApplyPreset?: () => void;
  onApplyBackground?: () => void;
  onApplyRemix?: () => void;
  onExportBatch?: () => void;
}

export interface QuickReviewControlsProps {
  isReviewMode: boolean;
  onToggleReview: () => void;
  currentIndex: number;
  totalImages: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  onAddComment?: () => void;
}

// Mock Data Types
export interface MockTeamEditorData {
  team: TeamContext;
  project: ProjectContext;
  assignment: ImageAssignment;
  comments: TeamComment[];
  teamMembers: TeamMember[];
}
