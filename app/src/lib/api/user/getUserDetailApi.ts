import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetUserDetailQueryParam, GetUserDetailResponseDto } from "@/lib/api/user/userDto";
import { useResStore } from "@/store/response";

export async function getUserDetailApi(reqParam: GetUserDetailQueryParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/users/${reqParam.userId}`,
    auth: true
  }).then((res: ApiResponse<GetUserDetailResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}