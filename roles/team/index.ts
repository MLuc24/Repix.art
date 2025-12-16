/**
 * Team Role Module
 * 
 * This module extends Freelancer role with team collaboration features.
 * Teams can share projects, manage members, and collaborate on design assets.
 * 
 * Structure:
 * - pages/        : Team-specific page components
 * - components/   : Reusable team UI components
 * - editor/       : Team Editor Context (R4.10)
 * - workspace/    : Workspace management
 * - members/      : Team member management
 * 
 * Note: Team role reuses Freelancer editor and adds Team Context overlay.
 */

export const TEAM_ROLE_CONFIG = {
    id: 'team',
    name: 'Team',
    description: 'Multi-user workspace with shared projects and collaboration',
    extendsRole: 'freelancer', // Team builds on top of Freelancer
    features: [
        'All Freelancer features',
        'Shared workspace',
        'Team members management',
        'Role-based permissions',
        'Shared asset library',
        'Team Editor Context (R4.10)', // NEW
    ],
};

// Export Team Editor module
export * from './editor';
