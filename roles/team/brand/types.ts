
export interface BrandColor {
    name: string;
    hex: string;
    usage: string;
}

export interface BrandLogo {
    id: string;
    type: 'primary' | 'secondary';
    url: string;
    usage: string;
}

export interface BrandFont {
    type: 'heading' | 'body';
    name: string;
    fallback: string;
}

export interface BrandKit {
    id: string;
    name: string;
    status: 'active' | 'incomplete';
    logos: BrandLogo[];
    colors: BrandColor[];
    fonts: BrandFont[];
    lastUpdated: string;
}

// Mock Data
export const MOCK_BRAND_KIT: BrandKit = {
    id: 'brand-1',
    name: 'Acme Corp Brand',
    status: 'active',
    logos: [
        {
            id: 'logo-1',
            type: 'primary',
            url: 'https://via.placeholder.com/200x80/6366f1/ffffff?text=ACME+CORP',
            usage: 'Use on light backgrounds, minimum size 120px wide'
        },
        {
            id: 'logo-2',
            type: 'secondary',
            url: 'https://via.placeholder.com/80x80/6366f1/ffffff?text=AC',
            usage: 'Use for social media avatars and app icons'
        }
    ],
    colors: [
        { name: 'Primary', hex: '#6366f1', usage: 'Main brand color for CTAs and headers' },
        { name: 'Secondary', hex: '#8b5cf6', usage: 'Accent color for highlights' },
        { name: 'Accent', hex: '#ec4899', usage: 'Use sparingly for special emphasis' },
        { name: 'Neutral', hex: '#64748b', usage: 'Text and subtle elements' }
    ],
    fonts: [
        { type: 'heading', name: 'Inter', fallback: 'sans-serif' },
        { type: 'body', name: 'Roboto', fallback: 'sans-serif' }
    ],
    lastUpdated: '2024-12-10T14:30:00Z'
};
