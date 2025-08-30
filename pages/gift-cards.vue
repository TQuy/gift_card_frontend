<template>
  <div class="container">
    <h1 class="page-title">Available Gift Cards</h1>
    
    <div class="filters">
      <div class="filter-group">
        <label for="brand-filter">Filter by Brand:</label>
        <select id="brand-filter" v-model="selectedBrand" @change="filterCards">
          <option value="">All Brands</option>
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">
            {{ brand.name }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="denomination-filter">Filter by Amount:</label>
        <select id="denomination-filter" v-model="selectedDenomination" @change="filterCards">
          <option value="">All Amounts</option>
          <option value="10">$10</option>
          <option value="25">$25</option>
          <option value="50">$50</option>
          <option value="100">$100</option>
        </select>
      </div>
    </div>

    <div class="gift-cards-grid">
      <div
        v-for="card in filteredCards"
        :key="card.id"
        class="gift-card"
        @click="selectCard(card)"
      >
        <div class="card-header">
          <img :src="getBrandLogo(card.brandId)" :alt="getBrandName(card.brandId)" />
        </div>
        <div class="card-body">
          <h3>{{ getBrandName(card.brandId) }}</h3>
          <div class="denomination">${{ card.denomination }}</div>
          <div v-if="card.discountPercentage" class="discount">
            {{ card.discountPercentage }}% OFF
          </div>
          <div class="final-price">
            <span v-if="card.discountPercentage" class="original-price">
              ${{ card.denomination }}
            </span>
            <span class="current-price">
              ${{ getFinalPrice(card) }}
            </span>
          </div>
        </div>
        <div class="card-footer">
          <button class="buy-btn" @click.stop="purchaseCard(card)">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Brand, GiftCard } from '~/types'
import { BRAND_LOGOS } from '~/constants/brands'

interface Data {
  giftCards: GiftCard[]
  brands: Brand[]
  filteredCards: GiftCard[]
  selectedBrand: string
  selectedDenomination: string
}

interface Methods {
  loadData(): void
  filterCards(): void
  getBrandName(brandId: number): string
  getBrandLogo(brandId: number): string
  getFinalPrice(card: GiftCard): number
  selectCard(card: GiftCard): void
  purchaseCard(card: GiftCard): void
}

export default Vue.extend<Data, Methods, {}, {}>({
  name: 'GiftCardsPage',
  head() {
    return {
      title: 'Gift Cards - Gift Card Platform',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Browse and purchase gift cards from top brands with great discounts'
        }
      ]
    }
  },
  data(): Data {
    return {
      giftCards: [],
      brands: [],
      filteredCards: [],
      selectedBrand: '',
      selectedDenomination: ''
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      // Mock brands data
      this.brands = [
        {
          id: 1,
          name: 'Lazada',
          logo: BRAND_LOGOS.lazada,
          description: 'Leading e-commerce platform in Southeast Asia',
          status: 'active' as const,
          country: 'Singapore',
          products: 156
        },
        {
          id: 2,
          name: 'Kaspersky',
          logo: BRAND_LOGOS.kaspersky,
          description: 'Cybersecurity and antivirus software',
          status: 'active' as const,
          country: 'Russia',
          products: 45
        },
        {
          id: 3,
          name: 'Subway',
          logo: BRAND_LOGOS.subway,
          description: 'Fast food restaurant franchise',
          status: 'active' as const,
          country: 'United States',
          products: 89
        },
        {
          id: 4,
          name: 'Grab',
          logo: BRAND_LOGOS.grab,
          description: 'Southeast Asia super app',
          status: 'active' as const,
          country: 'Singapore',
          products: 78
        },
        {
          id: 5,
          name: 'Esprit',
          logo: BRAND_LOGOS.esprit,
          description: 'International fashion brand',
          status: 'inactive' as const,
          country: 'Germany',
          products: 234
        },
        {
          id: 6,
          name: 'Amazon',
          logo: BRAND_LOGOS.amazon,
          description: 'Global e-commerce and cloud computing',
          status: 'active' as const,
          country: 'United States',
          products: 312
        }
      ]

      // Mock gift cards data
      this.giftCards = [
        { id: 1, brandId: 1, denomination: 25, currency: 'USD', discountPercentage: 5, isActive: true },
        { id: 2, brandId: 1, denomination: 50, currency: 'USD', discountPercentage: 10, isActive: true },
        { id: 3, brandId: 2, denomination: 100, currency: 'USD', discountPercentage: 15, isActive: true },
        { id: 4, brandId: 3, denomination: 10, currency: 'USD', isActive: true },
        { id: 5, brandId: 3, denomination: 25, currency: 'USD', discountPercentage: 5, isActive: true },
        { id: 6, brandId: 4, denomination: 50, currency: 'USD', discountPercentage: 8, isActive: true },
        { id: 7, brandId: 5, denomination: 100, currency: 'USD', discountPercentage: 12, isActive: true },
        { id: 8, brandId: 6, denomination: 25, currency: 'USD', discountPercentage: 3, isActive: true },
        { id: 9, brandId: 6, denomination: 100, currency: 'USD', discountPercentage: 7, isActive: true },
        { id: 10, brandId: 4, denomination: 10, currency: 'USD', isActive: true }
      ]

      this.filteredCards = this.giftCards.filter(card => card.isActive)
    },
    filterCards() {
      this.filteredCards = this.giftCards.filter(card => {
        let matchesBrand = true
        let matchesDenomination = true

        if (this.selectedBrand) {
          matchesBrand = card.brandId === parseInt(this.selectedBrand)
        }

        if (this.selectedDenomination) {
          matchesDenomination = card.denomination === parseInt(this.selectedDenomination)
        }

        return card.isActive && matchesBrand && matchesDenomination
      })
    },
    getBrandName(brandId: number): string {
      const brand = this.brands.find(b => b.id === brandId)
      return brand ? brand.name : 'Unknown Brand'
    },
    getBrandLogo(brandId: number): string {
      const brand = this.brands.find(b => b.id === brandId)
      return brand ? brand.logo : ''
    },
    getFinalPrice(card: GiftCard): number {
      if (card.discountPercentage) {
        return card.denomination * (1 - card.discountPercentage / 100)
      }
      return card.denomination
    },
    selectCard(card: GiftCard) {
      console.log('Card selected:', card)
    },
    purchaseCard(card: GiftCard) {
      alert(`Purchasing ${this.getBrandName(card.brandId)} gift card for $${this.getFinalPrice(card)}`)
      // Here you would implement the actual purchase logic
    }
  }
})
</script>

<style scoped>
.filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #333;
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

.gift-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.gift-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.gift-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.card-header {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 1rem;
}

.card-header img {
  max-width: 100%;
  max-height: 80px;
  object-fit: contain;
}

.card-body {
  padding: 1.5rem;
}

.card-body h3 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #333;
}

.denomination {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.discount {
  display: inline-block;
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.final-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.original-price {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9rem;
}

.current-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60;
}

.card-footer {
  padding: 0 1.5rem 1.5rem;
}

.buy-btn {
  width: 100%;
  padding: 0.75rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-btn:hover {
  background: #5a67d8;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 1rem;
  }
  
  .gift-cards-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>
