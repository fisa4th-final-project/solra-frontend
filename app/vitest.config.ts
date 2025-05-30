/// <reference types="vitest"/>
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import vuetify from 'vite-plugin-vuetify'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ 
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss'
      }
    })
  ],
  test: {
    globals: true, // describe, it, expect 등 전역으로 사용 가능
    environment: 'jsdom', // DOM 환경 (Vue 컴포넌트 테스트)
    setupFiles: ['./test/setup.ts'], // 테스트 전 실행할 스크립트 (예: Vuetify 등록 등)
    include: ['test/**/*.spec.ts'], // 테스트 파일 glob 패턴
    exclude: ['node_modules', 'dist'],
    coverage: {
      reporter: ['text', 'json', 'html'], // 커버리지 출력 형식
      exclude: ['test/', 'src/main.ts'] // 커버리지에서 제외할 파일
    },
    server: {
      deps: {
        inline: [/vuetify/] // Vuetify를 transform 대상으로 포함시킴
      },
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@test': path.resolve(__dirname, './test')
    }
  }
})
