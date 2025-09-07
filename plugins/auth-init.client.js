export default function (context) {
  // Initialize auth store from sessionStorage on app startup
  context.store.dispatch('auth/initializeAuth')
}
