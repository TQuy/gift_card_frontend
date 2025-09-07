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

export interface ApiResponse<T> {
  data: T
  status: string
  message?: string
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role_id: number;
  roleName: string;
  isAdmin: boolean;
}