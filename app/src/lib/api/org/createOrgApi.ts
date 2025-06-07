import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateOrgRequestDto, CreateOrgResponseDto } from "@/lib/api/org/orgDto";
import { useResStore } from "@/store/response";

export async function createOrgApi(reqDto: CreateOrgRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "POST",
    path: "api/organizations",
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateOrgResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}