import { defineStore } from 'pinia'

export type ToastColor =
  | 'success'
  | 'error'
  | 'info'
  | 'primary'
  | 'warning'

export interface ToastItem {
  message: string
  color: ToastColor
  icon?: string
  timeout: number
  isLoading?: boolean
}

export interface ToastState {
  queue: ToastItem[]
  show: boolean
  message: string
  color: ToastColor
  icon?: string
  timeout: number
  isLoading: boolean
  startedAt: number
}

export const useToastStore = defineStore('toast', {
  state: (): ToastState => ({
    queue: [],
    show: false,
    message: '',
    color: 'success',
    icon: undefined,
    timeout: 3000,
    isLoading: false,
    startedAt: 0,
  }),

  actions: {
    _enqueue(toast: ToastItem): void {
      this.queue.push(toast)

      if (!this.show) {
        this._dequeue()
      }
    },

    _dequeue(): void {
      if (this.queue.length === 0) {
        this.show = false
        return
      }

      const next = this.queue.shift()!

      this.message = next.message
      this.color = next.color
      this.icon = next.icon
      this.timeout = next.timeout
      this.isLoading = next.isLoading ?? false
      this.startedAt = Date.now()
      this.show = true
    },

    success(message: string, timeout = 3000): void {
      this._enqueue({
        message,
        color: 'success',
        icon: 'mdi-check-circle',
        timeout,
      })
    },

    error(message: string, timeout = 4000): void {
      this._enqueue({
        message,
        color: 'error',
        icon: 'mdi-alert-circle',
        timeout,
      })
    },

    info(message: string, timeout = 3000): void {
      this._enqueue({
        message,
        color: 'info',
        icon: 'mdi-information',
        timeout,
      })
    },

    loading(message = 'Loading...'): void {
      this._enqueue({
        message,
        color: 'primary',
        icon: 'mdi-loading',
        timeout: -1,
        isLoading: true,
      })
    },

    clearLoading(): void {
      this.isLoading = false
      this.show = false
      this._dequeue()
    },
  },
})
