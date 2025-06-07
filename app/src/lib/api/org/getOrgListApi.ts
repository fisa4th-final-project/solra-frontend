import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetOrgListResponseDto } from "@/lib/api/org/orgDto";
import { useResStore } from "@/store/response";

export async function getOrgListApi() {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/organizations`,
    auth: true
  }).then((res: ApiResponse<GetOrgListResponseDto[]>) => {
    resStore.push(res);
    return res.data
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}