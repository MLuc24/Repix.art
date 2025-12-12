
export type SyncStatus = 'idle' | 'syncing' | 'paused' | 'error' | 'completed';

export interface SyncFilters {
  fileTypes: string[]; // ['RAW', 'JPG', 'PNG']
  minSizeMB: number;
  excludeScreenshots: boolean;
  dateRange: 'all' | '7d' | '30d';
}

export interface SyncStats {
  totalFiles: number;
  syncedFiles: number;
  failedFiles: number;
  lastSyncedAt: string;
}

export interface SyncSession {
  id: string;
  name: string;
  sourcePath: string;
  status: SyncStatus;
  stats: SyncStats;
  filters: SyncFilters;
  isPriority: boolean; // Monetization hook
}

export interface SyncConflict {
  id: string;
  filename: string;
  local: {
    size: string;
    date: string;
    thumbnail: string;
  };
  cloud: {
    size: string;
    date: string;
    thumbnail: string;
  };
}

export interface SyncLog {
  id: string;
  sessionId: string;
  timestamp: string;
  message: string;
  type: 'info' | 'error' | 'success';
}
