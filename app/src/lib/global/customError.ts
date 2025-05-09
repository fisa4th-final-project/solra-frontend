import type { ApiResponse } from "@/lib/global/ApiResponse";

export class ApiError extends Error {
  res: ApiResponse<null>;

  constructor(res: ApiResponse<null>) {
    super(res.message);
    this.name = 'ApiError'
    this.res = res;
  }
}