import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css'
import App from '@/App.vue'
import { router } from '@/router'

// Vuetify 관련 import
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const lightTheme = {
  dark: false,
  colors: {
    primary: '#FF6500',
    secondary: '#1E3E62',
    background: '#FFFFFF',
    surface: '#FFFFFF',
  },
}

export const darkTheme = {
  dark: true,
  colors: {
    primary: '#FF6500',
    secondary: '#91B4D5',
    background: '#0B192C',
    surface: '#1E2A3A',
  },
}

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
