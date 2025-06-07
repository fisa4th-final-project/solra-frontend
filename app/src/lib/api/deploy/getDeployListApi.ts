import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetDeployListRequestParam, GetDeployListResponseDto } from "@/lib/api/deploy/deployDto";
import { useResStore } from "@/store/response";

export async function getDeployListApi(reqDto: GetDeployListRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/deployments`,
    auth: true
  }).then((res: ApiResponse<GetDeployListResponseDto[]>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}