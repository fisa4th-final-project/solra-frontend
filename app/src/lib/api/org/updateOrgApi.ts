import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateOrgRequestDto, UpdateOrgResponseDto } from "@/lib/api/org/orgDto";
import { useResStore } from "@/store/response";

export async function updateOrgApi(reqDto: UpdateOrgRequestDto) {
  const resStore = useResStore();
  await apiRequest({
    method: "PATCH",
    path: `api/organizations/${reqDto.orgId}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdateOrgResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}