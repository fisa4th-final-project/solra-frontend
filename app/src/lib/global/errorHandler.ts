import type { ComponentPublicInstance } from 'vue'

export function globalErrorHandler(
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) {
  console.error('Global error:', err)
  console.warn('Component instance:', instance)
  console.warn('Info:', info)

  // todo: 에러 로그 서버 전송
  // logService.send({ error: err, info })

  // todo: 사용자 알림 (필요에 따라 UI 연동)
  alert('앱에서 오류가 발생했습니다. 새로고침해주세요.')
}