<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import OuterLayout from '@/layouts/outerLayout.vue'
import ProfileAvatar from '@/components/profileAvatar.vue'
import { useRouter } from 'vue-router'

/* ----------------------------
   STORES
---------------------------- */
const auth = useAuthStore()
const profile = useProfileStore()
const router = useRouter()

const { user } = storeToRefs(auth)
const {
  profileData,
  loading,
  uploading,
  errorMessage,
  successMessage,
  hasChanges
} = storeToRefs(profile)

const {
  loadProfile,
  uploadAvatar,
  updateProfile,
  setAvatarUrl,
  clearMessages,
  deleteAvatar
} = profile

/* ----------------------------
   LOCAL STATE
---------------------------- */
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isSaving = ref(false)

/* ----------------------------
   COMPUTED
---------------------------- */
const initials = computed(() =>
  user.value?.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || ''
)

const avatarUrl = computed(
  () => previewUrl.value || profileData.value.avatar_url || null
)

/* ----------------------------
   LOAD PROFILE
---------------------------- */
onMounted(() => {
  if (user.value?.id) loadProfile(user.value.id)
})

/* ----------------------------
   AVATAR ACTIONS
---------------------------- */
const triggerUpload = () => fileInput.value?.click()

const handleFile = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file || !user.value?.id || !file.type.startsWith('image/')) return

  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = URL.createObjectURL(file)

  const url = await uploadAvatar(user.value.id, file)
  if (url) setAvatarUrl(url)
}

const handleRemoveAvatar = async () => {
  if (!profileData.value.avatar_url || !user.value?.id) return
  await deleteAvatar(profileData.value.avatar_url)
  setAvatarUrl('')
  previewUrl.value = null
}

/* ----------------------------
   SAVE / CANCEL
---------------------------- */
const saveProfile = async () => {
  if (!user.value?.id) return
  isSaving.value = true

  const ok = await updateProfile(user.value.id)
  isSaving.value = false

  if (ok) setTimeout(clearMessages, 3000)
}

const cancelEdit = () => {
  previewUrl.value = null
  router.push('/about')
}
</script>

<template>
  <OuterLayout>
    <template #content>
      <v-container class="py-8">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">

            <h1 class="text-h3 font-weight-bold mb-6">
              Edit Profile
            </h1>

            <v-card class="pbcm-card elevation-8">
              <v-card-text class="pa-6">

                <!-- Avatar -->
                <ProfileAvatar
                  :avatar-url="avatarUrl"
                  :initials="initials"
                  :loading="loading"
                  :uploading="uploading"
                  @upload="triggerUpload"
                  @remove="handleRemoveAvatar"
                />

                <input
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  hidden
                  @change="handleFile"
                />

                <v-skeleton-loader
                  v-if="loading"
                  type="paragraph, paragraph"
                  class="mt-6"
                />

                <!-- Form -->
                <v-form v-else @submit.prevent="saveProfile">
                  <v-text-field v-model="profileData.firstname" label="First Name" />
                  <v-text-field v-model="profileData.lastname" label="Last Name" />
                  <v-text-field v-model="profileData.username" label="Username" />
                  <v-text-field v-model="profileData.email" label="Email" readonly />
                  <v-text-field v-model="profileData.phone_number" label="Phone Number" />
                  <v-text-field v-model="profileData.job" label="Job Title" />

                  <v-alert v-if="errorMessage" type="error" variant="tonal" class="mt-4">
                    {{ errorMessage }}
                  </v-alert>

                  <v-alert v-if="successMessage" type="success" variant="tonal" class="mt-4">
                    {{ successMessage }}
                  </v-alert>

                  <v-row class="mt-4">
                    <v-col cols="6">
                      <v-btn block variant="outlined" @click="cancelEdit">
                        Cancel
                      </v-btn>
                    </v-col>

                    <v-col cols="6">
                      <v-btn
                        block
                        color="primary"
                        type="submit"
                        :loading="isSaving"
                        :disabled="!hasChanges || isSaving"
                      >
                        Save Changes
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>

              </v-card-text>
            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </template>
  </OuterLayout>
</template>

<style scoped src="@/assets/css/profile.css"></style>
