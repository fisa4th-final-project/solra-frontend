import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetNodeListRequestParam, GetNodeListResponseDto } from "@/lib/api/node/nodeDto";
import { useResStore } from "@/store/response";

export async function getNodeListApi(reqDto: GetNodeListRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/nodes`,
    auth: true
  }).then((res: ApiResponse<GetNodeListResponseDto[]>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}