import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetRoleDetailRequestParam, GetRoleDetailResponseDto } from "@/lib/api/role/roleDto";
import { useResStore } from "@/store/response";

export async function getRoleDetailApi(reqDto: GetRoleDetailRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/roles/${reqDto.roleId}`,
    auth: true
  }).then((res: ApiResponse<GetRoleDetailResponseDto>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}