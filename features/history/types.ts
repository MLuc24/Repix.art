
export type HistoryActionType = 'upload' | 'enhance' | 'filter' | 'adjust' | 'crop' | 'remix';

export interface HistoryStep {
  id: string;
  action: HistoryActionType;
  label: string;
  thumbnail: string;
  timestamp: string;
  description?: string; // For tooltips
}
