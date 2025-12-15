/**
 * Agency Role Module
 * 
 * This module extends Team role with multi-client agency features.
 * Agencies can manage multiple clients, sub-accounts, and white-labeling.
 * 
 * Structure:
 * - pages/        : Agency-specific page components
 * - components/   : Reusable agency UI components (future)
 * - clients/      : Client management (future)
 * - white-label/  : White-labeling customization (future)
 * 
 * Note: Currently reuses Freelancer/Team components for MVP.
 * Future iterations will add Agency-specific features.
 */

export const AGENCY_ROLE_CONFIG = {
    id: 'agency',
    name: 'Agency',
    description: 'Multi-client management with white-labeling and advanced features',
    extendsRole: 'team', // Agency builds on top of Team
    features: [
        'All Team features',
        'Multi-client management',
        'Sub-accounts',
        'White-labeling',
        'Client invoicing',
        'Agency analytics',
    ],
};
