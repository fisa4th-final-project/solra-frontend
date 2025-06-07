// test/setup.ts
import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'

// Vuetify 테마 설정
const lightTheme = {
  dark: false,
  colors: {
    primary: '#FF6500',
    secondary: '#1E3E62',
    background: '#FFFFFF',
    surface: '#FFFFFF',
  },
}

const darkTheme = {
  dark: true,
  colors: {
    primary: '#FF6500',
    secondary: '#91B4D5',
    background: '#0B192C',
    surface: '#1E2A3A',
  },
}

export const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'darkTheme',
    themes: {
      lightTheme,
      darkTheme,
    },
  },
})

// 테스트용 라우터
const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 글로벌 설정 적용
config.global.plugins = [
  createTestingPinia({ stubActions: false }), // 실제 store 동작 허용
  vuetify,
  router,
]

config.global.stubs = {
  Transition: false,
}

// test/setup.ts 하단에 추가
global.ResizeObserver = class {
  observe() { }
  unobserve() { }
  disconnect() { }
}