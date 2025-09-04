import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { GiftCardIssue, GiftCardIssueResponse } from '~/types'

// API Response types
interface ApiResponse<T> {
  data: T
  status: string
  message?: string
}


// Gift Card API functions
export async function issueGiftCard(
  $axios: NuxtAxiosInstance,
  giftCardData: GiftCardIssue
): Promise<GiftCardIssueResponse> {
  const response = await $axios.post<ApiResponse<GiftCardIssueResponse>>(
    `/api/brands/${giftCardData.brandId}/issues`,
    giftCardData
  )

  return response.data.data
}
