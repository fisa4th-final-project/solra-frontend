type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequest {
  method: HttpMethod;
  path: string;
  body?: any;
  contentType?: string;
  headers?: Record<string, string>;
  auth?: boolean; // credentials 쿠키 포함 여부
}
