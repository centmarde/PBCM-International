<script setup lang="ts">
import { useDisplay } from 'vuetify'

type WorkInProgressProps = {
  modelValue: boolean
}

type WorkInProgressEmits = {
  'update:modelValue': [value: boolean]
}

const props = defineProps<WorkInProgressProps>()
const emit = defineEmits<WorkInProgressEmits>()

const { xs, smAndDown } = useDisplay()

const closeDialog = () => {
  emit('update:modelValue', false)
}
</script>

<template>
  <v-dialog
    :model-value="props.modelValue"
    @update:model-value="closeDialog"
    :fullscreen="xs"
    :max-width="smAndDown ? '95%' : '600px'"
    persistent
    transition="dialog-bottom-transition"
  >
    <v-card class="text-center">
      <!-- Header -->
      <v-card-title class="d-flex align-center justify-space-between pa-4 bg-primary">
        <div class="flex-grow-1">

        </div>
        <v-btn
          icon="mdi-close"
          color="white"
          variant="text"
          size="small"
          @click="closeDialog"
        />
      </v-card-title>

      <!-- Content -->
      <v-card-text class="pa-8">
        <v-icon
          icon="mdi-hammer-wrench"
          color="primary"
          size="64"
          class="mb-6"
        />

        <h3 class="text-h5 text-primary font-weight-bold mb-4">
          Under Development
        </h3>

        <p class="text-body-1 text-medium-emphasis mb-6">
          We're building something amazing for God's glory.<br>
          Please check back soon.
        </p>

        <v-divider class="my-6" />

        <p class="text-body-2 text-primary font-italic">
          "For I know the plans I have for you," declares the Lord,<br>
          "plans to prosper you and not to harm you, to give you hope and a future."
        </p>
        <p class="text-caption text-medium-emphasis mt-2">
          Jeremiah 29:11
        </p>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="pa-4 justify-center">
        <v-btn
          color="primary"
          variant="elevated"
          @click="closeDialog"
          prepend-icon="mdi-check"
        >
          Got it
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* Minimal styling - let Vuetify handle most of the design */
</style>
