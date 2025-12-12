
import { ProjectMetric, PerformanceInsight } from '../../roles/freelancer/analytics/types';

export const MOCK_PROJECT_METRICS: ProjectMetric[] = [
  { id: '1', name: 'Summer Campaign', clientName: 'Alice Marketing', completionTime: 2.1, revisions: 2, creditsUsed: 12, date: 'Oct 24' },
  { id: '2', name: 'TechStart Icons', clientName: 'TechStart Inc', completionTime: 1.5, revisions: 0, creditsUsed: 4, date: 'Oct 22' },
  { id: '3', name: 'Vogue Editorial', clientName: 'Vogue Daily', completionTime: 3.4, revisions: 4, creditsUsed: 28, date: 'Oct 15' },
  { id: '4', name: 'Coffee Brand ID', clientName: 'Bean Co.', completionTime: 1.8, revisions: 1, creditsUsed: 8, date: 'Oct 10' },
  { id: '5', name: 'Neon City Poster', clientName: 'Event Horizon', completionTime: 0.8, revisions: 0, creditsUsed: 6, date: 'Oct 08' },
  { id: '6', name: 'Fitness Socials', clientName: 'FitLife', completionTime: 2.5, revisions: 3, creditsUsed: 15, date: 'Oct 05' },
];

export const MOCK_INSIGHTS: PerformanceInsight[] = [
  {
    title: 'Revision Impact',
    description: 'Projects with >3 revisions take 45% longer on average. Try clarifying briefs earlier.',
    type: 'alert'
  },
  {
    title: 'Preset Efficiency',
    description: 'Using "Studio Light" preset reduced your editing time by ~20% this week.',
    type: 'success'
  }
];
