/// <reference types="vite/client" />

// ts에서 인식할 .vue 파일 모듈 정의
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}