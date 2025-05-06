import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/style.css'
import App from '@/App.vue'
import { router } from '@/router'
import { globalErrorHandler } from '@/lib/global/errorHandler'

const app = createApp(App)
const pinia = createPinia()

app.config.errorHandler = globalErrorHandler

app.use(pinia)
app.use(router)

app.mount('#app')
