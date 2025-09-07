import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { GiftCardIssue, GiftCardIssueResponse } from '~/types'
import { ApiResponse } from './types'


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
