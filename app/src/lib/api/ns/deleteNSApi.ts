import type { DeleteNSQueryParam } from "@/lib/api/ns/nsDto";
import { apiRequest } from "@/lib/global/apiHandler";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import { ApiError } from "@/lib/global/customError";
import { useResStore } from "@/store/response";

export async function deleteNSApi(reqParam: DeleteNSQueryParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "DELETE",
    path: `api/clusters/${reqParam.clusterId}/namespaces/${reqParam.name}`,
    auth: true
  }).then((res: ApiResponse<null>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}