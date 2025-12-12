
import { CreditTransaction, UsageSummaryStats } from '../../features/credits-log/types';

const TODAY = new Date().toISOString();
const YESTERDAY = new Date(Date.now() - 86400000).toISOString();
const TWO_DAYS_AGO = new Date(Date.now() - 172800000).toISOString();
const LAST_WEEK = new Date(Date.now() - 604800000).toISOString();

export const MOCK_SUMMARY_STATS: UsageSummaryStats = {
  spentThisMonth: 42,
  addedThisMonth: 100,
  mostUsedCategory: 'Avatar Generator'
};

export const MOCK_TRANSACTIONS: CreditTransaction[] = [
  {
    id: 'tx_1',
    type: 'usage',
    category: 'export_hd',
    amount: -1,
    description: 'HD Export (4x)',
    metadata: 'Project: Cyberpunk City',
    timestamp: TODAY,
    status: 'completed'
  },
  {
    id: 'tx_2',
    type: 'usage',
    category: 'avatar',
    amount: -3,
    description: 'Avatar Pack Generation',
    metadata: 'Style: Anime Dream',
    timestamp: TODAY,
    status: 'completed'
  },
  {
    id: 'tx_3',
    type: 'purchase',
    category: 'credits_added',
    amount: 100,
    description: 'Purchased Pro Pack',
    metadata: 'Visa •••• 4242',
    timestamp: YESTERDAY,
    status: 'completed'
  },
  {
    id: 'tx_4',
    type: 'usage',
    category: 'template',
    amount: -1,
    description: 'Unlocked Premium Template',
    metadata: 'Template: Neon Story',
    timestamp: YESTERDAY,
    status: 'completed'
  },
  {
    id: 'tx_5',
    type: 'usage',
    category: 'ai_tools',
    amount: -1,
    description: 'Pro Enhance',
    metadata: 'Project: Family Portrait',
    timestamp: TWO_DAYS_AGO,
    status: 'completed'
  },
  {
    id: 'tx_6',
    type: 'usage',
    category: 'background',
    amount: -3,
    description: 'Unlocked Background Pack',
    metadata: 'Pack: Studio Soft Light',
    timestamp: LAST_WEEK,
    status: 'completed'
  },
  {
    id: 'tx_7',
    type: 'bonus',
    category: 'credits_added',
    amount: 5,
    description: 'Welcome Bonus',
    metadata: 'System',
    timestamp: LAST_WEEK,
    status: 'completed'
  }
];
