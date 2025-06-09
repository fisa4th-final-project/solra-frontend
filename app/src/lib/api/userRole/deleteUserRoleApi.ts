import type { DeleteUserRoleRequestDto } from "@/lib/api/userRole/UserRoleDto";
import { apiRequest } from "@/lib/global/apiHandler";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import { ApiError } from "@/lib/global/customError";
import { useResStore } from "@/store/response";

export async function deleteUserRoleApi(reqDto: DeleteUserRoleRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "DELETE",
    path: `api/user-roles`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<null>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}