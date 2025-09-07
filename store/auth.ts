import { UserResponse } from "~/api/types"
import { StateStore } from "./types"
import { Action, ActionContext } from "vuex"

// Global state
export const state = () => ({
  user: null
})

// Change state
export const mutations = {
  setUser(state: StateStore, user: UserResponse) {
    state.user = user
    // Persist to localStorage
    if (process.client) {
      localStorage.setItem("user", JSON.stringify(user))
    }
  },
  clearUser(state: StateStore) {
    state.user = null
    // Remove from localStorage
    if (process.client) {
      localStorage.removeItem("user")
    }
  },
  initializeStore(state: StateStore) {
    if (process.client) {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        try {
          state.user = JSON.parse(storedUser)
        }
        catch (error) {
          console.error('Error parsing user from localStorage', error)
          localStorage.removeItem("user")
        }
      }
    }
  }
}
// Optional: actions (good for async stuff)
export const actions = {
  login({ commit }: ActionContext<StateStore, any>, userData: UserResponse) {
    // Normally you'd call API here, for now just save directly
    commit('setUser', userData)
  },
  logout({ commit }: ActionContext<StateStore, any>) {
    commit('clearUser')
  },
  initializeAuth({ commit }: ActionContext<StateStore, any>) {
    commit('initializeStore')
  }
}
