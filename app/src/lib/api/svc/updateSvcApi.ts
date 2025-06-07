import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateSvcRequestDto, UpdateSvcResponseDto } from "@/lib/api/svc/svcDto";
import { useResStore } from "@/store/response";

export async function updateSvcApi(reqDto: UpdateSvcRequestDto) {
  const resStore = useResStore();
  return await apiRequest({
    method: "PATCH",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.nsName}/services/${reqDto.name}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdateSvcResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}