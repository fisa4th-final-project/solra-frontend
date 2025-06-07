import type { DeleteOrgQueryParam } from "@/lib/api/org/orgDto";
import { apiRequest } from "@/lib/global/apiHandler";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import { ApiError } from "@/lib/global/customError";
import { useResStore } from "@/store/response";

export async function deleteOrgApi(reqParam: DeleteOrgQueryParam) {
  const resStore = useResStore();
  return await apiRequest({
    method: "DELETE",
    path: `api/organizations/${reqParam.orgId}`,
    auth: true
  }).then((res: ApiResponse<null>) => {
    resStore.push(res);
    return res.data;
  }).catch((e: ApiError) => {
    resStore.push(e.res);
  }) ?? null;
}