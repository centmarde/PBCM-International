import type { ToastService } from '@/plugins/toast'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: ToastService
  }
}
