import { defineStore } from 'pinia'
import type { User } from '~/types/user'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value && !!token.value)

  function setUser(u: User, t: string) {
    user.value = u
    token.value = t
  }

  function logout() {
    user.value = null
    token.value = null
  }

  return { user, token, isAuthenticated, setUser, logout }
})
