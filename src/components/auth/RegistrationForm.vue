<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const username = ref('')
const phoneNumber = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const agreeToTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)

const emit = defineEmits<{
  (e: 'success'): void
}>()

const resetForm = () => {
  firstName.value = ''
  lastName.value = ''
  username.value = ''
  phoneNumber.value = ''
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  agreeToTerms.value = false
  errorMessage.value = null
  successMessage.value = null
}

const passwordsMatch = () => password.value === confirmPassword.value

const register = async () => {
  if (!passwordsMatch()) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  if (!agreeToTerms.value) {
    errorMessage.value = 'Please agree to terms'
    return
  }

  loading.value = true
  errorMessage.value = successMessage.value = null

  const result = await authStore.registerUser({
    firstName: firstName.value,
    lastName: lastName.value,
    username: username.value,
    phoneNumber: phoneNumber.value,
    email: email.value,
    password: password.value
  })

  if (result.success) {
    successMessage.value = 'Account created successfully! Check your email to confirm 📧'
    emit('success')
    resetForm()
  } else {
    errorMessage.value = result.error ?? 'Registration failed'
  }

  loading.value = false
}
</script>

<template>
  <form @submit.prevent="register">
    <v-row class="my-4">
      <!-- First & Last Name -->
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="firstName"
          label="First Name"
          placeholder="Enter your first name"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-account-outline"
          required
          :disabled="loading"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-account-outline"
          required
          :disabled="loading"
        />
      </v-col>

      <!-- Username -->
      <v-col cols="12">
        <v-text-field
          v-model="username"
          label="Username"
          placeholder="Enter your username"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-account-outline"
          required
          :disabled="loading"
        />
      </v-col>

      <!-- Phone -->
      <v-col cols="12">
        <v-text-field
          v-model="phoneNumber"
          label="Phone Number"
          placeholder="Enter your phone number"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-phone-outline"
          required
          :disabled="loading"
        />
      </v-col>

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
          placeholder="Create a password"
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
        <p class="text-caption text-medium-emphasis mt-1">
          At least 8 characters recommended
        </p>
      </v-col>

      <!-- Confirm Password -->
      <v-col cols="12">
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          placeholder="Confirm your password"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showConfirmPassword ? 'text' : 'password'"
          required
          :disabled="loading"
          :error="confirmPassword.length > 0 && !passwordsMatch()"
          :error-messages="
            confirmPassword.length > 0 && !passwordsMatch()
              ? ['Passwords do not match']
              : []
          "
          @click:append-inner="showConfirmPassword = !showConfirmPassword"
        />
      </v-col>

      <!-- Terms & Conditions -->
      <v-col cols="12">
        <v-checkbox v-model="agreeToTerms" :disabled="loading" color="primary">
          <template #label>
            <span>
              I agree to the
              <v-btn
                to="/terms"
                variant="text"
                size="x-small"
                color="primary"
                class="px-1"
              >
                terms and conditions
              </v-btn>
            </span>
          </template>
        </v-checkbox>
      </v-col>

      <!-- Submit Button -->
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          size="large"
          block
          :loading="loading"
          :disabled="!agreeToTerms || !passwordsMatch()"
          class="pbcm-button font-weight-bold"
        >
          {{ loading ? 'Creating account...' : 'Create Account' }}
        </v-btn>
      </v-col>

      <!-- Error Message -->
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

      <!-- Success Message -->
      <v-col v-if="successMessage" cols="12">
        <v-alert
          type="success"
          variant="tonal"
          closable
          @click:close="successMessage = null"
        >
          {{ successMessage }}
        </v-alert>
      </v-col>
    </v-row>
  </form>
</template>