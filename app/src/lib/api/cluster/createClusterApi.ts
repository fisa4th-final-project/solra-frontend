import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateClusterRequestDto, CreateClusterResponseDto } from "@/lib/api/cluster/clusterDto";
import { useResStore } from "@/store/response";

export async function createClusterApi(reqDto: CreateClusterRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "POST",
    path: "api/clusters",
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateClusterResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}