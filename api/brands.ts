import { Brand } from '~/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { BrandResponse } from './types'

export async function fetchBrands(
  $axios: NuxtAxiosInstance,
  page: number = 1,
  limit: number = 10
) {
  const response = await $axios.get<BrandResponse>('/api/brands', {
    params: { page, limit }
  })
  return {
    brands: response.data.data,
    pagination: response.data.pagination,
    status: response.data.status
  }
}

export async function fetchBrandById($axios: NuxtAxiosInstance, id: number): Promise<Brand> {
  const response = await $axios.get(`/api/brands/${id}`)
  return response.data.data
}
