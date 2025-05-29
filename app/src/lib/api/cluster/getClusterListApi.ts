import { apiRequest } from "@/lib/global/apiHandler";
import { ApiError } from "@/lib/global/customError";
import { useDialogStore } from "@/store/dialog";
import type { ApiResponse } from "@/lib/global/ApiResponse";
import type { GetClusterListRequestParam, GetClusterListResponseDto } from "@/lib/api/cluster/clusterDto";

export async function getClusterListApi(reqParam?: GetClusterListRequestParam):Promise<GetClusterListResponseDto[] | null> {

  const query = reqParam ? `?orgId=${reqParam.orgId}` : '';

  const dialog = useDialogStore();

  return await apiRequest({
    method: "GET",
    path: `api/clusters${query}`,
    auth: true
  }).then(async (res: ApiResponse<GetClusterListResponseDto[]>) => {
    if (!res.data) return null;
    return res.data;
  }).catch(async (e: ApiError) => {
    console.error(e.res);
    dialog.open({
      title: '클러스터 리스트 조회 실패',
      message: e.res.message,
      type: 'mainframe'
    });
    return null;
  });
}