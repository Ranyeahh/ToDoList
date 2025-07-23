// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    name: localStorage.getItem('name') || '',
  }),

  getters: {
    In: (state) => !!state.token,
  },

  actions: {
    register(token: string, name: string) {
      this.token = token
      this.name = name
      localStorage.setItem('token', token)
      localStorage.setItem('name', name)
    },
    logIn(token: string, name: string) {
      this.token = token
      this.name = name
      localStorage.setItem('token', token)
      localStorage.setItem('name', name)
    },
    logOut() {
      this.token = ''
      this.name = ''
      localStorage.removeItem('token')
      localStorage.removeItem('name')
    },
  },
})
