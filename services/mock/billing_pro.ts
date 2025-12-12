
import { UsageStat, DailyUsage, ProInsight } from '../../features/billing/types';
import { CreditTransaction } from '../../features/credits-log/types';

export const MOCK_PRO_STATS: UsageStat[] = [
  { id: '1', toolName: 'Image Generator Pro', creditsSpent: 145, percentage: 45, color: 'bg-violet-500' },
  { id: '2', toolName: '4K Export', creditsSpent: 64, percentage: 20, color: 'bg-amber-500' },
  { id: '3', toolName: 'Remix Pro', creditsSpent: 48, percentage: 15, color: 'bg-fuchsia-500' },
  { id: '4', toolName: 'Background Packs', creditsSpent: 32, percentage: 10, color: 'bg-teal-500' },
  { id: '5', toolName: 'Upscale', creditsSpent: 32, percentage: 10, color: 'bg-blue-500' },
];

export const MOCK_DAILY_USAGE: DailyUsage[] = [
  { date: 'Mon', amount: 12 },
  { date: 'Tue', amount: 45 }, // Peak
  { date: 'Wed', amount: 18 },
  { date: 'Thu', amount: 24 },
  { date: 'Fri', amount: 8 },
  { date: 'Sat', amount: 32 },
  { date: 'Sun', amount: 5 },
];

export const MOCK_PRO_INSIGHTS: ProInsight[] = [
  {
    id: 'i1',
    type: 'saving',
    title: 'High Export Costs',
    message: 'You spent 64 credits on single 4K exports. Use Batch Export to save ~20%.',
    actionLabel: 'Try Batch Export',
    actionRoute: 'export'
  }
];

export const MOCK_PRO_TRANSACTIONS: CreditTransaction[] = [
  { id: 't1', type: 'usage', category: 'export_hd', amount: -4, description: 'Batch Export (4 items)', timestamp: new Date().toISOString(), status: 'completed' },
  { id: 't2', type: 'usage', category: 'ai_tools', amount: -3, description: 'Gen: Cyberpunk City', timestamp: new Date(Date.now() - 3600000).toISOString(), status: 'completed' },
  { id: 't3', type: 'purchase', category: 'credits_added', amount: 500, description: 'Auto-Topup', timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'completed' },
  { id: 't4', type: 'usage', category: 'background', amount: -2, description: 'Studio Pack Unlock', timestamp: new Date(Date.now() - 90000000).toISOString(), status: 'completed' },
  { id: 't5', type: 'usage', category: 'avatar', amount: -5, description: 'Avatar Set: Corporate', timestamp: new Date(Date.now() - 120000000).toISOString(), status: 'completed' },
  { id: 't6', type: 'usage', category: 'ai_tools', amount: -3, description: 'Gen: Neon Portrait', timestamp: new Date(Date.now() - 130000000).toISOString(), status: 'completed' },
];
