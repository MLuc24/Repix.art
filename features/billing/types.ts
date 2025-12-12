
export interface UsageStat {
  id: string;
  toolName: string;
  creditsSpent: number;
  percentage: number;
  color: string; // Tailwind class
}

export interface DailyUsage {
  date: string; // "Mon", "Tue" or "12/24"
  amount: number;
}

export interface ProInsight {
  id: string;
  type: 'saving' | 'tip';
  title: string;
  message: string;
  actionLabel?: string;
  actionRoute?: string;
}
