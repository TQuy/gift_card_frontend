<template>
  <v-app>
    <!-- Navigation Bar -->
    <v-app-bar app color="white" elevation="2" height="70">
      <v-container class="d-flex align-center">
        <v-app-bar-title>
          <NuxtLink to="/" class="text-decoration-none">
            <span class="text-h5 font-weight-bold primary--text">
              🎁 Gift Card Platform
            </span>
          </NuxtLink>
        </v-app-bar-title>

        <v-spacer></v-spacer>

        <!-- Desktop Navigation -->
        <v-btn-toggle class="d-none d-md-flex" borderless>
          <v-btn text to="/" exact class="mx-1">
            <v-icon left>mdi-home</v-icon>
            Home
          </v-btn>
          <v-btn text to="/brands" class="mx-1">
            <v-icon left>mdi-store</v-icon>
            Brands
          </v-btn>
          <template>
            <v-btn
              v-if="$store.state.auth.user"
              text
              class="mx-1"
              @click="handleLogout"
            >
              <v-icon left>mdi-logout</v-icon>
              Logout
            </v-btn>
            <v-btn v-else text to="/login" class="mx-1">
              <v-icon left>mdi-login</v-icon>
              Login
            </v-btn>
          </template>
        </v-btn-toggle>

        <!-- Mobile Menu Button -->
        <v-app-bar-nav-icon
          class="d-md-none"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>

    <!-- Mobile Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list>
        <v-list-item to="/" exact @click="drawer = false">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/brands" @click="drawer = false">
          <v-list-item-icon>
            <v-icon>mdi-store</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Brands</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/gift-cards" @click="drawer = false">
          <v-list-item-icon>
            <v-icon>mdi-card-giftcard</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Gift Cards</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <Nuxt />
    </v-main>

    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="snackbar.timeout"
      top
      right
    >
      {{ snackbar.message }}
      <template v-slot:action="{ attrs }">
        <v-btn text v-bind="attrs" @click="snackbar.show = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <!-- Footer -->
    <v-footer color="grey darken-3" dark padless>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" class="text-center">
            <p class="mb-0">© 2025 Gift Card Platform. All rights reserved.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

interface SnackbarData {
  show: boolean;
  message: string;
  color: string;
  timeout: number;
}

export default Vue.extend({
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      snackbar: {
        show: false,
        message: "",
        color: "success",
        timeout: 4000,
      } as SnackbarData,
    };
  },
  mounted() {
    // Listen for snackbar events
    this.$nuxt.$on("show-snackbar", this.showSnackbar);
  },
  beforeDestroy() {
    this.$nuxt.$off("show-snackbar", this.showSnackbar);
  },
  methods: {
    showSnackbar({
      message,
      color = "success",
      timeout = 4000,
    }: {
      message: string;
      color?: string;
      timeout?: number;
    }) {
      this.snackbar = {
        show: true,
        message,
        color,
        timeout,
      };
    },
    handleLogout() {
      // Call the logout action
      this.$store.dispatch("auth/logout");

      // Navigate to login page
      this.$router.push("/login");

      // Show success message
      this.showSnackbar({
        message: "Successfully logged out",
        color: "success",
      });
    },
  },
});
</script>

<style>
.header {
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  padding: 1rem 0;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.nav-link:hover,
.nav-link.nuxt-link-active {
  background: #667eea;
  color: white;
}

.main-content {
  min-height: calc(100vh - 200px);
}

.footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem 0;
  margin-top: 4rem;
}

.footer p {
  margin: 0;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-menu {
    gap: 1rem;
  }

  .nav-brand {
    font-size: 1.2rem;
  }
}
</style>
