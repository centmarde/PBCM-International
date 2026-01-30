<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'
import OuterLayout from '@/layouts/outerLayout.vue'
import { useRouter } from 'vue-router'

/* --------------------------------
   COMPOSABLES & STORES
-------------------------------- */
const { xs, smAndDown, mdAndUp } = useDisplay()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const router = useRouter()

const { user: authUser } = storeToRefs(authStore)
const {
  profileData,
  loading,
  uploading,
  errorMessage,
  successMessage,
  hasChanges,
} = storeToRefs(profileStore)

const { loadProfile, uploadAvatar, updateProfile, setField, setAvatarUrl, clearMessages, deleteAvatar } = profileStore

/* --------------------------------
   LOCAL STATE
-------------------------------- */
const fileInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isSaving = ref(false)

/* --------------------------------
   COMPUTED
-------------------------------- */
const userInitials = computed(() => {
  if (!authUser.value) return ''
  return authUser.value.name
    .split(' ')
    .map(p => p[0])
    .join('')
    .toUpperCase()
})

const displayAvatarUrl = computed(() => {
  return previewUrl.value || profileData.value?.avatar_url || null
})

/* --------------------------------
   LIFECYCLE
-------------------------------- */
onMounted(async () => {
  if (authUser.value?.id) {
    await loadProfile(authUser.value.id)
    if (profileData.value?.avatar_url) {
      previewUrl.value = profileData.value.avatar_url
    }
  }
})

/* --------------------------------
   ACTIONS
-------------------------------- */
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleAvatarSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file || !authUser.value?.id) return

  // Validate file type
  if (!file.type.startsWith('image/')) {
    clearMessages()
    return
  }

  // Create preview
  const reader = new FileReader()
  reader.onload = async (e) => {
    previewUrl.value = e.target?.result as string
  }
  reader.readAsDataURL(file)

  // Upload to Supabase
  const avatarUrl = await uploadAvatar(authUser.value.id, file)
  if (avatarUrl) {
    setAvatarUrl(avatarUrl)
  }
}

const handleSaveProfile = async () => {
  if (!authUser.value?.id) return

  isSaving.value = true
  const success = await updateProfile(authUser.value.id)
  isSaving.value = false

  if (success) {
    // Clear success message after 3 seconds
    setTimeout(() => {
      clearMessages()
    }, 3000)
  }
}

const handleCancel = () => {
  // Reset preview
  if (profileData.value?.avatar_url) {
    previewUrl.value = profileData.value.avatar_url
    router.push('/about')
  } else {
    previewUrl.value = null
  }
}

const handleRemoveAvatar = async () => {
  if (!profileData.value?.avatar_url || !authUser.value?.id) return

  isSaving.value = true
  const deleted = await deleteAvatar(authUser.value.id, profileData.value.avatar_url)

  if (deleted) {
    setAvatarUrl('')
    previewUrl.value = null
    await updateProfile(authUser.value.id)
  }

  isSaving.value = false
}
</script>

