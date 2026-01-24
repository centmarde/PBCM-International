<script lang="ts" setup>
const { isDark, toggleTheme } = usePbcmTheme()
</script>

<template>
  <v-btn
    :icon="isDark ? 'mdi-weather-sunny' : 'mdi-weather-night'"
    :color="isDark ? 'secondary' : 'primary'"
    variant="text"
    size="small"
    @click="toggleTheme"
    class="theme-toggle"
  >
    <v-icon size="24" />
    <v-tooltip activator="parent" location="bottom">
      Switch to {{ isDark ? 'Light' : 'Dark' }} Theme
    </v-tooltip>
  </v-btn>
</template>

<style scoped>
.theme-toggle {
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  transform: rotate(180deg);
}
</style>
