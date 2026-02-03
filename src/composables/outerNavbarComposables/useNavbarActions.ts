import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'

/* --------------------------------
   ACTIONS
-------------------------------- */
export function useNavbarActions() {
  const router = useRouter()
  const authStore = useAuthStore()

  const goToLogin = () => {
    router.push('/auth')
  }

  const handleLogout = async () => {
    await authStore.logout()
    router.push('/auth')

    const { data } = await supabase.auth.getSession()
    console.log('Session after logout:', data.session)
  }

  return { goToLogin, handleLogout }
}
