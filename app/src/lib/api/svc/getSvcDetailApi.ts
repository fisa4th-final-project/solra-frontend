import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetSvcDetailRequestParam, GetSvcDetailResponseDto } from "@/lib/api/svc/svcDto";
import { useResStore } from "@/store/response";

export async function getSvcDetailApi(reqDto: GetSvcDetailRequestParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "GET",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/services/${reqDto.name}`,
    auth: true
  }).then((res: ApiResponse<GetSvcDetailResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}