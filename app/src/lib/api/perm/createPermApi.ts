import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreatePermRequestDto, CreatePermResponseDto } from "@/lib/api/perm/permDto";
import { useResStore } from "@/store/response";

export async function createPermApi(reqDto: CreatePermRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "POST",
    path: "api/permissions",
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreatePermResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}