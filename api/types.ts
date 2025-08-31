import { Brand } from "~/types";

export interface BrandResponse {
  data: Brand[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  status: string;
}


