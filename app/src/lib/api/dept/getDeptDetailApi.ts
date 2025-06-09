import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetDeptDetailRequestParam, GetDeptDetailResponseDto } from "@/lib/api/dept/deptDto";
import { useResStore } from "@/store/response";

export async function getDeptDetailApi(reqDto: GetDeptDetailRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/departments/${reqDto.deptId}`,
    auth: true
  }).then((res: ApiResponse<GetDeptDetailResponseDto>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}