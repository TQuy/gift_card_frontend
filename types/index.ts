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
