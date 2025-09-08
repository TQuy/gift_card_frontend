<template>
  <v-container fluid>
    <!-- Hero Section -->
    <v-row>
      <v-col cols="12">
        <v-card
          class="hero-gradient text-center white--text pa-16 ma-4 rounded-xl"
          elevation="0"
        >
          <v-card-title class="text-h2 font-weight-bold justify-center mb-4">
            Gift Card Platform
          </v-card-title>
          <v-card-subtitle class="text-h5 mb-8 white--text">
            Discover amazing gift cards from your favorite brands
          </v-card-subtitle>
          <div class="d-flex justify-center flex-wrap ga-4">
            <v-btn
              large
              color="white"
              class="primary--text font-weight-bold"
              to="/brands"
              elevation="4"
            >
              <v-icon left>mdi-store</v-icon>
              Browse Brands
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Features Section -->
    <v-row class="my-16">
      <v-col cols="12">
        <h2
          class="text-h3 text-center font-weight-bold mb-12 grey--text text--darken-3"
        >
          Why Choose Our Platform?
        </h2>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
        v-for="feature in features"
        :key="feature.icon"
      >
        <v-card class="text-center pa-8 h-100 hover-lift" elevation="2" hover>
          <div class="text-h1 mb-4">{{ feature.icon }}</div>
          <v-card-title class="text-h5 justify-center mb-4">
            {{ feature.title }}
          </v-card-title>
          <v-card-text class="text-body-1 grey--text text--darken-1">
            {{ feature.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomePage",
  head() {
    return {
      title: "Gift Card Platform - Your One-Stop Shop for Gift Cards",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Find the perfect gift cards from top brands. Instant delivery, secure payments, and great deals.",
        },
      ],
    };
  },
  data() {
    return {
      features: [
        {
          icon: "🎁",
          title: "Wide Selection",
          description: "Choose from hundreds of brands and retailers",
        },
        {
          icon: "💳",
          title: "Instant Delivery",
          description: "Get your gift cards delivered instantly via email",
        },
        {
          icon: "🔒",
          title: "Secure & Safe",
          description: "Your transactions are protected and secure",
        },
        {
          icon: "💰",
          title: "Great Deals",
          description: "Get discounts and special offers on gift cards",
        },
      ],
    };
  },
});
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
}

.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
}

.ga-4 > * {
  margin: 4px;
}
</style>
