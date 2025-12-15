
export interface CreditTransaction {
    id: string;
    userId: string;
    userName: string;
    userAvatar: string;
    action: 'generate' | 'remix' | 'export-hd' | 'apply-preset' | 'background';
    credits: number;
    timestamp: string;
    details?: string;
}

export interface MemberUsage {
    userId: string;
    userName: string;
    userAvatar: string;
    creditsUsed: number;
    percentage: number;
    topAction: string;
}

export interface UsageSummary {
    totalCreditsUsed: number;
    avgCreditsPerDay: number;
    mostUsedTool: string;
    topUser: string;
    topUserCredits: number;
}

// Mock Credit Transactions (Last 30 days)
export const MOCK_CREDIT_TRANSACTIONS: CreditTransaction[] = [
    {
        id: 'tx1',
        userId: 'tm1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://i.pravatar.cc/100?img=1',
        action: 'generate',
        credits: 15,
        timestamp: '2024-12-15T10:30:00Z',
        details: 'AI Image Generation - High Quality'
    },
    {
        id: 'tx2',
        userId: 'tm2',
        userName: 'Mike Rodriguez',
        userAvatar: 'https://i.pravatar.cc/100?img=12',
        action: 'export-hd',
        credits: 10,
        timestamp: '2024-12-15T09:15:00Z',
        details: '4K Export - Product_Hero.png'
    },
    {
        id: 'tx3',
        userId: 'tm3',
        userName: 'Emily Chen',
        userAvatar: 'https://i.pravatar.cc/100?img=5',
        action: 'remix',
        credits: 12,
        timestamp: '2024-12-15T08:45:00Z',
        details: 'Style Transfer - Cyberpunk'
    },
    {
        id: 'tx4',
        userId: 'tm1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://i.pravatar.cc/100?img=1',
        action: 'apply-preset',
        credits: 5,
        timestamp: '2024-12-14T16:20:00Z',
        details: 'Preset: Professional Portrait'
    },
    {
        id: 'tx5',
        userId: 'tm2',
        userName: 'Mike Rodriguez',
        userAvatar: 'https://i.pravatar.cc/100?img=12',
        action: 'background',
        credits: 8,
        timestamp: '2024-12-14T14:10:00Z',
        details: 'AI Background Removal'
    },
    {
        id: 'tx6',
        userId: 'tm3',
        userName: 'Emily Chen',
        userAvatar: 'https://i.pravatar.cc/100?img=5',
        action: 'generate',
        credits: 15,
        timestamp: '2024-12-14T11:30:00Z',
        details: 'AI Image Generation - Standard'
    },
    {
        id: 'tx7',
        userId: 'tm4',
        userName: 'Alex Turner',
        userAvatar: 'https://i.pravatar.cc/100?img=8',
        action: 'export-hd',
        credits: 10,
        timestamp: '2024-12-13T15:45:00Z',
        details: '4K Export - Campaign_Banner.png'
    },
    {
        id: 'tx8',
        userId: 'tm1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://i.pravatar.cc/100?img=1',
        action: 'remix',
        credits: 12,
        timestamp: '2024-12-13T10:20:00Z',
        details: 'Style Transfer - Oil Painting'
    }
];

// Mock Member Usage Summary
export const MOCK_MEMBER_USAGE: MemberUsage[] = [
    {
        userId: 'tm1',
        userName: 'Sarah Johnson',
        userAvatar: 'https://i.pravatar.cc/100?img=1',
        creditsUsed: 120,
        percentage: 40,
        topAction: 'Generate'
    },
    {
        userId: 'tm2',
        userName: 'Mike Rodriguez',
        userAvatar: 'https://i.pravatar.cc/100?img=12',
        creditsUsed: 80,
        percentage: 26,
        topAction: 'Export HD'
    },
    {
        userId: 'tm3',
        userName: 'Emily Chen',
        userAvatar: 'https://i.pravatar.cc/100?img=5',
        creditsUsed: 60,
        percentage: 20,
        topAction: 'Remix'
    },
    {
        userId: 'tm4',
        userName: 'Alex Turner',
        userAvatar: 'https://i.pravatar.cc/100?img=8',
        creditsUsed: 40,
        percentage: 14,
        topAction: 'Export HD'
    }
];

// Mock Usage Summary
export const MOCK_USAGE_SUMMARY: UsageSummary = {
    totalCreditsUsed: 300,
    avgCreditsPerDay: 10,
    mostUsedTool: 'AI Generation',
    topUser: 'Sarah Johnson',
    topUserCredits: 120
};

// Action Labels
export const ACTION_LABELS: Record<CreditTransaction['action'], { label: string; color: string; icon: string }> = {
    'generate': { label: 'AI Generate', color: 'from-violet-500 to-purple-500', icon: 'Sparkles' },
    'remix': { label: 'AI Remix', color: 'from-fuchsia-500 to-pink-500', icon: 'Wand' },
    'export-hd': { label: 'Export HD', color: 'from-blue-500 to-cyan-500', icon: 'Download' },
    'apply-preset': { label: 'Apply Preset', color: 'from-emerald-500 to-teal-500', icon: 'Sliders' },
    'background': { label: 'Background', color: 'from-orange-500 to-amber-500', icon: 'Image' }
};
