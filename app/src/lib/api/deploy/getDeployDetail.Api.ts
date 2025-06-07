import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetDeployDetailRequestParam, GetDeployDetailResponseDto } from "@/lib/api/deploy/deployDto";
import { useResStore } from "@/store/response";

export async function getDeployDetailApi(reqDto: GetDeployDetailRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/deployments/${reqDto.deployName}`,
    auth: true
  }).then((res: ApiResponse<GetDeployDetailResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}