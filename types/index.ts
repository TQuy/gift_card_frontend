export interface Brand {
  id: number;
  name: string;
  logo: string;
  description?: string;
  isActive: boolean;
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
