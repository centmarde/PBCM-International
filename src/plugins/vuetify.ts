/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Custom PBCM theme styles
import '@/styles/pbcm-theme.css'

// Composables
import { createVuetify } from 'vuetify'

// Theme configuration
import { pbcmLightTheme, pbcmDarkTheme } from '@/theme/theme'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'pbcmLight',
    themes: {
      pbcmLight: pbcmLightTheme,
      pbcmDark: pbcmDarkTheme,
    },
    variations: {
      colors: ['primary', 'secondary'],
      lighten: 3,
      darken: 3,
    },
  },
  defaults: {
    VBtn: {
      class: 'pbcm-button',
    },
    VCard: {
      class: 'pbcm-card',
      elevation: 2,
    },
    VSheet: {
      class: 'pbcm-transition',
    },
    VContainer: {
      class: 'pbcm-transition',
    },
  },
})
