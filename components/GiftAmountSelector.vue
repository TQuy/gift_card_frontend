<template>
  <div>
    <h3 class="font-semibold">Select gift amount</h3>
    <v-btn-toggle
      v-model="internalSelectedAmount"
      mandatory
      class="amount-buttons mb-4"
      style="flex-wrap: wrap"
      @change="onAmountChange"
    >
      <v-btn
        v-for="option in amountOptions"
        :key="option.value"
        :value="option.value"
        outlined
        class="ma-1"
      >
        {{ option.label }}
      </v-btn>
    </v-btn-toggle>

    <!-- Custom amount input (only show when Custom is selected) -->
    <div v-if="internalSelectedAmount === 'custom'" class="mt-4">
      <v-text-field
        v-model="internalCustomAmount"
        label="Enter custom amount"
        placeholder="Enter custom amount"
        outlined
        type="number"
        min="1"
        max="1000"
        hide-details
        :rules="customAmountRules"
        @input="onCustomAmountChange"
      >
        <template v-slot:prepend-inner>
          <div
            class="flex items-center h-full px-3 border-r border-gray-300 text-gray-500 text-sm"
          >
            $
          </div>
        </template>
      </v-text-field>
      <p v-if="!internalCustomAmount" class="error-text text-red-500">
        * Please enter gift amount
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GiftAmountSelector",
  props: {
    selectedAmount: {
      type: [String, Number],
      default: 30,
    },
    customAmount: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      internalSelectedAmount: this.selectedAmount,
      internalCustomAmount: this.customAmount,
      amountOptions: [
        { value: 10, label: "$10", minWidth: "60px" },
        { value: 20, label: "$20", minWidth: "60px" },
        { value: 30, label: "$30", minWidth: "60px" },
        { value: 40, label: "$40", minWidth: "60px" },
        { value: "custom", label: "Custom", minWidth: "80px" },
      ],
    };
  },
  computed: {
    customAmountRules(): ((value: string) => boolean | string)[] {
      const rules = {
        required: (value: string) => !!value || "This field is required",
        amount: (value: string) => {
          const num = parseFloat(value);
          return (
            (num > 0 && num <= 1000) ||
            "Please enter a valid amount between $1 and $1000"
          );
        },
      };
      return this.internalSelectedAmount === "custom"
        ? [rules.required, rules.amount]
        : [];
    },
  },
  watch: {
    selectedAmount(newVal) {
      this.internalSelectedAmount = newVal;
    },
    customAmount(newVal) {
      this.internalCustomAmount = newVal;
    },
  },
  methods: {
    onAmountChange() {
      this.$emit("update:selectedAmount", this.internalSelectedAmount);
      this.$emit("amount-changed", this.internalSelectedAmount);
    },
    onCustomAmountChange() {
      this.$emit("update:customAmount", this.internalCustomAmount);
      this.$emit("custom-amount-changed", this.internalCustomAmount);
    },
  },
});
</script>