<template>
  <OuterLayout>
    <template #content>
      <v-container class="py-6 py-md-8">
        <!-- Page Title -->
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="8" lg="6">
            <h1 class="text-h3 font-weight-bold pbcm-gradient-text">
              Edit Profile
            </h1>
            <p class="text-subtitle1 text-medium-emphasis mt-2">
              Update your personal information and profile picture
            </p>
          </v-col>
        </v-row>

        <!-- Profile Card -->
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">
            <v-card class="pbcm-card elevation-8">
              <v-card-text class="pa-6 pa-md-8">
                <!-- Avatar Section -->
                <div class="text-center mb-8">
                  <div class="mb-4">
                    <div
                      v-if="displayAvatarUrl"
                      class="avatar-container mx-auto"
                      @click="triggerFileInput"
                    >
                      <v-img
                        :src="displayAvatarUrl"
                        alt="Profile Avatar"
                        class="rounded-circle"
                        style="width: 100%; height: 100%; object-fit: cover; object-position: center;"
                      />
                      <div class="avatar-overlay">
                        <v-icon icon="mdi-camera" size="large" color="white" />
                      </div>
                    </div>
                    <div
                      v-else
                      class="avatar-container mx-auto"
                      @click="triggerFileInput"
                    >
                      <v-avatar color="primary" size="150" class="avatar-placeholder">
                        <span class="text-h3 font-weight-bold text-white">
                          {{ userInitials }}
                        </span>
                      </v-avatar>
                      <div class="avatar-overlay">
                        <v-icon icon="mdi-camera" size="large" color="white" />
                      </div>
                    </div>
                  </div>

                  <input
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    style="display: none"
                    @change="handleAvatarSelect"
                  />

                  <p class="text-caption text-medium-emphasis mb-3">
                    Click to upload a new profile picture
                  </p>

                  <!-- Remove Avatar Button -->
                  <v-btn
                    v-if="displayAvatarUrl"
                    size="small"
                    variant="outlined"
                    color="error"
                    icon
                    class="ml-2"
                    @click="handleRemoveAvatar"
                    :disabled="isSaving || uploading"
                    title="Remove avatar"
                  >
                    <v-icon icon="mdi-delete" />
                  </v-btn>

                  <v-progress-linear
                    v-if="uploading"
                    indeterminate
                    class="mt-2"
                    color="primary"
                  />
                </div>

                <v-divider class="my-6" />

                <!-- Form Fields -->
                <v-form @submit.prevent="handleSaveProfile">
                  <!-- First Name & Last Name -->
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="First Name"
                        :model-value="profileData?.firstname"
                        :disabled="loading || isSaving"
                        outlined
                        density="comfortable"
                        color="primary"
                        prepend-inner-icon="mdi-account"
                        @update:model-value="setField('firstname', $event)"
                      />
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        label="Last Name"
                        :model-value="profileData?.lastname"
                        :disabled="loading || isSaving"
                        outlined
                        density="comfortable"
                        color="primary"
                        prepend-inner-icon="mdi-account"
                        @update:model-value="setField('lastname', $event)"
                      />
                    </v-col>
                  </v-row>

                  <!-- Username -->
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Username"
                        :model-value="profileData?.username"
                        :disabled="loading || isSaving"
                        outlined
                        density="comfortable"
                        color="primary"
                        prepend-inner-icon="mdi-at"
                        @update:model-value="setField('username', $event)"
                      />
                    </v-col>
                  </v-row>

                  <!-- Email -->
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Email"
                        type="email"
                        :model-value="profileData?.email"
                        readonly :disabled="loading || isSaving"
                        outlined
                        density="comfortable"
                        color="primary"
                        prepend-inner-icon="mdi-email"
                        @update:model-value="setField('email', $event)"
                      />
                    </v-col>
                  </v-row>

                  <!-- Phone Number -->
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Phone Number"
                        :model-value="profileData?.phone_number"
                        :disabled="loading || isSaving"
                        outlined
                        density="comfortable"
                        color="primary"
                        prepend-inner-icon="mdi-phone"
                        @update:model-value="setField('phone_number', $event)"
                      />
                    </v-col>
                  </v-row>

                  <!-- Job -->
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        label="Job Title"
                        :model-value="profileData?.job"
                        :disabled="loading || isSaving"
                        outlined
                        density="comfortable"
                        color="primary"
                        prepend-inner-icon="mdi-briefcase"
                        placeholder="e.g., Pastor, Teacher, Volunteer"
                        @update:model-value="setField('job', $event)"
                      />
                    </v-col>
                  </v-row>

                  <!-- Messages -->
                  <v-row class="mt-4">
                    <v-col cols="12">
                      <v-expand-transition>
                        <v-alert
                          v-if="errorMessage"
                          type="error"
                          variant="tonal"
                          closable
                          class="mb-4"
                          @click:close="clearMessages"
                        >
                          {{ errorMessage }}
                        </v-alert>
                      </v-expand-transition>

                      <v-expand-transition>
                        <v-alert
                          v-if="successMessage"
                          type="success"
                          variant="tonal"
                          closable
                          class="mb-4"
                          @click:close="clearMessages"
                        >
                          {{ successMessage }}
                        </v-alert>
                      </v-expand-transition>
                    </v-col>
                  </v-row>

                  <!-- Action Buttons -->
                  <v-row class="mt-6">
                    <v-col cols="12" sm="6">
                      <v-btn
                        variant="outlined"
                        color="primary"
                        block
                        size="large"
                        @click="handleCancel"
                        :disabled="isSaving"
                      >
                        Cancel
                      </v-btn>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-btn
                        type="submit"
                        color="primary"
                        block
                        size="large"
                        :loading="isSaving"
                        :disabled="!hasChanges || isSaving"
                        class="pbcm-button font-weight-bold"
                      >
                        {{ isSaving ? 'Saving...' : 'Save Changes' }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>

            <!-- Info Card -->
            <v-card class="mt-6 pbcm-card" :elevation="2">
              <v-card-text class="pa-4">
                <div class="d-flex align-center ga-3">
                  <v-icon icon="mdi-information" color="primary" />
                  <div>
                    <p class="text-body2 font-weight-bold mb-1">
                      Profile Information
                    </p>
                    <p class="text-caption text-medium-emphasis mb-0">
                      Changes are saved to your account and displayed across the platform.
                      Avatar changes appear instantly in the navigation bar.
                    </p>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </OuterLayout>
</template>

<style scoped>
.avatar-container {
  position: relative;
  width: 150px;
  height: 150px;
  cursor: pointer;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.3s ease;
}

.avatar-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;         /* fills container without stretching */
  object-position: center;   /* centers the image inside the circle */
  display: block;
}

.avatar-container:hover .avatar-overlay {
  opacity: 1;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .avatar-container {
    width: 120px;
    height: 120px;
  }
}
</style>
