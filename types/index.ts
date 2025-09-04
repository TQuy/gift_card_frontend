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
  amount: number;
  recipientEmail: string;
  recipientPhone: string;
  deliveryType: 'personal' | 'send_as_gift';
  deliveryTime: 'immediately' | 'custom';
  message: string;
  senderName: string;
  recipientName: string;
  deliveryDate?: string;
  period?: 'morning' | 'afternoon' | 'evening';
  brandId: number;
}

export interface GiftCardIssueResponse {
  id: string;
  brandName: string;
  amount: number;
  activationCode: string;
  recipientEmail: string;
  recipientPhone: string;
  message: string;
  deliveryType: 'personal' | 'send_as_gift';
  deliveryTime: 'immediately' | 'custom';
  issuedAt: string;
  senderName: string;
  recipientName: string;
}
