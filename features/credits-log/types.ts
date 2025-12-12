
export type TransactionType = 'usage' | 'purchase' | 'refund' | 'bonus';
export type TransactionCategory = 'ai_tools' | 'export_hd' | 'avatar' | 'template' | 'background' | 'credits_added';

export interface CreditTransaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  amount: number; // Positive for add, Negative for usage
  description: string;
  metadata?: string; // e.g. "Project: Summer Vibe" or "Pack: Pro Pack"
  timestamp: string; // ISO string
  status: 'completed' | 'pending' | 'failed';
}

export interface UsageSummaryStats {
  spentThisMonth: number;
  addedThisMonth: number;
  mostUsedCategory: string;
}
