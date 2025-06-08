import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetRolePermListRequestParam, GetRolePermListResponseDto } from "@/lib/api/rolePerm/rolePermDto";
import { useResStore } from "@/store/response";

export async function getRolePermListApi(reqDto: GetRolePermListRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/role-permissions/${reqDto.roleId}`,
    auth: true
  }).then((res: ApiResponse<GetRolePermListResponseDto[]>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}