import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateDeptRequestDto, CreateDeptResponseDto } from "@/lib/api/dept/deptDto";
import { useResStore } from "@/store/response";

export async function createDeptApi(reqDto: CreateDeptRequestDto) {
  const resStore = useResStore();
  await apiRequest({
    method: "POST",
    path: "api/departments",
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateDeptResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}