<template>
  <v-container class="py-8">
    <v-row>
      <!-- Brand Details Card (Left Side) -->
      <v-col cols="12" md="4" class="mb-6">
        <v-card class="pa-6" elevation="2" style="border-radius: 12px;">
          <div v-if="brand" class="text-center">
            <!-- Brand Logo and Name -->
            <div class="mb-4">
              <img 
                :src="brand.logo" 
                :alt="brand.name"
                class="brand-logo mx-auto d-block mb-3"
                style="width: 80px; height: 80px; object-fit: contain;"
              />
              <h2 class="text-h5 font-weight-bold text-center mb-2">{{ brand.name }}</h2>
              <v-chip 
                :color="brand.status === 1 ? 'success' : 'error'"
                small
                label
                class="mb-4"
              >
                {{ brand.status === 1 ? 'active' : 'inactive' }}
              </v-chip>
            </div>

            <!-- Brand Details -->
            <div class="brand-details text-left">
              <div class="detail-item mb-3">
                <strong>Country</strong>
                <div class="text--secondary">{{ brand.country }}</div>
              </div>
              
              <div class="detail-item mb-3">
                <strong>Products</strong>
                <div class="text--secondary">{{ brand.products }}</div>
              </div>
              
              <div class="detail-item mb-3">
                <strong>ID</strong>
                <div class="text--secondary">{{ brand.id }}</div>
              </div>
              
              <div class="detail-item mb-3">
                <strong>Company</strong>
                <div class="text--secondary">{{ brand.company }}</div>
              </div>
              
              <div class="detail-item mb-3">
                <strong>Category</strong>
                <div class="text--secondary">Other Gifts</div>
              </div>
              
              <div class="detail-item mb-4">
                <strong>Phone</strong>
                <div class="text--secondary">{{ brand.phoneNumber }}</div>
              </div>
              
              <!-- Keywords/Tags -->
              <div class="detail-item mb-4">
                <strong>Keywords</strong>
                <div class="mt-2">
                  <v-chip
                    small
                    outlined
                    class="ma-1"
                    v-for="keyword in brandKeywords"
                    :key="keyword"
                  >
                    {{ keyword }}
                  </v-chip>
                </div>
              </div>
              
              <!-- Social Media Links -->
              <div class="social-links text-center">
                <v-btn icon small class="mx-1">
                  <v-icon>mdi-web</v-icon>
                </v-btn>
                <v-btn icon small class="mx-1">
                  <v-icon>mdi-facebook</v-icon>
                </v-btn>
                <v-btn icon small class="mx-1">
                  <v-icon>mdi-instagram</v-icon>
                </v-btn>
                <v-btn icon small class="mx-1">
                  <v-icon>mdi-twitter</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          
          <!-- Loading State -->
          <div v-else class="text-center py-8">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
            <p class="mt-4 text--secondary">Loading brand details...</p>
          </div>
        </v-card>
      </v-col>

      <!-- Gift Card Form (Right Side) -->
      <v-col cols="12" md="8">
        <v-card class="pa-6" elevation="2" style="border-radius: 12px;">
          <v-card-title class="text-h4 font-weight-bold mb-6 pa-0">
            Issue Gift Card
          </v-card-title>

          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <!-- 1. Select Gift Amount -->
            <div class="mb-6">
              <h3 class="section-title">Select gift amount</h3>
              <v-btn-toggle
                v-model="selectedAmount"
                mandatory
                class="amount-buttons mb-4"
                style="flex-wrap: wrap;"
              >
                <v-btn 
                  value="10" 
                  outlined 
                  class="ma-1" 
                  style="min-width: 60px;"
                >
                  $10
                </v-btn>
                <v-btn 
                  value="20" 
                  outlined 
                  class="ma-1" 
                  style="min-width: 60px;"
                >
                  $20
                </v-btn>
                <v-btn 
                  value="30" 
                  :color="selectedAmount === '30' ? 'primary' : ''"
                  :outlined="selectedAmount !== '30'"
                  class="ma-1" 
                  style="min-width: 60px;"
                >
                  $30
                </v-btn>
                <v-btn 
                  value="40" 
                  outlined 
                  class="ma-1" 
                  style="min-width: 60px;"
                >
                  $40
                </v-btn>
                <v-btn 
                  value="custom" 
                  :color="selectedAmount === 'custom' ? 'primary' : ''"
                  :outlined="selectedAmount !== 'custom'"
                  class="ma-1" 
                  style="min-width: 80px;"
                >
                  Custom
                </v-btn>
              </v-btn-toggle>
              
              <!-- Custom amount input (only show when Custom is selected) -->
              <div v-if="selectedAmount === 'custom'" class="mt-4">
                <v-text-field
                  v-model="formData.customAmount"
                  label="Enter custom amount"
                  placeholder="Enter custom amount"
                  outlined
                  type="number"
                  min="1"
                  max="1000"
                  :rules="customAmountRules"
                >
                  <template v-slot:prepend-inner>
                    <span class="text--secondary">$</span>
                  </template>
                </v-text-field>
                <p class="error-text">* Please enter gift amount</p>
              </div>
            </div>

            <!-- 2. Delivery Type -->
            <div class="mb-6">
              <h3 class="section-title">Delivery type</h3>
              <v-radio-group v-model="formData.deliveryType" class="mt-0" :rules="deliveryTypeRules">
                <v-radio 
                  label="Personal" 
                  value="personal"
                  class="mb-2"
                ></v-radio>
                <v-radio 
                  label="Send as gift" 
                  value="gift"
                  class="mb-2"
                ></v-radio>
              </v-radio-group>

              <!-- Sender and Recipient Names (only show when "Send as gift" is selected) -->
              <div v-if="formData.deliveryType === 'gift'" class="mt-4">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.senderName"
                      label="Sender name"
                      placeholder="Enter sender name"
                      outlined
                      :rules="senderNameRules"
                      :error-messages="errors.senderName"
                    ></v-text-field>
                    <p v-if="!formData.senderName && formData.deliveryType === 'gift'" class="error-text">* Please enter sender name</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.recipientName"
                      label="Recipient name"
                      placeholder="Enter recipient name"
                      outlined
                      :rules="recipientNameRules"
                      :error-messages="errors.recipientName"
                    ></v-text-field>
                    <p v-if="!formData.recipientName && formData.deliveryType === 'gift'" class="error-text">* Please enter recipient name</p>
                  </v-col>
                </v-row>
              </div>

              <!-- Recipient Email and Phone (always show) -->
              <v-row class="mt-4">
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.recipientEmail"
                    label="Recipient email"
                    placeholder="Enter recipient email"
                    outlined
                    type="email"
                    :rules="emailRules"
                    :error-messages="errors.recipientEmail"
                  ></v-text-field>
                  <p v-if="!isValidEmail(formData.recipientEmail)" class="error-text">* Please enter recipient email</p>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.recipientPhone"
                    label="Recipient phone"
                    placeholder="Enter recipient phone"
                    outlined
                    :rules="phoneRules"
                    :error-messages="errors.recipientPhone"
                  >
                    <template v-slot:prepend-inner>
                      <span class="text--secondary">+65</span>
                    </template>
                  </v-text-field>
                  <p v-if="!isValidPhone(formData.recipientPhone)" class="error-text">* Please enter recipient phone</p>
                </v-col>
              </v-row>
            </div>

            <!-- 3. Delivery Time -->
            <div class="mb-6">
              <h3 class="section-title">Delivery time</h3>
              <v-radio-group v-model="formData.deliveryTime" class="mt-0" :rules="deliveryTimeRules">
                <v-radio 
                  label="Immediately" 
                  value="immediately"
                  class="mb-2"
                ></v-radio>
                <v-radio 
                  label="Custom" 
                  value="custom"
                  class="mb-2"
                ></v-radio>
              </v-radio-group>

              <!-- Delivery Date and Period (only show when Custom is selected) -->
              <div v-if="formData.deliveryTime === 'custom'" class="mt-4">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-menu
                      v-model="dateMenu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formData.deliveryDate"
                          label="Delivery date"
                          placeholder="Select delivery date"
                          outlined
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          :rules="deliveryDateRules"
                          :error-messages="errors.deliveryDate"
                        >
                          <template v-slot:append>
                            <v-icon color="grey">mdi-calendar</v-icon>
                          </template>
                        </v-text-field>
                      </template>
                      <v-date-picker
                        v-model="formData.deliveryDate"
                        @input="dateMenu = false"
                        :min="new Date().toISOString().slice(0, 10)"
                      ></v-date-picker>
                    </v-menu>
                    <p v-if="!formData.deliveryDate && formData.deliveryTime === 'custom'" class="error-text">* Please enter delivery date</p>
                  </v-col>
                  <v-col cols="12" md="6">
                    <p class="text-body-2 mb-3 text--secondary font-weight-medium">Period</p>
                    <v-btn-toggle
                      v-model="formData.period"
                      mandatory
                      class="period-buttons"
                    >
                      <v-btn 
                        value="morning" 
                        outlined 
                        class="px-4"
                      >
                        Morning
                      </v-btn>
                      <v-btn 
                        value="afternoon" 
                        color="primary" 
                        class="px-4"
                      >
                        Afternoon
                      </v-btn>
                      <v-btn 
                        value="evening" 
                        outlined 
                        class="px-4"
                      >
                        Evening
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </div>
            </div>

            <!-- 4. Gift Message -->
            <div class="mb-6">
              <h3 class="section-title">Gift message</h3>
              <v-textarea
                v-model="formData.giftMessage"
                label="Enter gift message"
                placeholder="Enter gift message"
                outlined
                rows="4"
                :rules="giftMessageRules"
                :error-messages="errors.giftMessage"
              ></v-textarea>
              <p v-if="!formData.giftMessage" class="error-text">* Please enter gift message</p>
            </div>

            <!-- Submit Button -->
            <v-row class="mt-6">
              <v-col cols="12" class="text-right">
                <v-btn
                  type="submit"
                  color="primary"
                  large
                  :loading="loading"
                  :disabled="!isFormValid"
                  min-width="120"
                  class="submit-btn"
                  elevation="0"
                >
                  Send
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { GiftCardIssue, Brand } from '~/types'
import { fetchBrandById } from '~/api/brands'

