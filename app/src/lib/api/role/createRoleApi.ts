import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateRoleRequestDto, CreateRoleResponseDto } from "@/lib/api/role/roleDto";
import { useResStore } from "@/store/response";

export async function createRoleApi(reqDto: CreateRoleRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "POST",
    path: "api/roles",
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateRoleResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}