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
        v-for="brand in paginatedBrands"
        :key="brand.id"
        cols="6"
        sm="6"
        md="3"
        lg="3"
      >
        <BrandCard :brand="brand" />
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row class="mt-8">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <!-- Results counter -->
        <div class="grey--text">
          {{ startIndex + 1 }}-{{ endIndex }} of {{ totalBrands }} results
        </div>
        
        <!-- Pagination -->
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="7"
          circle
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Brand } from '~/types'
import { BRAND_LOGOS } from '~/constants/brands'

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
  data() {
    return {
      brands: [] as Brand[],
      currentPage: 1,
      itemsPerPage: 8
    }
  },
  computed: {
    paginatedBrands(): Brand[] {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.brands.slice(start, end)
    },
    totalPages(): number {
      return Math.ceil(this.brands.length / this.itemsPerPage)
    },
    totalBrands(): number {
      return this.brands.length
    },
    startIndex(): number {
      return (this.currentPage - 1) * this.itemsPerPage
    },
    endIndex(): number {
      const end = this.currentPage * this.itemsPerPage
      return Math.min(end, this.totalBrands)
    }
  },
  mounted() {
    this.loadBrands()
  },
  methods: {
    loadBrands() {
      // Mock data matching your design
      this.brands = [
        {
          id: 1,
          name: 'Grab',
          logo: BRAND_LOGOS.grab,
          description: 'Ride-hailing and delivery service',
          status: 'active' as const,
          country: 'Singapore',
          products: 250
        },
        {
          id: 2,
          name: 'Amazon',
          logo: BRAND_LOGOS.amazon,
          description: 'E-commerce and cloud computing',
          status: 'inactive' as const,
          country: 'Singapore',
          products: 400
        },
        {
          id: 3,
          name: 'Esprit',
          logo: BRAND_LOGOS.esprit,
          description: 'Fashion and lifestyle brand',
          status: 'active' as const,
          country: 'Singapore',
          products: 250
        },
        {
          id: 4,
          name: 'Grab',
          logo: BRAND_LOGOS.grab,
          description: 'Ride-hailing and delivery service',
          status: 'active' as const,
          country: 'Singapore',
          products: 250
        },
        {
          id: 5,
          name: 'Lazada',
          logo: BRAND_LOGOS.lazada,
          description: 'Online shopping platform',
          status: 'active' as const,
          country: 'Singapore',
          products: 300
        },
        {
          id: 6,
          name: 'Subway',
          logo: BRAND_LOGOS.subway,
          description: 'Fast food restaurant',
          status: 'inactive' as const,
          country: 'Singapore',
          products: 100
        },
        {
          id: 7,
          name: 'Kaspersky Lab',
          logo: BRAND_LOGOS.kaspersky,
          description: 'Cybersecurity solutions',
          status: 'active' as const,
          country: 'Singapore',
          products: 30
        },
        {
          id: 8,
          name: 'Lazada',
          logo: BRAND_LOGOS.lazada,
          description: 'Online shopping platform',
          status: 'active' as const,
          country: 'Singapore',
          products: 300
        },
        {
          id: 9,
          name: 'Netflix',
          logo: BRAND_LOGOS.netflix,
          description: 'Streaming service',
          status: 'active' as const,
          country: 'Singapore',
          products: 50
        },
        {
          id: 10,
          name: 'Spotify',
          logo: BRAND_LOGOS.spotify,
          description: 'Music streaming',
          status: 'inactive' as const,
          country: 'Singapore',
          products: 25
        }
      ]
    }
  }
})
</script>

<style scoped>
.v-pagination {
  justify-content: center;
}
</style>
