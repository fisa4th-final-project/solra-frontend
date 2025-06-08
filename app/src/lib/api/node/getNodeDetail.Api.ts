import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetNodeDetailRequestParam, GetNodeDetailResponseDto } from "@/lib/api/node/nodeDto";
import { useResStore } from "@/store/response";

export async function getNodeDetailApi(reqDto: GetNodeDetailRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/nodes/${reqDto.nodeName}`,
    auth: true
  }).then((res: ApiResponse<GetNodeDetailResponseDto>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}