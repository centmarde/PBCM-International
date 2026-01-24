<script lang="ts" setup>
type NavItem = {
  label: string
  to: string
  icon?: string
}

const navItems: NavItem[] = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Ministries', to: '/ministries' },
  { label: 'Events', to: '/events' },
  { label: 'Contact', to: '/contact' },
]

// Mobile drawer state
const drawer = ref(false)

// Get theme info
const { isDark } = usePbcmTheme()
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

    <!-- Logo/Brand -->
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

      <ThemeToggle />
    </div>

    <!-- Mobile Theme Toggle (always visible on mobile) -->
    <div class="d-md-none">
      <ThemeToggle />
    </div>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <v-navigation-drawer
    v-model="drawer"
    temporary
    location="left"
    :color="isDark ? 'surface' : 'background'"
    class="mobile-nav"
  >
    <!-- Drawer Header -->
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

    <!-- Mobile Navigation Items -->
    <v-list nav>
      <v-list-item
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        :prepend-icon="item.icon || 'mdi-chevron-right'"
        :title="item.label"
        color="primary"
        class="mobile-nav-item"
        @click="drawer = false"
      />
    </v-list>

    <!-- Mobile Footer -->
    <template #append>
      <div class="pa-4">
        <v-divider class="mb-4" />
        <div class="text-center">
          <p class="text-caption mb-2">
            Built with ❤️ for God's glory
          </p>
          <v-chip size="small" variant="outlined">
            {{ isDark ? 'Dark' : 'Light' }} Mode
          </v-chip>
        </div>
      </div>
    </template>
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
</style>
