import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetNSDetailRequestParam, GetNSDetailResponseDto } from "@/lib/api/ns/nsDto";
import { useResStore } from "@/store/response";

export async function getNSDetailApi(reqDto: GetNSDetailRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.name}`,
    auth: true
  }).then((res: ApiResponse<GetNSDetailResponseDto>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res)
  }) ?? null;
}