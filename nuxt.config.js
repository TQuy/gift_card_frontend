export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Server configuration
  server: {
    port: 3000,
    host: "localhost",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Gift Card Platform",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Gift card platform with brand listings",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/auth-init.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    "@nuxt/typescript-build",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/vuetify",
  ],
  // vuetify: {
  //   treeShake: true, // only import used components
  //   defaultAssets: false, // 🚫 don’t inject Roboto + icons
  // },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

  // Enable store
  store: true,
  // Axios module configuration
  axios: {
    baseURL: "http://localhost:8000",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // TypeScript configuration
  typescript: {
    typeCheck: true,
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      // themes: {
      //   light: {
      //     primary: '#667eea',
      //     accent: '#764ba2',
      //     secondary: '#f39c12',
      //     info: '#3498db',
      //     warning: '#f39c12',
      //     error: '#e74c3c',
      //     success: '#27ae60'
      //   }
      // }
    },
  },
}
