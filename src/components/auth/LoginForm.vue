<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'success'): void
}>()

const resetForm = () => {
  email.value = ''
  password.value = ''
  errorMessage.value = null
}

const login = async () => {
  loading.value = true
  errorMessage.value = null

  const result = await authStore.loginUser({
    email: email.value,
    password: password.value
  })

  if (result.success) {
    if (!result.user?.email_confirmed) {
      errorMessage.value = 'Please confirm your email before signing in'
    } else {
      emit('success')
      resetForm()
      router.push('/about')
    }
  } else {
    errorMessage.value = result.error ?? 'Invalid email or password'
  }

  loading.value = false
}
</script>

<template>
  <form @submit.prevent="login">
    <v-row class="my-4">
      <!-- Email -->
      <v-col cols="12">
        <v-text-field
          v-model="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-email-outline"
          required
          :disabled="loading"
        />
      </v-col>

      <!-- Password -->
      <v-col cols="12">
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Enter your password"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'text' : 'password'"
          required
          :disabled="loading"
          @click:append-inner="showPassword = !showPassword"
        />
      </v-col>

      <!-- Forgot Password -->
      <v-col cols="12" class="text-right">
        <v-btn
          to="/forgot-password"
          variant="text"
          size="small"
          color="primary"
          class="text-capitalize"
        >
          Forgot Password?
        </v-btn>
      </v-col>

      <!-- Submit -->
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          size="large"
          block
          :loading="loading"
          class="pbcm-button font-weight-bold"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </v-btn>
      </v-col>

      <!-- Error -->
      <v-col v-if="errorMessage" cols="12">
        <v-alert
          type="error"
          variant="tonal"
          closable
          @click:close="errorMessage = null"
        >
          {{ errorMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </form>
</template>
