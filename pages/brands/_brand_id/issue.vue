<template>
  <v-container class="py-8">
    <v-row>
      <!-- Brand Details Card (Left Side) -->
      <v-col cols="12" md="4" class="mb-6">
        <BrandDetailCard :brand="brand" />
      </v-col>

      <!-- Gift Card Form (Right Side) -->
      <v-col cols="12" md="8">
        <v-card class="pa-6" elevation="2" style="border-radius: 12px">
          <v-card-title class="text-h4 font-weight-bold mb-6 pa-0">
            Issue Gift Card
          </v-card-title>

          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <!-- 1. Select Gift Amount -->
            <div class="mb-6">
              <GiftAmountSelector
                :selectedAmount.sync="selectedAmount"
                :customAmount.sync="formData.customAmount"
                @amount-changed="onAmountChanged"
                @custom-amount-changed="onCustomAmountChanged"
              />
            </div>

            <!-- 2. Delivery Type and Contact Information -->
            <div class="mb-6">
              <DeliveryContactForm
                :deliveryType.sync="formData.deliveryType"
                :senderName.sync="formData.senderName"
                :recipientName.sync="formData.recipientName"
                :recipientEmail.sync="formData.recipientEmail"
                :recipientPhone.sync="formData.recipientPhone"
              />
            </div>

            <!-- 3. Delivery Time -->
            <div class="mb-6" v-if="formData.deliveryType === 'send_as_gift'">
              <h3 class="section-title">Delivery time</h3>
              <v-radio-group
                v-model="formData.deliveryTime"
                class="mt-0"
                :rules="deliveryTimeRules"
                row
              >
                <v-radio
                  label="Immediately"
                  value="immediately"
                  class="mb-2"
                ></v-radio>
                <v-radio label="Custom" value="custom" class="mb-2"></v-radio>
              </v-radio-group>

              <!-- Delivery Date and Period (only show when Custom is selected) -->
              <div v-if="formData.deliveryTime === 'custom'" class="mt-4">
                <v-row>
                  <v-col cols="12" md="5">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Delivery date
                    </label>
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
                          class="delivery-date-field"
                          hide-details
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
                    <p
                      v-if="
                        !formData.deliveryDate &&
                        formData.deliveryTime === 'custom'
                      "
                      class="text-red-500 text-sm"
                    >
                      * Please enter delivery date
                    </p>
                  </v-col>
                  <v-col cols="12" md="7">
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Period
                    </label>
                    <v-btn-toggle
                      v-model="formData.period"
                      mandatory
                      class="period-buttons"
                    >
                      <v-btn value="morning" outlined class="px-4">
                        Morning
                      </v-btn>
                      <v-btn value="afternoon" color="primary" class="px-4">
                        Afternoon
                      </v-btn>
                      <v-btn value="evening" outlined class="px-4">
                        Evening
                      </v-btn>
                    </v-btn-toggle>
                  </v-col>
                </v-row>
              </div>
            </div>

            <div class="mb-6" v-if="formData.deliveryType === 'send_as_gift'">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Gift message
              </label>
              <v-textarea
                v-model="formData.giftMessage"
                placeholder="Enter gift message"
                outlined
                rows="4"
                hide-details
                dense
              ></v-textarea>
              <p v-if="!formData.giftMessage" class="text-xs text-red-500 mt-1">
                * Please enter gift message
              </p>
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
import Vue from "vue";
import { GiftCardIssue, Brand } from "~/types";
import { fetchBrandById } from "~/api/brands";
import BrandDetailCard from "~/components/BrandDetailCard.vue";
import GiftAmountSelector from "~/components/GiftAmountSelector.vue";
import DeliveryContactForm from "~/components/DeliveryContactForm.vue";

interface FormData {
  deliveryType: "personal" | "send_as_gift";
  senderName: string;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  deliveryTime: "immediately" | "custom";
  deliveryDate: string;
  period: "morning" | "afternoon" | "evening";
  giftMessage: string;
  customAmount: string;
}

