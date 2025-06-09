import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetPodListRequestParam, GetPodListResponseDto } from "@/lib/api/pod/podDto";
import { useResStore } from "@/store/response";

export async function getPodListApi(reqDto: GetPodListRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/pods`,
    auth: true
  }).then((res: ApiResponse<GetPodListResponseDto[]>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}