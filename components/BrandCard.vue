<template>
  <div class="brand-card" @click="handleClick">
    <img :src="brand.logo" :alt="`${brand.name} Logo`" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Brand } from '~/types'

interface Data {}

interface Methods {
  handleClick(): void
}

interface Computed {}

interface Props {
  brand: Brand
}

export default Vue.extend<Data, Methods, Computed, Props>({
  name: 'BrandCard',
  props: {
    brand: {
      type: Object as () => Brand,
      required: true
    }
  },
  methods: {
    handleClick() {
      // Navigate to brand details or emit event
      this.$emit('brand-selected', this.brand)
    }
  }
})
</script>

<style scoped>
.brand-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  transition: transform 0.2s;
  cursor: pointer;
}

.brand-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.brand-card img {
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
}
</style>
