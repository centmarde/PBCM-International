<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import OuterLayout from '@/layouts/outerLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'


type Mode = 'login' | 'register'
const mode = ref<Mode>('login')
const { xs } = useDisplay()

const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login'
}

const onAuthSuccess = () => {
  console.log('Auth success ✔️')
  // router.push('/dashboard') ← typical next step
}
</script>

<template>
  <OuterLayout>
    <template #content>
      <v-container fluid class="auth-container">
        <v-row justify="center" align="center" class="min-h-screen">
          <v-col cols="12" sm="10" md="8" lg="5" xl="4">
            <v-card
              class="pbcm-card elevation-24"
              :class="{ 'pa-4': xs, 'pa-6': !xs }"
            >
              <!-- Header with Animation -->
              <v-card-title class="text-center pb-2">
                <h2 class="pbcm-gradient-text text-h4 font-weight-bold">
                  {{ mode === 'login' ? 'Welcome Back' : 'Join Us' }}
                </h2>
              </v-card-title>

              <v-card-subtitle class="text-center pb-6 text-body2">
                <p class="text-medium-emphasis">
                  {{ mode === 'login'
                    ? 'Sign in to your PBCM account'
                    : 'Create a new PBCM account' }}
                </p>
              </v-card-subtitle>

              <!-- Forms -->
              <v-card-text>
                <LoginForm
                  v-if="mode === 'login'"
                  @success="onAuthSuccess"
                />

                <RegistrationForm
                  v-else
                  @success="onAuthSuccess"
                />
              </v-card-text>

              <!-- Toggle Mode -->
              <v-divider class="my-6"></v-divider>

              <v-card-text class="text-center pb-0">
                <p class="text-body2 text-medium-emphasis">
                  {{ mode === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?' }}
                </p>
                <v-btn
                  :text="mode === 'login' ? 'Register' : 'Login'"
                  color="primary"
                  size="small"
                  class="mt-2"
                  @click="toggleMode"
                />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </OuterLayout>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-background)) 0%,
    rgb(var(--v-theme-surface-variant)) 100%
  );
}

.min-h-screen {
  min-height: 100vh;
}
</style>
