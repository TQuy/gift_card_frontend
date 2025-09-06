<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card elevation="12" rounded="lg">
          <v-card-title class="text-h4 font-weight-bold text-center pa-6">
            Create Account
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
                class="mb-2"
                hide-details="auto"
              ></v-text-field>

              <!-- Confirm Password Field -->
              <v-text-field
                v-model="formData.confirmPassword"
                label="Confirm Password"
                placeholder="Confirm your password"
                outlined
                prepend-inner-icon="mdi-lock-check"
                :type="showConfirmPassword ? 'text' : 'password'"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showConfirmPassword = !showConfirmPassword"
                :rules="confirmPasswordRules"
                class="mb-4"
                hide-details="auto"
              ></v-text-field>

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
                Create Account
              </v-btn>

              <!-- Login Link -->
              <div class="text-center">
                <span class="text-body-2">Already have an account?</span>
                <v-btn text color="primary" @click="$router.push('/login')">
                  Sign In
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

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default Vue.extend({
  name: "RegisterPage",
  layout: "default",
  head() {
    return {
      title: "Register - Gift Card Platform",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Create your account on Gift Card Platform",
        },
      ],
    };
  },
  data() {
    return {
      valid: false,
      loading: false,
      showPassword: false,
      showConfirmPassword: false,
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
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
    confirmPasswordRules() {
      return [
        function (v: string) {
          return !!v || "Please confirm your password";
        },
        (v: string) => v === this.formData.password || "Passwords do not match",
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
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // TODO: Replace with actual API call
        console.log("Register form data:", this.formData);

        // Show success message
        this.$nuxt.$emit("show-snackbar", {
          message: "Account created successfully! Please log in.",
          color: "success",
        });

        // Redirect to login page
        await this.$router.push("/login");
      } catch (error) {
        console.error("Registration error:", error);

        this.$nuxt.$emit("show-snackbar", {
          message: "Failed to create account. Please try again.",
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
