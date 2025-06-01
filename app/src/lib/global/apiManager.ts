// lib/api/ApiService.ts
import * as apis from '@/lib/api';

class ApiService {
  private static instance: ApiService;

  private constructor() { }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public readonly api = apis;
}

export const apiHandler = ApiService.getInstance().api;
