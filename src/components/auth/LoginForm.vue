<!-- <script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { supabase } from '@/lib/supabase'
import { useRouter} from 'vue-router'

const router = useRouter()

// Reset form
const resetForm = () => {
    email.value = ""
    password.value = ""
    errorMessage.value = null
  }

const emit = defineEmits<{
  (e: 'success'): void
}>()

const { xs } = useDisplay()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const showPassword = ref(false)

const login = async () => {
  loading.value = true
  errorMessage.value = null

  try {
    /* 1️⃣ Sign in user */
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error
    if (!data.user) throw new Error('User not found')

    /* 2️⃣ Ensure email is confirmed */
    if (!data.user.email_confirmed_at) {
      throw new Error('Please confirm your email before signing in')
    }

    /* 3️⃣ Load user profile */
    const { data: userInfo, error: profileError } = await supabase
      .from('users_information')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError) throw profileError

    console.log('Logged-in user:', data.user)
    console.log('User profile:', userInfo)

    /* 4️⃣ Emit success (optional parent handling) */
    emit('success')
    resetForm()

    /* 5️⃣ Redirect */
    await router.push('/about')
  } catch (err: any) {
    errorMessage.value =
      err.message ?? 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script> -->

<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

/* -----------------------------
   COMPOSABLES / STATE
----------------------------- */
const router = useRouter()
const authStore = useAuthStore()
const { xs } = useDisplay()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref<string | null>(null)
const showPassword = ref(false)

/* -----------------------------
   EMITS
----------------------------- */
const emit = defineEmits<{
  (e: 'success'): void
}>()

/* -----------------------------
   RESET FORM
----------------------------- */
const resetForm = () => {
  email.value = ''
  password.value = ''
  errorMessage.value = null
}

/* -----------------------------
   LOGIN FUNCTION
----------------------------- */
const login = async () => {
  loading.value = true
  errorMessage.value = null

  try {
    // 1️⃣ Sign in via Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) throw error
    if (!data.user) throw new Error('User not found')

    // 2️⃣ Ensure email is confirmed
    if (!data.user.email_confirmed_at) {
      throw new Error('Please confirm your email before signing in')
    }

    // 3️⃣ Load user profile from Supabase table
    const { data: userInfo, error: profileError } = await supabase
      .from('users_information')
      .select('*')
      .eq('id', data.user.id)
      .single()

    if (profileError) throw profileError

    // 4️⃣ Store user in Pinia (OuterNavbar will auto-update)
    authStore.setUser({
      id: data.user.id,
      name: `${userInfo.firstname} ${userInfo.lastname}`,
      email: userInfo.email,
      username: userInfo.username,
      phone_number: userInfo.phone_number,
      avatar_url: userInfo.avatar_url || undefined,
      job: userInfo.job,
      created_at: userInfo.created_at,
      updated_at: userInfo.updated_at
    })

    // 5️⃣ Emit success to parent (optional)
    emit('success')

    // 6️⃣ Reset form
    resetForm()

    // 7️⃣ Redirect (optional)
    await router.push('/about')
  } catch (err: any) {
    errorMessage.value = err.message ?? 'Invalid email or password'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="login">
    <v-row class="my-4">
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
          placeholder="Enter your password"
          variant="outlined"
          density="comfortable"
          color="primary"
          prepend-inner-icon="mdi-lock-outline"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          required
          :disabled="loading"
          @click:append-inner="showPassword = !showPassword"
        />
      </v-col>

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

<style scoped>
form {
  width: 100%;
}
</style>
