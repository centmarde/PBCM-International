import type { App } from 'vue'
import { useToastStore } from '@/stores/toast'

export interface ToastService {
  success(message: string, timeout?: number): void
  error(message: string, timeout?: number): void
  info(message: string, timeout?: number): void
  loading(message?: string): void
  clearLoading(): void
}

export default {
  install(app: App) {
    const toast = useToastStore()

    const service: ToastService = {
      success: toast.success,
      error: toast.error,
      info: toast.info,
      loading: toast.loading,
      clearLoading: toast.clearLoading,
    }

    app.config.globalProperties.$toast = service
    app.provide('toast', service)
  },
}
