import type { DeleteRolePermRequestDto } from "@/lib/api/rolePerm/rolePermDto";
import { apiRequest } from "@/lib/global/apiHandler";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import { ApiError } from "@/lib/global/customError";
import { useResStore } from "@/store/response";

export async function deleteRolePermApi(reqParam: DeleteRolePermRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "DELETE",
    path: `api/role-permissions`,
    body: reqParam,
    auth: true
  }).then((res: ApiResponse<null>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}