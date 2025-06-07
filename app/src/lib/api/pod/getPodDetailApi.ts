import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetPodDetailRequestParam, GetPodDetailResponseDto } from "@/lib/api/pod/podDto";
import { useResStore } from "@/store/response";

export async function getPodDetailApi(reqDto: GetPodDetailRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/pods/${reqDto.name}`,
    auth: true
  }).then((res: ApiResponse<GetPodDetailResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}