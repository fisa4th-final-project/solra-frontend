import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateRoleRequestDto, UpdateRoleResponseDto } from "@/lib/api/role/roleDto";
import { useResStore } from "@/store/response";

export async function updateRoleApi(reqDto: UpdateRoleRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "PATCH",
    path: `api/roles/${reqDto.roleId}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdateRoleResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}