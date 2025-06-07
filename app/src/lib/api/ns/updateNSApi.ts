import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { UpdateNSRequestDto, UpdateNSResponseDto } from "@/lib/api/ns/nsDto";
import { useResStore } from "@/store/response";

export async function updateNSApi(reqDto: UpdateNSRequestDto) {
  const resStore = useResStore();
  await apiRequest({
    method: "PATCH",
    path: `api/clusters/${reqDto.clusterId}/namespaces/${reqDto.name}`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<UpdateNSResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}