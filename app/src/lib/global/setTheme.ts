// src/composables/useTheme.ts
import { useTheme } from 'vuetify'

export function useToggleTheme() {
  const theme = useTheme()

  const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'lightTheme' : 'darkTheme'
  }

  const isDark = () => theme.global.current.value.dark

  return {
    toggleTheme,
    isDark,
  }
}
