export const BRAND_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0
} as const

export interface Brand {
  id: number;
  name: string;
  logo: string;
  description?: string;
  status: typeof BRAND_STATUS[keyof typeof BRAND_STATUS];
  country: string;
  phoneNumber: string;
  company: string;
  products: number;
}

export interface GiftCard {
  id: number;
  brandId: number;
  denomination: number;
  currency: string;
  discountPercentage?: number;
  isActive: boolean;
}

export interface GiftCardIssue {
  deliveryType: 'personal' | 'send_as_gift';
  senderName: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  deliveryTime: 'immediately' | 'custom';
  deliveryDate?: string;
  period?: 'morning' | 'afternoon' | 'evening';
  message: string;
  amount: number;
  brandId: number;
}

export interface GiftCardIssueResponse {
  id: number;
  giftCardNumber: string;
  status: 'pending' | 'sent' | 'delivered';
  createdAt: string;
}
