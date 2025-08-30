<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 text-center font-weight-bold mb-8 grey--text text--darken-3">
          Our Brands
        </h1>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col 
        v-for="brand in brands"
        :key="brand.id"
        cols="6"
        sm="4" 
        md="3"
        lg="2"
      >
        <v-card 
          class="brand-card text-center pa-4 hover-lift"
          height="120"
          hover
          @click="onBrandSelected(brand)"
        >
          <v-card-text class="d-flex align-center justify-center h-100">
            <v-img
              :src="brand.logo"
              :alt="`${brand.name} Logo`"
              max-height="60"
              contain
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { Brand } from '~/types'

interface Data {
  brands: Brand[]
}

interface Methods {
  onBrandSelected(brand: Brand): void
  loadBrands(): void
}

interface Computed {}

interface Props {}

export default Vue.extend<Data, Methods, Computed, Props>({
  name: 'BrandsPage',
  head() {
    return {
      title: 'Our Brands - Gift Card Platform',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Browse our wide selection of brand gift cards'
        }
      ]
    }
  },
  data(): Data {
    return {
      brands: []
    }
  },
  mounted() {
    this.loadBrands()
  },
  methods: {
    onBrandSelected(brand: Brand) {
      console.log('Brand selected:', brand)
      // You can navigate to brand details page or show more info
      // this.$router.push(`/brands/${brand.id}`)
    },
    loadBrands() {
      // Mock data - in real app, this would come from API
      this.brands = [
        {
          id: 1,
          name: 'Lazada',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Lazada_%282019%29.svg',
          description: 'Online shopping platform'
        },
        {
          id: 2,
          name: 'Kaspersky',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Kaspersky_logo.svg',
          description: 'Cybersecurity solutions'
        },
        {
          id: 3,
          name: 'Subway',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Subway_2016_logo.svg',
          description: 'Fast food restaurant'
        },
        {
          id: 4,
          name: 'Grab',
          logo: 'https://upload.wikimedia.org/wikipedia/en/1/12/Grab_%28application%29_logo.svg',
          description: 'Ride-hailing and delivery service'
        },
        {
          id: 5,
          name: 'Esprit',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Esprit.svg',
          description: 'Fashion and lifestyle brand'
        },
        {
          id: 6,
          name: 'Amazon',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
          description: 'E-commerce and cloud computing'
        }
      ]
    }
  }
})
</script>

<style scoped>
.brand-card {
  transition: transform 0.3s ease;
  cursor: pointer;
}

.hover-lift:hover {
  transform: translateY(-5px);
}
</style>
