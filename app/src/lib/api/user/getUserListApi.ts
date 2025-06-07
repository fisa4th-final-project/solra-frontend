import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetUserListQueryParam, GetUserListResponseDto } from "@/lib/api/user/userDto";
import { useResStore } from "@/store/response";

export async function getUserListApi(reqParam: GetUserListQueryParam) {
  const resStore = useResStore();
  const orgName = reqParam.orgName ? `orgName=${reqParam.orgName}` : null
  const deptName = reqParam.deptName ? `deptName=${reqParam.deptName}` : null
  const page = reqParam.page > 0 ? `page=${reqParam.page}` : null
  const size = reqParam.size > 0 ? `size=${reqParam.size}` : null
  let query = '';
  const params = [orgName, deptName, page, size].filter(Boolean).join('&');
  if (params) {
    query = `?${params}`;
  }
  return await apiRequest({
    method: "GET",
    path: `api/users${query}`,
    auth: true
  }).then((res: ApiResponse<GetUserListResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}