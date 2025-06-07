import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetClusterListRequestParam, GetClusterListResponseDto } from "@/lib/api/cluster/clusterDto";
import { useResStore } from "@/store/response";

export async function getClusterListApi(reqParam?: GetClusterListRequestParam) {
  const query = reqParam ? `?orgId=${reqParam.orgId}` : '';
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters${query}`,
    auth: true
  }).then((res: ApiResponse<GetClusterListResponseDto[]>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}