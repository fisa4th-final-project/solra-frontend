import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetDeptListRequestParam, GetDeptListResponseDto } from "@/lib/api/dept/deptDto";
import { useResStore } from "@/store/response";

export async function getDeptListApi(reqParam: GetDeptListRequestParam) {
  const resStore = useResStore();
  const query = `orgId=${reqParam.org_id}`
  return await apiRequest({
    method: "GET",
    path: `api/departments?${query}`,
    auth: true
  }).then((res: ApiResponse<GetDeptListResponseDto[]>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}