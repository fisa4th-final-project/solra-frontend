import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateDeployRequestDto, UpdateDeployResponseDto } from "@/lib/api/deploy/deployDto";
import { useResStore } from "@/store/response";

export async function updateDeployApi(reqDto: UpdateDeployRequestDto) {
const resStore = useResStore();
  await apiRequest({
    method: "PATCH",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/deployments/${reqDto.name}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdateDeployResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}