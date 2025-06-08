import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetOrgDetailRequestDto, GetOrgDetailResponseDto } from "@/lib/api/org/orgDto";
import { useResStore } from "@/store/response";

export async function getOrgDetailApi(reqDto: GetOrgDetailRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/organizations/${reqDto.orgId}`,
    auth: true
  }).then((res: ApiResponse<GetOrgDetailResponseDto>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}