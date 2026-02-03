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
  /* ----------------------------
     STATE
  ---------------------------- */
  const profileData = ref<ProfileFormData>({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    phone_number: '',
    job: '',
    avatar_url: ''
  })

  const loading = ref(false)
  const uploading = ref(false)
  const errorMessage = ref<string | null>(null)
  const successMessage = ref<string | null>(null)

  /* ----------------------------
     COMPUTED
  ---------------------------- */
  const isProfileLoaded = computed(() => !!profileData.value.email)

  const hasChanges = computed(() => {
    const auth = useAuthStore()
    if (!auth.user) return false

    const [firstname, lastname] = auth.user.name.split(' ')

    return (
      profileData.value.firstname !== firstname ||
      profileData.value.lastname !== lastname ||
      profileData.value.username !== auth.user.username ||
      profileData.value.email !== auth.user.email ||
      profileData.value.phone_number !== auth.user.phone_number ||
      profileData.value.job !== auth.user.job ||
      profileData.value.avatar_url !== auth.user.avatar_url
    )
  })

  /* ----------------------------
     LOAD PROFILE
  ---------------------------- */
  async function loadProfile(userId: string) {
    loading.value = true
    errorMessage.value = null

    const { data, error } = await supabase
      .from('users_information')
      .select('*')
      .eq('id', userId)
      .single()

    if (error || !data) {
      errorMessage.value = error?.message || 'Failed to load profile'
      loading.value = false
      return
    }

    profileData.value = {
      firstname: data.firstname ?? '',
      lastname: data.lastname ?? '',
      username: data.username ?? '',
      email: data.email ?? '',
      phone_number: data.phone_number ?? '',
      job: data.job ?? '',
      avatar_url: data.avatar_url ?? ''
    }

    loading.value = false
  }

  /* ----------------------------
     AVATAR UPLOAD
  ---------------------------- */
  async function uploadAvatar(userId: string, file: File): Promise<string | null> {
  uploading.value = true
  errorMessage.value = null

  const ext = file.name.split('.').pop()
  const path = `${userId}/${Date.now()}.${ext}`

  const auth = useAuthStore()
  
  // Remove old avatar if exists
  if (auth.user?.avatar_url) {
    const oldPath = auth.user.avatar_url.split('/avatars/')[1]
    if (oldPath) {
      await supabase.storage.from('avatars').remove([oldPath])
    }
  }

  const upload = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true })

  if (upload.error) {
    errorMessage.value = upload.error.message
    uploading.value = false
    return null
  }

  const { data } = supabase.storage.from('avatars').getPublicUrl(path)
  const publicUrl = data.publicUrl

  // ✅ UPDATE DATABASE (THIS WAS MISSING)
  const dbUpdate = await supabase
    .from('users_information')
    .update({
      avatar_url: publicUrl,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (dbUpdate.error) {
    errorMessage.value = dbUpdate.error.message
    uploading.value = false
    return null
  }

  // ✅ UPDATE PROFILE STORE
  profileData.value.avatar_url = publicUrl

  // ✅ SYNC AUTH STORE (THIS FIXES NAVBAR)
  auth.updateUser({ avatar_url: publicUrl })

  successMessage.value = 'Avatar uploaded successfully'
  uploading.value = false

  return publicUrl
}

  /* ----------------------------
     UPDATE PROFILE
  ---------------------------- */
  async function updateProfile(userId: string): Promise<boolean> {
    loading.value = true
    errorMessage.value = null
    successMessage.value = null

    const update = await supabase
      .from('users_information')
      .update({
        ...profileData.value,
        job: profileData.value.job || null,
        avatar_url: profileData.value.avatar_url || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId)

    if (update.error) {
      errorMessage.value = update.error.message
      loading.value = false
      return false
    }

    const auth = useAuthStore()
    auth.updateUser({
      id: userId,
      name: `${profileData.value.firstname} ${profileData.value.lastname}`,
      email: profileData.value.email,
      username: profileData.value.username,
      phone_number: profileData.value.phone_number,
      job: profileData.value.job,
      avatar_url: profileData.value.avatar_url
    })

    successMessage.value = 'Profile updated successfully'
    loading.value = false
    return true
  }

  /* ----------------------------
     HELPERS
  ---------------------------- */
  function setField<K extends keyof ProfileFormData>(
    field: K,
    value: ProfileFormData[K]
  ) {
    profileData.value[field] = value
  }

  function setAvatarUrl(url: string) {
    profileData.value.avatar_url = url
  }

  function clearMessages() {
    errorMessage.value = null
    successMessage.value = null
  }

  async function deleteAvatar(avatarUrl: string): Promise<boolean> {
    if (!avatarUrl) return true
    const path = avatarUrl.split('/avatars/')[1]
    if (!path) return true

    const { error } = await supabase.storage.from('avatars').remove([path])
    return !error
  }

  return {
    profileData,
    loading,
    uploading,
    errorMessage,
    successMessage,
    isProfileLoaded,
    hasChanges,
    loadProfile,
    uploadAvatar,
    updateProfile,
    setField,
    setAvatarUrl,
    clearMessages,
    deleteAvatar
  }
})
