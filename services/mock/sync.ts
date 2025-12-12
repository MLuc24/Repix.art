
import { SyncSession, SyncConflict, SyncLog } from '../../features/sync/types';

export const MOCK_SYNC_SESSIONS: SyncSession[] = [
  {
    id: 'sess_1',
    name: 'Sony Alpha Raw',
    sourcePath: '/Users/Alex/Pictures/2024_Shoot_01',
    status: 'syncing',
    stats: {
      totalFiles: 450,
      syncedFiles: 125,
      failedFiles: 0,
      lastSyncedAt: 'Just now'
    },
    filters: {
      fileTypes: ['RAW'],
      minSizeMB: 0,
      excludeScreenshots: true,
      dateRange: '30d'
    },
    isPriority: true
  },
  {
    id: 'sess_2',
    name: 'Phone Backup',
    sourcePath: '/Users/Alex/Downloads/AirDrop',
    status: 'paused',
    stats: {
      totalFiles: 120,
      syncedFiles: 80,
      failedFiles: 0,
      lastSyncedAt: '2 hours ago'
    },
    filters: {
      fileTypes: ['JPG', 'HEIC'],
      minSizeMB: 0,
      excludeScreenshots: false,
      dateRange: 'all'
    },
    isPriority: false
  },
  {
    id: 'sess_3',
    name: 'Client Assets: Nike',
    sourcePath: '/Volumes/SSD_Pro/Work/Nike_Campaign',
    status: 'error',
    stats: {
      totalFiles: 85,
      syncedFiles: 82,
      failedFiles: 3,
      lastSyncedAt: 'Yesterday'
    },
    filters: {
      fileTypes: ['PNG', 'PSD'],
      minSizeMB: 10,
      excludeScreenshots: true,
      dateRange: 'all'
    },
    isPriority: false
  }
];

export const MOCK_CONFLICTS: SyncConflict[] = [
  {
    id: 'conf_1',
    filename: 'IMG_8829.JPG',
    local: {
      size: '4.2 MB',
      date: 'Today, 10:42 AM',
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60'
    },
    cloud: {
      size: '3.8 MB',
      date: 'Yesterday, 4:20 PM',
      thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=20' // Lower quality sim
    }
  }
];

export const MOCK_SYNC_LOGS: SyncLog[] = [
  { id: 'l1', sessionId: 'sess_1', timestamp: '10:42:01', message: 'Connected to local folder', type: 'info' },
  { id: 'l2', sessionId: 'sess_1', timestamp: '10:42:05', message: 'Uploaded DSC001.RAW', type: 'success' },
  { id: 'l3', sessionId: 'sess_3', timestamp: 'Yesterday', message: 'Network timeout on heavy asset', type: 'error' },
];
