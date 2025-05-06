import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css'
import App from '@/App.vue'
import { router } from '@/router'
import { globalErrorHandler } from '@/lib/global/errorHandler'

// Vuetify 관련 import
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'solraTheme',
    themes: {
      solraTheme: {
        dark: true,
        colors: {
          primary: '#FF6500',
          secondary: '#1E3E62',
          background: '#0B192C',
          text: '#000000'
        }
      }
    }
  }
})

const app = createApp(App)
const pinia = createPinia()

app.config.errorHandler = globalErrorHandler

app.use(pinia)
app.use(router)

app.mount('#app')
