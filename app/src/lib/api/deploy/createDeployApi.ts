import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateDeployRequestDto, CreateDeployResponseDto } from "@/lib/api/deploy/deployDto";
import { useResStore } from "@/store/response";

export async function createDeployApi(reqDto: CreateDeployRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "POST",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/deployments`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateDeployResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res)
  }) ?? null;
}