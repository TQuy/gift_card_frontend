<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="12" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold text-center pa-6">
            Welcome Back
          </v-card-title>

          <v-card-text class="px-6 pb-6">
            <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
              <!-- Email Field -->
              <v-text-field
                v-model="formData.email"
                label="Email"
                placeholder="Enter your email"
                outlined
                prepend-inner-icon="mdi-email"
                type="email"
                :rules="emailRules"
                class="mb-2"
                hide-details="auto"
              ></v-text-field>

              <!-- Password Field -->
              <v-text-field
                v-model="formData.password"
                label="Password"
                placeholder="Enter your password"
                outlined
                prepend-inner-icon="mdi-lock"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :rules="passwordRules"
                class="mb-4"
                hide-details="auto"
              ></v-text-field>

              <!-- Remember Me & Forgot Password -->
              <div class="d-flex justify-space-between align-center mb-4">
                <v-checkbox
                  v-model="rememberMe"
                  label="Remember me"
                  class="ma-0 pa-0"
                  hide-details
                ></v-checkbox>
                <v-btn text color="primary" small> Forgot password? </v-btn>
              </div>

              <!-- Submit Button -->
              <v-btn
                type="submit"
                color="primary"
                large
                block
                :loading="loading"
                :disabled="!valid"
                class="font-weight-bold mb-4"
                rounded
              >
                Sign In
              </v-btn>

              <!-- Register Link -->
              <div class="text-center">
                <span class="text-body-2">Don't have an account?</span>
                <v-btn text color="primary" @click="$router.push('/register')">
                  Create Account
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { login } from "~/api/auth";

interface FormData {
  email: string;
  password: string;
}

export default Vue.extend({
  name: "LoginPage",
  layout: "default",
  head() {
    return {
      title: "Login - Gift Card Platform",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Sign in to your Gift Card Platform account",
        },
      ],
    };
  },
  data() {
    return {
      valid: false,
      loading: false,
      showPassword: false,
      rememberMe: false,
      formData: {
        email: "",
        password: "",
      } as FormData,
    };
  },
  computed: {
    emailRules() {
      return [
        function (v: string) {
          return !!v || "Email is required";
        },
        function (v: string) {
          const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return pattern.test(v) || "Please enter a valid email address";
        },
      ];
    },
    passwordRules() {
      return [
        function (v: string) {
          return !!v || "Password is required";
        },
      ];
    },
  },
  methods: {
    async submitForm() {
      const form = this.$refs.form as any;
      if (!form || !form.validate()) {
        return;
      }

      this.loading = true;

      try {
        // Call login API
        const response = await login(this.$axios, {
          email: this.formData.email,
          password: this.formData.password,
        });

        // Use the store action instead of direct commit
        await this.$store.dispatch("auth/login", response.data);

        // Show success message
        this.$nuxt.$emit("show-snackbar", {
          message: "Login successful! Welcome back.",
          color: "success",
        });

        // Redirect to home page
        await this.$router.push("/");
      } catch (error) {
        console.error("Login error:", error);

        this.$nuxt.$emit("show-snackbar", {
          message: "Invalid email or password. Please try again.",
          color: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
/* No custom CSS - using only Vuetify classes */
</style>
