<template>
<div class="max-w-sm bg-white rounded-2xl shadow p-6 space-y-4">
  <!-- Logo -->
  <div class="flex justify-center border-b border-gray-200">
    <img 
      :src="brand.logo" 
      alt="Brand Logo" 
      class="object-contain !h-[200px] w-auto" 
    />
  </div>

  <!-- Brand Name & Status -->
  <div class="text-center border-b border-gray-200 pb-4 space-y-2">
    <h2 class="text-lg font-semibold">{{ brand.name }}</h2>
    <span class="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
      active
    </span>
  </div>

    <!-- Country & Products -->
  <div class="grid grid-cols-2 text-sm text-gray-600 text-center border-b border-gray-200">
    <div class="pr-4 border-r border-gray-200">
      <p class="font-medium">Country</p>
      <p>{{brand.country}}</p>
    </div>
    <div class="pl-4">
      <p class="font-medium">Products</p>
      <p>{{ brand.products }}</p>
    </div>
  </div>

  <!-- Other Details -->
<div class="text-sm text-gray-700 space-y-3">
  <div>
    <p class="font-medium text-gray-800">Id:</p>
    <p class="text-gray-600">{{ brand.id }}</p>
  </div>
  <div>
    <p class="font-medium text-gray-800">Company:</p>
    <p class="text-gray-600">{{ brand.company }}</p>
  </div>
  <div>
    <p class="font-medium text-gray-800">Category:</p>
    <p class="text-gray-600">Other Gifts</p>
  </div>
  <div>
    <p class="font-medium text-gray-800">Phone:</p>
    <p class="text-gray-600">{{ brand.phoneNumber }}</p>
  </div>
</div>

  <!-- Keywords -->
  <div class="space-y-2">
    <p class="text-sm font-medium">Keywords</p>
    <div class="flex flex-wrap gap-2">
      <span class="px-2 py-1 text-xs bg-gray-100 rounded-lg">grab</span>
      <span class="px-2 py-1 text-xs bg-gray-100 rounded-lg">grab gift</span>
      <span class="px-2 py-1 text-xs bg-gray-100 rounded-lg">grab voucher</span>
      <span class="px-2 py-1 text-xs bg-gray-100 rounded-lg">promo code</span>
      <span class="px-2 py-1 text-xs bg-gray-100 rounded-lg">+5</span>
    </div>
  </div>

  <!-- Social Links -->
  <div class="flex justify-center gap-4 text-gray-500 pt-2">
    <a href="#"><i class="fab fa-globe"></i></a>
    <a href="#"><i class="fab fa-facebook"></i></a>
    <a href="#"><i class="fab fa-instagram"></i></a>
    <a href="#"><i class="fab fa-twitter"></i></a>
  </div>
</div>
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
  }
});
</script>