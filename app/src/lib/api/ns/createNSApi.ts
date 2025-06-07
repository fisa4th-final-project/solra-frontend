import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { CreateNSRequestDto, CreateNSResponseDto } from "@/lib/api/ns/nsDto";
import { useResStore } from "@/store/response";

export async function createNSApi(reqDto: CreateNSRequestDto) {
  const resStore = useResStore();
  await apiRequest({
    method: "POST",
    path: `api/clusters/${reqDto.clusterId}/namespaces`,
    body: reqDto,
    auth: true
  }).then((res: ApiResponse<CreateNSResponseDto>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}