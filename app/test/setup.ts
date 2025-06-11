vi.mock('@/store/auth', () => {
  return {
    useAuthStore: () => ({
      hasPerm: vi.fn().mockReturnValue(true),
      hasAnyRoles: vi.fn().mockReturnValue(true),
    }),
  }
});

// test/setup.ts
import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router/routes'
import { setActivePinia } from 'pinia'
import { vi } from 'vitest'

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
const pinia = createTestingPinia({
  stubActions: false,
})
setActivePinia(pinia)

config.global.plugins = [
  pinia,
  vuetify,
  router,
]

config.global.stubs = {
  Transition: false,
}

// ResizeObserver mock
global.ResizeObserver = class {
  observe() { }
  unobserve() { }
  disconnect() { }
}