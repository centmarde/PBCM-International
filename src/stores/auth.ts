import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'

type User = {
  id: string
  name: string
  email: string
  email_confirmed?: boolean
  username?: string
  phone_number?: string
  avatar_url?: string
  job?: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!user.value)

  const userInitials = computed(() =>
    user.value?.name
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase() || ''
  )

  function setUser(payload: User) {
    user.value = payload
    sessionStorage.setItem('auth_user', JSON.stringify(payload))
  }

  function clearUser() {
    user.value = null
    sessionStorage.removeItem('auth_user')
  }

  // -------------------------------
  // REGISTER
  // -------------------------------
  async function registerUser(payload: {
    firstName: string
    lastName: string
    username: string
    phoneNumber: string
    email: string
    password: string
  }): Promise<{ success: boolean; error?: string }> {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          firstname: payload.firstName,
          lastname: payload.lastName,
          username: payload.username,
          phone_number: payload.phoneNumber
        }
      }
    })

    if (error) {
      loading.value = false
      return { success: false, error: error.message }
    }

    if (!data.user) {
      loading.value = false
      return { success: false, error: 'User was not created' }
    }

    loading.value = false
    return { success: true }
  }

  // -------------------------------
  // LOGIN
  // -------------------------------
  async function loginUser(payload: {
    email: string
    password: string
  }): Promise<{
    success: boolean
    error?: string
    user?: User
  }> {
    loading.value = true

    const { data, error } = await supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    })

    if (error) {
      loading.value = false
      return { success: false, error: error.message }
    }

    if (!data.user) {
      loading.value = false
      return { success: false, error: 'User not found' }
    }

    const emailConfirmed = !!data.user.email_confirmed_at

    // fetch profile from users_information
    const { data: profile, error: profileError } = await supabase
      .from('users_information')
      .select('*')
      .eq('id', data.user.id)
      .maybeSingle()

    if (profileError || !profile) {
      loading.value = false
      return { success: false, error: 'Failed to load user profile' }
    }

    const loggedUser: User = {
      id: data.user.id,
      name: `${profile.firstname} ${profile.lastname}`,
      email: data.user.email!,
      email_confirmed: emailConfirmed,
      username: profile.username,
      phone_number: profile.phone_number,
      avatar_url: profile.avatar_url,
      job: profile.job
    }

    if (emailConfirmed) {
      setUser(loggedUser)
    }

    loading.value = false
    return { success: true, user: loggedUser }
  }
  
  // -------------------------------
  // UPDATE USER
  // -------------------------------
    function updateUser(patch: Partial<User>) {
    if (!user.value) return

    user.value = {
      ...user.value,
      ...patch
    }

    sessionStorage.setItem('auth_user', JSON.stringify(user.value))
  }

  // -------------------------------
  // LOGOUT
  // -------------------------------
  async function logout() {
    loading.value = true
    clearUser()

    const { error } = await supabase.auth.signOut()
    loading.value = false

    if (error && !error.message.includes('Auth session missing')) {
      return { success: false, error: error.message }
    }

    return { success: true }
  }

  return {
    user,
    loading,
    isAuthenticated,
    userInitials,
    setUser,
    clearUser,
    registerUser,
    loginUser,
    updateUser,
    logout
  }
})