interface FormData {
  deliveryType: 'personal' | 'gift'
  senderName: string
  recipientName: string
  recipientEmail: string
  recipientPhone: string
  deliveryTime: 'immediately' | 'custom'
  deliveryDate: string
  period: 'morning' | 'afternoon' | 'evening'
  giftMessage: string
  customAmount: string
}

interface Errors {
  senderName: string[]
  recipientName: string[]
  recipientEmail: string[]
  recipientPhone: string[]
  deliveryDate: string[]
  giftMessage: string[]
}

export default Vue.extend({
  name: 'IssueGiftCard',
  async asyncData({ params, $axios, error }) {
    try {
      const brandId = parseInt(params.brand_id as string)
      const brand = await fetchBrandById($axios, brandId)
      return { brand }
    } catch (err) {
      console.error('Error fetching brand:', err)
      error({ statusCode: 404, message: 'Brand not found' })
    }
  },
  head() {
    const brandName = (this as any).brand?.name || this.$route.params.brand_id
    return {
      title: `Issue Gift Card - ${brandName} - Gift Card Platform`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Issue a new gift card for your recipient'
        }
      ]
    }
  },
  data() {
    return {
      valid: false,
      loading: false,
      dateMenu: false,
      selectedAmount: '30',
      brand: null as Brand | null,
      formData: {
        deliveryType: 'personal',
        senderName: '',
        recipientName: '',
        recipientEmail: '',
        recipientPhone: '',
        deliveryTime: 'immediately',
        deliveryDate: '',
        period: 'afternoon',
        giftMessage: '',
        customAmount: ''
      } as FormData,
      errors: {
        senderName: [],
        recipientName: [],
        recipientEmail: [],
        recipientPhone: [],
        deliveryDate: [],
        giftMessage: []
      } as Errors,
      rules: {
        required: (value: string) => !!value || 'This field is required',
        email: (value: string) => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return pattern.test(value) || 'Please enter a valid email address'
        },
        phone: (value: string) => {
          const pattern = /^[0-9]{8}$/
          return pattern.test(value) || 'Please enter a valid phone number (8 digits)'
        },
        amount: (value: string) => {
          const num = parseFloat(value)
          return (num > 0 && num <= 1000) || 'Please enter a valid amount between $1 and $1000'
        }
      }
    }
  },
  computed: {
    isFormValid(): boolean {
      // Check if all required fields are filled based on current selections
      const basicValid = this.formData.recipientEmail && this.formData.recipientPhone && this.formData.giftMessage
      const deliveryTypeValid = this.formData.deliveryType === 'personal' || 
                               (this.formData.senderName && this.formData.recipientName)
      const amountValid = this.selectedAmount !== 'custom' || this.formData.customAmount
      const deliveryValid = this.formData.deliveryTime === 'immediately' || this.formData.deliveryDate
      
      return !!(basicValid && deliveryTypeValid && amountValid && deliveryValid && 
             this.isValidEmail(this.formData.recipientEmail) && 
             this.isValidPhone(this.formData.recipientPhone))
    },
    brandKeywords(): string[] {
      if (!this.brand) return []
      // Generate some sample keywords based on brand name
      const brandName = this.brand.name.toLowerCase()
      return [brandName, `${brandName} gift`, `${brandName} voucher`, 'promo code']
    },
    // Form validation rules
    deliveryTypeRules(): ((value: string) => boolean | string)[] {
      return [this.rules.required]
    },
    senderNameRules(): ((value: string) => boolean | string)[] {
      return this.formData.deliveryType === 'gift' ? [this.rules.required] : []
    },
    recipientNameRules(): ((value: string) => boolean | string)[] {
      return this.formData.deliveryType === 'gift' ? [this.rules.required] : []
    },
    emailRules(): ((value: string) => boolean | string)[] {
      return [this.rules.required, this.rules.email]
    },
    phoneRules(): ((value: string) => boolean | string)[] {
      return [this.rules.required, this.rules.phone]
    },
    customAmountRules(): ((value: string) => boolean | string)[] {
      return this.selectedAmount === 'custom' ? [this.rules.required, this.rules.amount] : []
    },
    deliveryTimeRules(): ((value: string) => boolean | string)[] {
      return [this.rules.required]
    },
    deliveryDateRules(): ((value: string) => boolean | string)[] {
      return this.formData.deliveryTime === 'custom' ? [this.rules.required] : []
    },
    giftMessageRules(): ((value: string) => boolean | string)[] {
      return [this.rules.required]
    }
  },
  methods: {
    isValidEmail(email: string): boolean {
      if (!email) return false
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return pattern.test(email)
    },

    isValidPhone(phone: string): boolean {
      if (!phone) return false
      const pattern = /^[0-9]{8}$/
      return pattern.test(phone)
    },
    async submitForm() {
      const form = this.$refs.form as any
      if (!form || !form.validate()) {
        return
      }

      this.loading = true
      this.clearErrors()

      try {
        const giftAmount = this.selectedAmount === 'custom' 
          ? parseFloat(this.formData.customAmount)
          : parseFloat(this.selectedAmount)

        const payload: GiftCardIssue = {
          deliveryType: this.formData.deliveryType,
          senderName: this.formData.senderName,
          recipientName: this.formData.recipientName,
          recipientEmail: this.formData.recipientEmail,
          recipientPhone: this.formData.recipientPhone,
          deliveryTime: this.formData.deliveryTime,
          deliveryDate: this.formData.deliveryTime === 'custom' ? this.formData.deliveryDate : undefined,
          period: this.formData.deliveryTime === 'custom' ? this.formData.period : undefined,
          giftMessage: this.formData.giftMessage,
          amount: giftAmount,
          brandId: parseInt(this.$route.params.brand_id as string)
        }

        // API call to submit the gift card issuance
        const response = await this.$axios.post(`/api/brands/${this.$route.params.brand_id}/issue`, payload)
        
        this.$nuxt.$emit('show-snackbar', {
          message: `Gift card issued successfully! Card number: ${response.data.giftCardNumber}`,
          color: 'success'
        })

        // Redirect to confirmation page or reset form
        await this.$router.push(`/gift-cards/${response.data.id}`)
        
      } catch (err: any) {
        console.error('Error issuing gift card:', err)
        
        // Handle validation errors if they come from the API
        if (err.response?.status === 422) {
          this.handleValidationErrors(err.response.data.errors)
        } else {
          this.$nuxt.$emit('show-snackbar', {
            message: 'Failed to issue gift card. Please try again.',
            color: 'error'
          })
        }
      } finally {
        this.loading = false
      }
    },
    
    resetForm() {
      const form = this.$refs.form as any
      if (form) {
        form.reset()
      }
      this.selectedAmount = '30'
      this.formData = {
        deliveryType: 'personal',
        senderName: '',
        recipientName: '',
        recipientEmail: '',
        recipientPhone: '',
        deliveryTime: 'immediately',
        deliveryDate: '',
        period: 'afternoon',
        giftMessage: '',
        customAmount: ''
      }
    },

    clearErrors() {
      this.errors = {
        senderName: [],
        recipientName: [],
        recipientEmail: [],
        recipientPhone: [],
        deliveryDate: [],
        giftMessage: []
      }
    },

    handleValidationErrors(apiErrors: any) {
      Object.keys(apiErrors).forEach(key => {
        if (this.errors.hasOwnProperty(key)) {
          this.errors[key as keyof Errors] = apiErrors[key]
        }
      })
    }
  }
})
</script>

