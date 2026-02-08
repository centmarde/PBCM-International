<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  avatarUrl?: string | null
  initials: string
  loading?: boolean
  uploading?: boolean
}>()

const emit = defineEmits<{
  (e: 'upload'): void
  (e: 'remove'): void
}>()

const dialog = ref(false)

const hasAvatar = computed(() => !!props.avatarUrl)
</script>

<template>
  <div class="text-center">
    <!-- Avatar skeleton -->
    <v-skeleton-loader
      v-if="loading"
      type="avatar"
      width="150"
      height="150"
      class="mx-auto"
    />

    <!-- Avatar -->
    <div
      v-else
      class="avatar-container mx-auto"
      @click="dialog = true"
    >
      <v-img
        v-if="hasAvatar"
        :src="avatarUrl || undefined"
        class="avatar-image"
      />

      <v-avatar
        v-else
        size="150"
        color="primary"
        class="avatar-placeholder"
      >
        <span class="text-h3 text-white">
          {{ initials }}
        </span>
      </v-avatar>

      <div class="avatar-overlay">
        <v-icon icon="mdi-camera" color="white" size="large" />
      </div>
    </div>

    <!-- Action dialog -->
    <v-dialog v-model="dialog" width="320">
      <v-card>
        <v-card-title class="text-h6">
          Profile Picture
        </v-card-title>

        <v-card-text>
          <v-btn block color="primary" @click="emit('upload'); dialog = false">
            Upload Avatar
          </v-btn>

          <v-btn
            v-if="hasAvatar"
            block
            color="error"
            variant="outlined"
            class="mt-2"
            @click="emit('remove'); dialog = false"
          >
            Remove Avatar
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="dialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Upload loading screen -->
    <v-overlay
      :model-value="uploading"
      class="align-center justify-center"
      persistent
    >
      <v-card class="pa-6 text-center">
        <v-progress-circular
          indeterminate
          size="48"
          width="4"
          color="primary"
        />
        <p class="mt-4 text-body-2">
          Uploading avatar…
        </p>
      </v-card>
    </v-overlay>
  </div>
</template>

<style scoped src="@/assets/css/profile.css"></style>