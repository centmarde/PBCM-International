<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  (e: 'success'): void
}>()

const router = useRouter()
const authStore = useAuthStore()
const { xs } = useDisplay()
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const phoneNumber = ref('')
// const job = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreeToTerms = ref(false)

  // Reset form
const resetForm = () => {
    firstName.value = ""
    lastName.value = ""
    username.value = ""
    phoneNumber.value = ""
    email.value = ""
    password.value = ""
    confirmPassword.value = ""
    agreeToTerms.value = false
    errorMessage.value = null
  }

const passwordsMatch = () => password.value === confirmPassword.value

const isUsernameTaken = async (): Promise<boolean> => {
  const { data, error } = await supabase
    .from('users_information')
    .select('id')
    .eq('username', username.value)
    .maybeSingle()

  if (error) {
    console.error(error)
    return false
  }

  return !!data
}

const register = async () => {
  if (!passwordsMatch()) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  if (!agreeToTerms.value) {
    errorMessage.value = 'Please agree to the terms and conditions'
    return
  }

  loading.value = true
  errorMessage.value = null
  successMessage.value = null

  try {

    /* 🔍 Check username first */
    if (await isUsernameTaken()) {
      errorMessage.value = 'Username is already taken'
      loading.value = false
      return
    }

    /* 1️⃣ Create Auth User */
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          firstname: firstName.value,
          lastname: lastName.value,
          username: username.value,
          phone_number: phoneNumber.value
        }
      }
    })

    if (error) throw error
    if (!data.user) throw new Error('User not created')

    // /* 2️⃣ Insert Profile Row */
    // const { error: profileError } = await supabase
    //   .from('users_information')
    //   .insert({
    //     id: data.user.id,
    //     firstname: firstName.value,
    //     lastname: lastName.value,
    //     username: username.value,
    //     phone_number: phoneNumber.value,
    //     email: email.value
    //   })

    // if (profileError) throw profileError

    // 3️⃣ Store user in Pinia immediately after registration
    authStore.setUser({
      id: data.user.id,
      name: `${firstName.value} ${lastName.value}`,
      email: email.value,
      username: username.value,
      phone_number: phoneNumber.value,
    })

    successMessage.value =
      'Account created successfully! Please check your email to verify your account 📧'

    /* Optional: Reset form */
    resetForm()

    // Emit success
    emit('success')

    // Redirect to dashboard or home after 2 seconds
    // setTimeout(() => {
    //   router.push('/about')
    // }, 2000)

  } catch (err: any) {
    errorMessage.value = err.message ?? 'Registration failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="register">
    <v-row class="my-4">
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

      <v-col cols="12">
        <v-text-field
          v-model="phoneNumber"
          label="Phone Number"
          placeholder="Enter your Phone Number"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-account-outline"
          required
          :disabled="loading"
        />
      </v-col>

      <!-- <v-col cols="12" sm="6">
        <v-text-field
          v-model="job"
          label="Job"
          placeholder="Enter your Job"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-account-outline"
          required
          :disabled="loading"
        />
      </v-col> -->

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

      <v-col cols="12">
        <v-text-field
          v-model="password"
          label="Password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Create a password"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          required
          :disabled="loading"
          @click:append-inner="showPassword = !showPassword"
        />
        <p class="text-caption text-medium-emphasis mt-1">
          At least 8 characters recommended
        </p>
      </v-col>

      <v-col cols="12">
        <v-text-field
          v-model="confirmPassword"
          label="Confirm Password"
          :type="showConfirmPassword ? 'text' : 'password'"
          placeholder="Confirm your password"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showConfirmPassword ? 'mdi-eye-off' : 'mdi-eye'"
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

      <v-col cols="12">
        <v-checkbox
          v-model="agreeToTerms"
          :disabled="loading"
          color="primary"
        >
          <template #label>
            <span class="text-body2">
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

<style scoped>
form {
  width: 100%;
}
</style>
