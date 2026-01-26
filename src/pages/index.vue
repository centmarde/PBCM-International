<script setup lang="ts">
import OuterLayout from '@/layouts/outerLayout.vue'

const showWorkInProgress = ref(false)

// Show work in progress dialog when component is mounted
onMounted(() => {
  showWorkInProgress.value = true
})
</script>

<template>
  <OuterLayout>
    <template #content>
      <Hero />

      <!-- Work In Progress Dialog -->
      <WorkInProgress v-model="showWorkInProgress" />
    </template>
  </OuterLayout>
</template>
