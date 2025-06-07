import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdatePermRequestParam, UpdatePermResponseDto } from "@/lib/api/perm/permDto";
import { useResStore } from "@/store/response";

export async function updatePermApi(reqDto: UpdatePermRequestParam) {
  const resStore = useResStore();
  await apiRequest({
    method: "PATCH",
    path: `api/permissions/${reqDto.permId}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdatePermResponseDto>) => {
    resStore.push(res);
    return res.data;      
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}