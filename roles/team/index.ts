/**
 * Team Role Module
 * 
 * This module extends Freelancer role with team collaboration features.
 * Teams can share projects, manage members, and collaborate on design assets.
 * 
 * Structure:
 * - pages/        : Team-specific page components
 * - components/   : Reusable team UI components (future)
 * - workspace/    : Workspace management (future)
 * - members/      : Team member management (future)
 * 
 * Note: Currently reuses Freelancer components for MVP.
 * Future iterations will add Team-specific features.
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
    ],
};
