<template>
  <v-app>
    <!-- Navigation Bar -->
    <OuterNavbar />

    <!-- Main Content -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
// Components are auto-imported
</script>
