<script setup lang="ts">
import { useDisplay } from 'vuetify'
import { usePbcmTheme } from '@/composables/usePbcmTheme'
import { useNavbarItems } from '@/composables/outerNavbarComposables/useNavbarItems'
import { useNavbarDrawer } from '@/composables/outerNavbarComposables/useNavbarDrawer'
import { useNavbarAuth } from '@/composables/outerNavbarComposables/useNavbarAuth'
import { useNavbarActions } from '@/composables/outerNavbarComposables/useNavbarActions'

/* Display Breakpoints */
const { mdAndUp } = useDisplay()

/* Theme */
const { isDark } = usePbcmTheme()

/* Nav Items */
const { navItems } = useNavbarItems()

/* Mobile Drawer */
const { drawer, toggleDrawer, closeDrawer } = useNavbarDrawer()

/* Auth */
const { isAuthenticated, user, userInitials, loading } = useNavbarAuth()

/* Actions */
const { goToLogin, handleLogout } = useNavbarActions()
</script>

<template>
  <v-app-bar
    :color="isDark ? 'surface' : 'primary'"
    :theme="isDark ? 'dark' : 'light'"
    elevation="2"
    height="64"
    app
  >
    <!-- Mobile Menu Button -->
    <template #prepend>
      <v-app-bar-nav-icon variant="text" @click="drawer = !drawer" class="d-md-none" />
    </template>

    <!-- Logo -->
    <v-app-bar-title class="font-weight-bold">
      <router-link to="/" class="text-decoration-none">
        <span class="navbar-brand">PBCM</span>
      </router-link>
    </v-app-bar-title>

    <v-spacer />

    <!-- Desktop Navigation -->
    <div class="d-none d-md-flex align-center ga-2">
      <v-btn
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        variant="text"
        :color="isDark ? 'secondary' : 'white'"
        class="navbar-link"
      >
        <v-icon v-if="item.icon" :icon="item.icon" start />
        {{ item.label }}
      </v-btn>

      <v-divider vertical class="mx-2" />

      <!-- NOT AUTHENTICATED -->
      <template v-if="!isAuthenticated">
        <ThemeToggle />
        <v-btn class="text-white ms-2 mx-5" color="teal-lighten-4" variant="outlined" @click="goToLogin">
          Login
        </v-btn>
      </template>

      <!-- AUTHENTICATED (Email Confirmed Only) -->
      <template v-else>
        <ThemeToggle />
        <v-menu class="avatar-menu" location="bottom end">
          <template #activator="{ props }">
            <v-btn icon class="avatar-btn mx-5" v-bind="props">
              <v-avatar color="secondary" size="32" class="avatar-display">
                <v-img
                  v-if="user?.avatar_url && user?.email_confirmed"
                  :src="user.avatar_url"
                  :alt="user.name"
                  class="w-100 h-100"
                />
                <span v-else class="text-white font-weight-bold">
                  {{ userInitials }}
                </span>
              </v-avatar>
            </v-btn>
          </template>

          <v-list width="220">
            <v-list-item class="px-2 py-2">
              <div class="text-body2 font-weight-bold">{{ user?.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ user?.email }}</div>
            </v-list-item>

            <v-divider class="my-2" />

            <v-list-item title="Profile" prepend-icon="mdi-account" to="/profile" />
            <v-divider />
            <v-list-item title="Logout" prepend-icon="mdi-logout" @click="handleLogout" :loading="loading" />
          </v-list>
        </v-menu>
      </template>
    </div>

    <!-- Mobile Actions -->
    <div class="d-md-none navbar-actions mx-3">
      <template v-if="!isAuthenticated">
        <ThemeToggle />
        <v-btn class="text-white" color="teal-lighten-4" variant="outlined" size="small" @click="goToLogin">
          Login
        </v-btn>
      </template>

      <template v-else>
        <ThemeToggle />
        <v-menu location="bottom end" class="avatar-menu" transition="scale-transition">
          <template #activator="{ props }">
            <v-btn icon class="avatar-btn" v-bind="props">
              <v-avatar color="secondary" size="32" class="avatar-display mx-3">
                <v-img
                  v-if="user?.avatar_url && user?.email_confirmed"
                  :src="user.avatar_url"
                  :alt="user.name"
                  class="w-100 h-100"
                />
                <span v-else class="text-white font-weight-bold">
                  {{ userInitials }}
                </span>
              </v-avatar>
            </v-btn>
          </template>

          <v-list width="220">
            <v-list-item class="px-2 py-2">
              <div class="text-body2 font-weight-bold">{{ user?.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ user?.email }}</div>
            </v-list-item>

            <v-divider class="my-2" />
            <v-list-item title="Profile" prepend-icon="mdi-account" to="/profile" />
            <v-divider />
            <v-list-item title="Logout" prepend-icon="mdi-logout" @click="handleLogout" :loading="loading" />
          </v-list>
        </v-menu>
      </template>
    </div>
  </v-app-bar>

  <!-- Mobile Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    :color="isDark ? 'surface' : 'background'"
  >
    <div class="drawer-header pa-4">
      <div class="d-flex align-center">
        <span class="navbar-brand me-auto">PBCM</span>
        <v-btn icon="mdi-close" variant="text" size="small" @click="drawer = false" />
      </div>
      <p class="text-caption mt-2 mb-0 opacity-75">
        Philippine Christian Bible Missionary
      </p>
    </div>

    <v-divider />

    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        :prepend-icon="item.icon || 'mdi-chevron-right'"
        :title="item.label"
        @click="drawer = false"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped src="@/assets/css/outerNavbar.css"></style>
