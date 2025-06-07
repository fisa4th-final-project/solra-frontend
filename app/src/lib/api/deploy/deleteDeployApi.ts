import type { DeleteDeployQueryParam } from "@/lib/api/deploy/deployDto";
import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useResStore } from "@/store/response";

export async function deleteDeployApi(reqParam: DeleteDeployQueryParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "DELETE",
    path: `api/clusters/${reqParam.clusterId}/namespaces/${reqParam.nsName}/deployments/${reqParam.name}`,
    auth: true
  }).then((res) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}