<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'
import { usePbcmTheme } from '@/composables/usePbcmTheme'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/lib/supabase'

/* --------------------------------
   TYPES
-------------------------------- */
type NavItem = {
  label: string
  to: string
  icon?: string
}

/* --------------------------------
   NAV ITEMS (NO LOGIN/PROFILE HERE - HANDLED SEPARATELY)
-------------------------------- */
const navItems: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

/* --------------------------------
   MOBILE DRAWER
-------------------------------- */
const drawer = ref(false)

/* --------------------------------
   DISPLAY BREAKPOINTS
-------------------------------- */
const { mdAndUp } = useDisplay()

/* --------------------------------
   THEME
-------------------------------- */
const { isDark } = usePbcmTheme()

/* --------------------------------
   ROUTER
-------------------------------- */
const router = useRouter()

/* --------------------------------
   AUTH STORE
-------------------------------- */
const authStore = useAuthStore()
const {
  isAuthenticated,
  userInitials,
  user,
  loading,
} = storeToRefs(authStore)

const { logout, refreshSession } = authStore

/* --------------------------------
   LIFECYCLE
-------------------------------- */
onMounted(async () => {
  const { data } = await supabase.auth.getSession()
  console.log('Mounted session:', data.session)
  // Refresh session on component mount to ensure auth state is current
  await refreshSession()
})

/* --------------------------------
   ACTIONS
-------------------------------- */
const goToLogin = () => {
  router.push('/auth')
}

const handleLogout = async () => {
  await authStore.logout()       // always call logout
  router.push('/auth')           // redirect to login
  const { data } = await supabase.auth.getSession()
  console.log('Session after logout:', data.session) // should be null
}

const logSession = async () => {
  const { data } = await supabase.auth.getSession()
  console.log('Current session:', data.session)
}
logSession()
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
      <v-app-bar-nav-icon
        variant="text"
        @click="drawer = !drawer"
        class="d-md-none"
      />
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

      <!-- 🔓 NOT AUTHENTICATED -->
      <template v-if="!isAuthenticated">
        <ThemeToggle />

        <v-btn
          class="text-white ms-2 mx-5"
          color="teal-lighten-4"
          variant="outlined"
          @click="goToLogin"
        >
          Login
        </v-btn>
      </template>

      <!-- 🔐 AUTHENTICATED -->
      <template v-else>
        <ThemeToggle />

        <v-menu class="avatar-menu" location="bottom end">
          <template #activator="{ props }">
            <v-btn icon class="avatar-btn mx-5" v-bind="props">
              <v-avatar color="secondary" size="32" class="avatar-display">
                <v-img
                  v-if="user?.avatar_url"
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

            <v-list-item
              title="Profile"
              prepend-icon="mdi-account"
              to="/profile"
            />

            <v-divider />

            <v-list-item
              title="Logout"
              prepend-icon="mdi-logout"
              @click="handleLogout"
              :loading="loading"
            />
          </v-list>
        </v-menu>
      </template>
    </div>

    <!-- Mobile Auth Actions (Top Navbar Only) -->
    <div class="d-md-none navbar-actions mx-3">
      <!-- 🔓 NOT AUTHENTICATED -->
      <template v-if="!isAuthenticated">
        <ThemeToggle />

        <v-btn
          class="text-white"
          color="teal-lighten-4"
          variant="outlined"
          size="small"
          @click="goToLogin"
        >
          Login
        </v-btn>
      </template>

      <!-- 🔐 AUTHENTICATED -->
      <template v-else>
        <ThemeToggle />

        <v-menu
          location="bottom end"
          class="avatar-menu"
          transition="scale-transition"
        >
          <template #activator="{ props }">
            <v-btn
              icon
              class="avatar-btn"
              v-bind="props"
            >
              <v-avatar color="secondary" size="32" class="avatar-display mx-3">
                <v-img
                  v-if="user?.avatar_url"
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

            <v-list-item
              title="Profile"
              prepend-icon="mdi-account"
              to="/profile"
            />

            <v-divider />

            <v-list-item
              title="Logout"
              prepend-icon="mdi-logout"
              @click="handleLogout"
              :loading="loading"
            />
          </v-list>
        </v-menu>
      </template>
    </div>
  </v-app-bar>

  <!-- Mobile Drawer (Navigation Only - No Auth/Theme) -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    :color="isDark ? 'surface' : 'background'"
  >
    <div class="drawer-header pa-4">
      <div class="d-flex align-center">
        <span class="navbar-brand me-auto">PBCM</span>
        <v-btn
          icon="mdi-close"
          variant="text"
          size="small"
          @click="drawer = false"
        />
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

<style scoped>
.navbar-brand {
  background: linear-gradient(45deg,
    rgb(var(--v-theme-secondary)),
    rgb(var(--v-theme-secondary-lighten-1)));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
}

.navbar-link {
  text-transform: none !important;
  font-weight: 500;
  transition: all 0.3s ease;
}

.navbar-link:hover {
  transform: translateY(-1px);
}

.mobile-nav {
  z-index: 2000;
}

.drawer-header {
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  background: linear-gradient(135deg,
    rgba(var(--v-theme-primary), 0.05) 0%,
    rgba(var(--v-theme-secondary), 0.05) 100%);
}

.mobile-nav-item {
  margin: 0.25rem 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-nav-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

/* Dark theme adjustments */
:root .v-theme--pbcmDark .navbar-brand {
  background: linear-gradient(45deg,
    rgb(var(--v-theme-primary)),
    rgb(var(--v-theme-secondary)));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Active route styling */
.router-link-active.navbar-link {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

:root .v-theme--pbcmDark .router-link-active.navbar-link {
  background-color: rgba(var(--v-theme-secondary), 0.2);
}

/* Mobile responsive adjustments */
@media (max-width: 960px) {
  .navbar-brand {
    font-size: 1.25rem;
  }
}

/* ------------------------------
   Right-side Auth Actions
------------------------------ */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* ------------------------------
   Avatar Button
------------------------------ */
.avatar-btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.avatar-btn:hover {
  transform: translateY(-1px);
}

.avatar-btn:focus-visible {
  outline: 2px solid rgba(var(--v-theme-secondary), 0.6);
  outline-offset: 2px;
}

/* ------------------------------
   Avatar Menu
------------------------------ */
.avatar-menu .v-list-item {
  min-height: 44px;
}

.avatar-menu .v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
}

/* Dark mode menu hover */
:root .v-theme--pbcmDark .avatar-menu .v-list-item:hover {
  background-color: rgba(var(--v-theme-secondary), 0.18);
}

/* Avatar Display - Centered and fitted */
.avatar-display {
  overflow: hidden;
}

.avatar-display .v-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
</style>
