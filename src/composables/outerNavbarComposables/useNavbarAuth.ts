import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

export function useNavbarAuth() {
  const authStore = useAuthStore()
  const { isAuthenticated, userInitials, user, loading } = storeToRefs(authStore)

  // -------------------------------
  // On mount, restore session if user exists
  // -------------------------------
  onMounted(() => {
    const storedUser = sessionStorage.getItem('auth_user')
    if (storedUser) {
      const parsed = JSON.parse(storedUser)
      if (parsed && parsed.email_confirmed) {
        authStore.setUser(parsed)
      } else {
        authStore.clearUser()
      }
    }
  })

  return {
    isAuthenticated,
    userInitials,
    user,
    loading,
    logout: authStore.logout
  }
}
