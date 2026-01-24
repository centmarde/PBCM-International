import type { ThemeDefinition } from 'vuetify'

// PBCM Brand Colors - Blue-only 2-color palette system
const pbcmColors = {
  // Primary: Deep Blue (representing faith, trust, stability)
  primary: '#1565C0', // Deep blue
  primaryLight: '#42A5F5', // Light blue
  primaryDark: '#0D47A1', // Darker blue

  // Secondary: Light Blue variants (representing serenity, peace, divine grace)
  secondary: '#2196F3', // Material Blue
  secondaryLight: '#64B5F6', // Light blue
  secondaryDark: '#1976D2', // Dark blue

  // Neutral supporting colors
  surface: '#FFFFFF',
  background: '#F8F9FA',
  error: '#D32F2F',
  warning: '#1976D2', // Blue instead of orange
  info: '#2196F3',
  success: '#1976D2', // Blue instead of green
}// Light Theme Configuration
export const pbcmLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: pbcmColors.primary,
    'primary-lighten-1': pbcmColors.primaryLight,
    'primary-darken-1': pbcmColors.primaryDark,

    secondary: pbcmColors.secondary,
    'secondary-lighten-1': pbcmColors.secondaryLight,
    'secondary-darken-1': pbcmColors.secondaryDark,

    surface: pbcmColors.surface,
    background: pbcmColors.background,
    'surface-variant': '#F5F5F5',
    'on-surface': '#1A1A1A',
    'on-background': '#1A1A1A',
    'on-primary': '#FFFFFF',
    'on-secondary': '#FFFFFF',

    error: pbcmColors.error,
    'on-error': '#FFFFFF',
    warning: pbcmColors.warning,
    'on-warning': '#FFFFFF',
    info: pbcmColors.info,
    'on-info': '#FFFFFF',
    success: pbcmColors.success,
    'on-success': '#FFFFFF',
  }
}

// Dark Theme Configuration
export const pbcmDarkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: pbcmColors.primaryLight, // Lighter primary for dark mode
    'primary-lighten-1': '#64B5F6',
    'primary-darken-1': pbcmColors.primary,

    secondary: pbcmColors.secondaryLight, // Lighter secondary for dark mode
    'secondary-lighten-1': '#90CAF9', // Even lighter blue
    'secondary-darken-1': pbcmColors.secondary,

    surface: '#1E1E1E',
    background: '#121212',
    'surface-variant': '#2A2A2A',
    'on-surface': '#FFFFFF',
    'on-background': '#FFFFFF',
    'on-primary': '#000000',
    'on-secondary': '#000000',

    error: '#EF5350',
    'on-error': '#000000',
    warning: '#42A5F5', // Blue warning for dark theme
    'on-warning': '#000000',
    info: '#42A5F5',
    'on-info': '#000000',
    success: '#42A5F5', // Blue success for dark theme
    'on-success': '#000000',
  }
}// Export theme variants for easy access
export const pbcmThemes = {
  light: pbcmLightTheme,
  dark: pbcmDarkTheme,
  pbcmColors
}

export default pbcmThemes
