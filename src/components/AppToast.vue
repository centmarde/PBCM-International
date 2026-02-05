<script setup lang="ts">
import '@/assets/css/AppToast.css'
import { useToastStore } from '@/stores/toast'

const toast = useToastStore()

function onClose(val: boolean): void {
  if (!val && !toast.isLoading) {
    toast._dequeue()
  }
}
</script>

<template>
  <v-snackbar
    v-model="toast.show"
    :timeout="toast.timeout"
    location="top end"
    elevation="4"
    rounded="lg"
    class="toast-snackbar"
    @update:model-value="onClose"
  >
    <!-- Flex row: icon + message + close button -->
    <div class="toast-content">
      <!-- Optional icon for toast type -->
      <v-icon
        v-if="toast.icon"
        :color="toast.color"
        size="20"
        class="mr-2"
      >
        {{ toast.icon }}
      </v-icon>

      <!-- Toast message -->
      <span class="toast-message text-high-emphasis">
        {{ toast.message }}
      </span>

      <!-- Close button aligned to the right -->
      <v-btn
        v-if="!toast.isLoading"
        icon
        size="x-small"
        variant="text"
        class="toast-close"
        @click="toast.show = false"
      >
        <v-icon
          size="16"
          class="toast-close-icon"
        >
          mdi-close
        </v-icon>
      </v-btn>
    </div>

    <!-- Progress bar -->
    <div
      v-if="toast.timeout > 0"
      :key="toast.startedAt"
      class="toast-progress"
      :class="toast.color"
      :style="{ animationDuration: `${toast.timeout}ms` }"
    />
  </v-snackbar>
</template>

