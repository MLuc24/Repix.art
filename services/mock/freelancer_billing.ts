
import { ClientCreditSummary, CreditInsight } from '../../roles/freelancer/billing/types';

export const MOCK_CLIENT_CREDITS: ClientCreditSummary[] = [
  {
    id: 'c1',
    name: 'Alice Marketing',
    avatar: 'https://i.pravatar.cc/150?img=9',
    totalProjects: 3,
    totalCredits: 42,
    projects: [
      { id: 'p1', name: 'Summer Campaign', credits: 28, status: 'Approved', lastActive: '2 days ago' },
      { id: 'p2', name: 'Social Assets Q4', credits: 12, status: 'In Review', lastActive: '5 hours ago' },
      { id: 'p3', name: 'Email Headers', credits: 2, status: 'Completed', lastActive: '1 week ago' },
    ]
  },
  {
    id: 'c2',
    name: 'TechStart Inc',
    avatar: 'https://i.pravatar.cc/150?img=11',
    totalProjects: 2,
    totalCredits: 19,
    projects: [
      { id: 'p4', name: 'App Icons', credits: 15, status: 'In Progress', lastActive: 'Yesterday' },
      { id: 'p5', name: 'Pitch Deck BG', credits: 4, status: 'Completed', lastActive: '3 days ago' },
    ]
  },
  {
    id: 'c3',
    name: 'Vogue Daily',
    avatar: 'https://i.pravatar.cc/150?img=5',
    totalProjects: 1,
    totalCredits: 12,
    projects: [
      { id: 'p6', name: 'Editorial Cover', credits: 12, status: 'In Review', lastActive: '1 day ago' },
    ]
  },
  {
    id: 'c4',
    name: 'Cafe Zen',
    avatar: 'https://i.pravatar.cc/150?img=32',
    totalProjects: 4,
    totalCredits: 8,
    projects: [
      { id: 'p7', name: 'Menu Photos', credits: 8, status: 'Approved', lastActive: '2 weeks ago' },
    ]
  }
];

export const MOCK_CREDIT_INSIGHTS: CreditInsight[] = [
  {
    id: 'i1',
    title: 'High Consumption Alert',
    description: 'Alice Marketing uses 35% of your total credits this month.',
    type: 'info'
  },
  {
    id: 'i2',
    title: 'Revision Cost',
    description: 'Projects with >2 rounds consume 40% more credits on average.',
    type: 'warning'
  }
];
