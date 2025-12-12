
export interface CreditPack {
  id: string;
  title: string;
  credits: number;
  price: number;
  tag?: string;
  description: string;
  features?: string[];
  isPopular?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  iconType: 'CreditCard' | 'Wallet' | 'Apple' | 'Google';
}

export type PurchaseStatus = 'idle' | 'confirming' | 'processing' | 'success' | 'error';
