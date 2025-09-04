<template>
  <div>
    <h3 class="section-title">Delivery time</h3>
    <v-radio-group
      v-model="deliveryTime"
      class="mt-0"
      row
      hide-details
      mandatory
      dense
      :rules="deliveryTimeRules"
      @change="$emit('update:deliveryTime', $event)"
    >
      <v-radio label="Immediately" value="immediately" class="mb-2"></v-radio>
      <v-radio label="Custom" value="custom" class="mb-2"></v-radio>
    </v-radio-group>

    <!-- Delivery Date and Period (only show when Custom is selected) -->
    <div v-if="deliveryTime === 'custom'" class="mt-4">
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
            @input="$emit('update:date-menu', dateMenu)"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="deliveryDate"
                label="Delivery date"
                class="delivery-date-field"
                placeholder="Select delivery date"
                outlined
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="deliveryDateRules"
                hide-details
                @input="$emit('update:deliveryDate', $event)"
              >
                <template v-slot:append>
                  <v-icon color="grey">mdi-calendar</v-icon>
                </template>
              </v-text-field>
            </template>
            <v-date-picker
              v-model="deliveryDate"
              :min="new Date().toISOString().slice(0, 10)"
              @input="dateMenu = false"
            ></v-date-picker>
          </v-menu>
          <p
            v-if="!deliveryDate && deliveryTime === 'custom'"
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
            :value="period"
            mandatory
            :rules="periodRules"
            color="blue"
            @change="$emit('update:period', $event)"
            class="period-buttons"
          >
            <v-btn value="morning" class="px-2">Morning</v-btn>
            <v-btn value="afternoon" class="px-2"> Afternoon </v-btn>
            <v-btn value="evening" class="px-2">Evening</v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

interface DeliveryTimeData {
  dateMenu: boolean;
}

export default Vue.extend({
  name: "DeliveryTimeForm",
  props: {
    deliveryType: {
      type: String as () => "personal" | "send_as_gift",
      required: true,
    },
    deliveryTime: {
      type: String as () => "immediately" | "custom",
      required: true,
    },
    deliveryDate: {
      type: String,
      required: true,
    },
    period: {
      type: String as () => "morning" | "afternoon" | "evening",
      required: true,
      default: "morning",
    },
  },
  data() {
    return {
      dateMenu: false,
    } as DeliveryTimeData;
  },
  computed: {
    deliveryTimeRules() {
      return [(v: string) => !!v || [this.rules.required]];
    },
    deliveryDateRules() {
      return [(v: string) => !!v || [this.rules.required]];
    },
    periodRules() {
      return [(v: string) => !!v || [this.rules.required]];
    },
    rules() {
      return {
        required: (value: string) => !!value || "* This field is required",
      };
    },
  },
});
</script>
