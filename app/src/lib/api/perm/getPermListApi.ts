import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetPermListResponseDto } from "@/lib/api/perm/permDto";
import { useResStore } from "@/store/response";

export async function getPermListApi() {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/permissions`,
    auth: true
  }).then((res: ApiResponse<GetPermListResponseDto[]>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}