interface Errors {
  senderName: string[];
  recipientName: string[];
  recipientEmail: string[];
  recipientPhone: string[];
  deliveryDate: string[];
  giftMessage: string[];
}

export default Vue.extend({
  name: "IssueGiftCard",
  components: {
    BrandDetailCard,
    GiftAmountSelector,
    DeliveryContactForm,
  },
  async asyncData({ params, $axios, error }) {
    try {
      const brandId = parseInt(params.brand_id as string);
      const brand = await fetchBrandById($axios, brandId);
      return { brand };
    } catch (err) {
      console.error("Error fetching brand:", err);
      error({ statusCode: 404, message: "Brand not found" });
    }
  },
  head() {
    const brandName = (this as any).brand?.name || this.$route.params.brand_id;
    return {
      title: `Issue Gift Card - ${brandName} - Gift Card Platform`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Issue a new gift card for your recipient",
        },
      ],
    };
  },
  data() {
    return {
      valid: false,
      loading: false,
      dateMenu: false,
      selectedAmount: 30 as string | number,
      brand: null as Brand | null,
      formData: {
        deliveryType: "personal",
        senderName: "",
        recipientName: "",
        recipientEmail: "",
        recipientPhone: "",
        deliveryTime: "immediately",
        deliveryDate: "",
        period: "afternoon",
        giftMessage: "",
        customAmount: "",
      } as FormData,
      errors: {
        senderName: [],
        recipientName: [],
        recipientEmail: [],
        recipientPhone: [],
        deliveryDate: [],
        giftMessage: [],
      } as Errors,
      rules: {
        required: (value: string) => !!value || "This field is required",
        email: (value: string) => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(value) || "Please enter a valid email address";
        },
        phone: (value: string) => {
          const pattern = /^[0-9]{8}$/;
          return (
            pattern.test(value) ||
            "Please enter a valid phone number (8 digits)"
          );
        },
        amount: (value: string) => {
          const num = parseFloat(value);
          return (
            (num > 0 && num <= 1000) ||
            "Please enter a valid amount between $1 and $1000"
          );
        },
      },
    };
  },
  computed: {
    isFormValid(): boolean {
      // Check if all required fields are filled based on current selections
      const basicValid =
        this.formData.recipientEmail && this.formData.recipientPhone;
      const deliveryTypeValid =
        this.formData.deliveryType === "personal" ||
        (this.formData.senderName && this.formData.recipientName);
      const amountValid =
        typeof this.selectedAmount === "number" || this.formData.customAmount;
      const deliveryValid =
        this.formData.deliveryType === "personal" ||
        this.formData.deliveryTime === "immediately" ||
        this.formData.deliveryDate;
      const giftMessageValid =
        this.formData.deliveryType === "personal" || this.formData.giftMessage;


      return !!(
        basicValid &&
        deliveryTypeValid &&
        amountValid &&
        deliveryValid &&
        giftMessageValid &&
        this.isValidEmail(this.formData.recipientEmail) &&
        this.isValidPhone(this.formData.recipientPhone)
      );
    },
    brandKeywords(): string[] {
      if (!this.brand) return [];
      // Generate some sample keywords based on brand name
      const brandName = this.brand.name.toLowerCase();
      return [
        brandName,
        `${brandName} gift`,
        `${brandName} voucher`,
        "promo code",
      ];
    },
    // Form validation rules
    deliveryTimeRules(): ((value: string) => boolean | string)[] {
      return this.formData.deliveryType === "send_as_gift"
        ? [this.rules.required]
        : [];
    },
    deliveryDateRules(): ((value: string) => boolean | string)[] {
      return this.formData.deliveryType === "send_as_gift" &&
        this.formData.deliveryTime === "custom"
        ? [this.rules.required]
        : [];
    },
    giftMessageRules(): ((value: string) => boolean | string)[] {
      return this.formData.deliveryType === "send_as_gift"
        ? [this.rules.required]
        : [];
    },
  },
  methods: {
    onAmountChanged(newAmount: string | number) {
      this.selectedAmount = newAmount;
    },
    onCustomAmountChanged(newCustomAmount: string) {
      this.formData.customAmount = newCustomAmount;
    },
    isValidEmail(email: string): boolean {
      if (!email) return false;
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return pattern.test(email);
    },

    isValidPhone(phone: string): boolean {
      if (!phone) return false;
      const pattern = /^[0-9]+$/;
      return pattern.test(phone);
    },
    async submitForm() {
      const form = this.$refs.form as any;
      if (!form || !form.validate()) {
        return;
      }

      this.loading = true;
      this.clearErrors();

      try {
        const giftAmount =
          this.selectedAmount === "custom"
            ? parseFloat(this.formData.customAmount)
            : typeof this.selectedAmount === "number"
            ? this.selectedAmount
            : parseFloat(this.selectedAmount);

        const payload: GiftCardIssue = {
          deliveryType: this.formData.deliveryType,
          senderName: this.formData.senderName,
          recipientName: this.formData.recipientName,
          recipientEmail: this.formData.recipientEmail,
          recipientPhone: this.formData.recipientPhone,
          deliveryTime: this.formData.deliveryTime,
          deliveryDate:
            this.formData.deliveryTime === "custom"
              ? this.formData.deliveryDate
              : undefined,
          period:
            this.formData.deliveryTime === "custom"
              ? this.formData.period
              : undefined,
          message: this.formData.giftMessage,
          amount: giftAmount,
          brandId: parseInt(this.$route.params.brand_id as string),
        };

        // API call to submit the gift card issuance
        const response = await this.$axios.post(
          `/api/brands/${this.$route.params.brand_id}/issue`,
          payload
        );

        this.$nuxt.$emit("show-snackbar", {
          message: `Gift card issued successfully! Card number: ${response.data.giftCardNumber}`,
          color: "success",
        });

        // Redirect to confirmation page or reset form
        await this.$router.push(`/gift-cards/${response.data.id}`);
      } catch (err: any) {
        console.error("Error issuing gift card:", err);

        // Handle validation errors if they come from the API
        if (err.response?.status === 422) {
          this.handleValidationErrors(err.response.data.errors);
        } else {
          this.$nuxt.$emit("show-snackbar", {
            message: "Failed to issue gift card. Please try again.",
            color: "error",
          });
        }
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      const form = this.$refs.form as any;
      if (form) {
        form.reset();
      }
      this.selectedAmount = 30;
      this.formData = {
        deliveryType: "personal",
        senderName: "",
        recipientName: "",
        recipientEmail: "",
        recipientPhone: "",
        deliveryTime: "immediately",
        deliveryDate: "",
        period: "afternoon",
        giftMessage: "",
        customAmount: "",
      };
    },

    clearErrors() {
      this.errors = {
        senderName: [],
        recipientName: [],
        recipientEmail: [],
        recipientPhone: [],
        deliveryDate: [],
        giftMessage: [],
      };
    },

    handleValidationErrors(apiErrors: any) {
      Object.keys(apiErrors).forEach((key) => {
        if (this.errors.hasOwnProperty(key)) {
          this.errors[key as keyof Errors] = apiErrors[key];
        }
      });
    },
  },
});
</script>

<!-- <style scoped>
.v-btn-toggle .v-btn {
  border: 1px solid #e0e0e0 !important;
  margin: 2px !important;
}

.v-btn-toggle .v-btn.v-btn--active {
  background-color: #1976d2 !important;
  color: white !important;
  border-color: #1976d2 !important;
}

/* Brand details styling */
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

/* Period button styling */
.period-buttons .v-btn {
  text-transform: none !important;
  font-weight: 500 !important;
  border-radius: 8px !important;
  font-size: 14px !important;
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
</style> -->
