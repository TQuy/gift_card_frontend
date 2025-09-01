<template>
  <v-container class="py-8">
    <!-- Page Title -->
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold mb-8 grey--text text--darken-3">
          Brands
        </h1>
      </v-col>
    </v-row>

    <!-- Brand Grid -->
    <v-row>
      <v-col
        v-for="brand in brands"
        :key="brand.id"
        cols="6"
        sm="6"
        md="3"
        lg="3"
      >
        <nuxt-link :to="`/brands/${brand.id}/issue`">
          <BrandCard :brand="brand" />
        </nuxt-link>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row class="mt-8">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <!-- Pagination -->
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          circle
        />

        <!-- Results counter -->
        <div class="grey--text">
          {{ startIndex + 1 }}-{{ endIndex }} of {{ totalBrands }} results
        </div>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Brand } from '~/types'
import { fetchBrands } from '~/api/brands'

const ITEMS_PER_PAGE = 8

export default Vue.extend({
  name: 'BrandsPage',
  head() {
    return {
      title: 'Brands - Gift Card Platform',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Browse our wide selection of brand gift cards'
        }
      ]
    }
  },
  watchQuery: ['page', 'limit'],
  async asyncData({ $axios, query }) {
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || ITEMS_PER_PAGE
    try {
      const { brands, pagination } = await fetchBrands(
        $axios,
        page,
        limit
      )
      return {
        brands,
        currentPage: pagination.page,
        itemsPerPage: pagination.limit,
        totalBrands: pagination.total,
        totalPages: pagination.totalPages
      }
    } catch (e) {
      return { 
        currentPage: page, 
        brands: [], 
        itemsPerPage: ITEMS_PER_PAGE, 
        totalBrands: 0, 
        totalPages: 0 
      }
    }
  },
  data() {
    return {
      brands: [] as Brand[],
      currentPage: 1,
      itemsPerPage: ITEMS_PER_PAGE,
      totalBrands: 0
    }
  },
  methods: {
    updateQueryParams(page: number, limit: number) {
      this.$router.push({
        path: this.$route.path,
        query: {
          ...this.$route.query,
          page: page.toString(),
          limit: limit.toString()
        }
      })
    }
  },
  watch: {
    currentPage(newPage) {
      this.updateQueryParams(newPage, this.itemsPerPage)
    },
    itemsPerPage(newLimit) {
      this.updateQueryParams(this.currentPage, newLimit)
    }
  },
  computed: {
        startIndex(): number {
      return (this.currentPage - 1) * this.itemsPerPage
    },
    endIndex(): number {
      const end = this.currentPage * this.itemsPerPage
      return Math.min(end, this.totalBrands)
    }
  }
})
</script>
