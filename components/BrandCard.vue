<template>
  <v-card class="brand-card pa-4" elevation="2" height="280">
    <!-- Logo Section -->
    <div class="logo-container d-flex align-center justify-center mb-4">
      <v-img
        :src="brand.logo"
        :alt="`${brand.name} Logo`"
        max-height="80"
        max-width="120"
        contain
      />
    </div>

    <!-- Brand Name -->
    <h3 class="text-center font-weight-bold mb-3 text-h6">
      {{ brand.name }}
    </h3>

    <!-- Status Badge -->
    <div class="d-flex justify-center mb-4">
      <v-chip
        :color="isActive(brand.status) ? 'success' : 'error'"
        text-color="white"
        small
        class="font-weight-bold"
      >
        {{ isActive(brand.status) ? 'Active' : 'Inactive' }}
      </v-chip>
    </div>

    <!-- Info Section -->
    <v-divider class="mb-3" />
    
    <div class="info-section">
      <v-row dense>
        <v-col cols="6" class="text-center">
          <div class="grey--text text-caption">Country</div>
          <div class="font-weight-medium">{{ brand.country }}</div>
        </v-col>
        <v-col cols="6" class="text-center">
          <div class="grey--text text-caption">Products</div>
          <div class="font-weight-medium">{{ brand.products }}</div>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { Brand, BRAND_STATUS } from '~/types'

export default Vue.extend({
  name: 'BrandCard',
  props: {
    brand: {
      type: Object as () => Brand,
      required: true
    }
  },
  methods: {
    isActive(status: number) {
      return status === BRAND_STATUS.ACTIVE
    },
    handleClick() {
      this.$emit('brand-selected', this.brand)
    }
  }
})
</script>

<style scoped>
.brand-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.brand-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.logo-container {
  height: 100px;
  background-color: #fafafa;
  border-radius: 8px;
}

.info-section {
  min-height: 40px;
}
</style>
