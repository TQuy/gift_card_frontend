import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { GiftCardIssue, GiftCardIssueResponse } from '~/types'

// API Response types
interface ApiResponse<T> {
  data: T
  status: string
  message?: string
}

interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

interface GiftCardListResponse {
  data: GiftCardIssueResponse[]
  pagination: PaginationMeta
  status: string
}

// Gift Card API functions
export async function issueGiftCard(
  $axios: NuxtAxiosInstance,
  giftCardData: GiftCardIssue
): Promise<GiftCardIssueResponse> {
  const response = await $axios.post<ApiResponse<GiftCardIssueResponse>>(
    `/api/brands/${giftCardData.brandId}/issue`,
    giftCardData
  )

  if (response.data.status !== 'success') {
    throw new Error(response.data.message || 'Failed to issue gift card')
  }

  return response.data.data
}

export async function fetchGiftCards(
  $axios: NuxtAxiosInstance,
  params?: {
    page?: number
    limit?: number
    status?: 'pending' | 'sent' | 'delivered'
    brandId?: number
  }
): Promise<GiftCardListResponse> {
  const response = await $axios.get<GiftCardListResponse>('/api/gift-cards', {
    params
  })

  return response.data
}

export async function fetchGiftCardById(
  $axios: NuxtAxiosInstance,
  giftCardId: number
): Promise<GiftCardIssueResponse> {
  const response = await $axios.get<ApiResponse<GiftCardIssueResponse>>(
    `/api/gift-cards/${giftCardId}`
  )

  if (response.data.status !== 'success') {
    throw new Error(response.data.message || 'Gift card not found')
  }

  return response.data.data
}

export async function updateGiftCardStatus(
  $axios: NuxtAxiosInstance,
  giftCardId: number,
  status: 'pending' | 'sent' | 'delivered'
): Promise<GiftCardIssueResponse> {
  const response = await $axios.patch<ApiResponse<GiftCardIssueResponse>>(
    `/api/gift-cards/${giftCardId}/status`,
    { status }
  )

  if (response.data.status !== 'success') {
    throw new Error(response.data.message || 'Failed to update gift card status')
  }

  return response.data.data
}

// Example usage data for reference
export const exampleGiftCardData: GiftCardIssue = {
  amount: 50,
  recipientEmail: "recipient@example.com",
  recipientPhone: "1234567890",
  deliveryType: "send_as_gift",
  deliveryTime: "immediately",
  message: "Happy Birthday!",
  senderName: "John Doe",
  recipientName: "Jane Smith",
  deliveryDate: "2023-12-25",
  period: "morning",
  brandId: 1
}