<style scoped>
.v-btn-toggle .v-btn {
  border: 1px solid #e0e0e0 !important;
  margin: 2px !important;
}

.v-btn-toggle .v-btn.v-btn--active {
  background-color: #1976d2 !important;
  color: white !important;
  border-color: #1976d2 !important;
}

.v-text-field--outlined >>> .v-input__control > .v-input__slot {
  border-radius: 8px !important;
}

.v-textarea--outlined >>> .v-input__control > .v-input__slot {
  border-radius: 8px !important;
}

/* Brand details styling */
.brand-logo {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.brand-details {
  text-align: left;
}

.detail-item {
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item strong {
  display: block;
  color: #333;
  font-weight: 600;
  margin-bottom: 4px;
}

.social-links .v-btn {
  background: #f5f5f5 !important;
  color: #666 !important;
}

.social-links .v-btn:hover {
  background: #1976d2 !important;
  color: white !important;
}

/* Section styling */
.section-title {
  color: #1976d2 !important;
  font-weight: 600 !important;
  margin-bottom: 16px !important;
  font-size: 1.1rem !important;
}

.error-text {
  color: #f44336 !important;
  font-size: 12px !important;
  margin-top: 4px !important;
}

/* Amount button styling */
.amount-buttons .v-btn {
  text-transform: none !important;
  font-weight: 500 !important;
  border-radius: 8px !important;
}

/* Period button styling */
.period-buttons .v-btn {
  text-transform: none !important;
  font-weight: 500 !important;
  border-radius: 8px !important;
  font-size: 14px !important;
}

/* Radio button styling */
.v-input--radio-group .v-radio {
  margin-bottom: 8px;
}

/* Submit button enhancement */
.submit-btn {
  background: linear-gradient(45deg, #1976d2, #1565c0) !important;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3) !important;
  transition: all 0.3s ease !important;
  text-transform: none !important;
  font-weight: 600 !important;
}

.submit-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.4) !important;
}

/* Responsive adjustments */
@media (max-width: 960px) {
  .brand-details {
    text-align: center;
  }
}
</style>