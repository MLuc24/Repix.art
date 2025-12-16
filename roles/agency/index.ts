/**
 * Agency Role Module
 * 
 * NOTE: Agency role is now merged with Team role.
 * This file is kept for backward compatibility only.
 * All Agency features are now part of Team role.
 * 
 * Agency = Team (same functionality)
 */

export const AGENCY_ROLE_CONFIG = {
    id: 'agency',
    name: 'Team', // Merged with Team
    description: 'Multi-user workspace with shared projects and collaboration',
    extendsRole: 'team',
    features: [
        'Same as Team role',
    ],
    deprecated: true, // Agency is now Team
};
