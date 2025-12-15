/**
 * Mock Data for Team Editor Context
 * R4.10 — TEAM EDITOR CONTEXT (FOUNDATION)
 */

import type {
  TeamContext,
  ProjectContext,
  TeamMember,
  ImageAssignment,
  TeamComment,
  MockTeamEditorData,
  BatchImage,
} from '../../roles/team/editor/types';

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'member-1',
    name: 'Alex Johnson',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'owner',
    email: 'alex@rocketstudio.com',
  },
  {
    id: 'member-2',
    name: 'Sarah Chen',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'admin',
    email: 'sarah@rocketstudio.com',
  },
  {
    id: 'member-3',
    name: 'Mike Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'editor',
    email: 'mike@rocketstudio.com',
  },
  {
    id: 'member-4',
    name: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'editor',
    email: 'emma@rocketstudio.com',
  },
];

export const mockTeamContext: TeamContext = {
  id: 'team-1',
  name: 'Rocket Studio',
  logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop',
  color: '#8b5cf6',
};

export const mockProjectContext: ProjectContext = {
  id: 'project-1',
  name: 'Campaign X',
  status: 'active',
  deadline: '2025-12-25',
};

export const mockImageAssignment: ImageAssignment = {
  id: 'assignment-1',
  imageId: 'img-001',
  assignee: mockTeamMembers[2], // Mike Wilson
  status: 'editing',
  assignedAt: '2025-12-14T10:00:00Z',
  updatedAt: '2025-12-15T09:30:00Z',
};

export const mockTeamComments: TeamComment[] = [
  {
    id: 'comment-1',
    author: mockTeamMembers[1], // Sarah
    content: 'Please ensure the brand colors are consistent with our guidelines.',
    mentions: [],
    createdAt: '2025-12-14T14:30:00Z',
    isInternal: true,
  },
  {
    id: 'comment-2',
    author: mockTeamMembers[0], // Alex
    content: '@mike Can you add a subtle vignette to this one?',
    mentions: ['member-3'],
    createdAt: '2025-12-14T15:45:00Z',
    isInternal: true,
  },
  {
    id: 'comment-3',
    author: mockTeamMembers[2], // Mike
    content: 'Done! Added the vignette. Please review.',
    mentions: ['member-1'],
    createdAt: '2025-12-15T09:00:00Z',
    isInternal: true,
  },
];

export const mockTeamEditorData: MockTeamEditorData = {
  team: mockTeamContext,
  project: mockProjectContext,
  assignment: mockImageAssignment,
  comments: mockTeamComments,
  teamMembers: mockTeamMembers,
};

// Simulated async functions
export const updateImageStatus = async (
  assignmentId: string,
  newStatus: ImageAssignment['status']
): Promise<ImageAssignment> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    ...mockImageAssignment,
    status: newStatus,
    updatedAt: new Date().toISOString(),
  };
};

export const addTeamComment = async (
  content: string,
  mentions: string[]
): Promise<TeamComment> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    id: `comment-${Date.now()}`,
    author: mockTeamMembers[2], // Current user (Mike)
    content,
    mentions,
    createdAt: new Date().toISOString(),
    isInternal: true,
  };
};

export const saveDraft = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { success: true, message: 'Draft saved successfully' };
};

export const markReadyForReview = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { success: true, message: 'Marked as ready for review' };
};

export const saveAndHandoff = async (): Promise<{ success: boolean; message: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: 'Saved and handed off to project' };
};

// R4.11 — BATCH EDIT & REVIEW MODE
export const mockBatchImages: BatchImage[] = [
  {
    id: 'img-001',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    fileName: 'Campaign_Hero_v2.jpg',
    assignee: mockTeamMembers[2],
    status: 'editing',
  },
  {
    id: 'img-002',
    url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400',
    fileName: 'Nature_Banner.jpg',
    assignee: mockTeamMembers[3],
    status: 'ready',
  },
  {
    id: 'img-003',
    url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400',
    fileName: 'Forest_Scene.jpg',
    assignee: mockTeamMembers[2],
    status: 'approved',
  },
  {
    id: 'img-004',
    url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
    fileName: 'Landscape_Wide.jpg',
    status: 'editing',
  },
  {
    id: 'img-005',
    url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400',
    fileName: 'Mountain_View.jpg',
    assignee: mockTeamMembers[3],
    status: 'revision-needed',
  },
  {
    id: 'img-006',
    url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400',
    fileName: 'Sunset_Sky.jpg',
    status: 'ready',
  },
  {
    id: 'img-007',
    url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
    fileName: 'Trail_Path.jpg',
    assignee: mockTeamMembers[2],
    status: 'approved',
  },
  {
    id: 'img-008',
    url: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400',
    fileName: 'Beach_Scene.jpg',
    status: 'editing',
  },
];
