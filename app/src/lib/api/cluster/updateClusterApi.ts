import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateClusterRequestDto, UpdateClusterResponseDto } from "@/lib/api/cluster/clusterDto";
import { useResStore } from "@/store/response";

export async function updateClusterApi(reqDto: UpdateClusterRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "PATCH",
    path: `api/clusters/${reqDto.clusterId}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdateClusterResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}