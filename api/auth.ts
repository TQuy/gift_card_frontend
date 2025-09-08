import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { ApiResponse, UserResponse } from './types';

export async function login(
  $axios: NuxtAxiosInstance,
  { email, password }: { email: string, password: string },
) {
  const response = await $axios.post<ApiResponse<UserResponse>>('/api/auth/login', {
    email,
    password
  })
  return response.data
}

export async function register(
  $axios: NuxtAxiosInstance,
  { email, password }: { email: string, password: string },
) {
  const response = await $axios.post<ApiResponse<UserResponse>>('/api/auth/register', {
    username: email, // use email for username
    email,
    password
  })
  return response.data
}
export async function logout(
  $axios: NuxtAxiosInstance,
) {
  const response = await $axios.post<ApiResponse<null>>('/api/auth/logout')
  return response.data
}