import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateDeptRequestDto, UpdateDeptResponseDto } from "@/lib/api/dept/deptDto";
import { useResStore } from "@/store/response";

export async function updateDeptApi(reqDto: UpdateDeptRequestDto) {
  const resStore = useResStore();
  await apiRequest({
    method: "PATCH",
    path: `api/departments/${reqDto.deptId}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdateDeptResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}