import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetUserRoleByUserIdQueryParam, GetUserRoleByUserIdResponseDto } from "@/lib/api/userRole/UserRoleDto";
import { useResStore } from "@/store/response";

export async function getUserRoleByUserIdApi(reqParam: GetUserRoleByUserIdQueryParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/user-roles/${reqParam.userId}`,
    auth: true
  }).then((res: ApiResponse<GetUserRoleByUserIdResponseDto[]>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}