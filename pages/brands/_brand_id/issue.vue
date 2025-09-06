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

            <div v-if="formData.deliveryType === 'send_as_gift'" class="mb-6">
              <DeliveryTimeForm
                :deliveryType="formData.deliveryType"
                :deliveryTime.sync="formData.deliveryTime"
                :deliveryDate.sync="formData.deliveryDate"
                :period.sync="formData.period"
              />
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
import DeliveryTimeForm from "~/components/DeliveryTimeForm.vue";
import { issueGiftCard } from "~/api/giftCard";

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
    DeliveryTimeForm,
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
    giftMessageRules(): ((value: string) => boolean | string)[] {
      return this.formData.deliveryType === "send_as_gift"
        ? [this.rules.required]
        : [];
    },
  },
  methods: {
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
        const respData = await issueGiftCard(this.$axios, payload);
        this.$nuxt.$emit("show-snackbar", {
          message: `Gift card issued successfully! Card number: ${respData.activationCode}`,
          color: "success",
        });
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
