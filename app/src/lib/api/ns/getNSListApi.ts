import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetNSListRequestParam, GetNSListResponseDto } from "@/lib/api/ns/nsDto";
import { useResStore } from "@/store/response";

export async function getNSListApi(reqDto: GetNSListRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces`,
    auth: true
  }).then((res: ApiResponse<GetNSListResponseDto[]>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}