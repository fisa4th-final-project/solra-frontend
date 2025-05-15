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
          backgroundLight: '#F7F8FC',
          text: '#000000',
          textGray:"rgb(175, 175, 175)",
          cardBorder:"#DFE0EB"
        }
      }
    }
  }
})

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
