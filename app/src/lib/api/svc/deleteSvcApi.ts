import type { DeleteSvcQueryParam } from "@/lib/api/svc/svcDto";
import { apiRequest } from "@/lib/global/apiHandler";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import { ApiError } from "@/lib/global/customError";
import { useResStore } from "@/store/response";

export async function deleteSvcApi(reqParam: DeleteSvcQueryParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "DELETE",
    path: `api/clusters/${reqParam.clusterId}/namespaces/${reqParam.nsName}/services/${reqParam.name}`,
    auth: true
  }).then((res: ApiResponse<null>) => {
    resStore.push(res);
    return res.data
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}