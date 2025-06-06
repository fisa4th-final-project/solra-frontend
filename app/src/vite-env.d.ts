/// <reference types="vite/client" />

// route.meta.role 타입 추가
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    role?: string[]
  }
}

// ts에서 인식할 .vue 파일 모듈 정의
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// vuetify/styles 모듈 추가
declare module 'vuetify/styles';

