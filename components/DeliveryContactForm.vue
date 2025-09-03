<template>
  <div>
    <!-- Delivery Type -->
    <div class="mb-6">
      <h3 class="font-semibold">Delivery type</h3>
      <v-radio-group
        :value="deliveryType"
        class="mt-0"
        :rules="deliveryTypeRules"
        row
        @change="$emit('update:deliveryType', $event)"
      >
        <v-radio
          label="Personal"
          value="personal"
          class="mb-2"
        ></v-radio>
        <v-radio
          label="Send as gift"
          value="send_as_gift"
          class="mb-2"
        ></v-radio>
      </v-radio-group>
    </div>

    <!-- Sender and Recipient Names (only show when "Send as gift" is selected) -->
    <div class="mt-4">
      <v-row v-if="deliveryType === 'send_as_gift'">
        <!-- Sender name -->
        <v-col cols="12" md="6">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Sender name
          </label>
          <v-text-field
            :value="senderName"
            placeholder="Enter sender name"
            outlined
            hide-details
            dense
            :rules="senderNameRules"
            @input="$emit('update:senderName', $event)"
          ></v-text-field>
          <p
            v-if="!senderName && deliveryType === 'send_as_gift'"
            class="text-xs text-red-500 mt-1"
          >
            * Please enter sender name
          </p>
        </v-col>

        <!-- Recipient name -->
        <v-col cols="12" md="6">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Recipient name
          </label>
          <v-text-field
            :value="recipientName"
            placeholder="Enter recipient name"
            outlined
            hide-details
            dense
            :rules="recipientNameRules"
            @input="$emit('update:recipientName', $event)"
          ></v-text-field>
          <p
            v-if="!recipientName && deliveryType === 'send_as_gift'"
            class="text-xs text-red-500 mt-1"
          >
            * Please enter recipient name
          </p>
        </v-col>
      </v-row>

      <!-- Recipient Email and Phone (always show) -->
      <v-row class="mt-4">
        <!-- Recipient email -->
        <v-col cols="12" md="6">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Recipient email
          </label>
          <v-text-field
            :value="recipientEmail"
            placeholder="Enter recipient email"
            outlined
            hide-details
            dense
            type="email"
            :rules="emailRules"
            @input="$emit('update:recipientEmail', $event)"
          ></v-text-field>
          <p
            v-if="!isValidEmail(recipientEmail)"
            class="text-xs text-red-500 mt-1"
          >
            * Please enter recipient email
          </p>
        </v-col>

        <!-- Recipient phone -->
        <v-col cols="12" md="6">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Recipient phone
          </label>
          <v-text-field
            :value="recipientPhone"
            placeholder="Enter recipient phone"
            outlined
            hide-details
            dense
            :rules="phoneRules"
            @input="$emit('update:recipientPhone', $event)"
          >
            <template v-slot:prepend-inner>
              <span
                class="text-gray-500 font-medium text-sm mr-2 border-r border-gray-300 pr-2"
              >
                +65
              </span>
            </template>
          </v-text-field>
          <p
            v-if="!isValidPhone(recipientPhone)"
            class="text-xs text-red-500 mt-1"
          >
            * Please enter recipient phone
          </p>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

interface ContactFormData {
  deliveryType: 'personal' | 'send_as_gift'
  senderName: string
  recipientName: string
  recipientEmail: string
  recipientPhone: string
}

export default Vue.extend({
  name: 'DeliveryContactForm',
  props: {
    deliveryType: {
      type: String as () => 'personal' | 'send_as_gift',
      default: 'personal'
    },
    senderName: {
      type: String,
      default: ''
    },
    recipientName: {
      type: String,
      default: ''
    },
    recipientEmail: {
      type: String,
      default: ''
    },
    recipientPhone: {
      type: String,
      default: ''
    }
  },
  computed: {
    deliveryTypeRules(): ((value: string) => boolean | string)[] {
      return this.deliveryType === 'send_as_gift' ? [this.rules.required] : []
    },
    senderNameRules(): ((value: string) => boolean | string)[] {
      return this.deliveryType === 'send_as_gift' ? [this.rules.required] : []
    },
    recipientNameRules(): ((value: string) => boolean | string)[] {
      return this.deliveryType === 'send_as_gift' ? [this.rules.required] : []
    },
    emailRules(): ((value: string) => boolean | string)[] {
      return [this.rules.required, this.rules.email]
    },
    phoneRules(): ((value: string) => boolean | string)[] {
      return [this.rules.required, this.rules.phone]
    },
    rules() {
      return {
        required: (value: string) => !!value || 'This field is required',
        email: (value: string) => {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          return pattern.test(value) || 'Please enter a valid email address'
        },
        phone: (value: string) => {
          const pattern = /^[0-9]+$/
          return pattern.test(value) || 'Please enter a valid phone number (8 digits)'
        }
      }
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
      const pattern = /^[0-9]+$/
      return pattern.test(phone)
    }
  }
})
</script>
