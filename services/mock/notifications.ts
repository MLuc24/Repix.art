
export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'alert' | 'update';
  time: string;
  isRead: boolean;
}

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Export Complete',
    message: 'Your project "Cyberpunk City" has been exported in 4K.',
    type: 'success',
    time: '2 mins ago',
    isRead: false
  },
  {
    id: 'n2',
    title: 'New Feature Alert',
    message: 'Try the new "Anime V2" style in the Remix panel!',
    type: 'update',
    time: '1 hour ago',
    isRead: false
  },
  {
    id: 'n3',
    title: 'Credits Low',
    message: 'You have 2 credits remaining. Top up to keep creating.',
    type: 'alert',
    time: '5 hours ago',
    isRead: true
  },
  {
    id: 'n4',
    title: 'Welcome to Repix',
    message: 'Thanks for joining! Start by uploading your first photo.',
    type: 'info',
    time: '1 day ago',
    isRead: true
  }
];
