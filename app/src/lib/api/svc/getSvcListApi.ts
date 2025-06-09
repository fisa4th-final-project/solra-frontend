import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetSvcListRequestParam, GetSvcListResponseDto } from "@/lib/api/svc/svcDto";
import { useResStore } from "@/store/response";

export async function getSvcListApi(reqDto: GetSvcListRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/services`,
    auth: true
  }).then((res: ApiResponse<GetSvcListResponseDto[]>) => {
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}