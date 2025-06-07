import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { DeleteUserQueryParam } from "@/lib/api/user/userDto";
import { useResStore } from "@/store/response";
import type { ApiResponse } from "@/lib/global/ApiResponse";

export async function deleteUserApi(reqParam: DeleteUserQueryParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "DELETE",
    path: `api/users/${reqParam.userId}`,
    auth: true
  }).then((res: ApiResponse<null>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}