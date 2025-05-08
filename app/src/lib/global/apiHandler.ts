import type { ApiRequest } from '@/lib/global/ApiRequest';

export async function apiRequest<T = any>(options: ApiRequest): Promise<T> {
  const {
    method,
    path,
    body,
    contentType = 'application/json',
    headers = {},
    auth = true
  } = options;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': contentType,
      ...headers
    },
    credentials: auth ? 'include' : 'same-origin',
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const url = import.meta.env.VITE_API_URL + path;
  const res = await fetch(url, config);

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `api 커넥션 에러 ${res.status}`);
  }

  return res.json();
}