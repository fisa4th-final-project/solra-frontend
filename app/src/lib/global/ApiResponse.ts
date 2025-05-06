export interface ApiResponse<T> {
  success: boolean,
  code: number,
  message: string,
  errorCode: number,
  data: T
}