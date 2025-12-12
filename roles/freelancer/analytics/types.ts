
export type TimeRange = '7d' | '30d' | 'all';

export interface PerformanceStat {
  label: string;
  value: string | number;
  unit?: string;
  trend?: string; // e.g. "+12%" or "-0.5 days"
  isPositiveTrend?: boolean;
  iconType: 'check' | 'clock' | 'refresh' | 'bolt';
}

export interface ProjectMetric {
  id: string;
  name: string;
  clientName: string;
  completionTime: number; // in days
  revisions: number;
  creditsUsed: number;
  date: string;
}

export interface PerformanceInsight {
  title: string;
  description: string;
  type: 'tip' | 'alert' | 'success';
}
