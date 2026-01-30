import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

type User = {
  id: string
  name: string
  email: string
  username?: string
  phone_number?: string
  avatar_url?: string
  job?: string
  created_at?: string
  updated_at?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  // Load user from sessionStorage on init
  const initializeFromStorage = () => {
    const stored = sessionStorage.getItem('auth_user')
    if (stored) {
      try { user.value = JSON.parse(stored) }
      catch { user.value = null }
    }
  }
  initializeFromStorage()

  const isAuthenticated = computed(() => !!user.value)

  const userInitials = computed(() => {
    if (!user.value) return ''
    return user.value.name
      .split(' ')
      .map(p => p[0])
      .join('')
      .toUpperCase()
  })

  /** Set user in store + sessionStorage */
  function setUser(payload: User) {
    user.value = payload
    sessionStorage.setItem('auth_user', JSON.stringify(payload))
  }

  /** Logout safely */
  async function logout() {
    loading.value = true
    try {
      // Clear local state first
      user.value = null
      sessionStorage.removeItem('auth_user')

      // Attempt Supabase logout (safe if session missing)
      const { error } = await supabase.auth.signOut()
      if (error && !error.message.includes('Auth session missing')) {
        throw error
      }

      console.log('Logout successful ✅')
    } catch (err: any) {
      console.error('Logout failed:', err)
    } finally {
      loading.value = false
    }
  }

  /** Refresh session and load profile if missing */
  async function refreshSession() {
    if (user.value) return // already loaded

    loading.value = true
    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) throw sessionError
      if (!session?.user) return

      const { data: userInfo, error: profileError } = await supabase
        .from('users_information')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle() // <-- safe: returns null if no row

      if (!userInfo) return

      const updatedUser: User = {
        id: session.user.id,
        name: `${userInfo.firstname} ${userInfo.lastname}`,
        email: userInfo.email,
        username: userInfo.username,
        phone_number: userInfo.phone_number,
        avatar_url: userInfo.avatar_url,
        job: userInfo.job,
        created_at: userInfo.created_at,
        updated_at: userInfo.updated_at
      }
      setUser(updatedUser)
    } catch (err: any) {
      console.error('Session refresh error:', err.message)
      user.value = null
      sessionStorage.removeItem('auth_user')
    } finally {
      loading.value = false
    }
  }

  return { user, loading, isAuthenticated, userInitials, setUser, logout, refreshSession }
})