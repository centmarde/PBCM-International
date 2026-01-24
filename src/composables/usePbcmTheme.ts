import { useTheme } from 'vuetify'

export const usePbcmTheme = () => {
  const theme = useTheme()

  const isDark = computed(() => theme.global.current.value.dark)
  const themeName = computed(() => theme.global.name.value)

  const toggleTheme = () => {
    theme.global.name.value = isDark.value ? 'pbcmLight' : 'pbcmDark'
  }

  const setLightTheme = () => {
    theme.global.name.value = 'pbcmLight'
  }

  const setDarkTheme = () => {
    theme.global.name.value = 'pbcmDark'
  }

  const getThemeColor = (colorName: string) => {
    return theme.global.current.value.colors[colorName]
  }

  const isPrimaryColor = (color: string) => {
    const primary = theme.global.current.value.colors.primary
    return color === primary
  }

  const isSecondaryColor = (color: string) => {
    const secondary = theme.global.current.value.colors.secondary
    return color === secondary
  }

  // Reactive theme colors
  const colors = computed(() => ({
    primary: theme.global.current.value.colors.primary,
    primaryLighten: theme.global.current.value.colors['primary-lighten-1'],
    primaryDarken: theme.global.current.value.colors['primary-darken-1'],
    secondary: theme.global.current.value.colors.secondary,
    secondaryLighten: theme.global.current.value.colors['secondary-lighten-1'],
    secondaryDarken: theme.global.current.value.colors['secondary-darken-1'],
    surface: theme.global.current.value.colors.surface,
    background: theme.global.current.value.colors.background,
    onSurface: theme.global.current.value.colors['on-surface'],
    onBackground: theme.global.current.value.colors['on-background'],
  }))

  // CSS custom properties for the current theme
  const cssVars = computed(() => ({
    '--pbcm-current-primary': `rgb(${theme.global.current.value.colors.primary})`,
    '--pbcm-current-secondary': `rgb(${theme.global.current.value.colors.secondary})`,
    '--pbcm-current-surface': `rgb(${theme.global.current.value.colors.surface})`,
    '--pbcm-current-background': `rgb(${theme.global.current.value.colors.background})`,
  }))

  return {
    // State
    isDark: readonly(isDark),
    themeName: readonly(themeName),
    colors: readonly(colors),
    cssVars: readonly(cssVars),

    // Actions
    toggleTheme,
    setLightTheme,
    setDarkTheme,

    // Utils
    getThemeColor,
    isPrimaryColor,
    isSecondaryColor,
  }
}
