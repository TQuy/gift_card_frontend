import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { Store } from 'vuex'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: NuxtAxiosInstance
    $store: Store<any>
  }
}

declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
    store: Store<any>
  }
  interface NuxtAppOptions {
    $axios: NuxtAxiosInstance
    store: Store<any>
  }
}