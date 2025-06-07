import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateSvcRequestDto, CreateSvcResponseDto } from "@/lib/api/svc/svcDto";
import { useResStore } from "@/store/response";

export async function createSvcApi(reqDto: CreateSvcRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "POST",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/services`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateSvcResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}