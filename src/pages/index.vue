<script setup lang="ts">
const showWorkInProgress = ref(false)

// Show work in progress dialog when component is mounted
onMounted(() => {
  showWorkInProgress.value = true
})
</script>

<template>
  <Hero />

  <!-- Work In Progress Dialog -->
  <WorkInProgress v-model="showWorkInProgress" />
</template>
