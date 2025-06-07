import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetRoleListResponseDto } from "@/lib/api/role/roleDto";
import { useResStore } from "@/store/response";

export async function getRoleListApi() {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/roles`,
    auth: true
  }).then(async (res: ApiResponse<GetRoleListResponseDto[]>) => {
    resStore.push(res);
    return res.data;
  }).catch(async (e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}