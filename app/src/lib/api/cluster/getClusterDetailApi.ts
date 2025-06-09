import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetClusterDetailRequestParam, GetClusterDetailResponseDto } from "@/lib/api/cluster/clusterDto";
import { useResStore } from "@/store/response";

export async function getClusterDetailApi(reqDto: GetClusterDetailRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}`,
    auth: true
  }).then((res: ApiResponse<GetClusterDetailResponseDto>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}