// route.meta.role 타입 추가
import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    role?: string[]
  }
}