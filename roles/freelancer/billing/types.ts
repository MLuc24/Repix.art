
export type TimeRange = '7d' | '30d' | 'all';

export interface ProjectCreditDetails {
  id: string;
  name: string;
  credits: number;
  status: 'In Progress' | 'In Review' | 'Approved' | 'Completed';
  lastActive: string;
}

export interface ClientCreditSummary {
  id: string;
  name: string;
  avatar: string;
  totalProjects: number;
  totalCredits: number;
  projects: ProjectCreditDetails[];
}

export interface CreditInsight {
  id: string;
  title: string;
  description: string;
  type: 'warning' | 'info' | 'positive';
}
