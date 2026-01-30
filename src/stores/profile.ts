import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from './auth'

type ProfileFormData = {
  firstname: string
  lastname: string
  username: string
  email: string
  phone_number: string
  job?: string
  avatar_url?: string
}

export const useProfileStore = defineStore('profile', () => {
  /* --------------------------------
     STATE
  -------------------------------- */
  const profileData = ref<ProfileFormData | null>(null)
  const loading = ref(false)
  const uploading = ref(false)
  const errorMessage = ref<string | null>(null)
  const successMessage = ref<string | null>(null)

  /* --------------------------------
     GETTERS
  -------------------------------- */
  const isProfileLoaded = computed(() => !!profileData.value)

  const hasChanges = computed(() => {
    if (!profileData.value) return false
    const authStore = useAuthStore()
    const currentUser = authStore.user

    if (!currentUser) return false

    return (
      profileData.value.firstname !== currentUser.name.split(' ')[0] ||
      profileData.value.lastname !== currentUser.name.split(' ')[1] ||
      profileData.value.username !== currentUser.username ||
      profileData.value.email !== currentUser.email ||
      profileData.value.phone_number !== currentUser.phone_number ||
      profileData.value.job !== currentUser.job ||
      profileData.value.avatar_url !== currentUser.avatar_url
    )
  })

  /* --------------------------------
     ACTIONS
  -------------------------------- */

  /**
   * Load profile data from Supabase
   */
  async function loadProfile(userId: string) {
    loading.value = true
    errorMessage.value = null

    try {
      const { data: profile, error } = await supabase
        .from('users_information')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error

      profileData.value = {
        firstname: profile.firstname,
        lastname: profile.lastname,
        username: profile.username,
        email: profile.email,
        phone_number: profile.phone_number,
        job: profile.job || '',
        avatar_url: profile.avatar_url || '',
      }
    } catch (err: any) {
      errorMessage.value = err.message ?? 'Failed to load profile'
      console.error('Load profile error:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Upload avatar to Supabase Storage
   * Stores in path: avatars/{userId}/{fileName}
   */
  async function uploadAvatar(userId: string, file: File): Promise<string | null> {
    uploading.value = true
    errorMessage.value = null

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
      // Store avatar in user-specific folder for better RLS policy enforcement
      const filePath = `${userId}/${fileName}`

      // Delete old avatar if it exists
      const authStore = useAuthStore()
      if (authStore.user?.avatar_url) {
        try {
          // Extract the path from the URL
          const urlPath = authStore.user.avatar_url.split('/storage/v1/object/public/avatars/')[1]
          if (urlPath) {
            await supabase.storage.from('avatars').remove([urlPath])
          }
        } catch (err) {
          console.warn('Could not delete old avatar:', err)
        }
      }

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) throw uploadError

      // Get public URL
      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

      successMessage.value = 'Avatar uploaded successfully!'
      return data.publicUrl
    } catch (err: any) {
      errorMessage.value = err.message ?? 'Failed to upload avatar'
      console.error('Upload avatar error:', err)
      return null
    } finally {
      uploading.value = false
    }
  }

  /**
   * Update profile in Supabase and Pinia auth store
   */
  async function updateProfile(userId: string) {
    if (!profileData.value) {
      errorMessage.value = 'Profile data is empty'
      return false
    }

    loading.value = true
    errorMessage.value = null
    successMessage.value = null

    try {
      const { error } = await supabase
        .from('users_information')
        .update({
          firstname: profileData.value.firstname,
          lastname: profileData.value.lastname,
          username: profileData.value.username,
          email: profileData.value.email,
          phone_number: profileData.value.phone_number,
          job: profileData.value.job || null,
          avatar_url: profileData.value.avatar_url || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)

      if (error) throw error

      // Update auth store with new profile data
      // This will automatically update sessionStorage
      const authStore = useAuthStore()
      const updatedUser = {
        id: userId,
        name: `${profileData.value.firstname} ${profileData.value.lastname}`,
        email: profileData.value.email,
        username: profileData.value.username,
        phone_number: profileData.value.phone_number,
        job: profileData.value.job,
        avatar_url: profileData.value.avatar_url,
      }
      
      authStore.setUser(updatedUser)

      successMessage.value = 'Profile updated successfully! ✅'
      return true
    } catch (err: any) {
      errorMessage.value = err.message ?? 'Failed to update profile'
      console.error('Update profile error:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  /**
   * Set profile field value
   */
  function setField(field: keyof ProfileFormData, value: string) {
    if (!profileData.value) return
    profileData.value[field] = value
  }

  /**
   * Set avatar URL
   */
  function setAvatarUrl(url: string) {
    if (!profileData.value) return
    profileData.value.avatar_url = url
  }

  /**
   * Clear messages
   */
  function clearMessages() {
    errorMessage.value = null
    successMessage.value = null
  }

  /**
   * Delete user's avatar from storage
   */
  async function deleteAvatar(userId: string, avatarUrl: string): Promise<boolean> {
    try {
      if (!avatarUrl) return true

      // Extract path from public URL
      const urlPath = avatarUrl.split('/storage/v1/object/public/avatars/')[1]
      if (!urlPath) return true

      const { error } = await supabase.storage
        .from('avatars')
        .remove([urlPath])

      if (error) {
        console.warn('Could not delete avatar:', error)
        return false
      }
      return true
    } catch (err: any) {
      console.warn('Avatar deletion error:', err)
      return false
    }
  }

  return {
    // State
    profileData,
    loading,
    uploading,
    errorMessage,
    successMessage,

    // Getters
    isProfileLoaded,
    hasChanges,

    // Actions
    loadProfile,
    uploadAvatar,
    updateProfile,
    setField,
    setAvatarUrl,
    clearMessages,
    deleteAvatar,
  }
})
