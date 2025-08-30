export interface Brand {
  id: number;
  name: string;
  logo: string;
  description?: string;
  website?: string;
}

export interface GiftCard {
  id: number;
  brandId: number;
  denomination: number;
  currency: string;
  discountPercentage?: number;
  isActive: boolean;
}
